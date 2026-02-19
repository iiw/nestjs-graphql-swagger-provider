import type { OpenAPIV3_1 } from 'openapi-types';

export function extractEnumValues(
  schema: OpenAPIV3_1.SchemaObject,
  isArray: boolean,
): (string | number)[] | undefined {
  if (isArray) {
    return ((schema as unknown as Record<string, unknown>).items as OpenAPIV3_1.SchemaObject | undefined)?.enum as
      | (string | number)[]
      | undefined;
  }
  return schema.enum as (string | number)[] | undefined;
}

export function mapOpenApiType(
  schema: OpenAPIV3_1.SchemaObject,
): { type: string; isArray: boolean } {
  if (schema.type === 'array') {
    const items = schema.items as OpenAPIV3_1.SchemaObject | undefined;
    if (items) {
      const inner = mapOpenApiType(items);
      return { type: inner.type, isArray: true };
    }
    return { type: 'string', isArray: true };
  }

  switch (schema.type) {
    case 'integer':
    case 'number':
      if (schema.enum) {
        return { type: 'enum', isArray: false };
      }
      return { type: 'number', isArray: false };
    case 'boolean':
      return { type: 'boolean', isArray: false };
    case 'string':
      if (schema.enum) {
        return { type: 'enum', isArray: false };
      }
      return { type: 'string', isArray: false };
    case 'object':
    default:
      return { type: 'object', isArray: false };
  }
}
