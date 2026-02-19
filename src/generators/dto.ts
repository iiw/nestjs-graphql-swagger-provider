import type { SourceFile } from 'ts-morph';
import type { ParsedController, ParsedSchema } from '../parser/types.js';
import { generateSchemaClasses } from './schema-class.js';

export function generateDtos(
  sourceFile: SourceFile,
  controller: ParsedController,
  globalSchemas: ParsedSchema[] = [],
): void {
  const schemas = new Map<string, ParsedSchema>();
  for (const endpoint of controller.endpoints) {
    if (endpoint.requestBody) {
      schemas.set(endpoint.requestBody.name, endpoint.requestBody);
    }
  }
  generateSchemaClasses(sourceFile, schemas, globalSchemas, 'InputType');
}
