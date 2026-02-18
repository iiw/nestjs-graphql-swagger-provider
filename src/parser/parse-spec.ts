import SwaggerParser from '@apidevtools/swagger-parser';
import type { OpenAPIV3_1 } from 'openapi-types';
import type { ParsedController, ParsedEndpoint, ParsedSpec } from './types.js';
import { buildNamedEnumLookup, collectInlineEnums, extractGlobalEnums } from './enums.js';
import { extractParameters } from './parameters.js';
import { extractRequestBody } from './request-body.js';
import { extractErrorResponses, extractResponseSchema } from './responses.js';
import { extractGlobalSchemas, schemaToName } from './schemas.js';

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete'] as const;

export async function parseSpec(input: string): Promise<ParsedSpec> {
  const api = (await SwaggerParser.dereference(input)) as OpenAPIV3_1.Document;

  const componentSchemas =
    (api.components?.schemas as Record<string, OpenAPIV3_1.SchemaObject>) ?? undefined;

  // Build a lookup from serialized enum values → named schema name
  const namedEnumLookup = buildNamedEnumLookup(componentSchemas);

  const controllerMap = new Map<string, ParsedEndpoint[]>();

  if (api.paths) {
    for (const [path, pathItem] of Object.entries(api.paths)) {
      if (!pathItem) continue;

      for (const method of HTTP_METHODS) {
        const operation = pathItem[method] as OpenAPIV3_1.OperationObject | undefined;
        if (!operation) continue;

        const tag = operation.tags?.[0] ?? 'Default';
        const operationId =
          operation.operationId ?? `${method}${path.replace(/[/{}]/g, '_')}`;

        const endpoint: ParsedEndpoint = {
          path,
          method,
          operationId,
          summary: operation.summary,
          parameters: extractParameters(operation.parameters, operationId, namedEnumLookup),
          requestBody: extractRequestBody(
            operation.requestBody as OpenAPIV3_1.RequestBodyObject | undefined,
            schemaToName(path, method, 'Input'),
            namedEnumLookup,
          ),
          responseSchema: extractResponseSchema(
            operation.responses,
            schemaToName(path, method, 'Response'),
            namedEnumLookup,
          ),
          errorResponses: extractErrorResponses(operation.responses),
        };

        if (!controllerMap.has(tag)) {
          controllerMap.set(tag, []);
        }
        controllerMap.get(tag)!.push(endpoint);
      }
    }
  }

  const controllers: ParsedController[] = Array.from(controllerMap.entries()).map(
    ([name, endpoints]) => ({
      name,
      endpoints,
    }),
  );

  const schemas = extractGlobalSchemas(componentSchemas, namedEnumLookup);

  // Collect enums: global (named in components/schemas) + inline
  const globalEnums = extractGlobalEnums(componentSchemas);
  const globalEnumNames = new Set(globalEnums.map((e) => e.name));
  const inlineEnums = collectInlineEnums(controllers, schemas, globalEnumNames);
  const enums = [...globalEnums, ...inlineEnums];

  return { controllers, schemas, enums };
}
