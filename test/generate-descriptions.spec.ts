import * as fs from 'node:fs';
import * as path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { generate } from '../src/generate.js';
import { createOutputDir, DESCRIPTIONS_FIXTURE_PATH, removeOutputDir } from './helpers.js';

describe('generate with OpenAPI descriptions', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = createOutputDir('nestjs-graphql-desc-test-');
  });

  afterEach(() => {
    removeOutputDir(outputDir);
  });

  it('should include property descriptions in @Field() for models', async () => {
    await generate(DESCRIPTIONS_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.models.ts'),
      'utf-8',
    );
    expect(content).toContain("description: 'Unique identifier for the pet'");
    expect(content).toContain("description: 'The pet\\'s name'");
    expect(content).toContain("description: 'Age of the pet in years'");
  });

  it('should include property descriptions in @Field() for DTOs', async () => {
    await generate(DESCRIPTIONS_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.dto.ts'),
      'utf-8',
    );
    expect(content).toContain("description: 'The pet\\'s name'");
    expect(content).toContain("description: 'Age of the pet in years'");
  });

  it('should not include description for properties without one', async () => {
    await generate(DESCRIPTIONS_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.models.ts'),
      'utf-8',
    );
    // 'breed' has no description — its @Field should not contain 'description:'
    const breedMatch = content.match(/@Field\(\)[\s\S]*?breed/);
    expect(breedMatch).not.toBeNull();
    expect(breedMatch![0]).not.toContain('description');
  });

  it('should include operation summary as description in @Query()', async () => {
    await generate(DESCRIPTIONS_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.resolver.ts'),
      'utf-8',
    );
    expect(content).toContain("{ description: 'List all pets' }");
    expect(content).toContain("{ description: 'Get a pet by ID' }");
  });

  it('should include operation summary as description in @Mutation()', async () => {
    await generate(DESCRIPTIONS_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.resolver.ts'),
      'utf-8',
    );
    expect(content).toContain("{ description: 'Create a new pet' }");
  });

  it('should fall back to operation description when summary is absent', async () => {
    await generate(DESCRIPTIONS_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.resolver.ts'),
      'utf-8',
    );
    // deletePet has no summary, but has description
    expect(content).toContain("{ description: 'Permanently removes a pet from the system' }");
  });

  it('should include parameter description in @Args()', async () => {
    await generate(DESCRIPTIONS_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.resolver.ts'),
      'utf-8',
    );
    expect(content).toContain("description: 'Maximum number of pets to return'");
    expect(content).toContain("description: 'The pet\\'s unique identifier'");
  });

  it('should not include description in @Args() for parameters without one', async () => {
    await generate(DESCRIPTIONS_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.resolver.ts'),
      'utf-8',
    );
    // 'offset' param has no description — should be simple @Args with nullable only
    const offsetMatch = content.match(/@Args\('offset'[^)]*\)/);
    expect(offsetMatch).not.toBeNull();
    expect(offsetMatch![0]).not.toContain('description');
  });
});
