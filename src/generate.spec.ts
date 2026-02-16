import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { generate } from './generate.js';

const FIXTURE_PATH = path.resolve(__dirname, '__fixtures__/petstore.json');
const ENUM_FIXTURE_PATH = path.resolve(__dirname, '__fixtures__/petstore-enums.json');

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
