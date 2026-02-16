import type { SourceFile } from 'ts-morph';
import type { ParsedEnum } from '../parser/types.js';
import { enumMemberName } from './enum-utils.js';

export function generateEnums(sourceFile: SourceFile, enums: ParsedEnum[]): void {
  if (enums.length === 0) return;

  sourceFile.addImportDeclaration({
    moduleSpecifier: '@nestjs/graphql',
    namedImports: ['registerEnumType'],
  });

  for (const parsedEnum of enums) {
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
