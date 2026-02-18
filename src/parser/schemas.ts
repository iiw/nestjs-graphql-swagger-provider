import type { OpenAPIV3_1 } from 'openapi-types';
import type { ParsedSchema } from './types.js';
import { extractProperties } from './properties.js';

export function schemaToName(path: string, method: string, suffix: string): string {
  const parts = path
    .split('/')
    .filter(Boolean)
    .map((p) => p.replace(/[{}]/g, ''));
  const base = parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('');
  const methodCap = method.charAt(0).toUpperCase() + method.slice(1);
  return `${methodCap}${base}${suffix}`;
}

export function extractSchema(
  schema: OpenAPIV3_1.SchemaObject | undefined,
  name: string,
  namedEnumLookup?: Map<string, string>,
): ParsedSchema | undefined {
  if (!schema) return undefined;

  if (schema.type === 'array') {
    const items = schema.items as OpenAPIV3_1.SchemaObject | undefined;
    if (items) {
      return {
        name,
        properties: extractProperties(items, name, namedEnumLookup),
      };
    }
  }

  return {
    name,
    properties: extractProperties(schema, name, namedEnumLookup),
  };
}

export function extractGlobalSchemas(
  schemas: Record<string, OpenAPIV3_1.SchemaObject> | undefined,
  namedEnumLookup?: Map<string, string>,
): ParsedSchema[] {
  if (!schemas) return [];

  return Object.entries(schemas)
    .filter(([, schema]) => schema.type === 'object' || schema.properties)
    .map(([name, schema]) => ({
      name,
      properties: extractProperties(schema, name, namedEnumLookup),
    }));
}
