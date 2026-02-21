import { generateApi } from 'swagger-typescript-api';
import * as path from 'node:path';

export type RouteMap = Map<string, { methodName: string; namespace: string }>;

export async function generateApiClient(input: string, outputDir: string): Promise<RouteMap> {
  const isUrl = input.startsWith('http://') || input.startsWith('https://');

  const result = await generateApi({
    ...(isUrl ? { url: input } : { input: path.resolve(input) }),
    output: path.resolve(outputDir),
    fileName: 'api-client.ts',
    httpClientType: 'axios',
    singleHttpClient: true,
    generateClient: true,
    extractRequestParams: true,
    extractRequestBody: true,
    extractResponseBody: true,
    extractResponseError: true,
    extractEnums: true,
    modular: false,
    silent: true,
  });

  const routeMap: RouteMap = new Map();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- routes structure not exported in swagger-typescript-api types
  const config = result.configuration as any;
  const routes = config?.routes;

  if (routes?.combined) {
    for (const group of routes.combined) {
      for (const route of group.routes) {
        if (route.raw?.operationId) {
          routeMap.set(route.raw.operationId, {
            methodName: route.routeName.usage,
            namespace: route.raw.moduleName,
          });
        }
      }
    }
  }

  if (routes?.outOfModule) {
    for (const route of routes.outOfModule) {
      if (route.raw?.operationId) {
        routeMap.set(route.raw.operationId, {
          methodName: route.routeName.usage,
          namespace: route.raw.moduleName,
        });
      }
    }
  }

  return routeMap;
}

/**
 * Extract body parameter type names from the generated api-client source for the given method names.
 * Returns a map of methodName → body type name (e.g. "createWallet" → "CreateWalletInput").
 */
export function extractApiClientBodyTypes(
  apiClientContent: string,
  methodNames: string[],
): Map<string, string> {
  const result = new Map<string, string>();

  for (const methodName of methodNames) {
    // Match the method signature: methodName: (params...) =>
    const sigPattern = new RegExp(
      `\\b${methodName}:\\s*\\(([\\s\\S]*?)\\)\\s*=>`,
    );
    const sigMatch = apiClientContent.match(sigPattern);
    if (!sigMatch) continue;

    // Look for `data: TypeName` in the captured parameters
    const dataPattern = /\bdata:\s*([A-Za-z_]\w*)/;
    const dataMatch = sigMatch[1].match(dataPattern);
    if (dataMatch) {
      result.set(methodName, dataMatch[1]);
    }
  }

  return result;
}
