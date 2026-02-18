import type { OpenAPIV3_1 } from 'openapi-types';
import type { ParsedProperty } from './types.js';
import { mapOpenApiType } from './type-mapping.js';
import { deriveEnumName } from './enums.js';

export function extractProperties(
  schema: OpenAPIV3_1.SchemaObject,
  parentName?: string,
  namedEnumLookup?: Map<string, string>,
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

    if (mapped.type === 'enum' && prop.enum) {
      parsedProp.enumValues = prop.enum as (string | number)[];

      // Try to find a named enum from the lookup (recovered from $ref names)
      const enumKey = JSON.stringify(prop.enum);
      if (namedEnumLookup?.has(enumKey)) {
        parsedProp.enumName = namedEnumLookup.get(enumKey)!;
      } else if (parentName) {
        parsedProp.enumName = deriveEnumName(parentName, name);
      }
    }

    if (mapped.type === 'object' && prop.properties) {
      parsedProp.properties = extractProperties(prop, parentName, namedEnumLookup);
    }

    return parsedProp;
  });
}
