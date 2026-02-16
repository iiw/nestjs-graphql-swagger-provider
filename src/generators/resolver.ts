import type { SourceFile } from 'ts-morph';
import type { ParsedController, ParsedEndpoint } from '../parser/types.js';
import { toCamelCase, toPascalCase } from './utils.js';

function isQuery(method: string): boolean {
  return method === 'get';
}

function buildResolverMethodParams(endpoint: ParsedEndpoint): {
  name: string;
  type: string;
  decorators: { name: string; arguments: string[] }[];
}[] {
  const params: {
    name: string;
    type: string;
    decorators: { name: string; arguments: string[] }[];
  }[] = [];

  for (const param of endpoint.parameters) {
    let tsType: string;
    switch (param.type) {
      case 'number':
        tsType = 'number';
        break;
      case 'boolean':
        tsType = 'boolean';
        break;
      default:
        tsType = 'string';
    }
    if (param.isArray) tsType = `${tsType}[]`;

    params.push({
      name: param.name,
      type: tsType,
      decorators: [{ name: 'Args', arguments: [`'${param.name}'`] }],
    });
  }

  if (endpoint.requestBody) {
    params.push({
      name: 'input',
      type: endpoint.requestBody.name,
      decorators: [{ name: 'Args', arguments: [`'input'`] }],
    });
  }

  return params;
}

function buildServiceCallArgs(endpoint: ParsedEndpoint): string {
  const args: string[] = [];
  for (const param of endpoint.parameters) {
    args.push(param.name);
  }
  if (endpoint.requestBody) {
    args.push('input');
  }
  return args.join(', ');
}

export function generateResolver(
  sourceFile: SourceFile,
  controller: ParsedController,
): void {
  const resolverName = `${toPascalCase(controller.name)}Resolver`;
  const serviceName = `${toPascalCase(controller.name)}Service`;
  const serviceVarName = `${toCamelCase(controller.name)}Service`;

  const gqlImports = ['Resolver', 'Query', 'Mutation', 'Args'];
  sourceFile.addImportDeclaration({
    moduleSpecifier: '@nestjs/graphql',
    namedImports: gqlImports,
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: `./${controller.name.toLowerCase()}.service`,
    namedImports: [serviceName],
  });

  // Import DTOs if any endpoint has a request body
  const hasDtos = controller.endpoints.some((e) => e.requestBody);
  if (hasDtos) {
    const dtoNames = [
      ...new Set(
        controller.endpoints
          .filter((e) => e.requestBody)
          .map((e) => e.requestBody!.name),
      ),
    ];
    sourceFile.addImportDeclaration({
      moduleSpecifier: `./${controller.name.toLowerCase()}.dto`,
      namedImports: dtoNames,
    });
  }

  const methods = controller.endpoints.map((endpoint) => {
    const methodName = toCamelCase(endpoint.operationId);
    const params = buildResolverMethodParams(endpoint);
    const serviceCallArgs = buildServiceCallArgs(endpoint);
    const decoratorName = isQuery(endpoint.method) ? 'Query' : 'Mutation';

    const returnTypeArg = endpoint.responseSchema
      ? `() => ${endpoint.responseSchema.name}`
      : '() => Boolean';

    return {
      name: methodName,
      isAsync: true,
      decorators: [{ name: decoratorName, arguments: [returnTypeArg] }],
      parameters: params,
      returnType: 'Promise<any>',
      statements: `    return this.${serviceVarName}.${methodName}(${serviceCallArgs});`,
    };
  });

  // Import models if any endpoint has response schema
  const hasModels = controller.endpoints.some((e) => e.responseSchema);
  if (hasModels) {
    const modelNames = [
      ...new Set(
        controller.endpoints
          .filter((e) => e.responseSchema)
          .map((e) => e.responseSchema!.name),
      ),
    ];
    sourceFile.addImportDeclaration({
      moduleSpecifier: `./${controller.name.toLowerCase()}.models`,
      namedImports: modelNames,
    });
  }

  sourceFile.addClass({
    name: resolverName,
    isExported: true,
    decorators: [{ name: 'Resolver', arguments: [] }],
    ctors: [
      {
        parameters: [
          {
            name: serviceVarName,
            type: serviceName,
            isReadonly: true,
            scope: 'private' as unknown as undefined,
          },
        ],
      },
    ],
    methods,
  });
}
