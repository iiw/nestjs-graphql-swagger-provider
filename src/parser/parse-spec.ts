import type { OpenAPIV3_1 } from 'openapi-types';
import type { ParsedController, ParsedEndpoint, ParsedSpec, SchemaNode } from './types.js';
import { collectInlineEnums, extractGlobalEnums } from './enums.js';
import { extractParameters } from './parameters.js';
import { extractRequestBody } from './request-body.js';
import { resolveDocument, getRefName } from './schema-resolver.js';
import { extractErrorResponses, extractResponseSchema } from './responses.js';
import { extractGlobalSchemas, schemaToName } from './schemas.js';
import { walkSchema } from './schema-walker.js';

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete'] as const;

export async function parseSpec(spec: Record<string, unknown>): Promise<ParsedSpec> {
  const { document: api, schemaRegistry } = await resolveDocument(spec);

  const componentSchemas =
    (api.components?.schemas as Record<string, OpenAPIV3_1.SchemaObject>) ?? undefined;

  // Build SchemaNode registry for lowering (walker needs this for ref resolution)
  const schemaNodeRegistry = new Map<string, SchemaNode>();
  if (componentSchemas) {
    for (const [name, schema] of Object.entries(componentSchemas)) {
      const node = walkSchema(schema, { visited: new WeakSet(), definingName: name });
      schemaNodeRegistry.set(name, node);
    }
  }

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

        // Derive schema names: use $ref name only when the spec has an explicit
        // operationId (matching old refMap behavior which skipped unnamed operations)
        const hasExplicitOperationId = !!operation.operationId;
        const responseName = hasExplicitOperationId
          ? getResponseSchemaName(operation, path, method)
          : schemaToName(path, method, 'Response');
        const requestBodyName = hasExplicitOperationId
          ? getRequestBodySchemaName(operation, path, method)
          : schemaToName(path, method, 'Input');

        const endpoint: ParsedEndpoint = {
          path,
          method,
          operationId,
          summary: operation.summary,
          parameters: extractParameters(operation.parameters, operationId, schemaRegistry),
          requestBody: extractRequestBody(
            operation.requestBody as OpenAPIV3_1.RequestBodyObject | undefined,
            requestBodyName,
            schemaRegistry,
          ),
          responseSchema: extractResponseSchema(
            operation.responses,
            responseName,
            schemaRegistry,
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

  const schemas = extractGlobalSchemas(componentSchemas, schemaRegistry);

  // Collect enums: global (named in components/schemas) + inline
  const globalEnums = extractGlobalEnums(componentSchemas);
  const globalEnumNames = new Set(globalEnums.map((e) => e.name));
  const inlineEnums = collectInlineEnums(controllers, schemas, globalEnumNames);
  const enums = [...globalEnums, ...inlineEnums];

  // Build named schemas map for forward-compat
  const namedSchemas = new Map<string, { name: string; schema: SchemaNode }>();
  for (const [name, node] of schemaNodeRegistry) {
    namedSchemas.set(name, { name, schema: node });
  }

  return { controllers, schemas, enums, namedSchemas };
}

// ── Helpers ────────────────────────────────────────────────────────

function getResponseSchemaName(
  operation: OpenAPIV3_1.OperationObject,
  path: string,
  method: string,
): string {
  if (operation.responses) {
    for (const code of ['200', '201', '202']) {
      const resp = operation.responses[code] as OpenAPIV3_1.ResponseObject | undefined;
      if (!resp) continue;
      const jsonContent = resp.content?.['application/json'];
      if (!jsonContent?.schema) continue;

      // Check for direct $ref name
      const name = getRefName(jsonContent.schema);
      if (name) return name;

      // Check for array items $ref name
      const schema = jsonContent.schema as OpenAPIV3_1.SchemaObject;
      if (schema.type === 'array' && schema.items) {
        const itemsName = getRefName(schema.items);
        if (itemsName) return itemsName;
      }
    }
  }
  return schemaToName(path, method, 'Response');
}

function getRequestBodySchemaName(
  operation: OpenAPIV3_1.OperationObject,
  path: string,
  method: string,
): string {
  if (operation.requestBody && !('$ref' in operation.requestBody)) {
    const jsonContent = operation.requestBody.content?.['application/json'];
    if (jsonContent?.schema) {
      const name = getRefName(jsonContent.schema);
      if (name) return name;
    }
  }
  return schemaToName(path, method, 'Input');
}
