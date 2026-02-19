import SwaggerParser from '@apidevtools/swagger-parser';
import type { OpenAPIV3_1 } from 'openapi-types';

export interface RefMap {
  /** schemaName → (propertyName → targetSchemaName) */
  schemaProperties: Map<string, Map<string, string>>;
  /** "operationId:response" | "operationId:requestBody" → targetSchemaName */
  operationSchemas: Map<string, string>;
  /** operationId → (paramName → targetSchemaName) */
  parameterSchemas: Map<string, Map<string, string>>;
  /** childSchemaName → parentSchemaName (from allOf with a $ref) */
  schemaInheritance: Map<string, string>;
}

export function extractRefName(ref: string): string {
  return ref.split('/').pop()!;
}

function extractRefFromSchema(
  schema: OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject,
): string | undefined {
  if ('$ref' in schema) {
    return extractRefName(schema.$ref);
  }
  if (
    schema.type === 'array' &&
    schema.items &&
    '$ref' in (schema.items as OpenAPIV3_1.ReferenceObject)
  ) {
    return extractRefName((schema.items as OpenAPIV3_1.ReferenceObject).$ref);
  }
  return undefined;
}

function validateOpenApiVersion(raw: Record<string, unknown>): void {
  const version = (raw.openapi ?? raw.swagger) as string | undefined;
  if (!version || (!version.startsWith('3.0') && !version.startsWith('3.1'))) {
    throw new Error(
      `Unsupported OpenAPI version "${version ?? 'unknown'}". Only OpenAPI 3.0.x and 3.1.x are supported.`,
    );
  }
}

function extractSchemaRefs(
  schemas: Record<string, OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject>,
): { schemaProperties: Map<string, Map<string, string>>; schemaInheritance: Map<string, string> } {
  const schemaProperties = new Map<string, Map<string, string>>();
  const schemaInheritance = new Map<string, string>();

  for (const [schemaName, schema] of Object.entries(schemas)) {
    if ('$ref' in schema) continue;

    // Detect allOf inheritance: first $ref entry is the parent
    if (schema.allOf && Array.isArray(schema.allOf)) {
      const parentRef = schema.allOf.find(
        (entry): entry is OpenAPIV3_1.ReferenceObject => '$ref' in entry,
      );
      if (parentRef) {
        schemaInheritance.set(schemaName, extractRefName(parentRef.$ref));
      }
    }

    if (!schema.properties) continue;

    const propMap = new Map<string, string>();
    for (const [propName, propSchema] of Object.entries(schema.properties)) {
      const ref = extractRefFromSchema(
        propSchema as OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject,
      );
      if (ref) {
        propMap.set(propName, ref);
      }
    }
    if (propMap.size > 0) {
      schemaProperties.set(schemaName, propMap);
    }
  }

  return { schemaProperties, schemaInheritance };
}

function extractOperationRefs(paths: OpenAPIV3_1.PathsObject): {
  operationSchemas: Map<string, string>;
  parameterSchemas: Map<string, Map<string, string>>;
} {
  const operationSchemas = new Map<string, string>();
  const parameterSchemas = new Map<string, Map<string, string>>();
  const methods = ['get', 'post', 'put', 'patch', 'delete'] as const;

  for (const [, pathItem] of Object.entries(paths)) {
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
            const ref = extractRefFromSchema(
              jsonContent.schema as OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject,
            );
            if (ref) {
              operationSchemas.set(`${operationId}:response`, ref);
            }
          }
        }
      }

      // Request body schema refs
      if (operation.requestBody && !('$ref' in operation.requestBody)) {
        const jsonContent = operation.requestBody.content?.['application/json'];
        if (jsonContent?.schema) {
          const ref = extractRefFromSchema(
            jsonContent.schema as OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject,
          );
          if (ref) {
            operationSchemas.set(`${operationId}:requestBody`, ref);
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
            const ref = extractRefFromSchema(
              paramObj.schema as OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject,
            );
            if (ref) {
              paramMap.set(paramObj.name, ref);
            }
          }
        }
        if (paramMap.size > 0) {
          parameterSchemas.set(operationId, paramMap);
        }
      }
    }
  }

  return { operationSchemas, parameterSchemas };
}

export async function buildRefMap(input: string): Promise<RefMap> {
  const raw = (await SwaggerParser.parse(input)) as OpenAPIV3_1.Document;
  validateOpenApiVersion(raw as unknown as Record<string, unknown>);

  const { schemaProperties, schemaInheritance } = raw.components?.schemas
    ? extractSchemaRefs(
        raw.components.schemas as Record<
          string,
          OpenAPIV3_1.SchemaObject | OpenAPIV3_1.ReferenceObject
        >,
      )
    : { schemaProperties: new Map<string, Map<string, string>>(), schemaInheritance: new Map<string, string>() };

  const { operationSchemas, parameterSchemas } = raw.paths
    ? extractOperationRefs(raw.paths)
    : { operationSchemas: new Map<string, string>(), parameterSchemas: new Map<string, Map<string, string>>() };

  return { schemaProperties, operationSchemas, parameterSchemas, schemaInheritance };
}
