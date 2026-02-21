import type { OpenAPIV3_1 } from 'openapi-types';
import type { ParsedErrorResponse, ParsedSchema } from './types.js';
import type { AnnotatedSchema } from './schema-resolver.js';
import { extractSchema } from './schemas.js';

const SUCCESS_CODES = ['200', '201', '202', '204'];

export function extractResponseSchema(
  responses: OpenAPIV3_1.ResponsesObject | undefined,
  name: string,
  schemaRegistry?: Map<string, AnnotatedSchema>,
): ParsedSchema | undefined {
  if (!responses) return undefined;

  for (const code of SUCCESS_CODES) {
    const successResponse = responses[code] as OpenAPIV3_1.ResponseObject | undefined;
    if (!successResponse) continue;

    const jsonContent = successResponse.content?.['application/json'];
    if (!jsonContent?.schema) continue;

    const schema = jsonContent.schema as OpenAPIV3_1.SchemaObject;
    return extractSchema(schema, name, schemaRegistry);
  }

  return undefined;
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
