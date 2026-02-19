import type { SourceFile } from 'ts-morph';
import type { ParsedController, ParsedSchema } from '../parser/types.js';
import { generateSchemaClassesFromEndpoints } from './schema-class.js';

export function generateDtos(
  sourceFile: SourceFile,
  controller: ParsedController,
  globalSchemas: ParsedSchema[] = [],
): void {
  generateSchemaClassesFromEndpoints(
    sourceFile,
    controller,
    globalSchemas,
    'InputType',
    (e) => e.requestBody,
  );
}
