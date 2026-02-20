import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { generate } from './generate.js';

const FIXTURE_PATH = path.resolve(__dirname, '__fixtures__/petstore.json');
const ENUM_FIXTURE_PATH = path.resolve(__dirname, '__fixtures__/petstore-enums.json');
const REFS_FIXTURE_PATH = path.resolve(__dirname, '__fixtures__/petstore-refs.json');
const ALLOF_FIXTURE_PATH = path.resolve(__dirname, '__fixtures__/petstore-allof.json');
const PRIMITIVES_FIXTURE_PATH = path.resolve(__dirname, '__fixtures__/petstore-primitives.json');
const V30_FIXTURE_PATH = path.resolve(__dirname, '__fixtures__/petstore-v30.json');
const SWAGGER_V20_FIXTURE_PATH = path.resolve(__dirname, '__fixtures__/swagger-v20.json');
const HYPHENATED_FIXTURE_PATH = path.resolve(__dirname, '__fixtures__/petstore-hyphenated.json');

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

  it('should generate module with static register method providing API_CLIENT', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.module.ts'),
      'utf-8',
    );
    expect(content).toContain('static register');
    expect(content).toContain("provide: 'API_CLIENT'");
    expect(content).toContain('useValue: apiClient');
    expect(content).toContain('DynamicModule');
  });

  it('should import Api from api-client in module', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.module.ts'),
      'utf-8',
    );
    expect(content).toContain('Api');
    expect(content).toContain("from '../api-client'");
  });

  it('should generate service with @Inject API_CLIENT decorator', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );
    expect(content).toContain("@Inject('API_CLIENT')");
    expect(content).toContain('Api');
  });

  it('should import Api from api-client in service', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );
    expect(content).toContain('Api');
    expect(content).toContain("from '../api-client'");
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

describe('generate service Api client calls', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nestjs-graphql-apicall-test-'));
  });

  afterEach(() => {
    fs.rmSync(outputDir, { recursive: true, force: true });
  });

  it('should call this.apiClient.pets.listPets with query params object', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );
    expect(content).toContain('this.apiClient.pets.listPets({ limit }, extraConfig)');
  });

  it('should call this.apiClient.pets.getPet with path param', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );
    expect(content).toContain('this.apiClient.pets.getPet(petId, extraConfig)');
  });

  it('should call this.apiClient.pets.createPet with request body', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );
    expect(content).toContain('this.apiClient.pets.createPet(input, extraConfig)');
  });

  it('should call this.apiClient.owners.listOwners for owners service', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'owners', 'owners.service.ts'),
      'utf-8',
    );
    expect(content).toContain('this.apiClient.owners.listOwners(extraConfig)');
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
    expect(content).not.toContain('input: Record<string, unknown>');
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

describe('generate with primitive responses', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nestjs-graphql-prim-test-'));
  });

  afterEach(() => {
    fs.rmSync(outputDir, { recursive: true, force: true });
  });

  it('should use @Query(() => String) for string response', async () => {
    await generate(PRIMITIVES_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'status', 'status.resolver.ts'),
      'utf-8',
    );
    expect(content).toContain('() => String');
  });

  it('should use @Query(() => Int) for integer response', async () => {
    await generate(PRIMITIVES_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'status', 'status.resolver.ts'),
      'utf-8',
    );
    expect(content).toContain('() => Int');
  });

  it('should use @Query(() => Boolean) for boolean response', async () => {
    await generate(PRIMITIVES_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'status', 'status.resolver.ts'),
      'utf-8',
    );
    expect(content).toContain('() => Boolean');
  });

  it('should use @Query(() => [String]) for string array response', async () => {
    await generate(PRIMITIVES_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'status', 'status.resolver.ts'),
      'utf-8',
    );
    expect(content).toContain('() => [String]');
  });

  it('should use @Mutation(() => Boolean) for no-response endpoint', async () => {
    await generate(PRIMITIVES_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'status', 'status.resolver.ts'),
      'utf-8',
    );
    expect(content).toContain('@Mutation(() => Boolean)');
  });

  it('should not generate models file for primitive-response endpoints', async () => {
    await generate(PRIMITIVES_FIXTURE_PATH, outputDir);

    expect(fs.existsSync(path.join(outputDir, 'status', 'status.models.ts'))).toBe(false);
  });

  it('should not generate dto file when no request bodies exist', async () => {
    await generate(PRIMITIVES_FIXTURE_PATH, outputDir);

    expect(fs.existsSync(path.join(outputDir, 'status', 'status.dto.ts'))).toBe(false);
  });

  it('should not import models in resolver when all responses are primitives', async () => {
    await generate(PRIMITIVES_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'status', 'status.resolver.ts'),
      'utf-8',
    );
    expect(content).not.toContain('status.models');
  });

  it('should import Int from @nestjs/graphql when integer response exists', async () => {
    await generate(PRIMITIVES_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'status', 'status.resolver.ts'),
      'utf-8',
    );
    expect(content).toContain('Int');
    expect(content).toContain("from '@nestjs/graphql'");
  });
});

describe('generate request config factory', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nestjs-graphql-factory-test-'));
  });

  afterEach(() => {
    fs.rmSync(outputDir, { recursive: true, force: true });
  });

  it('should export RequestConfigFactory type in module', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.module.ts'),
      'utf-8',
    );
    expect(content).toContain('export type RequestConfigFactory');
    expect(content).toContain('methodName: string');
    expect(content).toContain('args: Record<string, unknown>');
  });

  it('should have requestConfigFactory optional parameter in register()', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.module.ts'),
      'utf-8',
    );
    expect(content).toContain('requestConfigFactory?: RequestConfigFactory');
  });

  it('should conditionally provide REQUEST_CONFIG_FACTORY in module', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.module.ts'),
      'utf-8',
    );
    expect(content).toContain("provide: 'REQUEST_CONFIG_FACTORY'");
    expect(content).toContain('useValue: requestConfigFactory');
    expect(content).toContain('if (requestConfigFactory)');
  });

  it('should import Optional from @nestjs/common in service', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );
    expect(content).toContain('Optional');
    expect(content).toContain("from '@nestjs/common'");
  });

  it('should have @Optional() @Inject REQUEST_CONFIG_FACTORY in service constructor', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );
    expect(content).toContain('@Optional()');
    expect(content).toContain("@Inject('REQUEST_CONFIG_FACTORY')");
    expect(content).toContain('requestConfigFactory');
  });

  it('should include extraConfig line in service methods', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );
    expect(content).toContain("this.requestConfigFactory?.('listPets'");
    expect(content).toContain('?? {}');
  });

  it('should pass extraConfig as last argument to Api client calls', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );
    expect(content).toContain('extraConfig)');
  });

  it('should pass method arguments to factory call', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );
    // listPets has a 'limit' param
    expect(content).toContain("this.requestConfigFactory?.('listPets', { limit })");
    // createPet has an 'input' request body
    expect(content).toContain("this.requestConfigFactory?.('createPet', { input })");
  });
});

describe('generate with OpenAPI 3.0 spec', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nestjs-graphql-v30-test-'));
  });

  afterEach(() => {
    fs.rmSync(outputDir, { recursive: true, force: true });
  });

  it('should generate all expected files from a 3.0 spec', async () => {
    await generate(V30_FIXTURE_PATH, outputDir);

    const petsDir = path.join(outputDir, 'pets');
    expect(fs.existsSync(petsDir)).toBe(true);

    for (const file of [
      'pets.module.ts',
      'pets.resolver.ts',
      'pets.service.ts',
      'pets.models.ts',
      'pets.dto.ts',
    ]) {
      expect(fs.existsSync(path.join(petsDir, file))).toBe(true);
    }
  });

  it('should generate models with @ObjectType from 3.0 spec', async () => {
    await generate(V30_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.models.ts'),
      'utf-8',
    );
    expect(content).toContain('@ObjectType()');
    expect(content).toContain('class Pet');
    expect(content).toContain('@Field()');
  });

  it('should handle 3.0 nullable: true correctly', async () => {
    await generate(V30_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.models.ts'),
      'utf-8',
    );
    // age is nullable: true in the 3.0 fixture
    expect(content).toContain('nullable: true');
  });

  it('should generate DTOs with @InputType from 3.0 spec', async () => {
    await generate(V30_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.dto.ts'),
      'utf-8',
    );
    expect(content).toContain('@InputType()');
    expect(content).toContain('class CreatePetInput');
  });

  it('should generate service using Api client methods from 3.0 spec', async () => {
    await generate(V30_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );
    expect(content).toContain('this.apiClient.pets.');
  });

  it('should generate resolver with @Query and @Mutation from 3.0 spec', async () => {
    await generate(V30_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.resolver.ts'),
      'utf-8',
    );
    expect(content).toContain('@Query(');
    expect(content).toContain('@Mutation(');
  });

  it('should generate error handling from 3.0 spec', async () => {
    await generate(V30_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );
    // createPet has a 400 error response
    expect(content).toContain('HttpException');
    expect(content).toContain('400');
  });
});

describe('generate version validation', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nestjs-graphql-version-test-'));
  });

  afterEach(() => {
    fs.rmSync(outputDir, { recursive: true, force: true });
  });

  it('should reject Swagger 2.0 specs with a clear error', async () => {
    await expect(generate(SWAGGER_V20_FIXTURE_PATH, outputDir)).rejects.toThrow(
      'Unsupported OpenAPI version "2.0"',
    );
  });
});

describe('generate with hyphenated controller names', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nestjs-graphql-hyphen-test-'));
  });

  afterEach(() => {
    fs.rmSync(outputDir, { recursive: true, force: true });
  });

  it('should create kebab-case folder names for multi-word controllers', async () => {
    await generate(HYPHENATED_FIXTURE_PATH, outputDir);

    expect(fs.existsSync(path.join(outputDir, 'stake-pools'))).toBe(true);
    expect(fs.existsSync(path.join(outputDir, 'byron-wallets'))).toBe(true);
  });

  it('should create kebab-case filenames without spaces', async () => {
    await generate(HYPHENATED_FIXTURE_PATH, outputDir);

    const stakePoolsDir = path.join(outputDir, 'stake-pools');
    const expectedFiles = [
      'stake-pools.module.ts',
      'stake-pools.resolver.ts',
      'stake-pools.service.ts',
      'stake-pools.models.ts',
      'stake-pools.dto.ts',
    ];

    for (const file of expectedFiles) {
      expect(fs.existsSync(path.join(stakePoolsDir, file))).toBe(true);
    }
  });

  it('should not create filenames with spaces', async () => {
    await generate(HYPHENATED_FIXTURE_PATH, outputDir);

    const stakePoolsDir = path.join(outputDir, 'stake-pools');
    const files = fs.readdirSync(stakePoolsDir);

    for (const file of files) {
      expect(file).not.toContain(' ');
    }
  });

  it('should use kebab-case import paths in module file', async () => {
    await generate(HYPHENATED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'stake-pools', 'stake-pools.module.ts'),
      'utf-8',
    );
    expect(content).toContain("from './stake-pools.resolver'");
    expect(content).toContain("from './stake-pools.service'");
    expect(content).not.toContain("from './stake pools.");
  });

  it('should use kebab-case import paths in resolver file', async () => {
    await generate(HYPHENATED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'stake-pools', 'stake-pools.resolver.ts'),
      'utf-8',
    );
    expect(content).toContain("from './stake-pools.service'");
    expect(content).toContain("from './stake-pools.models'");
    expect(content).toContain("from './stake-pools.dto'");
    expect(content).not.toContain("from './stake pools.");
  });

  it('should use kebab-case import paths in service file', async () => {
    await generate(HYPHENATED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'stake-pools', 'stake-pools.service.ts'),
      'utf-8',
    );
    expect(content).toContain("from './stake-pools.dto'");
    expect(content).not.toContain("from './stake pools.");
  });

  it('should generate class names without hyphens in models', async () => {
    await generate(HYPHENATED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'stake-pools', 'stake-pools.models.ts'),
      'utf-8',
    );
    const classNames = [...content.matchAll(/class (\S+)/g)].map((m) => m[1]);
    for (const name of classNames) {
      expect(name).not.toContain('-');
    }
    expect(content).toContain('GetStakePoolsResponse');
    expect(content).toContain('GetStakePoolsMaintenanceActionsResponse');
  });

  it('should generate class names without hyphens in DTOs', async () => {
    await generate(HYPHENATED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'stake-pools', 'stake-pools.dto.ts'),
      'utf-8',
    );
    const classNames = [...content.matchAll(/class (\S+)/g)].map((m) => m[1]);
    for (const name of classNames) {
      expect(name).not.toContain('-');
    }
    expect(content).toContain('PostStakePoolsInput');
  });

  it('should generate valid PascalCase class names for byron-wallets controller', async () => {
    await generate(HYPHENATED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'byron-wallets', 'byron-wallets.models.ts'),
      'utf-8',
    );
    expect(content).toContain('GetByronWalletsResponse');
    expect(content).not.toContain('GetByron-wallets');
  });

  it('should generate PascalCase service and resolver class names', async () => {
    await generate(HYPHENATED_FIXTURE_PATH, outputDir);

    const moduleContent = fs.readFileSync(
      path.join(outputDir, 'stake-pools', 'stake-pools.module.ts'),
      'utf-8',
    );
    expect(moduleContent).toContain('StakePoolsModule');
    expect(moduleContent).toContain('StakePoolsResolver');
    expect(moduleContent).toContain('StakePoolsService');
  });
});

describe('generate service-to-api-client consistency', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = fs.mkdtempSync(path.join(os.tmpdir(), 'nestjs-graphql-consistency-test-'));
  });

  afterEach(() => {
    fs.rmSync(outputDir, { recursive: true, force: true });
  });

  it('should only call API client methods that actually exist in api-client.ts', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const apiClientContent = fs.readFileSync(
      path.join(outputDir, 'api-client.ts'),
      'utf-8',
    );

    for (const controller of ['pets', 'owners']) {
      const servicePath = path.join(outputDir, controller, `${controller}.service.ts`);
      if (!fs.existsSync(servicePath)) continue;

      const serviceContent = fs.readFileSync(servicePath, 'utf-8');

      // Extract all this.apiClient.<namespace>.<method>( calls
      const methodCalls = [...serviceContent.matchAll(/this\.apiClient\.(\w+)\.(\w+)\(/g)];
      expect(methodCalls.length).toBeGreaterThan(0);

      for (const match of methodCalls) {
        const [fullMatch, , methodName] = match;
        // The method should exist as a property in the Api class (e.g., "listPets:")
        expect(
          apiClientContent,
          `Service calls ${fullMatch} but "${methodName}" not found in api-client.ts`,
        ).toMatch(new RegExp(`\\b${methodName}\\b`));
      }
    }
  });

  it('should use correct namespace matching the api-client class structure', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const apiClientContent = fs.readFileSync(
      path.join(outputDir, 'api-client.ts'),
      'utf-8',
    );

    const serviceContent = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );

    // Extract namespaces used in service calls
    const namespaceCalls = [...serviceContent.matchAll(/this\.apiClient\.(\w+)\.\w+\(/g)];
    const namespaces = [...new Set(namespaceCalls.map((m) => m[1]))];

    for (const ns of namespaces) {
      // The namespace should appear as a property in the Api class (e.g., "pets = {")
      expect(
        apiClientContent,
        `Service uses namespace "${ns}" but it doesn't exist in api-client.ts`,
      ).toMatch(new RegExp(`\\b${ns}\\b\\s*=\\s*\\{`));
    }
  });
});
