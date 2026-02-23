import * as fs from 'node:fs';
import * as path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { generate } from '../src/generate.js';
import {
  CROSSREF_FIXTURE_PATH,
  createOutputDir,
  removeOutputDir,
} from './helpers.js';

describe('cross-schema $ref type references (Bug 1)', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = createOutputDir('nestjs-graphql-crossref-test-');
  });

  afterEach(() => {
    removeOutputDir(outputDir);
  });

  it('should generate referenced schema class in DTO file', async () => {
    await generate(CROSSREF_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.dto.ts'),
      'utf-8',
    );
    // Address is referenced via $ref in CreatePetInput — should be generated in the DTO file
    expect(content).toContain('class Address');
  });

  it('should generate referenced schema class in models file', async () => {
    await generate(CROSSREF_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.models.ts'),
      'utf-8',
    );
    // Address is referenced via $ref in Pet — should be generated in the models file
    expect(content).toContain('class Address');
  });
});

describe('resolver parameter ordering (Bug 2)', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = createOutputDir('nestjs-graphql-paramorder-test-');
  });

  afterEach(() => {
    removeOutputDir(outputDir);
  });

  it('should place required input param before optional query params', async () => {
    await generate(CROSSREF_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.resolver.ts'),
      'utf-8',
    );
    // createPet has optional dryRun param + required input
    // Required 'input' should come before optional 'dryRun'
    // Use indexOf on the full method line since decorator parens break simple regex capture
    const methodLine = content.split('\n').find((l) => l.includes('createPet('));
    expect(methodLine).toBeDefined();
    const inputPos = methodLine!.indexOf("'input'");
    const dryRunPos = methodLine!.indexOf("'dryRun'");
    expect(inputPos).toBeGreaterThan(-1);
    expect(dryRunPos).toBeGreaterThan(-1);
    expect(inputPos).toBeLessThan(dryRunPos);
  });
});
