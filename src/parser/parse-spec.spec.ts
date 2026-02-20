import * as fs from 'node:fs';
import * as path from 'node:path';
import { describe, expect, it } from 'vitest';
import { parseSpec } from './parse-spec.js';

function loadFixture(filePath: string): Record<string, unknown> {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

const FIXTURE_PATH = path.resolve(__dirname, '../../test/__fixtures__/petstore.json');
const ENUM_FIXTURE_PATH = path.resolve(__dirname, '../../test/__fixtures__/petstore-enums.json');
const REFS_FIXTURE_PATH = path.resolve(__dirname, '../../test/__fixtures__/petstore-refs.json');
const ALLOF_FIXTURE_PATH = path.resolve(__dirname, '../../test/__fixtures__/petstore-allof.json');

describe('parseSpec', () => {
  it('should parse the petstore fixture into controllers', async () => {
    const spec = await parseSpec(loadFixture(FIXTURE_PATH));

    expect(spec.controllers).toHaveLength(2);

    const names = spec.controllers.map((c) => c.name).sort();
    expect(names).toEqual(['Owners', 'Pets']);
  });

  it('should parse Pets controller endpoints', async () => {
    const spec = await parseSpec(loadFixture(FIXTURE_PATH));
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
    const spec = await parseSpec(loadFixture(FIXTURE_PATH));
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
    const spec = await parseSpec(loadFixture(FIXTURE_PATH));
    const pets = spec.controllers.find((c) => c.name === 'Pets')!;
    const createPet = pets.endpoints.find((e) => e.operationId === 'createPet')!;

    expect(createPet.method).toBe('post');
    expect(createPet.requestBody).toBeDefined();
    expect(createPet.requestBody!.properties.length).toBeGreaterThan(0);
  });

  it('should extract path parameters', async () => {
    const spec = await parseSpec(loadFixture(FIXTURE_PATH));
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
    const spec = await parseSpec(loadFixture(FIXTURE_PATH));
    const pets = spec.controllers.find((c) => c.name === 'Pets')!;
    const getPet = pets.endpoints.find((e) => e.operationId === 'getPet')!;

    expect(getPet.errorResponses).toHaveLength(1);
    expect(getPet.errorResponses[0].statusCode).toBe(404);
  });

  it('should parse global schemas', async () => {
    const spec = await parseSpec(loadFixture(FIXTURE_PATH));

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
    const spec = await parseSpec(loadFixture(FIXTURE_PATH));
    const owners = spec.controllers.find((c) => c.name === 'Owners')!;

    expect(owners.endpoints).toHaveLength(1);
    expect(owners.endpoints[0].operationId).toBe('listOwners');
    expect(owners.endpoints[0].method).toBe('get');
  });

  it('should return an empty enums array when no enums exist', async () => {
    const spec = await parseSpec(loadFixture(FIXTURE_PATH));
    expect(spec.enums).toEqual([]);
  });
});

describe('parseSpec enums', () => {
  it('should extract named string enums from components/schemas', async () => {
    const spec = await parseSpec(loadFixture(ENUM_FIXTURE_PATH));

    const petStatus = spec.enums.find((e) => e.name === 'PetStatus');
    expect(petStatus).toBeDefined();
    expect(petStatus!.values).toEqual(['available', 'pending', 'sold']);
    expect(petStatus!.type).toBe('string');
  });

  it('should extract named integer enums from components/schemas', async () => {
    const spec = await parseSpec(loadFixture(ENUM_FIXTURE_PATH));

    const priority = spec.enums.find((e) => e.name === 'Priority');
    expect(priority).toBeDefined();
    expect(priority!.values).toEqual([1, 2, 3]);
    expect(priority!.type).toBe('integer');
  });

  it('should extract inline string enums and derive names', async () => {
    const spec = await parseSpec(loadFixture(ENUM_FIXTURE_PATH));

    const petSize = spec.enums.find((e) => e.name === 'PetSize');
    expect(petSize).toBeDefined();
    expect(petSize!.values).toEqual(['small', 'medium', 'large']);
    expect(petSize!.type).toBe('string');
  });

  it('should set enumName on properties referencing a named enum', async () => {
    const spec = await parseSpec(loadFixture(ENUM_FIXTURE_PATH));
    const pets = spec.controllers.find((c) => c.name === 'Pets')!;
    const getPet = pets.endpoints.find((e) => e.operationId === 'getPet')!;
    const statusProp = getPet.responseSchema!.properties.find((p) => p.name === 'status')!;

    expect(statusProp.type).toBe('enum');
    expect(statusProp.enumName).toBe('PetStatus');
    expect(statusProp.enumValues).toEqual(['available', 'pending', 'sold']);
  });

  it('should set enumName on inline enum properties', async () => {
    const spec = await parseSpec(loadFixture(ENUM_FIXTURE_PATH));
    const pets = spec.controllers.find((c) => c.name === 'Pets')!;
    const getPet = pets.endpoints.find((e) => e.operationId === 'getPet')!;
    const sizeProp = getPet.responseSchema!.properties.find((p) => p.name === 'size')!;

    expect(sizeProp.type).toBe('enum');
    expect(sizeProp.enumName).toBeDefined();
    expect(sizeProp.enumValues).toEqual(['small', 'medium', 'large']);
  });

  it('should set enumName on enum query parameters', async () => {
    const spec = await parseSpec(loadFixture(ENUM_FIXTURE_PATH));
    const pets = spec.controllers.find((c) => c.name === 'Pets')!;
    const listPets = pets.endpoints.find((e) => e.operationId === 'listPets')!;
    const statusParam = listPets.parameters.find((p) => p.name === 'status')!;

    expect(statusParam.type).toBe('enum');
    expect(statusParam.enumName).toBe('PetStatus');
    expect(statusParam.enumValues).toEqual(['available', 'pending', 'sold']);
  });

  it('should not duplicate enums between global and inline', async () => {
    const spec = await parseSpec(loadFixture(ENUM_FIXTURE_PATH));

    const petStatusEnums = spec.enums.filter((e) => e.name === 'PetStatus');
    expect(petStatusEnums).toHaveLength(1);
  });
});

describe('parseSpec $ref resolution', () => {
  it('should use $ref name for response schema instead of synthetic name', async () => {
    const spec = await parseSpec(loadFixture(REFS_FIXTURE_PATH));
    const pets = spec.controllers.find((c) => c.name === 'Pets')!;
    const getPet = pets.endpoints.find((e) => e.operationId === 'getPet')!;

    expect(getPet.responseSchema).toBeDefined();
    expect(getPet.responseSchema!.name).toBe('Pet');
  });

  it('should use $ref name for array response schema', async () => {
    const spec = await parseSpec(loadFixture(REFS_FIXTURE_PATH));
    const pets = spec.controllers.find((c) => c.name === 'Pets')!;
    const listPets = pets.endpoints.find((e) => e.operationId === 'listPets')!;

    expect(listPets.responseSchema).toBeDefined();
    expect(listPets.responseSchema!.name).toBe('Pet');
  });

  it('should use $ref name for request body instead of synthetic name', async () => {
    const spec = await parseSpec(loadFixture(REFS_FIXTURE_PATH));
    const pets = spec.controllers.find((c) => c.name === 'Pets')!;
    const createPet = pets.endpoints.find((e) => e.operationId === 'createPet')!;

    expect(createPet.requestBody).toBeDefined();
    expect(createPet.requestBody!.name).toBe('CreatePetInput');
  });

  it('should resolve enum name via $ref for schema properties', async () => {
    const spec = await parseSpec(loadFixture(REFS_FIXTURE_PATH));
    const pets = spec.controllers.find((c) => c.name === 'Pets')!;
    const getPet = pets.endpoints.find((e) => e.operationId === 'getPet')!;
    const statusProp = getPet.responseSchema!.properties.find((p) => p.name === 'status')!;

    expect(statusProp.type).toBe('enum');
    expect(statusProp.enumName).toBe('PetStatus');
  });

  it('should distinguish colliding enum values via $ref names', async () => {
    const spec = await parseSpec(loadFixture(REFS_FIXTURE_PATH));

    // Both PetStatus and OwnerStatus have ["active", "inactive"]
    const petStatus = spec.enums.find((e) => e.name === 'PetStatus');
    const ownerStatus = spec.enums.find((e) => e.name === 'OwnerStatus');

    expect(petStatus).toBeDefined();
    expect(ownerStatus).toBeDefined();
    expect(petStatus!.values).toEqual(['active', 'inactive']);
    expect(ownerStatus!.values).toEqual(['active', 'inactive']);
  });

  it('should resolve Pet.status as PetStatus and Owner.status as OwnerStatus', async () => {
    const spec = await parseSpec(loadFixture(REFS_FIXTURE_PATH));

    const petSchema = spec.schemas.find((s) => s.name === 'Pet')!;
    const petStatusProp = petSchema.properties.find((p) => p.name === 'status')!;
    expect(petStatusProp.enumName).toBe('PetStatus');

    const ownerSchema = spec.schemas.find((s) => s.name === 'Owner')!;
    const ownerStatusProp = ownerSchema.properties.find((p) => p.name === 'status')!;
    expect(ownerStatusProp.enumName).toBe('OwnerStatus');
  });

  it('should resolve enum name via $ref for query parameters', async () => {
    const spec = await parseSpec(loadFixture(REFS_FIXTURE_PATH));
    const pets = spec.controllers.find((c) => c.name === 'Pets')!;
    const listPets = pets.endpoints.find((e) => e.operationId === 'listPets')!;
    const statusParam = listPets.parameters.find((p) => p.name === 'status')!;

    expect(statusParam.type).toBe('enum');
    expect(statusParam.enumName).toBe('PetStatus');
    expect(statusParam.enumValues).toEqual(['active', 'inactive']);
  });

  it('should resolve array-of-enum parameters via $ref', async () => {
    const spec = await parseSpec(loadFixture(REFS_FIXTURE_PATH));
    const pets = spec.controllers.find((c) => c.name === 'Pets')!;
    const listPets = pets.endpoints.find((e) => e.operationId === 'listPets')!;
    const statusesParam = listPets.parameters.find((p) => p.name === 'statuses')!;

    expect(statusesParam.type).toBe('enum');
    expect(statusesParam.isArray).toBe(true);
    expect(statusesParam.enumName).toBe('PetStatus');
    expect(statusesParam.enumValues).toEqual(['active', 'inactive']);
  });

  it('should not produce duplicate enums', async () => {
    const spec = await parseSpec(loadFixture(REFS_FIXTURE_PATH));

    const petStatusEnums = spec.enums.filter((e) => e.name === 'PetStatus');
    expect(petStatusEnums).toHaveLength(1);

    const ownerStatusEnums = spec.enums.filter((e) => e.name === 'OwnerStatus');
    expect(ownerStatusEnums).toHaveLength(1);
  });
});

describe('parseSpec allOf', () => {
  it('should set extends on Dog response schema', async () => {
    const spec = await parseSpec(loadFixture(ALLOF_FIXTURE_PATH));
    const dogs = spec.controllers.find((c) => c.name === 'Dogs')!;
    const getDog = dogs.endpoints.find((e) => e.operationId === 'getDog')!;

    expect(getDog.responseSchema).toBeDefined();
    expect(getDog.responseSchema!.name).toBe('Dog');
    expect(getDog.responseSchema!.extends).toBe('Animal');
  });

  it('should include all merged properties on Dog response schema', async () => {
    const spec = await parseSpec(loadFixture(ALLOF_FIXTURE_PATH));
    const dogs = spec.controllers.find((c) => c.name === 'Dogs')!;
    const getDog = dogs.endpoints.find((e) => e.operationId === 'getDog')!;

    const propNames = getDog.responseSchema!.properties.map((p) => p.name);
    expect(propNames).toContain('id');
    expect(propNames).toContain('name');
    expect(propNames).toContain('breed');
  });

  it('should set extends on global Dog schema', async () => {
    const spec = await parseSpec(loadFixture(ALLOF_FIXTURE_PATH));
    const dog = spec.schemas.find((s) => s.name === 'Dog');

    expect(dog).toBeDefined();
    expect(dog!.extends).toBe('Animal');
  });

  it('should set extends on CreateDogInput request body', async () => {
    const spec = await parseSpec(loadFixture(ALLOF_FIXTURE_PATH));
    const dogs = spec.controllers.find((c) => c.name === 'Dogs')!;
    const createDog = dogs.endpoints.find((e) => e.operationId === 'createDog')!;

    expect(createDog.requestBody).toBeDefined();
    expect(createDog.requestBody!.name).toBe('CreateDogInput');
    expect(createDog.requestBody!.extends).toBe('CreateAnimalInput');
  });

  it('should not set extends on Animal (no parent)', async () => {
    const spec = await parseSpec(loadFixture(ALLOF_FIXTURE_PATH));
    const animal = spec.schemas.find((s) => s.name === 'Animal');

    expect(animal).toBeDefined();
    expect(animal!.extends).toBeUndefined();
  });
});
