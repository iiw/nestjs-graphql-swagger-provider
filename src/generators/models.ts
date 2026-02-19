import type { SourceFile } from 'ts-morph';
import type { ParsedController, ParsedSchema } from '../parser/types.js';
import { generateSchemaClasses } from './schema-class.js';

export function generateModels(
  sourceFile: SourceFile,
  controller: ParsedController,
  globalSchemas: ParsedSchema[] = [],
): void {
  const schemas = new Map<string, ParsedSchema>();
  for (const endpoint of controller.endpoints) {
    if (endpoint.responseSchema && !endpoint.responseSchema.primitiveType) {
      schemas.set(endpoint.responseSchema.name, endpoint.responseSchema);
    }
  }
  generateSchemaClasses(sourceFile, schemas, globalSchemas, 'ObjectType');
}
