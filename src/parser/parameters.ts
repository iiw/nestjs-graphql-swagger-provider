import type { OpenAPIV3_1 } from 'openapi-types';
import type { ParsedParameter } from './types.js';
import { mapOpenApiType } from './type-mapping.js';
import { deriveEnumName } from './enums.js';

export function extractParameters(
  params: (OpenAPIV3_1.ParameterObject | OpenAPIV3_1.ReferenceObject)[] | undefined,
  operationId: string,
  namedEnumLookup?: Map<string, string>,
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

      if (mapped.type === 'enum' && schema?.enum) {
        parsedParam.enumValues = schema.enum as (string | number)[];
        const enumKey = JSON.stringify(schema.enum);
        if (namedEnumLookup?.has(enumKey)) {
          parsedParam.enumName = namedEnumLookup.get(enumKey)!;
        } else {
          parsedParam.enumName = deriveEnumName(operationId, p.name);
        }
      }

      return parsedParam;
    });
}
