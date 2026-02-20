import * as fs from 'node:fs';
import * as path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { generate } from '../src/generate.js';
import { createOutputDir, FIXTURE_PATH, removeOutputDir } from './helpers.js';

describe('generate module DI', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = createOutputDir('nestjs-graphql-di-test-');
  });

  afterEach(() => {
    removeOutputDir(outputDir);
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

describe('generate request config factory', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = createOutputDir('nestjs-graphql-factory-test-');
  });

  afterEach(() => {
    removeOutputDir(outputDir);
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
