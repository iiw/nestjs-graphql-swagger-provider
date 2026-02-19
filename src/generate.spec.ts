import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { generate } from './generate.js';

const FIXTURE_PATH = path.resolve(__dirname, '__fixtures__/petstore.json');
const ENUM_FIXTURE_PATH = path.resolve(__dirname, '__fixtures__/petstore-enums.json');
const REFS_FIXTURE_PATH = path.resolve(__dirname, '__fixtures__/petstore-refs.json');
const ALLOF_FIXTURE_PATH = path.resolve(__dirname, '__fixtures__/petstore-allof.json');

describe('generate', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nestjs-graphql-test-'));
  });

  afterEach(() => {
    fs.rmSync(outputDir, { recursive: true, force: true });
  });

  it('should generate api-client.ts in the output directory', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const apiClientPath = path.join(outputDir, 'api-client.ts');
    expect(fs.existsSync(apiClientPath)).toBe(true);

    const content = fs.readFileSync(apiClientPath, 'utf-8');
    expect(content).toContain('axios');
  });

  it('should generate a Pets feature folder with all module files', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const petsDir = path.join(outputDir, 'pets');
    expect(fs.existsSync(petsDir)).toBe(true);

    const expectedFiles = [
      'pets.module.ts',
      'pets.resolver.ts',
      'pets.service.ts',
      'pets.models.ts',
      'pets.dto.ts',
    ];

    for (const file of expectedFiles) {
      expect(fs.existsSync(path.join(petsDir, file))).toBe(true);
    }
  });

  it('should generate an Owners feature folder', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const ownersDir = path.join(outputDir, 'owners');
    expect(fs.existsSync(ownersDir)).toBe(true);

    expect(fs.existsSync(path.join(ownersDir, 'owners.module.ts'))).toBe(true);
    expect(fs.existsSync(path.join(ownersDir, 'owners.resolver.ts'))).toBe(true);
    expect(fs.existsSync(path.join(ownersDir, 'owners.service.ts'))).toBe(true);
  });

  it('should generate models with @ObjectType decorator', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const modelsContent = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.models.ts'),
      'utf-8',
    );

    expect(modelsContent).toContain('@ObjectType()');
    expect(modelsContent).toContain('@Field()');
    expect(modelsContent).toContain("from '@nestjs/graphql'");
  });

  it('should generate DTOs with @InputType decorator', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const dtosContent = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.dto.ts'),
      'utf-8',
    );

    expect(dtosContent).toContain('@InputType()');
    expect(dtosContent).toContain('@Field()');
  });

  it('should generate service with @Injectable decorator', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const serviceContent = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );

    expect(serviceContent).toContain('@Injectable()');
    expect(serviceContent).toContain("from '@nestjs/common'");
  });

  it('should generate resolver with @Query and @Mutation decorators', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const resolverContent = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.resolver.ts'),
      'utf-8',
    );

    expect(resolverContent).toContain('@Resolver()');
    expect(resolverContent).toContain('@Query(');
    expect(resolverContent).toContain('@Mutation(');
    expect(resolverContent).toContain("from '@nestjs/graphql'");
  });

  it('should generate module with @Module decorator', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const moduleContent = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.module.ts'),
      'utf-8',
    );

    expect(moduleContent).toContain('@Module(');
    expect(moduleContent).toContain('PetsResolver');
    expect(moduleContent).toContain('PetsService');
  });

  it('should not generate enums.ts when spec has no enums', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const enumsPath = path.join(outputDir, 'enums.ts');
    expect(fs.existsSync(enumsPath)).toBe(false);
  });
});

describe('generate with enums', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nestjs-graphql-enum-test-'));
  });

  afterEach(() => {
    fs.rmSync(outputDir, { recursive: true, force: true });
  });

  it('should generate enums.ts at the output root', async () => {
    await generate(ENUM_FIXTURE_PATH, outputDir);

    const enumsPath = path.join(outputDir, 'enums.ts');
    expect(fs.existsSync(enumsPath)).toBe(true);
  });

  it('should generate enum declarations with registerEnumType', async () => {
    await generate(ENUM_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(path.join(outputDir, 'enums.ts'), 'utf-8');
    expect(content).toContain('registerEnumType');
    expect(content).toContain('enum PetStatus');
    expect(content).toContain('enum Priority');
  });

  it('should generate named string enum members correctly', async () => {
    await generate(ENUM_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(path.join(outputDir, 'enums.ts'), 'utf-8');
    expect(content).toContain("Available = 'available'");
    expect(content).toContain("Pending = 'pending'");
    expect(content).toContain("Sold = 'sold'");
  });

  it('should generate integer enum members correctly', async () => {
    await generate(ENUM_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(path.join(outputDir, 'enums.ts'), 'utf-8');
    expect(content).toContain('Value_1 = 1');
    expect(content).toContain('Value_2 = 2');
    expect(content).toContain('Value_3 = 3');
  });

  it('should generate inline enum (PetSize)', async () => {
    await generate(ENUM_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(path.join(outputDir, 'enums.ts'), 'utf-8');
    expect(content).toContain('enum PetSize');
    expect(content).toContain("Small = 'small'");
    expect(content).toContain("Medium = 'medium'");
    expect(content).toContain("Large = 'large'");
  });

  it('should import enums in models that use enum fields', async () => {
    await generate(ENUM_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(path.join(outputDir, 'pets', 'pets.models.ts'), 'utf-8');
    expect(content).toContain("from '../enums'");
    expect(content).toContain('PetStatus');
  });

  it('should use explicit enum type in @Field decorator for enum properties', async () => {
    await generate(ENUM_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(path.join(outputDir, 'pets', 'pets.models.ts'), 'utf-8');
    expect(content).toContain('() => PetStatus');
  });

  it('should import enums in DTOs that use enum fields', async () => {
    await generate(ENUM_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(path.join(outputDir, 'pets', 'pets.dto.ts'), 'utf-8');
    expect(content).toContain("from '../enums'");
    expect(content).toContain('PetStatus');
  });

  it('should import enums in resolver when parameters use enums', async () => {
    await generate(ENUM_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.resolver.ts'),
      'utf-8',
    );
    expect(content).toContain("from '../enums'");
    expect(content).toContain('PetStatus');
  });
});

describe('generate with $ref fixture', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nestjs-graphql-refs-test-'));
  });

  afterEach(() => {
    fs.rmSync(outputDir, { recursive: true, force: true });
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
    expect(content).toContain('enum PetStatus');
    expect(content).toContain('enum OwnerStatus');
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
    outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nestjs-graphql-allof-test-'));
  });

  afterEach(() => {
    fs.rmSync(outputDir, { recursive: true, force: true });
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

describe('generate module DI', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nestjs-graphql-di-test-'));
  });

  afterEach(() => {
    fs.rmSync(outputDir, { recursive: true, force: true });
  });

  it('should generate module with static register method providing HTTP_CLIENT', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.module.ts'),
      'utf-8',
    );
    expect(content).toContain('static register');
    expect(content).toContain("provide: 'HTTP_CLIENT'");
    expect(content).toContain('useValue: httpClient');
    expect(content).toContain('DynamicModule');
  });

  it('should generate service with @Inject HTTP_CLIENT decorator', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );
    expect(content).toContain("@Inject('HTTP_CLIENT')");
    expect(content).toContain('AxiosInstance');
  });

  it('should import Inject from @nestjs/common in service', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );
    expect(content).toContain('Inject');
    expect(content).toContain("from '@nestjs/common'");
  });
});

describe('generate optional params', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nestjs-graphql-params-test-'));
  });

  afterEach(() => {
    fs.rmSync(outputDir, { recursive: true, force: true });
  });

  it('should mark optional query params as nullable in resolver @Args', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.resolver.ts'),
      'utf-8',
    );
    // The 'limit' param in listPets is required: false
    expect(content).toContain('nullable: true');
  });

  it('should not mark required path params as nullable', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.resolver.ts'),
      'utf-8',
    );
    // petId is a required path param — its @Args should not have nullable
    // Extract the getPet method to check petId specifically
    const getPetMatch = content.match(/getPet[\s\S]*?petId[\s\S]*?\)/);
    expect(getPetMatch).not.toBeNull();
    expect(getPetMatch![0]).not.toContain('nullable');
  });
});

describe('generate service request body types', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nestjs-graphql-svctype-test-'));
  });

  afterEach(() => {
    fs.rmSync(outputDir, { recursive: true, force: true });
  });

  it('should use DTO type name in service method params instead of Record', async () => {
    await generate(REFS_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );
    expect(content).toContain('input: CreatePetInput');
    expect(content).not.toContain('Record<string, unknown>');
  });

  it('should import DTO types in service', async () => {
    await generate(REFS_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );
    expect(content).toContain('CreatePetInput');
    expect(content).toContain("from './pets.dto'");
  });
});
