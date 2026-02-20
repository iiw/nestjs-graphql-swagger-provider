import * as fs from 'node:fs';
import * as path from 'node:path';
import { describe, expect, it } from 'vitest';
import { buildRefMap, extractRefName } from './ref-resolver.js';

function loadFixture(filePath: string): Record<string, unknown> {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

const REFS_FIXTURE_PATH = path.resolve(__dirname, '../../test/__fixtures__/petstore-refs.json');
const ENUM_FIXTURE_PATH = path.resolve(__dirname, '../../test/__fixtures__/petstore-enums.json');
const ALLOF_FIXTURE_PATH = path.resolve(__dirname, '../../test/__fixtures__/petstore-allof.json');

describe('extractRefName', () => {
  it('should extract the last segment of a $ref path', () => {
    expect(extractRefName('#/components/schemas/PetStatus')).toBe('PetStatus');
  });

  it('should handle single-segment refs', () => {
    expect(extractRefName('PetStatus')).toBe('PetStatus');
  });
});

describe('buildRefMap', () => {
  it('should map schema property $refs', async () => {
    const refMap = buildRefMap(loadFixture(REFS_FIXTURE_PATH));

    const petProps = refMap.schemaProperties.get('Pet');
    expect(petProps).toBeDefined();
    expect(petProps!.get('status')).toBe('PetStatus');
  });

  it('should map owner schema property $refs separately from pet', async () => {
    const refMap = buildRefMap(loadFixture(REFS_FIXTURE_PATH));

    const ownerProps = refMap.schemaProperties.get('Owner');
    expect(ownerProps).toBeDefined();
    expect(ownerProps!.get('status')).toBe('OwnerStatus');
  });

  it('should map response schema $refs for direct refs', async () => {
    const refMap = buildRefMap(loadFixture(REFS_FIXTURE_PATH));

    expect(refMap.operationSchemas.get('getPet:response')).toBe('Pet');
    expect(refMap.operationSchemas.get('createPet:response')).toBe('Pet');
  });

  it('should map response schema $refs for array items', async () => {
    const refMap = buildRefMap(loadFixture(REFS_FIXTURE_PATH));

    expect(refMap.operationSchemas.get('listPets:response')).toBe('Pet');
    expect(refMap.operationSchemas.get('listOwners:response')).toBe('Owner');
  });

  it('should map requestBody schema $refs', async () => {
    const refMap = buildRefMap(loadFixture(REFS_FIXTURE_PATH));

    expect(refMap.operationSchemas.get('createPet:requestBody')).toBe('CreatePetInput');
  });

  it('should map parameter schema $refs for direct refs', async () => {
    const refMap = buildRefMap(loadFixture(REFS_FIXTURE_PATH));

    const paramMap = refMap.parameterSchemas.get('listPets');
    expect(paramMap).toBeDefined();
    expect(paramMap!.get('status')).toBe('PetStatus');
  });

  it('should map parameter schema $refs for array items', async () => {
    const refMap = buildRefMap(loadFixture(REFS_FIXTURE_PATH));

    const paramMap = refMap.parameterSchemas.get('listPets');
    expect(paramMap).toBeDefined();
    expect(paramMap!.get('statuses')).toBe('PetStatus');
  });

  it('should handle enum fixture with schema property refs', async () => {
    const refMap = buildRefMap(loadFixture(ENUM_FIXTURE_PATH));

    const petProps = refMap.schemaProperties.get('Pet');
    expect(petProps).toBeDefined();
    expect(petProps!.get('status')).toBe('PetStatus');
    expect(petProps!.get('priority')).toBe('Priority');
  });

  it('should not include non-ref properties in schemaProperties', async () => {
    const refMap = buildRefMap(loadFixture(REFS_FIXTURE_PATH));

    const petProps = refMap.schemaProperties.get('Pet');
    expect(petProps!.has('id')).toBe(false);
    expect(petProps!.has('name')).toBe(false);
  });
});

describe('buildRefMap schemaInheritance', () => {
  it('should detect Dog as child of Animal', async () => {
    const refMap = buildRefMap(loadFixture(ALLOF_FIXTURE_PATH));
    expect(refMap.schemaInheritance.get('Dog')).toBe('Animal');
  });

  it('should detect Cat as child of Animal', async () => {
    const refMap = buildRefMap(loadFixture(ALLOF_FIXTURE_PATH));
    expect(refMap.schemaInheritance.get('Cat')).toBe('Animal');
  });

  it('should not have an inheritance entry for Animal', async () => {
    const refMap = buildRefMap(loadFixture(ALLOF_FIXTURE_PATH));
    expect(refMap.schemaInheritance.has('Animal')).toBe(false);
  });

  it('should detect CreateDogInput as child of CreateAnimalInput', async () => {
    const refMap = buildRefMap(loadFixture(ALLOF_FIXTURE_PATH));
    expect(refMap.schemaInheritance.get('CreateDogInput')).toBe('CreateAnimalInput');
  });
});
