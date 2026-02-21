import { type SourceFile, StructureKind } from 'ts-morph';
import type {
  ParsedController,
  ParsedEndpoint,
  ParsedProperty,
  ParsedSchema,
} from '../parser/types.js';
import { toPascalCase } from '../utils.js';
import { collectEnumNamesFromProperties } from './enum-utils.js';
import { graphqlTypeForProperty, tsTypeForProperty } from './type-mappers.js';

function needsExplicitType(prop: ParsedProperty, gqlType: string): boolean {
  return prop.isArray || gqlType === 'Float' || prop.type === 'enum' || prop.type === 'object';
}

function extractNestedSchemas(schemas: Map<string, ParsedSchema>): Set<string> {
  const extracted = new Set<string>();

  function processProperties(
    parentName: string,
    properties: ParsedProperty[],
  ): void {
    for (const prop of properties) {
      if (
        prop.type === 'object' &&
        prop.properties &&
        prop.properties.length > 0 &&
        !prop.typeName
      ) {
        const derivedName = `${parentName}${toPascalCase(prop.name)}`;
        prop.typeName = derivedName;

        const newSchema: ParsedSchema = {
          name: derivedName,
          properties: prop.properties,
        };
        schemas.set(derivedName, newSchema);
        extracted.add(derivedName);

        // Recurse for deeper nesting
        processProperties(derivedName, prop.properties);
      }
    }
  }

  // Snapshot keys to avoid iterating over newly added entries
  const originalNames = [...schemas.keys()];
  for (const name of originalNames) {
    const schema = schemas.get(name)!;
    processProperties(name, schema.properties);
  }

  return extracted;
}

function escapeStringLiteral(str: string): string {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
}

function addFieldDecorator(
  prop: ParsedProperty,
  decorators: { name: string; arguments: string[] }[],
): void {
  const gqlType = graphqlTypeForProperty(prop);
  const options: string[] = [];

  if (prop.nullable) {
    options.push('nullable: true');
  }
  if (prop.description) {
    options.push(`description: '${escapeStringLiteral(prop.description)}'`);
  }
  if (prop.deprecated) {
    options.push(`deprecationReason: 'Deprecated'`);
  }

  if (prop.isArray) {
    if (options.length > 0) {
      decorators.push({
        name: 'Field',
        arguments: [`() => [${gqlType}]`, `{ ${options.join(', ')} }`],
      });
    } else {
      decorators.push({ name: 'Field', arguments: [`() => [${gqlType}]`] });
    }
  } else if (needsExplicitType(prop, gqlType)) {
    if (options.length > 0) {
      decorators.push({
        name: 'Field',
        arguments: [`() => ${gqlType}`, `{ ${options.join(', ')} }`],
      });
    } else {
      decorators.push({ name: 'Field', arguments: [`() => ${gqlType}`] });
    }
  } else if (options.length > 0) {
    decorators.push({ name: 'Field', arguments: [`{ ${options.join(', ')} }`] });
  } else {
    decorators.push({ name: 'Field', arguments: [] });
  }
}

function buildPropertyDeclaration(prop: ParsedProperty) {
  const decorators: { name: string; arguments: string[] }[] = [];
  addFieldDecorator(prop, decorators);

  const tsType = tsTypeForProperty(prop);
  const fullType = prop.isArray ? `${tsType}[]` : tsType;

  return {
    kind: StructureKind.Property as const,
    name: prop.name,
    type: fullType,
    hasExclamationToken: prop.required && !prop.nullable,
    hasQuestionToken: !prop.required || prop.nullable,
    decorators,
    leadingTrivia: undefined as string | undefined,
  };
}

export function generateSchemaClasses(
  sourceFile: SourceFile,
  schemas: Map<string, ParsedSchema>,
  globalSchemas: ParsedSchema[],
  decoratorName: 'ObjectType' | 'InputType',
): void {
  // Ensure parent schemas are in the map
  for (const schema of [...schemas.values()]) {
    if (schema.extends && !schemas.has(schema.extends)) {
      const parent = globalSchemas.find((s) => s.name === schema.extends);
      if (parent) schemas.set(parent.name, parent);
    }
  }

  // Extract inline nested objects into separate schemas
  const extractedNames = extractNestedSchemas(schemas);

  if (schemas.size === 0) return;

  sourceFile.addImportDeclaration({
    moduleSpecifier: '@nestjs/graphql',
    namedImports: [decoratorName, 'Field', 'Float'],
  });

  // Collect all enum names used in properties
  const allEnumNames = new Set<string>();
  for (const schema of schemas.values()) {
    for (const name of collectEnumNamesFromProperties(schema.properties)) {
      allEnumNames.add(name);
    }
  }

  if (allEnumNames.size > 0) {
    sourceFile.addImportDeclaration({
      moduleSpecifier: '../enums',
      namedImports: Array.from(allEnumNames).sort(),
    });
  }

  // Generate extracted nested schemas first, then parents, then children
  const extracted = [...schemas.entries()].filter(([n]) => extractedNames.has(n));
  const parents = [...schemas.entries()].filter(([n, s]) => !s.extends && !extractedNames.has(n));
  const children = [...schemas.entries()].filter(([, s]) => s.extends);

  for (const [name, schema] of [...extracted, ...parents, ...children]) {
    const parentSchema = schema.extends ? schemas.get(schema.extends) : undefined;
    const parentPropNames = new Set(parentSchema?.properties.map((p) => p.name) ?? []);
    const filteredProperties = schema.properties.filter((p) => {
      // Skip readOnly properties in InputType (inputs shouldn't include server-generated fields)
      if (decoratorName === 'InputType' && p.readOnly) return false;
      // Skip writeOnly properties in ObjectType (outputs shouldn't include write-only fields)
      if (decoratorName === 'ObjectType' && p.writeOnly) return false;
      return true;
    });
    const ownProperties = parentSchema
      ? filteredProperties.filter((p) => !parentPropNames.has(p.name))
      : filteredProperties;

    sourceFile.addClass({
      name,
      isExported: true,
      extends: schema.extends,
      decorators: [{ name: decoratorName, arguments: [] }],
      properties: ownProperties.map((prop, index) => {
        const decl = buildPropertyDeclaration(prop);
        if (index > 0) {
          decl.leadingTrivia = '\n';
        }
        return decl;
      }),
    });
  }
}

export function generateSchemaClassesFromEndpoints(
  sourceFile: SourceFile,
  controller: ParsedController,
  globalSchemas: ParsedSchema[],
  decoratorName: 'ObjectType' | 'InputType',
  schemaSelector: (endpoint: ParsedEndpoint) => ParsedSchema | undefined,
): void {
  const schemas = new Map<string, ParsedSchema>();
  for (const endpoint of controller.endpoints) {
    const schema = schemaSelector(endpoint);
    if (schema) {
      schemas.set(schema.name, schema);
    }
  }
  generateSchemaClasses(sourceFile, schemas, globalSchemas, decoratorName);
}
