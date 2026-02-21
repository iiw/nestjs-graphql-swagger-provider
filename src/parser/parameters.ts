import type { OpenAPIV3_1 } from 'openapi-types';
import type { ParsedParameter } from './types.js';
import { getRefName } from './schema-resolver.js';
import { extractEnumValues, mapOpenApiType } from './type-mapping.js';
import { deriveEnumName } from './enums.js';

export function extractParameters(
  params: (OpenAPIV3_1.ParameterObject | OpenAPIV3_1.ReferenceObject)[] | undefined,
  operationId: string,
  _schemaRegistry?: Map<string, unknown>,
): ParsedParameter[] {
  if (!params) return [];

  return params
    .filter((p): p is OpenAPIV3_1.ParameterObject => !('$ref' in p))
    .filter((p) => p.in === 'path' || p.in === 'query')
    .map((p) => {
      const schema = p.schema as OpenAPIV3_1.SchemaObject | undefined;
      const mapped = schema ? mapOpenApiType(schema) : { type: 'string', isArray: false };

      const parsedParam: ParsedParameter = {
        name: p.name,
        location: p.in as 'path' | 'query',
        type: mapped.type,
        required: p.required === true,
        isArray: mapped.isArray,
        ...(p.description ? { description: p.description } : {}),
        ...(p.deprecated ? { deprecated: true } : {}),
      };

      const enumValues = schema ? extractEnumValues(schema, mapped.isArray) : undefined;

      if (mapped.type === 'enum' && enumValues) {
        parsedParam.enumValues = enumValues;

        // Try Symbol-annotated $ref name first, fall back to derived name
        const refName = schema ? getRefName(schema) : undefined;
        // For array params, check items for ref name
        const itemsRefName =
          schema?.type === 'array' && schema.items
            ? getRefName(schema.items)
            : undefined;

        if (refName) {
          parsedParam.enumName = refName;
        } else if (itemsRefName) {
          parsedParam.enumName = itemsRefName;
        } else {
          parsedParam.enumName = deriveEnumName(operationId, p.name);
        }
      }

      return parsedParam;
    });
}
