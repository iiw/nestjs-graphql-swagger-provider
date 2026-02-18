import type { OpenAPIV3_1 } from 'openapi-types';
import type { ParsedSchema } from './types.js';
import type { RefMap } from './ref-resolver.js';
import { extractSchema } from './schemas.js';

export function extractRequestBody(
  requestBody: OpenAPIV3_1.RequestBodyObject | OpenAPIV3_1.ReferenceObject | undefined,
  name: string,
  refMap?: RefMap,
): ParsedSchema | undefined {
  if (!requestBody || '$ref' in requestBody) return undefined;

  const jsonContent = requestBody.content?.['application/json'];
  if (!jsonContent?.schema) return undefined;

  const schema = jsonContent.schema as OpenAPIV3_1.SchemaObject;
  return extractSchema(schema, name, refMap);
}
