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
    namedImports: ['DynamicModule', 'Module'],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: 'axios',
    namedImports: ['AxiosInstance'],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: `./${controller.name.toLowerCase()}.resolver`,
    namedImports: [resolverName],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: `./${controller.name.toLowerCase()}.service`,
    namedImports: [serviceName],
  });

  const registerBody = `    return {
      module: ${moduleName},
      providers: [
        {
          provide: 'HTTP_CLIENT',
          useValue: httpClient,
        },
        ${resolverName},
        ${serviceName},
      ],
    };`;

  sourceFile.addClass({
    name: moduleName,
    isExported: true,
    decorators: [{ name: 'Module', arguments: ['{}'] }],
    methods: [
      {
        name: 'register',
        isStatic: true,
        parameters: [{ name: 'httpClient', type: 'AxiosInstance' }],
        returnType: 'DynamicModule',
        statements: registerBody,
      },
    ],
  });
}
