import { type SourceFile, StructureKind } from 'ts-morph';
import type { ParsedController, ParsedProperty, ParsedSchema } from '../parser/types.js';
import { graphqlTypeForProperty, tsTypeForProperty } from './utils.js';

function needsExplicitType(prop: ParsedProperty, gqlType: string): boolean {
  return prop.isArray || gqlType === 'Float' || prop.type === 'enum';
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
  };
}

function collectEnumNames(properties: ParsedProperty[]): Set<string> {
  const names = new Set<string>();
  for (const prop of properties) {
    if (prop.type === 'enum' && prop.enumName) {
      names.add(prop.enumName);
    }
    if (prop.properties) {
      for (const name of collectEnumNames(prop.properties)) {
        names.add(name);
      }
    }
  }
  return names;
}

export function generateDtos(
  sourceFile: SourceFile,
  controller: ParsedController,
): void {
  const schemaMap = new Map<string, ParsedSchema>();

  for (const endpoint of controller.endpoints) {
    if (endpoint.requestBody) {
      schemaMap.set(endpoint.requestBody.name, endpoint.requestBody);
    }
  }

  if (schemaMap.size === 0) return;

  sourceFile.addImportDeclaration({
    moduleSpecifier: '@nestjs/graphql',
    namedImports: ['InputType', 'Field', 'Float'],
  });

  // Collect all enum names used in DTO properties
  const allEnumNames = new Set<string>();
  for (const schema of schemaMap.values()) {
    for (const name of collectEnumNames(schema.properties)) {
      allEnumNames.add(name);
    }
  }

  if (allEnumNames.size > 0) {
    sourceFile.addImportDeclaration({
      moduleSpecifier: '../enums',
      namedImports: Array.from(allEnumNames).sort(),
    });
  }

  for (const [name, schema] of schemaMap) {
    sourceFile.addClass({
      name,
      isExported: true,
      decorators: [{ name: 'InputType', arguments: [] }],
      properties: schema.properties.map(buildPropertyDeclaration),
    });
  }
}
