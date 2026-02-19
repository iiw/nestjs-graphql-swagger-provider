import type { OpenAPIV3_1 } from 'openapi-types';
import type { ParsedParameter } from './types.js';
import type { RefMap } from './ref-resolver.js';
import { extractEnumValues, mapOpenApiType } from './type-mapping.js';
import { deriveEnumName } from './enums.js';

export function extractParameters(
  params: (OpenAPIV3_1.ParameterObject | OpenAPIV3_1.ReferenceObject)[] | undefined,
  operationId: string,
  refMap?: RefMap,
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
      };

      const enumValues = schema ? extractEnumValues(schema, mapped.isArray) : undefined;

      if (mapped.type === 'enum' && enumValues) {
        parsedParam.enumValues = enumValues;

        // Try $ref-based name first, fall back to derived name
        const refName = refMap?.parameterSchemas.get(operationId)?.get(p.name);
        if (refName) {
          parsedParam.enumName = refName;
        } else {
          parsedParam.enumName = deriveEnumName(operationId, p.name);
        }
      }

      return parsedParam;
    });
}
