import type { ParsedController } from '../parser/types.js';

export { toCamelCase, toKebabCase, toPascalCase } from '../utils.js';

export function graphqlTypeForProperty(prop: { type: string; enumName?: string }): string {
  switch (prop.type) {
    case 'enum':
      return prop.enumName ?? 'String';
    case 'number':
      return 'Float';
    case 'boolean':
      return 'Boolean';
    case 'string':
    default:
      return 'String';
  }
}

export function graphqlScalarForPrimitive(openApiType: string): string {
  switch (openApiType) {
    case 'integer':
      return 'Int';
    case 'number':
      return 'Float';
    case 'boolean':
      return 'Boolean';
    case 'string':
    default:
      return 'String';
  }
}

export function tsTypeForProperty(prop: { type: string; enumName?: string }): string {
  switch (prop.type) {
    case 'enum':
      return prop.enumName ?? 'string';
    case 'number':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'string':
    default:
      return 'string';
  }
}

export function collectDtoNames(controller: ParsedController): string[] {
  return [
    ...new Set(
      controller.endpoints
        .filter((e) => e.requestBody)
        .map((e) => e.requestBody!.name),
    ),
  ];
}
