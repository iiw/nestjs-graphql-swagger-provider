import type { OpenAPIV3_1 } from 'openapi-types';
import type { ParsedErrorResponse, ParsedSchema } from './types.js';
import type { RefMap } from './ref-resolver.js';
import { extractSchema } from './schemas.js';

export function extractResponseSchema(
  responses: OpenAPIV3_1.ResponsesObject | undefined,
  name: string,
  refMap?: RefMap,
): ParsedSchema | undefined {
  if (!responses) return undefined;

  const successResponse = (responses['200'] ?? responses['201']) as
    | OpenAPIV3_1.ResponseObject
    | undefined;
  if (!successResponse) return undefined;

  const jsonContent = successResponse.content?.['application/json'];
  if (!jsonContent?.schema) return undefined;

  const schema = jsonContent.schema as OpenAPIV3_1.SchemaObject;
  return extractSchema(schema, name, refMap);
}

export function extractErrorResponses(
  responses: OpenAPIV3_1.ResponsesObject | undefined,
): ParsedErrorResponse[] {
  if (!responses) return [];

  const errors: ParsedErrorResponse[] = [];

  for (const [statusCode, response] of Object.entries(responses)) {
    const code = parseInt(statusCode, 10);
    if (isNaN(code) || code < 400) continue;

    const resp = response as OpenAPIV3_1.ResponseObject;
    const errorResp: ParsedErrorResponse = {
      statusCode: code,
      description: resp.description ?? `Error ${code}`,
    };

    const jsonContent = resp.content?.['application/json'];
    if (jsonContent?.schema) {
      const schema = jsonContent.schema as OpenAPIV3_1.SchemaObject;
      errorResp.schema = extractSchema(schema, `Error${code}`);
    }

    errors.push(errorResp);
  }

  return errors;
}
