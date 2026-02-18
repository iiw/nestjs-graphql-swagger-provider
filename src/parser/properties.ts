import type { OpenAPIV3_1 } from 'openapi-types';
import type { ParsedProperty } from './types.js';
import type { RefMap } from './ref-resolver.js';
import { mapOpenApiType } from './type-mapping.js';
import { deriveEnumName } from './enums.js';

export function extractProperties(
  schema: OpenAPIV3_1.SchemaObject,
  parentName?: string,
  refMap?: RefMap,
): ParsedProperty[] {
  if (!schema.properties) return [];

  const requiredSet = new Set(schema.required ?? []);

  return Object.entries(schema.properties).map(([name, propSchema]) => {
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

    // Get enum values — handle array-of-enum case where values are on items
    const enumValues = mapped.isArray
      ? (((prop as unknown as Record<string, unknown>).items as OpenAPIV3_1.SchemaObject | undefined)?.enum as
          | (string | number)[]
          | undefined)
      : (prop.enum as (string | number)[] | undefined);

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
