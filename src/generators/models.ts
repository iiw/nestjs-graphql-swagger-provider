import { type SourceFile, StructureKind } from 'ts-morph';
import type { ParsedController, ParsedProperty, ParsedSchema } from '../parser/types.js';
import { graphqlTypeForProperty, tsTypeForProperty } from './utils.js';

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
  } else if (gqlType === 'Float') {
    if (options.length > 0) {
      decorators.push({
        name: 'Field',
        arguments: [`() => Float`, `{ ${options.join(', ')} }`],
      });
    } else {
      decorators.push({ name: 'Field', arguments: [`() => Float`] });
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

export function generateModels(
  sourceFile: SourceFile,
  controller: ParsedController,
): void {
  const schemaMap = new Map<string, ParsedSchema>();

  for (const endpoint of controller.endpoints) {
    if (endpoint.responseSchema) {
      schemaMap.set(endpoint.responseSchema.name, endpoint.responseSchema);
    }
  }

  if (schemaMap.size === 0) return;

  sourceFile.addImportDeclaration({
    moduleSpecifier: '@nestjs/graphql',
    namedImports: ['ObjectType', 'Field', 'Float'],
  });

  for (const [name, schema] of schemaMap) {
    sourceFile.addClass({
      name,
      isExported: true,
      decorators: [{ name: 'ObjectType', arguments: [] }],
      properties: schema.properties.map(buildPropertyDeclaration),
    });
  }
}
