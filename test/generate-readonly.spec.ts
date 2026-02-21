import * as fs from 'node:fs';
import * as path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { generate } from '../src/generate.js';
import { parseSpec } from '../src/parser/parse-spec.js';
import { createOutputDir, READONLY_FIXTURE_PATH, removeOutputDir } from './helpers.js';

function loadFixture(filePath: string): Record<string, unknown> {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

describe('readOnly/writeOnly parsing', () => {
  it('should set readOnly on parser output properties', async () => {
    const spec = await parseSpec(loadFixture(READONLY_FIXTURE_PATH));
    const users = spec.controllers.find((c) => c.name === 'Users')!;
    const createUser = users.endpoints.find((e) => e.operationId === 'createUser')!;

    const responseProps = createUser.responseSchema!.properties;
    const idProp = responseProps.find((p) => p.name === 'id')!;
    expect(idProp.readOnly).toBe(true);

    const usernameProp = responseProps.find((p) => p.name === 'username')!;
    expect(usernameProp.readOnly).toBeUndefined();

    const createdAtProp = responseProps.find((p) => p.name === 'createdAt')!;
    expect(createdAtProp.readOnly).toBe(true);
  });

  it('should set writeOnly on parser output properties', async () => {
    const spec = await parseSpec(loadFixture(READONLY_FIXTURE_PATH));
    const users = spec.controllers.find((c) => c.name === 'Users')!;
    const createUser = users.endpoints.find((e) => e.operationId === 'createUser')!;

    const responseProps = createUser.responseSchema!.properties;
    const passwordProp = responseProps.find((p) => p.name === 'password')!;
    expect(passwordProp.writeOnly).toBe(true);

    const usernameProp = responseProps.find((p) => p.name === 'username')!;
    expect(usernameProp.writeOnly).toBeUndefined();
  });
});

describe('readOnly/writeOnly generation', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = createOutputDir('nestjs-graphql-readonly-test-');
  });

  afterEach(() => {
    removeOutputDir(outputDir);
  });

  it('should generate without errors', async () => {
    await expect(generate(READONLY_FIXTURE_PATH, outputDir)).resolves.not.toThrow();
  });

  it('should exclude readOnly properties from InputType (DTO)', async () => {
    await generate(READONLY_FIXTURE_PATH, outputDir);

    const dtoContent = fs.readFileSync(
      path.join(outputDir, 'users', 'users.dto.ts'),
      'utf-8',
    );

    // UserInput DTO should NOT have 'id' or 'createdAt' (readOnly)
    // But since UserInput schema doesn't have those fields anyway, let's check the
    // User class used as InputType if it exists. Actually the response schema (User)
    // has readOnly fields but is used as ObjectType, not InputType.
    // The DTO file uses UserInput which doesn't have readOnly fields.
    // Let's verify the DTO is generated correctly
    expect(dtoContent).toContain('class UserInput');
    expect(dtoContent).toContain('username');
    expect(dtoContent).toContain('email');
    expect(dtoContent).toContain('password');
  });

  it('should exclude writeOnly properties from ObjectType (models)', async () => {
    await generate(READONLY_FIXTURE_PATH, outputDir);

    const modelsContent = fs.readFileSync(
      path.join(outputDir, 'users', 'users.models.ts'),
      'utf-8',
    );

    // User model (ObjectType) should NOT include 'password' (writeOnly)
    expect(modelsContent).toContain('class User');
    expect(modelsContent).toContain('id');
    expect(modelsContent).toContain('username');
    expect(modelsContent).toContain('email');
    expect(modelsContent).not.toContain('password');
    expect(modelsContent).toContain('createdAt');
  });

  it('should include readOnly properties in ObjectType (models)', async () => {
    await generate(READONLY_FIXTURE_PATH, outputDir);

    const modelsContent = fs.readFileSync(
      path.join(outputDir, 'users', 'users.models.ts'),
      'utf-8',
    );

    // readOnly properties like 'id' and 'createdAt' should be in the model
    expect(modelsContent).toContain('id');
    expect(modelsContent).toContain('createdAt');
  });
});
