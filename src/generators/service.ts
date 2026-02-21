import type { SourceFile } from 'ts-morph';
import type { ParsedController, ParsedEndpoint } from '../parser/types.js';
import { collectApiClientBodyTypeNames, collectDtoNames, collectParameterEnumNames } from './collectors.js';
import { tsTypeForProperty } from './type-mappers.js';
import { toCamelCase, toKebabCase, toPascalCase } from '../utils.js';

function buildApiMethodCall(
  controller: ParsedController,
  endpoint: ParsedEndpoint,
): string {
  const namespace = endpoint.apiClientNamespace
    ? toCamelCase(endpoint.apiClientNamespace)
    : toCamelCase(controller.name);
  const methodName = endpoint.apiClientMethodName ?? toCamelCase(endpoint.operationId);
  const args: string[] = [];

  // 1. Combined path + query params object (swagger-typescript-api bundles
  //    all path and query params into a single destructured first argument)
  const pathParams = endpoint.parameters.filter((p) => p.location === 'path');
  const queryParams = endpoint.parameters.filter((p) => p.location === 'query');
  const allParams = [...pathParams, ...queryParams];
  if (allParams.length > 0) {
    args.push(`{ ${allParams.map((p) => p.name).join(', ')} }`);
  }
  // 2. Body (if request body exists — cast to api-client type for union bodies)
  if (endpoint.requestBody) {
    args.push(
      endpoint.apiClientBodyTypeName
        ? `input as ${endpoint.apiClientBodyTypeName}`
        : 'input',
    );
  }
  // 3. extraConfig (always last, maps to RequestParams)
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

  const apiClientImports = ['Api', ...collectApiClientBodyTypeNames(controller)];
  sourceFile.addImportDeclaration({
    moduleSpecifier: '../api-client',
    namedImports: apiClientImports,
  });

  // Import DTOs if any endpoint has a request body
  const dtoNames = collectDtoNames(controller);
  if (dtoNames.length > 0) {
    sourceFile.addImportDeclaration({
      moduleSpecifier: `./${toKebabCase(controller.name)}.dto`,
      namedImports: dtoNames,
    });
  }

  // Import enum types used in parameters
  const enumNames = collectParameterEnumNames(controller);
  if (enumNames.size > 0) {
    sourceFile.addImportDeclaration({
      moduleSpecifier: '../enums',
      namedImports: Array.from(enumNames).sort(),
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
