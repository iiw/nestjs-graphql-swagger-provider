import * as fs from 'node:fs';
import * as path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { generate } from '../src/generate.js';
import { createOutputDir, ONEOF_FIXTURE_PATH, removeOutputDir } from './helpers.js';

describe('generate with oneOf request body', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = createOutputDir('nestjs-graphql-oneof-test-');
  });

  afterEach(() => {
    removeOutputDir(outputDir);
  });

  it('should generate DTO with all merged properties from oneOf variants', async () => {
    await generate(ONEOF_FIXTURE_PATH, outputDir);

    const dtoContent = fs.readFileSync(
      path.join(outputDir, 'wallets', 'wallets.dto.ts'),
      'utf-8',
    );

    // All properties from both variants should be present
    expect(dtoContent).toContain('name');
    expect(dtoContent).toContain('currency');
    expect(dtoContent).toContain('personalId');
    expect(dtoContent).toContain('businessId');
    expect(dtoContent).toContain('taxNumber');
  });

  it('should mark only universally-required properties as required', async () => {
    await generate(ONEOF_FIXTURE_PATH, outputDir);

    const dtoContent = fs.readFileSync(
      path.join(outputDir, 'wallets', 'wallets.dto.ts'),
      'utf-8',
    );

    // name and currency are required in both variants → required (!)
    expect(dtoContent).toMatch(/name!:/);
    expect(dtoContent).toMatch(/currency!:/);

    // personalId, businessId, taxNumber are only in one variant → optional (?)
    expect(dtoContent).toMatch(/personalId\?:/);
    expect(dtoContent).toMatch(/businessId\?:/);
    expect(dtoContent).toMatch(/taxNumber\?:/);
  });

  it('should generate a non-empty DTO class', async () => {
    await generate(ONEOF_FIXTURE_PATH, outputDir);

    const dtoContent = fs.readFileSync(
      path.join(outputDir, 'wallets', 'wallets.dto.ts'),
      'utf-8',
    );

    expect(dtoContent).toContain('@InputType()');
    expect(dtoContent).toContain('@Field()');
    // Should not be an empty class
    expect(dtoContent).not.toMatch(/@InputType\(\)\s*export class \w+ \{\s*\}/);
  });

  it('should generate service that references the DTO', async () => {
    await generate(ONEOF_FIXTURE_PATH, outputDir);

    const serviceContent = fs.readFileSync(
      path.join(outputDir, 'wallets', 'wallets.service.ts'),
      'utf-8',
    );

    expect(serviceContent).toContain("from './wallets.dto");
  });

  it('should cast union request body input to api-client type in service', async () => {
    await generate(ONEOF_FIXTURE_PATH, outputDir);

    const serviceContent = fs.readFileSync(
      path.join(outputDir, 'wallets', 'wallets.service.ts'),
      'utf-8',
    );

    // The service should cast `input as CreateWalletInput` because the body is a union
    expect(serviceContent).toMatch(/input as \w+/);
  });

  it('should import the api-client body type for union casts', async () => {
    await generate(ONEOF_FIXTURE_PATH, outputDir);

    const serviceContent = fs.readFileSync(
      path.join(outputDir, 'wallets', 'wallets.service.ts'),
      'utf-8',
    );

    // The api-client import should include the body type alongside Api
    const apiClientImport = serviceContent.match(/from\s+'\.\.\/api-client'[^;]*;/)?.[0] ?? '';
    expect(apiClientImport).toBeTruthy();
    // Should import more than just Api
    expect(serviceContent).toMatch(/import\s*\{[^}]*Api[^}]*\}\s*from\s+'\.\.\/api-client'/);
    // The body type name should appear in the import
    const importMatch = serviceContent.match(/import\s*\{([^}]*)\}\s*from\s+'\.\.\/api-client'/);
    expect(importMatch).not.toBeNull();
    const importedNames = importMatch![1].split(',').map((s) => s.trim());
    expect(importedNames.length).toBeGreaterThan(1);
  });

  it('should also generate global schemas for oneOf component schemas', async () => {
    await generate(ONEOF_FIXTURE_PATH, outputDir);

    const modelsContent = fs.readFileSync(
      path.join(outputDir, 'wallets', 'wallets.models.ts'),
      'utf-8',
    );

    expect(modelsContent).toContain('@ObjectType()');
    expect(modelsContent).toContain('class Wallet');
  });
});
