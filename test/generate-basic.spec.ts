import * as fs from 'node:fs';
import * as path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { generate } from '../src/generate.js';
import {
  createOutputDir,
  FIXTURE_PATH,
  removeOutputDir,
  SWAGGER_V20_FIXTURE_PATH,
  V30_FIXTURE_PATH,
} from './helpers.js';

describe('generate', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = createOutputDir();
  });

  afterEach(() => {
    removeOutputDir(outputDir);
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

describe('generate with OpenAPI 3.0 spec', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = createOutputDir('nestjs-graphql-v30-test-');
  });

  afterEach(() => {
    removeOutputDir(outputDir);
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
    outputDir = createOutputDir('nestjs-graphql-version-test-');
  });

  afterEach(() => {
    removeOutputDir(outputDir);
  });

  it('should reject Swagger 2.0 specs with a clear error', async () => {
    await expect(generate(SWAGGER_V20_FIXTURE_PATH, outputDir)).rejects.toThrow(
      'Unsupported OpenAPI version "2.0"',
    );
  });
});
