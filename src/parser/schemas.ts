import type { OpenAPIV3_1 } from 'openapi-types';
import type { ParsedSchema } from './types.js';
import type { RefMap } from './ref-resolver.js';
import { extractProperties } from './properties.js';
import { toPascalCase } from '../utils.js';

const PRIMITIVE_TYPES = new Set(['string', 'number', 'integer', 'boolean']);

export function schemaToName(path: string, method: string, suffix: string): string {
  const parts = path
    .split('/')
    .filter(Boolean)
    .map((p) => p.replace(/[^a-zA-Z0-9_-]/g, ''));
  const base = parts.map((p) => toPascalCase(p)).join('');
  const methodCap = method.charAt(0).toUpperCase() + method.slice(1);
  return `${methodCap}${base}${suffix}`;
}

export function extractSchema(
  schema: OpenAPIV3_1.SchemaObject | undefined,
  name: string,
  refMap?: RefMap,
): ParsedSchema | undefined {
  if (!schema) return undefined;

  if (schema.type === 'array') {
    const items = schema.items as OpenAPIV3_1.SchemaObject | undefined;
    if (
      items &&
      PRIMITIVE_TYPES.has(items.type as string) &&
      !items.properties &&
      !items.allOf &&
      !items.oneOf &&
      !items.anyOf
    ) {
      return {
        name,
        properties: [],
        primitiveType: items.type as ParsedSchema['primitiveType'],
        isArray: true,
      };
    }
    if (items) {
      return {
        name,
        properties: extractProperties(items, name, refMap),
      };
    }
  }

  if (
    PRIMITIVE_TYPES.has(schema.type as string) &&
    !schema.properties &&
    !schema.allOf &&
    !schema.oneOf &&
    !schema.anyOf
  ) {
    return {
      name,
      properties: [],
      primitiveType: schema.type as ParsedSchema['primitiveType'],
    };
  }

  return {
    name,
    properties: extractProperties(schema, name, refMap),
  };
}

export function extractGlobalSchemas(
  schemas: Record<string, OpenAPIV3_1.SchemaObject> | undefined,
  refMap?: RefMap,
): ParsedSchema[] {
  if (!schemas) return [];

  return Object.entries(schemas)
    .filter(([, schema]) => schema.type === 'object' || schema.properties || schema.allOf || schema.oneOf || schema.anyOf)
    .map(([name, schema]) => ({
      name,
      properties: extractProperties(schema, name, refMap),
    }));
}
