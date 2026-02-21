import type { OpenAPIV3_1 } from 'openapi-types';
import type { ParsedSchema } from './types.js';
import type { AnnotatedSchema } from './schema-resolver.js';
import { extractSchema } from './schemas.js';

export function extractRequestBody(
  requestBody: OpenAPIV3_1.RequestBodyObject | OpenAPIV3_1.ReferenceObject | undefined,
  name: string,
  schemaRegistry?: Map<string, AnnotatedSchema>,
): ParsedSchema | undefined {
  if (!requestBody || '$ref' in requestBody) return undefined;

  // Prefer application/json, fall back to first content-type with a schema
  const content = requestBody.content;
  if (!content) return undefined;

  const mediaType =
    content['application/json'] ??
    Object.values(content).find((mt) => mt?.schema);
  if (!mediaType?.schema) return undefined;

  const schema = mediaType.schema as OpenAPIV3_1.SchemaObject;
  return extractSchema(schema, name, schemaRegistry);
}
