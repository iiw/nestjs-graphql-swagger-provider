import * as fs from 'node:fs';
import * as path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { generate } from '../src/generate.js';
import { createOutputDir, DEPRECATED_FIXTURE_PATH, removeOutputDir } from './helpers.js';

describe('generate with OpenAPI deprecated markers', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = createOutputDir('nestjs-graphql-depr-test-');
  });

  afterEach(() => {
    removeOutputDir(outputDir);
  });

  it('should include deprecationReason in @Field() for deprecated model properties', async () => {
    await generate(DEPRECATED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.models.ts'),
      'utf-8',
    );
    // legacyId is deprecated
    expect(content).toContain("deprecationReason: 'Deprecated'");
  });

  it('should include deprecationReason in @Field() for deprecated DTO properties', async () => {
    await generate(DEPRECATED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.dto.ts'),
      'utf-8',
    );
    // legacyTag is deprecated
    expect(content).toContain("deprecationReason: 'Deprecated'");
  });

  it('should not include deprecationReason for non-deprecated properties', async () => {
    await generate(DEPRECATED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.models.ts'),
      'utf-8',
    );
    // Extract the @Field for 'name' — it should not have deprecationReason
    const nameMatch = content.match(/@Field\([^)]*\)[\s\S]*?name/);
    expect(nameMatch).not.toBeNull();
    expect(nameMatch![0]).not.toContain('deprecationReason');
  });

  it('should include deprecationReason in @Query() for deprecated operations', async () => {
    await generate(DEPRECATED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.resolver.ts'),
      'utf-8',
    );
    // getPet operation is deprecated
    const getPetMatch = content.match(/@Query\([^)]*\)[\s\S]*?getPet/);
    expect(getPetMatch).not.toBeNull();
    expect(getPetMatch![0]).toContain("deprecationReason: 'Deprecated'");
  });

  it('should not include deprecationReason for non-deprecated operations', async () => {
    await generate(DEPRECATED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.resolver.ts'),
      'utf-8',
    );
    // listPets is not deprecated
    const listPetsMatch = content.match(/@Query\([^)]*\)[\s\S]*?listPets/);
    expect(listPetsMatch).not.toBeNull();
    expect(listPetsMatch![0]).not.toContain('deprecationReason');
  });

  it('should include deprecationReason in @Args() for deprecated parameters', async () => {
    await generate(DEPRECATED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.resolver.ts'),
      'utf-8',
    );
    // maxResults param is deprecated
    const maxResultsMatch = content.match(/@Args\('maxResults'[^)]*\)/);
    expect(maxResultsMatch).not.toBeNull();
    expect(maxResultsMatch![0]).toContain("deprecationReason: 'Deprecated'");
  });

  it('should not include deprecationReason in @Args() for non-deprecated parameters', async () => {
    await generate(DEPRECATED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.resolver.ts'),
      'utf-8',
    );
    // limit param is not deprecated
    const limitMatch = content.match(/@Args\('limit'[^)]*\)/);
    expect(limitMatch).not.toBeNull();
    expect(limitMatch![0]).not.toContain('deprecationReason');
  });

  it('should include both description and deprecationReason when both are present', async () => {
    await generate(DEPRECATED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.models.ts'),
      'utf-8',
    );
    // legacyId has both description and deprecated
    const legacyIdMatch = content.match(/@Field\([^)]*\)[\s\S]*?legacyId/);
    expect(legacyIdMatch).not.toBeNull();
    expect(legacyIdMatch![0]).toContain("description: 'Use id instead'");
    expect(legacyIdMatch![0]).toContain("deprecationReason: 'Deprecated'");
  });
});
