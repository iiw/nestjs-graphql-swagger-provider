import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';

const FIXTURES_DIR = path.resolve(__dirname, '__fixtures__');

export const FIXTURE_PATH = path.join(FIXTURES_DIR, 'petstore.json');
export const ENUM_FIXTURE_PATH = path.join(FIXTURES_DIR, 'petstore-enums.json');
export const REFS_FIXTURE_PATH = path.join(FIXTURES_DIR, 'petstore-refs.json');
export const ALLOF_FIXTURE_PATH = path.join(FIXTURES_DIR, 'petstore-allof.json');
export const PRIMITIVES_FIXTURE_PATH = path.join(FIXTURES_DIR, 'petstore-primitives.json');
export const V30_FIXTURE_PATH = path.join(FIXTURES_DIR, 'petstore-v30.json');
export const SWAGGER_V20_FIXTURE_PATH = path.join(FIXTURES_DIR, 'swagger-v20.json');
export const HYPHENATED_FIXTURE_PATH = path.join(FIXTURES_DIR, 'petstore-hyphenated.json');
export const SOPHISTICATED_FIXTURE_PATH = path.join(FIXTURES_DIR, 'sophisticated-swagger.json');
export const PRICING_API_FIXTURE_PATH = path.join(FIXTURES_DIR, 'pricing-api-swagger.json');

export function createOutputDir(prefix = 'nestjs-graphql-test-'): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), prefix));
}

export function removeOutputDir(dir: string): void {
  fs.rmSync(dir, { recursive: true, force: true });
}
