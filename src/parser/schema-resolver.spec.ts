import * as fs from 'node:fs';
import * as path from 'node:path';
import { describe, expect, it } from 'vitest';
import { resolveDocument, REF_NAME_SYMBOL, REF_PATH_SYMBOL, getRefName } from './schema-resolver.js';

function loadFixture(filePath: string): Record<string, unknown> {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

const REFS_FIXTURE_PATH = path.resolve(__dirname, '../../test/__fixtures__/petstore-refs.json');
const ALLOF_FIXTURE_PATH = path.resolve(__dirname, '../../test/__fixtures__/petstore-allof.json');
const ONEOF_FIXTURE_PATH = path.resolve(__dirname, '../../test/__fixtures__/petstore-oneof.json');

describe('resolveDocument', () => {
  it('should return a dereferenced document', async () => {
    const { document } = await resolveDocument(loadFixture(REFS_FIXTURE_PATH));
    expect(document).toBeDefined();
    expect(document.openapi).toBe('3.1.0');
  });

  it('should annotate component schemas with REF_NAME_SYMBOL', async () => {
    const { schemaRegistry } = await resolveDocument(loadFixture(REFS_FIXTURE_PATH));

    const pet = schemaRegistry.get('Pet');
    expect(pet).toBeDefined();
    expect(pet![REF_NAME_SYMBOL]).toBe('Pet');
    expect(pet![REF_PATH_SYMBOL]).toBe('#/components/schemas/Pet');
  });

  it('should populate schemaRegistry with all component schemas', async () => {
    const { schemaRegistry } = await resolveDocument(loadFixture(REFS_FIXTURE_PATH));

    expect(schemaRegistry.has('Pet')).toBe(true);
    expect(schemaRegistry.has('Owner')).toBe(true);
    expect(schemaRegistry.has('PetStatus')).toBe(true);
    expect(schemaRegistry.has('OwnerStatus')).toBe(true);
    expect(schemaRegistry.has('CreatePetInput')).toBe(true);
  });

  it('should annotate schemas referenced via $ref in operations', async () => {
    const { document } = await resolveDocument(loadFixture(REFS_FIXTURE_PATH));

    // GET /pets/{petId} response references Pet
    const getPetResponse = (document.paths?.['/pets/{petId}'] as Record<string, unknown>)?.get as Record<string, unknown>;
    const responses = getPetResponse?.responses as Record<string, unknown>;
    const resp200 = responses?.['200'] as Record<string, unknown>;
    const content = resp200?.content as Record<string, unknown>;
    const json = content?.['application/json'] as Record<string, unknown>;
    const schema = json?.schema;

    expect(getRefName(schema)).toBe('Pet');
  });

  it('should annotate schemas in allOf members', async () => {
    const { schemaRegistry } = await resolveDocument(loadFixture(ALLOF_FIXTURE_PATH));

    // Dog uses allOf with a ref to Animal
    const dogSchema = schemaRegistry.get('Dog');
    expect(dogSchema).toBeDefined();
    expect(dogSchema![REF_NAME_SYMBOL]).toBe('Dog');

    // The Animal schema should be in the registry
    const animalSchema = schemaRegistry.get('Animal');
    expect(animalSchema).toBeDefined();
    expect(animalSchema![REF_NAME_SYMBOL]).toBe('Animal');
  });

  it('should handle oneOf schemas', async () => {
    const { schemaRegistry } = await resolveDocument(loadFixture(ONEOF_FIXTURE_PATH));

    expect(schemaRegistry.has('CreateWalletInput')).toBe(true);
    expect(schemaRegistry.has('PersonalWalletInput')).toBe(true);
    expect(schemaRegistry.has('BusinessWalletInput')).toBe(true);
  });

  it('should reject Swagger 2.0 specs', async () => {
    await expect(
      resolveDocument({ swagger: '2.0', info: { title: 'test', version: '1.0' }, paths: {} }),
    ).rejects.toThrow('Unsupported OpenAPI version');
  });

  it('getRefName returns undefined for unannotated objects', () => {
    expect(getRefName({})).toBeUndefined();
    expect(getRefName(null)).toBeUndefined();
    expect(getRefName(undefined)).toBeUndefined();
  });
});
