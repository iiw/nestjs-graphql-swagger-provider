import type { SourceFile } from 'ts-morph';
import type { ParsedController, ParsedEndpoint } from '../parser/types.js';
import { toCamelCase, toPascalCase, tsTypeForProperty } from './utils.js';

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

function buildClientCallArgs(endpoint: ParsedEndpoint): string {
  const pathWithInterpolation = endpoint.path.replace(/{(\w+)}/g, '${$1}');
  const hasPathParams = endpoint.path.includes('{');

  const urlArg = hasPathParams ? `\`${pathWithInterpolation}\`` : `'${endpoint.path}'`;

  const queryParams = endpoint.parameters.filter((p) => p.location === 'query');

  const args: string[] = [urlArg];

  if (endpoint.requestBody && endpoint.method !== 'get') {
    args.push('input');
    if (queryParams.length > 0) {
      const queryObj = queryParams.map((p) => p.name).join(', ');
      args.push(`{ params: { ${queryObj} } }`);
    }
  } else if (queryParams.length > 0) {
    const queryObj = queryParams.map((p) => p.name).join(', ');
    if (endpoint.method === 'get' || endpoint.method === 'delete') {
      args.push(`{ params: { ${queryObj} } }`);
    } else {
      args.push('undefined');
      args.push(`{ params: { ${queryObj} } }`);
    }
  }

  return args.join(', ');
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

  const nestImports = ['Inject', 'Injectable'];
  if (hasErrorHandling) {
    nestImports.push('HttpException');
  }

  sourceFile.addImportDeclaration({
    moduleSpecifier: '@nestjs/common',
    namedImports: nestImports,
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: 'axios',
    namedImports: ['AxiosInstance'],
  });

  // Import DTOs if any endpoint has a request body
  const dtoNames = [
    ...new Set(
      controller.endpoints
        .filter((e) => e.requestBody)
        .map((e) => e.requestBody!.name),
    ),
  ];
  if (dtoNames.length > 0) {
    sourceFile.addImportDeclaration({
      moduleSpecifier: `./${controller.name.toLowerCase()}.dto`,
      namedImports: dtoNames,
    });
  }

  const methods = controller.endpoints.map((endpoint) => {
    const methodName = toCamelCase(endpoint.operationId);
    const params = buildMethodParams(endpoint);
    const clientArgs = buildClientCallArgs(endpoint);
    const httpMethod = endpoint.method;
    const errorHandling = buildErrorHandling(endpoint);

    let body: string;
    if (errorHandling) {
      body = `    try {\n      const response = await this.httpClient.${httpMethod}(${clientArgs});\n      return response.data;\n    } catch (error: any) {\n${errorHandling}\n        throw error;\n    }`;
    } else {
      body = `    const response = await this.httpClient.${httpMethod}(${clientArgs});\n    return response.data;`;
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
            name: 'httpClient',
            type: 'AxiosInstance',
            isReadonly: true,
            scope: 'private' as unknown as undefined,
            decorators: [{ name: 'Inject', arguments: ["'HTTP_CLIENT'"] }],
          },
        ],
      },
    ],
    methods,
  });
}
