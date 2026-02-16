import type { SourceFile } from 'ts-morph';
import type { ParsedController } from '../parser/types.js';
import { toPascalCase } from './utils.js';

export function generateModule(
  sourceFile: SourceFile,
  controller: ParsedController,
): void {
  const moduleName = `${toPascalCase(controller.name)}Module`;
  const resolverName = `${toPascalCase(controller.name)}Resolver`;
  const serviceName = `${toPascalCase(controller.name)}Service`;

  sourceFile.addImportDeclaration({
    moduleSpecifier: '@nestjs/common',
    namedImports: ['Module'],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: `./${controller.name.toLowerCase()}.resolver`,
    namedImports: [resolverName],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: `./${controller.name.toLowerCase()}.service`,
    namedImports: [serviceName],
  });

  sourceFile.addClass({
    name: moduleName,
    isExported: true,
    decorators: [
      {
        name: 'Module',
        arguments: [`{\n  providers: [${resolverName}, ${serviceName}],\n}`],
      },
    ],
  });
}
