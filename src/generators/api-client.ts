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
