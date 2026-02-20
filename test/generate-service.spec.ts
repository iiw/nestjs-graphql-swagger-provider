import * as fs from 'node:fs';
import * as path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { generate } from '../src/generate.js';
import {
  createOutputDir,
  FIXTURE_PATH,
  REFS_FIXTURE_PATH,
  removeOutputDir,
} from './helpers.js';

describe('generate service Api client calls', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = createOutputDir('nestjs-graphql-apicall-test-');
  });

  afterEach(() => {
    removeOutputDir(outputDir);
  });

  it('should call this.apiClient.pets.listPets with query params object', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );
    expect(content).toContain('this.apiClient.pets.listPets({ limit }, extraConfig)');
  });

  it('should call this.apiClient.pets.getPet with path param', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );
    expect(content).toContain('this.apiClient.pets.getPet(petId, extraConfig)');
  });

  it('should call this.apiClient.pets.createPet with request body', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );
    expect(content).toContain('this.apiClient.pets.createPet(input, extraConfig)');
  });

  it('should call this.apiClient.owners.listOwners for owners service', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'owners', 'owners.service.ts'),
      'utf-8',
    );
    expect(content).toContain('this.apiClient.owners.listOwners(extraConfig)');
  });
});

describe('generate optional params', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = createOutputDir('nestjs-graphql-params-test-');
  });

  afterEach(() => {
    removeOutputDir(outputDir);
  });

  it('should mark optional query params as nullable in resolver @Args', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.resolver.ts'),
      'utf-8',
    );
    // The 'limit' param in listPets is required: false
    expect(content).toContain('nullable: true');
  });

  it('should not mark required path params as nullable', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.resolver.ts'),
      'utf-8',
    );
    // petId is a required path param — its @Args should not have nullable
    // Extract the getPet method to check petId specifically
    const getPetMatch = content.match(/getPet[\s\S]*?petId[\s\S]*?\)/);
    expect(getPetMatch).not.toBeNull();
    expect(getPetMatch![0]).not.toContain('nullable');
  });
});

describe('generate service request body types', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = createOutputDir('nestjs-graphql-svctype-test-');
  });

  afterEach(() => {
    removeOutputDir(outputDir);
  });

  it('should use DTO type name in service method params instead of Record', async () => {
    await generate(REFS_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );
    expect(content).toContain('input: CreatePetInput');
    expect(content).not.toContain('input: Record<string, unknown>');
  });

  it('should import DTO types in service', async () => {
    await generate(REFS_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );
    expect(content).toContain('CreatePetInput');
    expect(content).toContain("from './pets.dto'");
  });
});

describe('generate service-to-api-client consistency', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = createOutputDir('nestjs-graphql-consistency-test-');
  });

  afterEach(() => {
    removeOutputDir(outputDir);
  });

  it('should only call API client methods that actually exist in api-client.ts', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const apiClientContent = fs.readFileSync(
      path.join(outputDir, 'api-client.ts'),
      'utf-8',
    );

    for (const controller of ['pets', 'owners']) {
      const servicePath = path.join(outputDir, controller, `${controller}.service.ts`);
      if (!fs.existsSync(servicePath)) continue;

      const serviceContent = fs.readFileSync(servicePath, 'utf-8');

      // Extract all this.apiClient.<namespace>.<method>( calls
      const methodCalls = [...serviceContent.matchAll(/this\.apiClient\.(\w+)\.(\w+)\(/g)];
      expect(methodCalls.length).toBeGreaterThan(0);

      for (const match of methodCalls) {
        const [fullMatch, , methodName] = match;
        // The method should exist as a property in the Api class (e.g., "listPets:")
        expect(
          apiClientContent,
          `Service calls ${fullMatch} but "${methodName}" not found in api-client.ts`,
        ).toMatch(new RegExp(`\\b${methodName}\\b`));
      }
    }
  });

  it('should use correct namespace matching the api-client class structure', async () => {
    await generate(FIXTURE_PATH, outputDir);

    const apiClientContent = fs.readFileSync(
      path.join(outputDir, 'api-client.ts'),
      'utf-8',
    );

    const serviceContent = fs.readFileSync(
      path.join(outputDir, 'pets', 'pets.service.ts'),
      'utf-8',
    );

    // Extract namespaces used in service calls
    const namespaceCalls = [...serviceContent.matchAll(/this\.apiClient\.(\w+)\.\w+\(/g)];
    const namespaces = [...new Set(namespaceCalls.map((m) => m[1]))];

    for (const ns of namespaces) {
      // The namespace should appear as a property in the Api class (e.g., "pets = {")
      expect(
        apiClientContent,
        `Service uses namespace "${ns}" but it doesn't exist in api-client.ts`,
      ).toMatch(new RegExp(`\\b${ns}\\b\\s*=\\s*\\{`));
    }
  });
});
