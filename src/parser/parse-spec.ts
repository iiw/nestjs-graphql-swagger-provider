import SwaggerParser from '@apidevtools/swagger-parser';
import type { OpenAPIV3_1 } from 'openapi-types';
import type {
  ParsedController,
  ParsedEndpoint,
  ParsedEnum,
  ParsedErrorResponse,
  ParsedParameter,
  ParsedProperty,
  ParsedSchema,
  ParsedSpec,
} from './types.js';
import { deriveEnumName } from '../generators/enum-utils.js';

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
      if (schema.enum) {
        return { type: 'enum', isArray: false };
      }
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

function extractProperties(
  schema: OpenAPIV3_1.SchemaObject,
  parentName?: string,
  namedEnumLookup?: Map<string, string>,
): ParsedProperty[] {
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
      parsedProp.enumValues = prop.enum as (string | number)[];

      // Try to find a named enum from the lookup (recovered from $ref names)
      const enumKey = JSON.stringify(prop.enum);
      if (namedEnumLookup?.has(enumKey)) {
        parsedProp.enumName = namedEnumLookup.get(enumKey)!;
      } else if (parentName) {
        parsedProp.enumName = deriveEnumName(parentName, name);
      }
    }

    if (mapped.type === 'object' && prop.properties) {
      parsedProp.properties = extractProperties(prop, parentName, namedEnumLookup);
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
  namedEnumLookup?: Map<string, string>,
): ParsedSchema | undefined {
  if (!schema) return undefined;

  if (schema.type === 'array') {
    const items = schema.items as OpenAPIV3_1.SchemaObject | undefined;
    if (items) {
      return {
        name,
        properties: extractProperties(items, name, namedEnumLookup),
      };
    }
  }

  return {
    name,
    properties: extractProperties(schema, name, namedEnumLookup),
  };
}

function extractParameters(
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

function extractRequestBody(
  requestBody: OpenAPIV3_1.RequestBodyObject | OpenAPIV3_1.ReferenceObject | undefined,
  name: string,
  namedEnumLookup?: Map<string, string>,
): ParsedSchema | undefined {
  if (!requestBody || '$ref' in requestBody) return undefined;

  const jsonContent = requestBody.content?.['application/json'];
  if (!jsonContent?.schema) return undefined;

  const schema = jsonContent.schema as OpenAPIV3_1.SchemaObject;
  return extractSchema(schema, name, namedEnumLookup);
}

function extractResponseSchema(
  responses: OpenAPIV3_1.ResponsesObject | undefined,
  name: string,
  namedEnumLookup?: Map<string, string>,
): ParsedSchema | undefined {
  if (!responses) return undefined;

  const successResponse = (responses['200'] ?? responses['201']) as
    | OpenAPIV3_1.ResponseObject
    | undefined;
  if (!successResponse) return undefined;

  const jsonContent = successResponse.content?.['application/json'];
  if (!jsonContent?.schema) return undefined;

  const schema = jsonContent.schema as OpenAPIV3_1.SchemaObject;
  return extractSchema(schema, name, namedEnumLookup);
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
  namedEnumLookup?: Map<string, string>,
): ParsedSchema[] {
  if (!schemas) return [];

  return Object.entries(schemas)
    .filter(([, schema]) => schema.type === 'object' || schema.properties)
    .map(([name, schema]) => ({
      name,
      properties: extractProperties(schema, name, namedEnumLookup),
    }));
}

function buildNamedEnumLookup(
  schemas: Record<string, OpenAPIV3_1.SchemaObject> | undefined,
): Map<string, string> {
  const lookup = new Map<string, string>();
  if (!schemas) return lookup;

  for (const [name, schema] of Object.entries(schemas)) {
    if (schema.enum && (schema.type === 'string' || schema.type === 'integer' || schema.type === 'number')) {
      const key = JSON.stringify(schema.enum);
      lookup.set(key, name);
    }
  }

  return lookup;
}

function extractGlobalEnums(
  schemas: Record<string, OpenAPIV3_1.SchemaObject> | undefined,
): ParsedEnum[] {
  if (!schemas) return [];

  const enums: ParsedEnum[] = [];

  for (const [name, schema] of Object.entries(schemas)) {
    if (schema.enum && (schema.type === 'string' || schema.type === 'integer' || schema.type === 'number')) {
      enums.push({
        name,
        values: schema.enum as (string | number)[],
        type: schema.type === 'number' ? 'integer' : (schema.type as 'string' | 'integer'),
      });
    }
  }

  return enums;
}

function collectInlineEnums(
  controllers: ParsedController[],
  schemas: ParsedSchema[],
  globalEnumNames: Set<string>,
): ParsedEnum[] {
  const enumMap = new Map<string, ParsedEnum>();

  function collectFromProperties(properties: ParsedProperty[]): void {
    for (const prop of properties) {
      if (prop.type === 'enum' && prop.enumName && prop.enumValues && !globalEnumNames.has(prop.enumName)) {
        if (!enumMap.has(prop.enumName)) {
          const enumType = prop.enumValues.every((v) => typeof v === 'number') ? 'integer' : 'string';
          enumMap.set(prop.enumName, {
            name: prop.enumName,
            values: prop.enumValues,
            type: enumType as 'string' | 'integer',
          });
        }
      }
      if (prop.properties) {
        collectFromProperties(prop.properties);
      }
    }
  }

  for (const controller of controllers) {
    for (const endpoint of controller.endpoints) {
      if (endpoint.responseSchema) {
        collectFromProperties(endpoint.responseSchema.properties);
      }
      if (endpoint.requestBody) {
        collectFromProperties(endpoint.requestBody.properties);
      }
      for (const param of endpoint.parameters) {
        if (param.type === 'enum' && param.enumName && param.enumValues && !globalEnumNames.has(param.enumName)) {
          if (!enumMap.has(param.enumName)) {
            const enumType = param.enumValues.every((v) => typeof v === 'number') ? 'integer' : 'string';
            enumMap.set(param.enumName, {
              name: param.enumName,
              values: param.enumValues,
              type: enumType as 'string' | 'integer',
            });
          }
        }
      }
    }
  }

  for (const schema of schemas) {
    collectFromProperties(schema.properties);
  }

  return Array.from(enumMap.values());
}

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
