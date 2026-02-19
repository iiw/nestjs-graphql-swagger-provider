import type { ParsedController } from '../parser/types.js';

export function toKebabCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

export function toPascalCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c: string | undefined) => (c ? c.toUpperCase() : ''))
    .replace(/^(.)/, (_, c: string) => c.toUpperCase());
}

export function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}

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
