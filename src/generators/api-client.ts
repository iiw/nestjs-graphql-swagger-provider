import { generateApi } from 'swagger-typescript-api';
import * as path from 'node:path';

export async function generateApiClient(input: string, outputDir: string): Promise<void> {
  const isUrl = input.startsWith('http://') || input.startsWith('https://');

  await generateApi({
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
}
