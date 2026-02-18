import type { OpenAPIV3_1 } from 'openapi-types';
import type {
  ParsedController,
  ParsedEnum,
  ParsedProperty,
  ParsedSchema,
} from './types.js';
import { toPascalCase } from '../generators/utils.js';

/**
 * Derive an enum name from a parent schema name and property name.
 * e.g. ("Pet", "status") → "PetStatus"
 */
export function deriveEnumName(parentName: string, propName: string): string {
  return `${toPascalCase(parentName)}${toPascalCase(propName)}`;
}

export function buildNamedEnumLookup(
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

export function extractGlobalEnums(
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

export function collectInlineEnums(
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
