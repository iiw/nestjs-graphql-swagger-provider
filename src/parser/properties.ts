import type { OpenAPIV3_1 } from 'openapi-types';
import type { ParsedProperty } from './types.js';
import type { RefMap } from './ref-resolver.js';
import { extractEnumValues, mapOpenApiType } from './type-mapping.js';
import { deriveEnumName } from './enums.js';

/** Merge allOf entries into a single flat schema with combined properties and required. */
export function flattenAllOf(
  schema: OpenAPIV3_1.SchemaObject,
  visited: WeakSet<object> = new WeakSet(),
): OpenAPIV3_1.SchemaObject {
  if (!schema.allOf || !Array.isArray(schema.allOf)) return schema;
  if (visited.has(schema)) return schema;
  visited.add(schema);

  const mergedProperties: Record<string, OpenAPIV3_1.SchemaObject> = {};
  const mergedRequired: string[] = [];

  for (const entry of schema.allOf as OpenAPIV3_1.SchemaObject[]) {
    let resolved = entry;

    // Recurse for nested allOf
    if (resolved.allOf) {
      resolved = flattenAllOf(resolved, visited);
    }
    // Recurse for nested oneOf/anyOf
    if (resolved.oneOf || resolved.anyOf) {
      resolved = flattenOneOf(resolved, visited);
    }

    if (resolved.properties) {
      Object.assign(mergedProperties, resolved.properties);
    }
    if (resolved.required) {
      mergedRequired.push(...resolved.required);
    }
  }

  return {
    ...schema,
    type: 'object',
    properties: mergedProperties,
    required: mergedRequired.length > 0 ? mergedRequired : undefined,
  };
}

/** Merge oneOf/anyOf variants into a single flat schema. A property is required only if required in every variant. */
export function flattenOneOf(
  schema: OpenAPIV3_1.SchemaObject,
  visited: WeakSet<object> = new WeakSet(),
): OpenAPIV3_1.SchemaObject {
  const variants = (schema.oneOf ?? schema.anyOf) as OpenAPIV3_1.SchemaObject[] | undefined;
  if (!variants || !Array.isArray(variants)) return schema;
  if (visited.has(schema)) return schema;
  visited.add(schema);

  const mergedProperties: Record<string, OpenAPIV3_1.SchemaObject> = {
    ...(schema.properties as Record<string, OpenAPIV3_1.SchemaObject> | undefined),
  };
  const topLevelRequired = new Set(schema.required ?? []);

  // Track which properties are required in every object variant
  const variantRequiredSets: Set<string>[] = [];

  for (const variant of variants) {
    let resolved = variant;

    if (resolved.allOf) {
      resolved = flattenAllOf(resolved, visited);
    }
    if (resolved.oneOf || resolved.anyOf) {
      resolved = flattenOneOf(resolved, visited);
    }

    // Skip variants with no properties (primitive-only)
    if (!resolved.properties) continue;

    Object.assign(mergedProperties, resolved.properties);
    variantRequiredSets.push(new Set(resolved.required ?? []));
  }

  // A variant-only property is required only if it's required in every object variant
  const variantRequired: string[] = [];
  if (variantRequiredSets.length > 0) {
    for (const propName of Object.keys(mergedProperties)) {
      if (topLevelRequired.has(propName)) continue; // handled separately
      if (variantRequiredSets.every((s) => s.has(propName))) {
        variantRequired.push(propName);
      }
    }
  }

  const allRequired = [...topLevelRequired, ...variantRequired];

  return {
    ...schema,
    oneOf: undefined,
    anyOf: undefined,
    type: 'object',
    properties: mergedProperties,
    required: allRequired.length > 0 ? allRequired : undefined,
  };
}

export function extractProperties(
  schema: OpenAPIV3_1.SchemaObject,
  parentName?: string,
  refMap?: RefMap,
): ParsedProperty[] {
  const visited = new WeakSet<object>();
  let resolved = schema;

  if (resolved.allOf) {
    resolved = flattenAllOf(resolved, visited);
  }
  if (resolved.oneOf || resolved.anyOf) {
    resolved = flattenOneOf(resolved, visited);
  }

  if (!resolved.properties) return [];

  const requiredSet = new Set(resolved.required ?? []);

  return Object.entries(resolved.properties).map(([name, propSchema]) => {
    const prop = propSchema as OpenAPIV3_1.SchemaObject;
    const mapped = mapOpenApiType(prop);

    const parsedProp: ParsedProperty = {
      name,
      type: mapped.type,
      isArray: mapped.isArray,
      required: requiredSet.has(name),
      nullable:
        (prop as unknown as Record<string, unknown>).nullable === true ||
        (Array.isArray(prop.type) && (prop.type as string[]).includes('null')),
    };

    const enumValues = extractEnumValues(prop, mapped.isArray);

    if (mapped.type === 'enum' && enumValues) {
      parsedProp.enumValues = enumValues;

      // Try $ref-based name first, fall back to derived name
      const refName = refMap?.schemaProperties.get(parentName ?? '')?.get(name);
      if (refName) {
        parsedProp.enumName = refName;
      } else if (parentName) {
        parsedProp.enumName = deriveEnumName(parentName, name);
      }
    }

    if (mapped.type === 'object' && prop.properties) {
      parsedProp.properties = extractProperties(prop, parentName, refMap);
    }

    return parsedProp;
  });
}
