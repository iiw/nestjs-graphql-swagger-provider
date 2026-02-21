import * as fs from 'node:fs';
import * as path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { generate } from '../src/generate.js';
import { createOutputDir, PRIMITIVES_FIXTURE_PATH, removeOutputDir } from './helpers.js';

describe('generate with primitive responses', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = createOutputDir('nestjs-graphql-prim-test-');
  });

  afterEach(() => {
    removeOutputDir(outputDir);
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
    expect(content).toContain('@Mutation(() => Boolean');
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
