import SwaggerParser from '@apidevtools/swagger-parser';
import type { OpenAPIV3_1 } from 'openapi-types';

export interface RefMap {
  /** schemaName → (propertyName → targetSchemaName) */
  schemaProperties: Map<string, Map<string, string>>;
  /** "operationId:response" | "operationId:requestBody" → targetSchemaName */
  operationSchemas: Map<string, string>;
  /** operationId → (paramName → targetSchemaName) */
  parameterSchemas: Map<string, Map<string, string>>;
}

export function extractRefName(ref: string): string {
  return ref.split('/').pop()!;
}

export async function buildRefMap(input: string): Promise<RefMap> {
  const raw = (await SwaggerParser.parse(input)) as OpenAPIV3_1.Document;

  const schemaProperties = new Map<string, Map<string, string>>();
  const operationSchemas = new Map<string, string>();
  const parameterSchemas = new Map<string, Map<string, string>>();

  // Walk components/schemas for property $refs
  const schemas = raw.components?.schemas as
    | Record<string, OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject>
    | undefined;

  if (schemas) {
    for (const [schemaName, schema] of Object.entries(schemas)) {
      if ('$ref' in schema) continue;
      if (!schema.properties) continue;

      const propMap = new Map<string, string>();
      for (const [propName, propSchema] of Object.entries(schema.properties)) {
        const prop = propSchema as OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject;
        if ('$ref' in prop) {
          propMap.set(propName, extractRefName(prop.$ref));
        } else if (
          prop.type === 'array' &&
          prop.items &&
          '$ref' in (prop.items as OpenAPIV3_1.ReferenceObject)
        ) {
          propMap.set(propName, extractRefName((prop.items as OpenAPIV3_1.ReferenceObject).$ref));
        }
      }
      if (propMap.size > 0) {
        schemaProperties.set(schemaName, propMap);
      }
    }
  }

  // Walk paths for operation response/requestBody $refs and parameter $refs
  if (raw.paths) {
    const methods = ['get', 'post', 'put', 'patch', 'delete'] as const;

    for (const [, pathItem] of Object.entries(raw.paths)) {
      if (!pathItem) continue;

      for (const method of methods) {
        const operation = pathItem[method] as OpenAPIV3_1.OperationObject | undefined;
        if (!operation?.operationId) continue;

        const operationId = operation.operationId;

        // Response schema refs
        if (operation.responses) {
          const successResponse = (operation.responses['200'] ??
            operation.responses['201']) as
            | OpenAPIV3_1.ResponseObject
            | OpenAPIV3_1.ReferenceObject
            | undefined;

          if (successResponse && !('$ref' in successResponse)) {
            const jsonContent = successResponse.content?.['application/json'];
            if (jsonContent?.schema) {
              const respSchema = jsonContent.schema as
                | OpenAPIV3_1.SchemaObject
                | OpenAPIV3_1.ReferenceObject;
              if ('$ref' in respSchema) {
                operationSchemas.set(`${operationId}:response`, extractRefName(respSchema.$ref));
              } else if (
                respSchema.type === 'array' &&
                respSchema.items &&
                '$ref' in (respSchema.items as OpenAPIV3_1.ReferenceObject)
              ) {
                operationSchemas.set(
                  `${operationId}:response`,
                  extractRefName((respSchema.items as OpenAPIV3_1.ReferenceObject).$ref),
                );
              }
            }
          }
        }

        // Request body schema refs
        if (operation.requestBody && !('$ref' in operation.requestBody)) {
          const jsonContent = operation.requestBody.content?.['application/json'];
          if (jsonContent?.schema) {
            const reqSchema = jsonContent.schema as
              | OpenAPIV3_1.SchemaObject
              | OpenAPIV3_1.ReferenceObject;
            if ('$ref' in reqSchema) {
              operationSchemas.set(
                `${operationId}:requestBody`,
                extractRefName(reqSchema.$ref),
              );
            } else if (
              reqSchema.type === 'array' &&
              reqSchema.items &&
              '$ref' in (reqSchema.items as OpenAPIV3_1.ReferenceObject)
            ) {
              operationSchemas.set(
                `${operationId}:requestBody`,
                extractRefName((reqSchema.items as OpenAPIV3_1.ReferenceObject).$ref),
              );
            }
          }
        }

        // Parameter schema refs
        if (operation.parameters) {
          const paramMap = new Map<string, string>();
          for (const param of operation.parameters) {
            if ('$ref' in param) continue;
            const paramObj = param as OpenAPIV3_1.ParameterObject;
            if (paramObj.schema) {
              const paramSchema = paramObj.schema as
                | OpenAPIV3_1.SchemaObject
                | OpenAPIV3_1.ReferenceObject;
              if ('$ref' in paramSchema) {
                paramMap.set(paramObj.name, extractRefName(paramSchema.$ref));
              } else if (
                paramSchema.type === 'array' &&
                paramSchema.items &&
                '$ref' in (paramSchema.items as OpenAPIV3_1.ReferenceObject)
              ) {
                paramMap.set(
                  paramObj.name,
                  extractRefName((paramSchema.items as OpenAPIV3_1.ReferenceObject).$ref),
                );
              }
            }
          }
          if (paramMap.size > 0) {
            parameterSchemas.set(operationId, paramMap);
          }
        }
      }
    }
  }

  return { schemaProperties, operationSchemas, parameterSchemas };
}
