import type { OpenAPIV3_1 } from 'openapi-types';
import type { ParsedProperty, SchemaNode } from './types.js';
import type { AnnotatedSchema } from './schema-resolver.js';
import { walkSchema } from './schema-walker.js';
import { lowerPropertyNode, type LoweringRegistry } from './schema-lowering.js';

/**
 * Extract properties from an OpenAPI schema, handling allOf/oneOf/anyOf
 * composition via the SchemaNode walker + lowering pipeline.
 *
 * The `schemaRegistry` parameter replaces the old `RefMap` — it holds the
 * annotated component schemas so the walker can resolve $ref names.
 */
export function extractProperties(
  schema: OpenAPIV3_1.SchemaObject,
  parentName?: string,
  schemaRegistry?: Map<string, AnnotatedSchema>,
): ParsedProperty[] {
  // Build a lowering registry from the annotated schema registry
  const loweringSchemas = new Map<string, SchemaNode>();
  if (schemaRegistry) {
    for (const [name, annotated] of schemaRegistry) {
      loweringSchemas.set(
        name,
        walkSchema(annotated, { visited: new WeakSet(), definingName: name }),
      );
    }
  }
  const registry: LoweringRegistry = { schemas: loweringSchemas };

  // Walk the schema into a SchemaNode
  const node = walkSchema(schema, {
    visited: new WeakSet(),
    definingName: parentName,
  });

  // Lower to flat properties
  return lowerNodeToProperties(node, registry, parentName);
}

function lowerNodeToProperties(
  node: SchemaNode,
  registry: LoweringRegistry,
  parentName?: string,
): ParsedProperty[] {
  switch (node.kind) {
    case 'object':
      return node.properties.map((p) => lowerPropertyNode(p, registry, parentName));

    case 'intersection': {
      // Merge all member properties (same as old flattenAllOf)
      const allProps: ParsedProperty[] = [];
      const seen = new Set<string>();
      for (const member of node.members) {
        const memberProps = lowerNodeToProperties(member, registry, parentName);
        for (const prop of memberProps) {
          if (!seen.has(prop.name)) {
            seen.add(prop.name);
            allProps.push(prop);
          } else {
            // Later members override earlier ones (matching old behavior)
            const idx = allProps.findIndex((p) => p.name === prop.name);
            if (idx !== -1) allProps[idx] = prop;
          }
        }
      }
      return allProps;
    }

    case 'union': {
      // Merge variant properties, required only if required in all variants
      const propMap = new Map<string, ParsedProperty>();
      const requiredSets: Set<string>[] = [];

      for (const member of node.members) {
        const memberProps = lowerNodeToProperties(member, registry, parentName);
        const requiredInVariant = new Set<string>();
        for (const prop of memberProps) {
          if (prop.required) requiredInVariant.add(prop.name);
          propMap.set(prop.name, { ...prop });
        }
        if (memberProps.length > 0) {
          requiredSets.push(requiredInVariant);
        }
      }

      for (const prop of propMap.values()) {
        if (requiredSets.length > 0) {
          prop.required = requiredSets.every((s) => s.has(prop.name));
        } else {
          prop.required = false;
        }
      }

      return Array.from(propMap.values());
    }

    case 'ref': {
      // Resolve the ref and lower
      const resolved = registry.schemas.get(node.refName);
      if (resolved) {
        return lowerNodeToProperties(resolved, registry, parentName);
      }
      return [];
    }

    default:
      return [];
  }
}
