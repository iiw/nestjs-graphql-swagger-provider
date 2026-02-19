import type { SourceFile } from 'ts-morph';
import type { ParsedController, ParsedEndpoint } from '../parser/types.js';
import {
  collectDtoNames,
  collectModelNames,
  collectParameterEnumNames,
} from './collectors.js';
import { graphqlScalarForPrimitive, tsTypeForProperty } from './type-mappers.js';
import { toCamelCase, toPascalCase } from '../utils.js';

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
    let tsType = tsTypeForProperty(param);
    if (param.isArray) tsType = `${tsType}[]`;

    const argsOpts: string[] = [];
    if (param.type === 'enum' && param.enumName) {
      argsOpts.push(`type: () => ${param.enumName}`);
    }
    if (!param.required) {
      argsOpts.push('nullable: true');
    }

    const argsArgs: string[] = [`'${param.name}'`];
    if (argsOpts.length > 0) {
      argsArgs.push(`{ ${argsOpts.join(', ')} }`);
    }

    params.push({
      name: param.name,
      type: param.required ? tsType : `${tsType} | null`,
      hasQuestionToken: !param.required,
      decorators: [{ name: 'Args', arguments: argsArgs }],
    } as {
      name: string;
      type: string;
      hasQuestionToken?: boolean;
      decorators: { name: string; arguments: string[] }[];
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
  const needsInt = controller.endpoints.some(
    (e) => e.responseSchema?.primitiveType === 'integer',
  );
  if (needsInt) gqlImports.push('Int');
  sourceFile.addImportDeclaration({
    moduleSpecifier: '@nestjs/graphql',
    namedImports: gqlImports,
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: `./${controller.name.toLowerCase()}.service`,
    namedImports: [serviceName],
  });

  // Import DTOs if any endpoint has a request body
  const dtoNames = collectDtoNames(controller);
  if (dtoNames.length > 0) {
    sourceFile.addImportDeclaration({
      moduleSpecifier: `./${controller.name.toLowerCase()}.dto`,
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
    const params = buildResolverMethodParams(endpoint);
    const serviceCallArgs = buildServiceCallArgs(endpoint);
    const decoratorName = isQuery(endpoint.method) ? 'Query' : 'Mutation';

    let returnTypeArg: string;
    if (endpoint.responseSchema?.primitiveType) {
      const scalar = graphqlScalarForPrimitive(endpoint.responseSchema.primitiveType);
      returnTypeArg = endpoint.responseSchema.isArray
        ? `() => [${scalar}]`
        : `() => ${scalar}`;
    } else if (endpoint.responseSchema) {
      returnTypeArg = `() => ${endpoint.responseSchema.name}`;
    } else {
      returnTypeArg = '() => Boolean';
    }

    return {
      name: methodName,
      isAsync: true,
      decorators: [{ name: decoratorName, arguments: [returnTypeArg] }],
      parameters: params,
      returnType: 'Promise<any>',
      statements: `    return this.${serviceVarName}.${methodName}(${serviceCallArgs});`,
    };
  });

  // Import models if any endpoint has a non-primitive response schema
  const modelNames = collectModelNames(controller);
  if (modelNames.length > 0) {
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
