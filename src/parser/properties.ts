import type { OpenAPIV3_1 } from 'openapi-types';
import type { ParsedProperty } from './types.js';
import type { RefMap } from './ref-resolver.js';
import { extractEnumValues, mapOpenApiType } from './type-mapping.js';
import { deriveEnumName } from './enums.js';

/** Merge allOf entries into a single flat schema with combined properties and required. */
export function flattenAllOf(schema: OpenAPIV3_1.SchemaObject): OpenAPIV3_1.SchemaObject {
  if (!schema.allOf || !Array.isArray(schema.allOf)) return schema;

  const mergedProperties: Record<string, OpenAPIV3_1.SchemaObject> = {};
  const mergedRequired: string[] = [];

  for (const entry of schema.allOf as OpenAPIV3_1.SchemaObject[]) {
    if (entry.properties) {
      Object.assign(mergedProperties, entry.properties);
    }
    if (entry.required) {
      mergedRequired.push(...entry.required);
    }
    // Recurse for nested allOf
    if (entry.allOf) {
      const nested = flattenAllOf(entry);
      if (nested.properties) {
        Object.assign(mergedProperties, nested.properties);
      }
      if (nested.required) {
        mergedRequired.push(...nested.required);
      }
    }
  }

  return {
    ...schema,
    type: 'object',
    properties: mergedProperties,
    required: mergedRequired.length > 0 ? mergedRequired : undefined,
  };
}

export function extractProperties(
  schema: OpenAPIV3_1.SchemaObject,
  parentName?: string,
  refMap?: RefMap,
): ParsedProperty[] {
  // Flatten allOf if present
  const resolved = schema.allOf ? flattenAllOf(schema) : schema;

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
