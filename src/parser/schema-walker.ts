import type { OpenAPIV3_1 } from 'openapi-types';
import type {
  SchemaNode,
  PropertyNode,
  DiscriminatorNode,
} from './types.js';
import { REF_NAME_SYMBOL, type AnnotatedSchema } from './schema-resolver.js';

export interface WalkContext {
  /** Cycle detection — tracks schemas currently being walked */
  visited: WeakSet<object>;
  /** The schema name currently being defined (to avoid self-ref) */
  definingName?: string;
}

/**
 * Walk an OpenAPI schema (after dereferencing + Symbol annotation) and
 * produce a SchemaNode IR tree.
 */
export function walkSchema(
  schema: OpenAPIV3_1.SchemaObject | undefined,
  ctx: WalkContext = { visited: new WeakSet() },
): SchemaNode {
  if (!schema) {
    return { kind: 'object', properties: [] };
  }

  // ── $ref check (Symbol annotation) ──
  const refName = (schema as AnnotatedSchema)[REF_NAME_SYMBOL];
  if (refName && refName !== ctx.definingName) {
    return { kind: 'ref', refName };
  }

  // ── Cycle detection ──
  if (ctx.visited.has(schema)) {
    // If we already have a refName, return as ref to break the cycle
    if (refName) return { kind: 'ref', refName };
    return { kind: 'object', properties: [] };
  }
  ctx.visited.add(schema);

  // ── allOf → intersection ──
  if (schema.allOf && Array.isArray(schema.allOf)) {
    const members = (schema.allOf as OpenAPIV3_1.SchemaObject[]).map((entry) =>
      walkSchema(entry, { ...ctx, visited: ctx.visited }),
    );
    return { kind: 'intersection', members };
  }

  // ── oneOf → union ──
  if (schema.oneOf && Array.isArray(schema.oneOf)) {
    const members = (schema.oneOf as OpenAPIV3_1.SchemaObject[]).map((entry) =>
      walkSchema(entry, { ...ctx, visited: ctx.visited }),
    );
    const discriminator = extractDiscriminator(schema);
    return { kind: 'union', variant: 'oneOf', members, ...(discriminator ? { discriminator } : {}) };
  }

  // ── anyOf → union ──
  if (schema.anyOf && Array.isArray(schema.anyOf)) {
    const members = (schema.anyOf as OpenAPIV3_1.SchemaObject[]).map((entry) =>
      walkSchema(entry, { ...ctx, visited: ctx.visited }),
    );
    const discriminator = extractDiscriminator(schema);
    return { kind: 'union', variant: 'anyOf', members, ...(discriminator ? { discriminator } : {}) };
  }

  // ── enum ──
  if (schema.enum) {
    const enumType = inferEnumType(schema);
    return {
      kind: 'enum',
      values: schema.enum as (string | number)[],
      enumType,
      ...(refName ? { enumName: refName } : {}),
    };
  }

  // ── array ──
  if (schema.type === 'array') {
    const items = schema.items as OpenAPIV3_1.SchemaObject | undefined;
    return {
      kind: 'array',
      items: walkSchema(items, { ...ctx, visited: ctx.visited }),
    };
  }

  // ── object (or has properties) ──
  if (schema.type === 'object' || schema.properties) {
    const properties = extractPropertyNodes(schema, ctx);
    const additionalProperties = walkAdditionalProperties(schema, ctx);

    // If no own properties but has additionalProperties, it's a map
    if (
      properties.length === 0 &&
      additionalProperties !== undefined &&
      additionalProperties !== false
    ) {
      if (additionalProperties === true) {
        return { kind: 'map', valueSchema: { kind: 'object', properties: [] } };
      }
      return { kind: 'map', valueSchema: additionalProperties };
    }

    return {
      kind: 'object',
      properties,
      ...(additionalProperties !== undefined ? { additionalProperties } : {}),
    };
  }

  // ── primitive ──
  const primitiveType = mapPrimitiveType(schema.type as string);
  if (primitiveType) {
    return { kind: 'primitive', type: primitiveType };
  }

  // Fallback: unknown → object
  return { kind: 'object', properties: [] };
}

// ── Helpers ────────────────────────────────────────────────────────

function extractPropertyNodes(
  schema: OpenAPIV3_1.SchemaObject,
  ctx: WalkContext,
): PropertyNode[] {
  if (!schema.properties) return [];

  const requiredSet = new Set(schema.required ?? []);

  return Object.entries(schema.properties).map(([name, propSchema]) => {
    const prop = propSchema as OpenAPIV3_1.SchemaObject;
    return {
      name,
      schema: walkSchema(prop, { ...ctx, visited: ctx.visited }),
      required: requiredSet.has(name),
      nullable: isNullable(prop),
      ...(prop.readOnly ? { readOnly: true } : {}),
      ...(prop.writeOnly ? { writeOnly: true } : {}),
      ...(prop.description ? { description: prop.description } : {}),
      ...(prop.deprecated ? { deprecated: true } : {}),
    };
  });
}

function walkAdditionalProperties(
  schema: OpenAPIV3_1.SchemaObject,
  ctx: WalkContext,
): SchemaNode | boolean | undefined {
  const ap = schema.additionalProperties;
  if (ap === undefined) return undefined;
  if (ap === true || ap === false) return ap;
  return walkSchema(ap as OpenAPIV3_1.SchemaObject, { ...ctx, visited: ctx.visited });
}

function extractDiscriminator(
  schema: OpenAPIV3_1.SchemaObject,
): DiscriminatorNode | undefined {
  const disc = (schema as Record<string, unknown>).discriminator as
    | { propertyName: string; mapping?: Record<string, string> }
    | undefined;
  if (!disc?.propertyName) return undefined;
  return {
    propertyName: disc.propertyName,
    ...(disc.mapping ? { mapping: disc.mapping } : {}),
  };
}

function isNullable(schema: OpenAPIV3_1.SchemaObject): boolean {
  if ((schema as unknown as Record<string, unknown>).nullable === true) return true;
  if (Array.isArray(schema.type) && (schema.type as string[]).includes('null')) return true;
  return false;
}

function inferEnumType(schema: OpenAPIV3_1.SchemaObject): 'string' | 'integer' {
  if (schema.type === 'integer' || schema.type === 'number') return 'integer';
  return 'string';
}

function mapPrimitiveType(
  type: string | undefined,
): 'string' | 'number' | 'integer' | 'boolean' | undefined {
  switch (type) {
    case 'string':
      return 'string';
    case 'number':
      return 'number';
    case 'integer':
      return 'integer';
    case 'boolean':
      return 'boolean';
    default:
      return undefined;
  }
}
