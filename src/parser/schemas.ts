import type { OpenAPIV3_1 } from 'openapi-types';
import type { ParsedSchema } from './types.js';
import type { AnnotatedSchema } from './schema-resolver.js';
import { extractProperties } from './properties.js';
import { toPascalCase } from '../utils.js';
import { walkSchema } from './schema-walker.js';
import { lowerSchemaToFlat, type LoweringRegistry } from './schema-lowering.js';

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
  schemaRegistry?: Map<string, AnnotatedSchema>,
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
      const result: ParsedSchema = {
        name,
        properties: extractProperties(items, name, schemaRegistry),
      };
      applyCompositionMetadata(result, items, schemaRegistry);
      return result;
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

  const result: ParsedSchema = {
    name,
    properties: extractProperties(schema, name, schemaRegistry),
  };
  applyCompositionMetadata(result, schema, schemaRegistry);
  return result;
}

/**
 * Use walker+lowering to compute `extends`, `unionMembers`, and `discriminator`
 * from schema composition (allOf/oneOf/anyOf).
 */
function applyCompositionMetadata(
  result: ParsedSchema,
  schema: OpenAPIV3_1.SchemaObject,
  schemaRegistry?: Map<string, AnnotatedSchema>,
): void {
  if (!schema.allOf && !schema.oneOf && !schema.anyOf) return;

  const loweringSchemas = buildLoweringSchemas(schemaRegistry);
  const registry: LoweringRegistry = { schemas: loweringSchemas };
  const node = walkSchema(schema, { visited: new WeakSet(), definingName: result.name });
  const flat = lowerSchemaToFlat(result.name, node, registry);

  if (flat.extends) result.extends = flat.extends;
  if (flat.unionMembers) result.unionMembers = flat.unionMembers;
  if (flat.discriminator) result.discriminator = flat.discriminator;
}

function buildLoweringSchemas(
  schemaRegistry?: Map<string, AnnotatedSchema>,
): Map<string, import('./types.js').SchemaNode> {
  const loweringSchemas = new Map<string, import('./types.js').SchemaNode>();
  if (schemaRegistry) {
    for (const [name, annotated] of schemaRegistry) {
      loweringSchemas.set(
        name,
        walkSchema(annotated, { visited: new WeakSet(), definingName: name }),
      );
    }
  }
  return loweringSchemas;
}

export function extractGlobalSchemas(
  schemas: Record<string, OpenAPIV3_1.SchemaObject> | undefined,
  schemaRegistry?: Map<string, AnnotatedSchema>,
): ParsedSchema[] {
  if (!schemas) return [];

  // Build a lowering registry for allOf inheritance resolution
  const loweringSchemas = new Map<string, import('./types.js').SchemaNode>();
  for (const [name, schema] of Object.entries(schemas)) {
    loweringSchemas.set(
      name,
      walkSchema(schema, { visited: new WeakSet(), definingName: name }),
    );
  }
  const registry: LoweringRegistry = { schemas: loweringSchemas };

  return Object.entries(schemas)
    .filter(([, schema]) => schema.type === 'object' || schema.properties || schema.allOf || schema.oneOf || schema.anyOf)
    .map(([name, schema]) => {
      const node = walkSchema(schema, { visited: new WeakSet(), definingName: name });
      const flat = lowerSchemaToFlat(name, node, registry);

      // Also populate properties via the extractProperties path for full backward-compat
      // (enum names, nested objects, etc.)
      const properties = extractProperties(schema, name, schemaRegistry);

      return {
        name,
        properties,
        extends: flat.extends,
        schemaNode: flat.schemaNode,
        unionMembers: flat.unionMembers,
        discriminator: flat.discriminator,
      };
    });
}
