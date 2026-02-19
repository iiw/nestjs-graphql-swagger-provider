import type { SourceFile } from 'ts-morph';
import type { ParsedController, ParsedSchema } from '../parser/types.js';
import { generateSchemaClassesFromEndpoints } from './schema-class.js';

export function generateModels(
  sourceFile: SourceFile,
  controller: ParsedController,
  globalSchemas: ParsedSchema[] = [],
): void {
  generateSchemaClassesFromEndpoints(
    sourceFile,
    controller,
    globalSchemas,
    'ObjectType',
    (e) => (e.responseSchema && !e.responseSchema.primitiveType ? e.responseSchema : undefined),
  );
}
