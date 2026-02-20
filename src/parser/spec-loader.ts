import * as fs from 'node:fs';
import * as path from 'node:path';

/**
 * Loads an OpenAPI spec from a URL or file path and returns the parsed JSON object.
 * By loading the spec into memory first, we avoid issues where SwaggerParser
 * fails to resolve internal $ref pointers when the spec is fetched by URL.
 */
export async function loadSpec(input: string): Promise<Record<string, unknown>> {
  const isUrl = input.startsWith('http://') || input.startsWith('https://');

  if (isUrl) {
    const response = await fetch(input);
    if (!response.ok) {
      throw new Error(`Failed to fetch spec from ${input}: ${response.status} ${response.statusText}`);
    }
    return (await response.json()) as Record<string, unknown>;
  }

  const resolved = path.resolve(input);
  const content = fs.readFileSync(resolved, 'utf-8');
  return JSON.parse(content) as Record<string, unknown>;
}
