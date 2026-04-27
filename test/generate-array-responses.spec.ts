import * as fs from 'node:fs';
import * as path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { generate } from '../src/generate.js';
import {
  ARRAY_RESPONSES_FIXTURE_PATH,
  FIXTURE_PATH,
  REFS_FIXTURE_PATH,
  createOutputDir,
  removeOutputDir,
} from './helpers.js';

describe('array object response types', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = createOutputDir('nestjs-graphql-array-test-');
  });

  afterEach(() => {
    removeOutputDir(outputDir);
  });

  it('GET returning array of objects generates @Query(() => [Model])', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const resolver = fs.readFileSync(path.join(outputDir, 'pets', 'pets.resolver.ts'), 'utf-8');

    expect(resolver).toContain('@Query(() => [Pet]');
  });

  it('GET returning single object generates @Query(() => Model) without brackets', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const resolver = fs.readFileSync(path.join(outputDir, 'pets', 'pets.resolver.ts'), 'utf-8');

    expect(resolver).toContain('@Query(() => Pet,');
  });

  it('GET returning array of objects imports the model class', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const resolver = fs.readFileSync(path.join(outputDir, 'pets', 'pets.resolver.ts'), 'utf-8');

    expect(resolver).toMatch(/import\s*\{[^}]*Pet[^}]*\}/);
    expect(resolver).toContain("pets.models");
  });

  it('second controller GET returning array generates [Model] return type', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const resolver = fs.readFileSync(path.join(outputDir, 'owners', 'owners.resolver.ts'), 'utf-8');

    expect(resolver).toContain('@Query(() => [Owner]');
  });

  it('mutation returning array of objects generates @Mutation(() => [Model])', async () => {
    await generate(ARRAY_RESPONSES_FIXTURE_PATH, outputDir);

    const resolver = fs.readFileSync(path.join(outputDir, 'pets', 'pets.resolver.ts'), 'utf-8');

    expect(resolver).toContain('@Mutation(() => [Pet]');
  });

  it('GET returning single object and GET returning array co-exist correctly', async () => {
    await generate(ARRAY_RESPONSES_FIXTURE_PATH, outputDir);

    const resolver = fs.readFileSync(path.join(outputDir, 'pets', 'pets.resolver.ts'), 'utf-8');

    expect(resolver).toContain('@Query(() => [Pet]');
    expect(resolver).toContain('@Query(() => Pet,');
    expect(resolver).not.toMatch(/@Query\(\(\)\s*=>\s*Pet\s*\)/);
  });

  it('separate controller GET returning array generates [Model] independently', async () => {
    await generate(ARRAY_RESPONSES_FIXTURE_PATH, outputDir);

    const resolver = fs.readFileSync(path.join(outputDir, 'tags', 'tags.resolver.ts'), 'utf-8');

    expect(resolver).toContain('@Query(() => [Tag]');
  });

  it('refs fixture: GET /pets array response generates [Pet] return type', async () => {
    await generate(REFS_FIXTURE_PATH, outputDir);

    const petsResolver = fs.readFileSync(path.join(outputDir, 'pets', 'pets.resolver.ts'), 'utf-8');

    expect(petsResolver).toContain('@Query(() => [Pet]');
  });

  it('refs fixture: GET /owners array response generates [Owner] return type', async () => {
    await generate(REFS_FIXTURE_PATH, outputDir);

    const ownersResolver = fs.readFileSync(path.join(outputDir, 'owners', 'owners.resolver.ts'), 'utf-8');

    expect(ownersResolver).toContain('@Query(() => [Owner]');
  });

  it('array response model class is still generated in the models file', async () => {
    await generate(ARRAY_RESPONSES_FIXTURE_PATH, outputDir);

    const models = fs.readFileSync(path.join(outputDir, 'pets', 'pets.models.ts'), 'utf-8');

    expect(models).toContain('@ObjectType()');
    expect(models).toContain('class Pet');
  });
});
