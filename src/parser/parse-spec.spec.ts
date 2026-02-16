import * as path from 'node:path';
import { describe, expect, it } from 'vitest';
import { parseSpec } from './parse-spec.js';

const FIXTURE_PATH = path.resolve(__dirname, '../__fixtures__/petstore.json');

describe('parseSpec', () => {
  it('should parse the petstore fixture into controllers', async () => {
    const spec = await parseSpec(FIXTURE_PATH);

    expect(spec.controllers).toHaveLength(2);

    const names = spec.controllers.map((c) => c.name).sort();
    expect(names).toEqual(['Owners', 'Pets']);
  });

  it('should parse Pets controller endpoints', async () => {
    const spec = await parseSpec(FIXTURE_PATH);
    const pets = spec.controllers.find((c) => c.name === 'Pets')!;

    expect(pets.endpoints).toHaveLength(5);

    const operationIds = pets.endpoints.map((e) => e.operationId);
    expect(operationIds).toContain('listPets');
    expect(operationIds).toContain('createPet');
    expect(operationIds).toContain('getPet');
    expect(operationIds).toContain('updatePet');
    expect(operationIds).toContain('deletePet');
  });

  it('should extract GET endpoints correctly', async () => {
    const spec = await parseSpec(FIXTURE_PATH);
    const pets = spec.controllers.find((c) => c.name === 'Pets')!;
    const listPets = pets.endpoints.find((e) => e.operationId === 'listPets')!;

    expect(listPets.method).toBe('get');
    expect(listPets.path).toBe('/pets');
    expect(listPets.parameters).toHaveLength(1);
    expect(listPets.parameters[0]).toMatchObject({
      name: 'limit',
      location: 'query',
      type: 'number',
      required: false,
    });
    expect(listPets.responseSchema).toBeDefined();
  });

  it('should extract POST endpoints with request body', async () => {
    const spec = await parseSpec(FIXTURE_PATH);
    const pets = spec.controllers.find((c) => c.name === 'Pets')!;
    const createPet = pets.endpoints.find((e) => e.operationId === 'createPet')!;

    expect(createPet.method).toBe('post');
    expect(createPet.requestBody).toBeDefined();
    expect(createPet.requestBody!.properties.length).toBeGreaterThan(0);
  });

  it('should extract path parameters', async () => {
    const spec = await parseSpec(FIXTURE_PATH);
    const pets = spec.controllers.find((c) => c.name === 'Pets')!;
    const getPet = pets.endpoints.find((e) => e.operationId === 'getPet')!;

    expect(getPet.parameters).toHaveLength(1);
    expect(getPet.parameters[0]).toMatchObject({
      name: 'petId',
      location: 'path',
      type: 'string',
      required: true,
    });
  });

  it('should extract error responses', async () => {
    const spec = await parseSpec(FIXTURE_PATH);
    const pets = spec.controllers.find((c) => c.name === 'Pets')!;
    const getPet = pets.endpoints.find((e) => e.operationId === 'getPet')!;

    expect(getPet.errorResponses).toHaveLength(1);
    expect(getPet.errorResponses[0].statusCode).toBe(404);
  });

  it('should parse global schemas', async () => {
    const spec = await parseSpec(FIXTURE_PATH);

    expect(spec.schemas.length).toBeGreaterThanOrEqual(1);

    const pet = spec.schemas.find((s) => s.name === 'Pet');
    expect(pet).toBeDefined();
    expect(pet!.properties).toHaveLength(4);

    const idProp = pet!.properties.find((p) => p.name === 'id')!;
    expect(idProp.type).toBe('string');
    expect(idProp.required).toBe(true);

    const ageProp = pet!.properties.find((p) => p.name === 'age')!;
    expect(ageProp.type).toBe('number');
    expect(ageProp.nullable).toBe(true);

    const tagsProp = pet!.properties.find((p) => p.name === 'tags')!;
    expect(tagsProp.isArray).toBe(true);
  });

  it('should parse the Owners controller', async () => {
    const spec = await parseSpec(FIXTURE_PATH);
    const owners = spec.controllers.find((c) => c.name === 'Owners')!;

    expect(owners.endpoints).toHaveLength(1);
    expect(owners.endpoints[0].operationId).toBe('listOwners');
    expect(owners.endpoints[0].method).toBe('get');
  });
});
