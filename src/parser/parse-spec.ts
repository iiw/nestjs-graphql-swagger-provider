import SwaggerParser from '@apidevtools/swagger-parser';
import type { OpenAPIV3_1 } from 'openapi-types';
import type { ParsedController, ParsedEndpoint, ParsedSpec } from './types.js';
import { collectInlineEnums, extractGlobalEnums } from './enums.js';
import { extractParameters } from './parameters.js';
import { extractRequestBody } from './request-body.js';
import { buildRefMap } from './ref-resolver.js';
import { extractErrorResponses, extractResponseSchema } from './responses.js';
import { extractGlobalSchemas, schemaToName } from './schemas.js';

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete'] as const;

export async function parseSpec(spec: Record<string, unknown>): Promise<ParsedSpec> {
  const refMap = buildRefMap(spec);

  const api = (await SwaggerParser.dereference(
    structuredClone(spec) as OpenAPIV3_1.Document,
  )) as OpenAPIV3_1.Document;

  const componentSchemas =
    (api.components?.schemas as Record<string, OpenAPIV3_1.SchemaObject>) ?? undefined;

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

        const responseName =
          refMap.operationSchemas.get(`${operationId}:response`) ??
          schemaToName(path, method, 'Response');
        const requestBodyName =
          refMap.operationSchemas.get(`${operationId}:requestBody`) ??
          schemaToName(path, method, 'Input');

        const endpoint: ParsedEndpoint = {
          path,
          method,
          operationId,
          summary: operation.summary,
          parameters: extractParameters(operation.parameters, operationId, refMap),
          requestBody: extractRequestBody(
            operation.requestBody as OpenAPIV3_1.RequestBodyObject | undefined,
            requestBodyName,
            refMap,
          ),
          responseSchema: extractResponseSchema(
            operation.responses,
            responseName,
            refMap,
          ),
          errorResponses: extractErrorResponses(operation.responses),
        };

        // Set extends from allOf inheritance
        if (endpoint.responseSchema) {
          const parent = refMap.schemaInheritance.get(endpoint.responseSchema.name);
          if (parent) endpoint.responseSchema.extends = parent;
        }
        if (endpoint.requestBody) {
          const parent = refMap.schemaInheritance.get(endpoint.requestBody.name);
          if (parent) endpoint.requestBody.extends = parent;
        }

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

  const schemas = extractGlobalSchemas(componentSchemas, refMap);

  // Set extends from allOf inheritance on global schemas
  for (const schema of schemas) {
    const parent = refMap.schemaInheritance.get(schema.name);
    if (parent) schema.extends = parent;
  }

  // Collect enums: global (named in components/schemas) + inline
  const globalEnums = extractGlobalEnums(componentSchemas);
  const globalEnumNames = new Set(globalEnums.map((e) => e.name));
  const inlineEnums = collectInlineEnums(controllers, schemas, globalEnumNames);
  const enums = [...globalEnums, ...inlineEnums];

  return { controllers, schemas, enums };
}
