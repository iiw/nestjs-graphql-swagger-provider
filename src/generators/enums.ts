import type { SourceFile } from 'ts-morph';
import type { EnumMatchResult } from './api-client-enums.js';
import { enumMemberName } from './enum-utils.js';

export function generateEnums(sourceFile: SourceFile, enumMatchResult: EnumMatchResult): void {
  const { matched, unmatched } = enumMatchResult;
  if (matched.length === 0 && unmatched.length === 0) return;

  sourceFile.addImportDeclaration({
    moduleSpecifier: '@nestjs/graphql',
    namedImports: ['registerEnumType'],
  });

  // Import matched enums from api-client
  if (matched.length > 0) {
    const namedImports = matched.map((m) => {
      if (m.apiClientEnumName !== m.parsedEnum.name) {
        return { name: m.apiClientEnumName, alias: m.parsedEnum.name };
      }
      return { name: m.parsedEnum.name };
    });

    sourceFile.addImportDeclaration({
      moduleSpecifier: './api-client',
      namedImports,
    });

    for (const m of matched) {
      sourceFile.addStatements(
        `registerEnumType(${m.parsedEnum.name}, { name: '${m.parsedEnum.name}' });`,
      );
    }

    // Re-export all matched enums
    sourceFile.addExportDeclaration({
      namedExports: matched.map((m) => m.parsedEnum.name),
    });
  }

  // Generate unmatched enums inline (fallback)
  for (const parsedEnum of unmatched) {
    const members = parsedEnum.values.map((value) => {
      const memberName = enumMemberName(value);
      if (typeof value === 'string') {
        return { name: memberName, value: `'${value}'` };
      }
      return { name: memberName, value: String(value) };
    });

    sourceFile.addEnum({
      name: parsedEnum.name,
      isExported: true,
      members: members.map((m) => ({
        name: m.name,
        initializer: m.value,
      })),
    });

    sourceFile.addStatements(
      `registerEnumType(${parsedEnum.name}, { name: '${parsedEnum.name}' });`,
    );
  }
}
