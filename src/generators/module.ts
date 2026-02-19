import type { SourceFile } from 'ts-morph';
import type { ParsedController } from '../parser/types.js';
import { toPascalCase } from '../utils.js';

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
    moduleSpecifier: '../api-client',
    namedImports: ['Api'],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: `./${controller.name.toLowerCase()}.resolver`,
    namedImports: [resolverName],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: `./${controller.name.toLowerCase()}.service`,
    namedImports: [serviceName],
  });

  sourceFile.addTypeAlias({
    name: 'RequestConfigFactory',
    isExported: true,
    type: '(methodName: string, args: Record<string, unknown>) => Record<string, unknown> | undefined',
    leadingTrivia: [
      '/**\n',
      ' * Factory function for customizing HTTP requests made by the generated service.\n',
      ' * Receives the service method name and all arguments, returns extra axios config\n',
      ' * (e.g., headers, auth) to merge into each request.\n',
      ' */\n',
    ].join(''),
  });

  const registerBody = `    const providers: any[] = [
      {
        provide: 'API_CLIENT',
        useValue: apiClient,
      },
      ${resolverName},
      ${serviceName},
    ];
    if (requestConfigFactory) {
      providers.push({
        provide: 'REQUEST_CONFIG_FACTORY',
        useValue: requestConfigFactory,
      });
    }
    return {
      module: ${moduleName},
      providers,
    };`;

  sourceFile.addClass({
    name: moduleName,
    isExported: true,
    decorators: [{ name: 'Module', arguments: ['{}'] }],
    methods: [
      {
        name: 'register',
        isStatic: true,
        parameters: [
          { name: 'apiClient', type: 'Api' },
          {
            name: 'requestConfigFactory',
            type: 'RequestConfigFactory',
            hasQuestionToken: true,
          },
        ],
        returnType: 'DynamicModule',
        statements: registerBody,
      },
    ],
  });
}
