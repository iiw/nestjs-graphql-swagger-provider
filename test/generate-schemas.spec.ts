import * as fs from 'node:fs';
import * as path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { generate } from '../src/generate.js';
import {
  ALLOF_FIXTURE_PATH,
  createOutputDir,
  REFS_FIXTURE_PATH,
  removeOutputDir,
} from './helpers.js';

describe('generate with $ref fixture', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = createOutputDir('nestjs-graphql-refs-test-');
  });

  afterEach(() => {
    removeOutputDir(outputDir);
  });

  it('should generate models using $ref name (Pet) not synthetic name', async () => {
    await generate(REFS_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.models.ts'),
      'utf-8',
    );
    expect(content).toContain('class Pet');
    expect(content).not.toContain('GetPetsPetIdResponse');
  });

  it('should generate DTOs using $ref name (CreatePetInput) not synthetic name', async () => {
    await generate(REFS_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.dto.ts'),
      'utf-8',
    );
    expect(content).toContain('class CreatePetInput');
    expect(content).not.toContain('PostPetsInput');
  });

  it('should reference $ref model name in resolver return type', async () => {
    await generate(REFS_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.resolver.ts'),
      'utf-8',
    );
    expect(content).toContain('() => Pet');
  });

  it('should generate both PetStatus and OwnerStatus as separate enums', async () => {
    await generate(REFS_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(path.join(outputDir, 'enums.ts'), 'utf-8');
    expect(content).toContain('PetStatus');
    expect(content).toContain('OwnerStatus');
    expect(content).toContain("registerEnumType(PetStatus, { name: 'PetStatus' })");
    expect(content).toContain("registerEnumType(OwnerStatus, { name: 'OwnerStatus' })");
  });

  it('should use Owner model name for owners controller', async () => {
    await generate(REFS_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'owners', 'owners.models.ts'),
      'utf-8',
    );
    expect(content).toContain('class Owner');
    expect(content).not.toContain('GetOwnersResponse');
  });
});

describe('generate with allOf fixture', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = createOutputDir('nestjs-graphql-allof-test-');
  });

  afterEach(() => {
    removeOutputDir(outputDir);
  });

  it('should generate Dog extending Animal in dogs models', async () => {
    await generate(ALLOF_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'dogs', 'dogs.models.ts'),
      'utf-8',
    );
    expect(content).toContain('class Animal');
    expect(content).toContain('class Dog extends Animal');
  });

  it('should only have breed property on Dog class (not inherited id, name)', async () => {
    await generate(ALLOF_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'dogs', 'dogs.models.ts'),
      'utf-8',
    );

    // Extract the Dog class text (from "class Dog" to the next closing brace at same indent)
    const dogClassMatch = content.match(/class Dog extends Animal \{[\s\S]*?\n\}/);
    expect(dogClassMatch).not.toBeNull();
    const dogClass = dogClassMatch![0];

    expect(dogClass).toContain('breed');
    expect(dogClass).not.toContain('id');
    expect(dogClass).not.toContain('name');
  });

  it('should have id and name properties on Animal class', async () => {
    await generate(ALLOF_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'dogs', 'dogs.models.ts'),
      'utf-8',
    );

    const animalClassMatch = content.match(/class Animal \{[\s\S]*?\n\}/);
    expect(animalClassMatch).not.toBeNull();
    const animalClass = animalClassMatch![0];

    expect(animalClass).toContain('id');
    expect(animalClass).toContain('name');
  });

  it('should generate Cat extending Animal in cats models', async () => {
    await generate(ALLOF_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'cats', 'cats.models.ts'),
      'utf-8',
    );
    expect(content).toContain('class Animal');
    expect(content).toContain('class Cat extends Animal');
  });

  it('should only have color property on Cat class', async () => {
    await generate(ALLOF_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'cats', 'cats.models.ts'),
      'utf-8',
    );

    const catClassMatch = content.match(/class Cat extends Animal \{[\s\S]*?\n\}/);
    expect(catClassMatch).not.toBeNull();
    const catClass = catClassMatch![0];

    expect(catClass).toContain('color');
    expect(catClass).not.toContain('id');
    expect(catClass).not.toContain('name');
  });

  it('should generate CreateDogInput extending CreateAnimalInput in dogs DTOs', async () => {
    await generate(ALLOF_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'dogs', 'dogs.dto.ts'),
      'utf-8',
    );
    expect(content).toContain('class CreateAnimalInput');
    expect(content).toContain('class CreateDogInput extends CreateAnimalInput');
  });
});
