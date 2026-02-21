import * as fs from 'node:fs';
import * as path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { generate } from '../src/generate.js';
import { createOutputDir, ENUM_FIXTURE_PATH, removeOutputDir } from './helpers.js';

describe('generate with enums', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = createOutputDir('nestjs-graphql-enum-test-');
  });

  afterEach(() => {
    removeOutputDir(outputDir);
  });

  it('should generate enums.ts at the output root', async () => {
    await generate(ENUM_FIXTURE_PATH, outputDir);

    const enumsPath = path.join(outputDir, 'enums.ts');
    expect(fs.existsSync(enumsPath)).toBe(true);
  });

  it('should import enums from api-client and register them', async () => {
    await generate(ENUM_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(path.join(outputDir, 'enums.ts'), 'utf-8');
    expect(content).toContain('registerEnumType');
    expect(content).toContain("from './api-client'");
    expect(content).toContain('PetStatus');
    expect(content).toContain('Priority');
  });

  it('should re-export imported enums', async () => {
    await generate(ENUM_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(path.join(outputDir, 'enums.ts'), 'utf-8');
    expect(content).toMatch(/export\s*\{[^}]*PetStatus[^}]*\}/);
    expect(content).toMatch(/export\s*\{[^}]*Priority[^}]*\}/);
  });

  it('should alias enums when api-client name differs (PetSize → PetSizeEnum)', async () => {
    await generate(ENUM_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(path.join(outputDir, 'enums.ts'), 'utf-8');
    expect(content).toContain('PetSizeEnum as PetSize');
    expect(content).toContain("registerEnumType(PetSize, { name: 'PetSize' })");
  });

  it('should not duplicate enum declarations for matched enums', async () => {
    await generate(ENUM_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(path.join(outputDir, 'enums.ts'), 'utf-8');
    expect(content).not.toContain('enum PetStatus');
    expect(content).not.toContain('enum Priority');
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

  it('should import enums in service when method parameters use enum types', async () => {
    await generate(ENUM_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );
    // listPets has a 'status' param typed as PetStatus enum
    expect(content).toContain('status: PetStatus');
    expect(content).toContain("from '../enums'");
    expect(content).toContain('PetStatus');
  });

  it('should register both parameter and response enums with same values', async () => {
    await generate(ENUM_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(path.join(outputDir, 'enums.ts'), 'utf-8');

    // Both the parameter enum (ListOrdersFulfillment) and response enum (OrderFulfillment)
    // should be registered — they have the same values but different contexts
    expect(content).toContain('ListOrdersFulfillment');
    expect(content).toContain('OrderFulfillment');
    expect(content).toContain('registerEnumType');
  });

  it('should map parameter and response enums to different api-client enums', async () => {
    await generate(ENUM_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(path.join(outputDir, 'enums.ts'), 'utf-8');

    // Both enums should be imported from api-client (matched, not inline-generated)
    // Count how many registerEnumType calls reference fulfillment-related enums
    const fulfillmentRegistrations = content
      .split('\n')
      .filter(
        (line) =>
          line.includes('registerEnumType') &&
          (line.includes('ListOrdersFulfillment') || line.includes('OrderFulfillment')),
      );
    expect(fulfillmentRegistrations).toHaveLength(2);
  });
});
