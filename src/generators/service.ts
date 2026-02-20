import type { SourceFile } from 'ts-morph';
import type { ParsedController, ParsedEndpoint } from '../parser/types.js';
import { collectDtoNames } from './collectors.js';
import { tsTypeForProperty } from './type-mappers.js';
import { toCamelCase, toPascalCase } from '../utils.js';

function buildApiMethodCall(
  controller: ParsedController,
  endpoint: ParsedEndpoint,
): string {
  const namespace = toCamelCase(controller.name);
  const methodName = toCamelCase(endpoint.operationId);
  const args: string[] = [];

  // 1. Path params (positional)
  for (const param of endpoint.parameters.filter((p) => p.location === 'path')) {
    args.push(param.name);
  }
  // 2. Body (if request body exists)
  if (endpoint.requestBody) {
    args.push('input');
  }
  // 3. Query params object
  const queryParams = endpoint.parameters.filter((p) => p.location === 'query');
  if (queryParams.length > 0) {
    args.push(`{ ${queryParams.map((p) => p.name).join(', ')} }`);
  }
  // 4. extraConfig (always last, maps to RequestParams)
  args.push('extraConfig');

  return `this.apiClient.${namespace}.${methodName}(${args.join(', ')})`;
}

function buildMethodParams(endpoint: ParsedEndpoint): string {
  const params: string[] = [];

  for (const param of endpoint.parameters) {
    const type = tsTypeForProperty(param);
    const fullType = param.isArray ? `${type}[]` : type;
    params.push(`${param.name}: ${fullType}`);
  }

  if (endpoint.requestBody) {
    params.push(`input: ${endpoint.requestBody.name}`);
  }

  return params.join(', ');
}

function buildFactoryCallArgs(endpoint: ParsedEndpoint): string {
  const argNames = endpoint.parameters.map((p) => p.name);
  if (endpoint.requestBody) {
    argNames.push('input');
  }
  if (argNames.length === 0) return '{}';
  return `{ ${argNames.join(', ')} }`;
}

function buildErrorHandling(endpoint: ParsedEndpoint): string | null {
  if (endpoint.errorResponses.length === 0) return null;

  const cases = endpoint.errorResponses
    .map((err) => {
      return `        if (error.response?.status === ${err.statusCode}) {\n          throw new HttpException('${err.description}', ${err.statusCode});\n        }`;
    })
    .join('\n');

  return cases;
}

export function generateService(
  sourceFile: SourceFile,
  controller: ParsedController,
): void {
  const serviceName = `${toPascalCase(controller.name)}Service`;

  const hasErrorHandling = controller.endpoints.some((e) => e.errorResponses.length > 0);

  const nestImports = ['Inject', 'Injectable', 'Optional'];
  if (hasErrorHandling) {
    nestImports.push('HttpException');
  }

  sourceFile.addImportDeclaration({
    moduleSpecifier: '@nestjs/common',
    namedImports: nestImports,
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: '../api-client',
    namedImports: ['Api'],
  });

  // Import DTOs if any endpoint has a request body
  const dtoNames = collectDtoNames(controller);
  if (dtoNames.length > 0) {
    sourceFile.addImportDeclaration({
      moduleSpecifier: `./${controller.name.toLowerCase()}.dto`,
      namedImports: dtoNames,
    });
  }

  const methods = controller.endpoints.map((endpoint) => {
    const methodName = toCamelCase(endpoint.operationId);
    const params = buildMethodParams(endpoint);
    const factoryArgs = buildFactoryCallArgs(endpoint);
    const apiCall = buildApiMethodCall(controller, endpoint);
    const errorHandling = buildErrorHandling(endpoint);

    const extraConfigLine = `    const extraConfig = this.requestConfigFactory?.('${methodName}', ${factoryArgs}) ?? {};`;

    let body: string;
    if (errorHandling) {
      body = `${extraConfigLine}\n    try {\n      const response = await ${apiCall};\n      return response.data;\n    } catch (error: any) {\n${errorHandling}\n        throw error;\n    }`;
    } else {
      body = `${extraConfigLine}\n    const response = await ${apiCall};\n    return response.data;`;
    }

    return {
      name: methodName,
      isAsync: true,
      parameters: params
        ? params.split(', ').map((p) => {
            const [name, type] = p.split(': ');
            return { name, type };
          })
        : [],
      returnType: 'Promise<any>',
      statements: body,
    };
  });

  sourceFile.addClass({
    name: serviceName,
    isExported: true,
    decorators: [{ name: 'Injectable', arguments: [] }],
    ctors: [
      {
        parameters: [
          {
            name: 'apiClient',
            type: 'Api<unknown>',
            isReadonly: true,
            scope: 'private' as unknown as undefined,
            decorators: [{ name: 'Inject', arguments: ["'API_CLIENT'"] }],
          },
          {
            name: 'requestConfigFactory',
            type: '((methodName: string, args: Record<string, unknown>) => Record<string, unknown> | undefined)',
            isReadonly: true,
            scope: 'private' as unknown as undefined,
            hasQuestionToken: true,
            decorators: [
              { name: 'Optional', arguments: [] },
              { name: 'Inject', arguments: ["'REQUEST_CONFIG_FACTORY'"] },
            ],
          },
        ],
      },
    ],
    methods,
  });
}
