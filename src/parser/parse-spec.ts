import SwaggerParser from '@apidevtools/swagger-parser';
import type { OpenAPIV3_1 } from 'openapi-types';
import type {
  ParsedController,
  ParsedEndpoint,
  ParsedErrorResponse,
  ParsedParameter,
  ParsedProperty,
  ParsedSchema,
  ParsedSpec,
} from './types.js';

const HTTP_METHODS = ['get', 'post', 'put', 'patch', 'delete'] as const;

function mapOpenApiType(schema: OpenAPIV3_1.SchemaObject): { type: string; isArray: boolean } {
  if (schema.type === 'array') {
    const items = schema.items as OpenAPIV3_1.SchemaObject | undefined;
    if (items) {
      const inner = mapOpenApiType(items);
      return { type: inner.type, isArray: true };
    }
    return { type: 'string', isArray: true };
  }

  switch (schema.type) {
    case 'integer':
    case 'number':
      return { type: 'number', isArray: false };
    case 'boolean':
      return { type: 'boolean', isArray: false };
    case 'string':
      if (schema.enum) {
        return { type: 'enum', isArray: false };
      }
      return { type: 'string', isArray: false };
    case 'object':
    default:
      return { type: 'object', isArray: false };
  }
}

function extractProperties(schema: OpenAPIV3_1.SchemaObject): ParsedProperty[] {
  if (!schema.properties) return [];

  const requiredSet = new Set(schema.required ?? []);

  return Object.entries(schema.properties).map(([name, propSchema]) => {
    const prop = propSchema as OpenAPIV3_1.SchemaObject;
    const mapped = mapOpenApiType(prop);

    const parsedProp: ParsedProperty = {
      name,
      type: mapped.type,
      isArray: mapped.isArray,
      required: requiredSet.has(name),
      nullable:
        (prop as unknown as Record<string, unknown>).nullable === true ||
        (Array.isArray(prop.type) && (prop.type as string[]).includes('null')),
    };

    if (mapped.type === 'enum' && prop.enum) {
      parsedProp.enumValues = prop.enum as string[];
    }

    if (mapped.type === 'object' && prop.properties) {
      parsedProp.properties = extractProperties(prop);
    }

    return parsedProp;
  });
}

function schemaToName(path: string, method: string, suffix: string): string {
  const parts = path
    .split('/')
    .filter(Boolean)
    .map((p) => p.replace(/[{}]/g, ''));
  const base = parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join('');
  const methodCap = method.charAt(0).toUpperCase() + method.slice(1);
  return `${methodCap}${base}${suffix}`;
}

function extractSchema(
  schema: OpenAPIV3_1.SchemaObject | undefined,
  name: string,
): ParsedSchema | undefined {
  if (!schema) return undefined;

  if (schema.type === 'array') {
    const items = schema.items as OpenAPIV3_1.SchemaObject | undefined;
    if (items) {
      return {
        name,
        properties: extractProperties(items),
      };
    }
  }

  return {
    name,
    properties: extractProperties(schema),
  };
}

function extractParameters(
  params: (OpenAPIV3_1.ParameterObject | OpenAPIV3_1.ReferenceObject)[] | undefined,
): ParsedParameter[] {
  if (!params) return [];

  return params
    .filter((p): p is OpenAPIV3_1.ParameterObject => !('$ref' in p))
    .filter((p) => p.in === 'path' || p.in === 'query')
    .map((p) => {
      const schema = p.schema as OpenAPIV3_1.SchemaObject | undefined;
      const mapped = schema ? mapOpenApiType(schema) : { type: 'string', isArray: false };

      return {
        name: p.name,
        location: p.in as 'path' | 'query',
        type: mapped.type,
        required: p.required === true,
        isArray: mapped.isArray,
      };
    });
}

function extractRequestBody(
  requestBody: OpenAPIV3_1.RequestBodyObject | OpenAPIV3_1.ReferenceObject | undefined,
  name: string,
): ParsedSchema | undefined {
  if (!requestBody || '$ref' in requestBody) return undefined;

  const jsonContent = requestBody.content?.['application/json'];
  if (!jsonContent?.schema) return undefined;

  const schema = jsonContent.schema as OpenAPIV3_1.SchemaObject;
  return extractSchema(schema, name);
}

function extractResponseSchema(
  responses: OpenAPIV3_1.ResponsesObject | undefined,
  name: string,
): ParsedSchema | undefined {
  if (!responses) return undefined;

  const successResponse = (responses['200'] ?? responses['201']) as
    | OpenAPIV3_1.ResponseObject
    | undefined;
  if (!successResponse) return undefined;

  const jsonContent = successResponse.content?.['application/json'];
  if (!jsonContent?.schema) return undefined;

  const schema = jsonContent.schema as OpenAPIV3_1.SchemaObject;
  return extractSchema(schema, name);
}

function extractErrorResponses(
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

function extractGlobalSchemas(
  schemas: Record<string, OpenAPIV3_1.SchemaObject> | undefined,
): ParsedSchema[] {
  if (!schemas) return [];

  return Object.entries(schemas)
    .filter(([, schema]) => schema.type === 'object' || schema.properties)
    .map(([name, schema]) => ({
      name,
      properties: extractProperties(schema),
    }));
}

export async function parseSpec(input: string): Promise<ParsedSpec> {
  const api = (await SwaggerParser.dereference(input)) as OpenAPIV3_1.Document;

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
          parameters: extractParameters(operation.parameters),
          requestBody: extractRequestBody(
            operation.requestBody as OpenAPIV3_1.RequestBodyObject | undefined,
            schemaToName(path, method, 'Input'),
          ),
          responseSchema: extractResponseSchema(
            operation.responses,
            schemaToName(path, method, 'Response'),
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

  const schemas = extractGlobalSchemas(
    (api.components?.schemas as Record<string, OpenAPIV3_1.SchemaObject>) ?? undefined,
  );

  return { controllers, schemas };
}
