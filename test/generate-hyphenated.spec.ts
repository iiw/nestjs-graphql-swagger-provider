import * as fs from 'node:fs';
import * as path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { generate } from '../src/generate.js';
import {
  createOutputDir,
  HYPHENATED_FIXTURE_PATH,
  removeOutputDir,
  SOPHISTICATED_FIXTURE_PATH,
} from './helpers.js';

describe('generate with hyphenated controller names', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = createOutputDir('nestjs-graphql-hyphen-test-');
  });

  afterEach(() => {
    removeOutputDir(outputDir);
  });

  it('should create kebab-case folder names for multi-word controllers', async () => {
    await generate(HYPHENATED_FIXTURE_PATH, outputDir);

    expect(fs.existsSync(path.join(outputDir, 'stake-pools'))).toBe(true);
    expect(fs.existsSync(path.join(outputDir, 'byron-wallets'))).toBe(true);
  });

  it('should create kebab-case filenames without spaces', async () => {
    await generate(HYPHENATED_FIXTURE_PATH, outputDir);

    const stakePoolsDir = path.join(outputDir, 'stake-pools');
    const expectedFiles = [
      'stake-pools.module.ts',
      'stake-pools.resolver.ts',
      'stake-pools.service.ts',
      'stake-pools.models.ts',
      'stake-pools.dto.ts',
    ];

    for (const file of expectedFiles) {
      expect(fs.existsSync(path.join(stakePoolsDir, file))).toBe(true);
    }
  });

  it('should not create filenames with spaces', async () => {
    await generate(HYPHENATED_FIXTURE_PATH, outputDir);

    const stakePoolsDir = path.join(outputDir, 'stake-pools');
    const files = fs.readdirSync(stakePoolsDir);

    for (const file of files) {
      expect(file).not.toContain(' ');
    }
  });

  it('should use kebab-case import paths in module file', async () => {
    await generate(HYPHENATED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'stake-pools', 'stake-pools.module.ts'),
      'utf-8',
    );
    expect(content).toContain("from './stake-pools.resolver'");
    expect(content).toContain("from './stake-pools.service'");
    expect(content).not.toContain("from './stake pools.");
  });

  it('should use kebab-case import paths in resolver file', async () => {
    await generate(HYPHENATED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'stake-pools', 'stake-pools.resolver.ts'),
      'utf-8',
    );
    expect(content).toContain("from './stake-pools.service'");
    expect(content).toContain("from './stake-pools.models'");
    expect(content).toContain("from './stake-pools.dto'");
    expect(content).not.toContain("from './stake pools.");
  });

  it('should use kebab-case import paths in service file', async () => {
    await generate(HYPHENATED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'stake-pools', 'stake-pools.service.ts'),
      'utf-8',
    );
    expect(content).toContain("from './stake-pools.dto'");
    expect(content).not.toContain("from './stake pools.");
  });

  it('should generate class names without hyphens in models', async () => {
    await generate(HYPHENATED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'stake-pools', 'stake-pools.models.ts'),
      'utf-8',
    );
    const classNames = [...content.matchAll(/class (\S+)/g)].map((m) => m[1]);
    for (const name of classNames) {
      expect(name).not.toContain('-');
    }
    expect(content).toContain('GetStakePoolsResponse');
    expect(content).toContain('GetStakePoolsMaintenanceActionsResponse');
  });

  it('should generate class names without hyphens in DTOs', async () => {
    await generate(HYPHENATED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'stake-pools', 'stake-pools.dto.ts'),
      'utf-8',
    );
    const classNames = [...content.matchAll(/class (\S+)/g)].map((m) => m[1]);
    for (const name of classNames) {
      expect(name).not.toContain('-');
    }
    expect(content).toContain('PostStakePoolsInput');
  });

  it('should generate valid PascalCase class names for byron-wallets controller', async () => {
    await generate(HYPHENATED_FIXTURE_PATH, outputDir);

    const content = fs.readFileSync(
      path.join(outputDir, 'byron-wallets', 'byron-wallets.models.ts'),
      'utf-8',
    );
    expect(content).toContain('GetByronWalletsResponse');
    expect(content).not.toContain('GetByron-wallets');
  });

  it('should generate PascalCase service and resolver class names', async () => {
    await generate(HYPHENATED_FIXTURE_PATH, outputDir);

    const moduleContent = fs.readFileSync(
      path.join(outputDir, 'stake-pools', 'stake-pools.module.ts'),
      'utf-8',
    );
    expect(moduleContent).toContain('StakePoolsModule');
    expect(moduleContent).toContain('StakePoolsResolver');
    expect(moduleContent).toContain('StakePoolsService');
  });
});

describe('generate with sophisticated real-world spec', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = createOutputDir('nestjs-graphql-sophisticated-test-');
  });

  afterEach(() => {
    removeOutputDir(outputDir);
  });

  function getAllTsFiles(dir: string): string[] {
    const results: string[] = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...getAllTsFiles(fullPath));
      } else if (entry.name.endsWith('.ts')) {
        results.push(fullPath);
      }
    }
    return results;
  }

  it('should generate without errors', async () => {
    await expect(generate(SOPHISTICATED_FIXTURE_PATH, outputDir)).resolves.not.toThrow();
  });

  it('all filenames should use kebab-case (no spaces)', async () => {
    await generate(SOPHISTICATED_FIXTURE_PATH, outputDir);

    const allFiles = getAllTsFiles(outputDir);
    expect(allFiles.length).toBeGreaterThan(0);

    for (const filePath of allFiles) {
      const basename = path.basename(filePath);
      expect(basename, `Filename "${basename}" contains a space`).not.toContain(' ');
    }
  });

  it('all generated class names should be valid TypeScript identifiers', async () => {
    await generate(SOPHISTICATED_FIXTURE_PATH, outputDir);

    const allFiles = getAllTsFiles(outputDir);
    const modelAndDtoFiles = allFiles.filter(
      (f) => f.endsWith('.models.ts') || f.endsWith('.dto.ts'),
    );
    expect(modelAndDtoFiles.length).toBeGreaterThan(0);

    for (const filePath of modelAndDtoFiles) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const classNames = [...content.matchAll(/class (\S+)/g)].map((m) => m[1]);

      for (const name of classNames) {
        expect(
          name,
          `Class name "${name}" in ${path.basename(filePath)} contains a hyphen`,
        ).not.toContain('-');
      }
    }
  });

  it('all import paths should use kebab-case (no spaces)', async () => {
    await generate(SOPHISTICATED_FIXTURE_PATH, outputDir);

    const allFiles = getAllTsFiles(outputDir).filter(
      (f) => !f.endsWith('api-client.ts'),
    );

    for (const filePath of allFiles) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const importPaths = [...content.matchAll(/from\s+['"](\.[^'"]+)['"]/g)].map(
        (m) => m[1],
      );

      for (const importPath of importPaths) {
        expect(
          importPath,
          `Import path "${importPath}" in ${path.basename(filePath)} contains a space`,
        ).not.toContain(' ');
      }
    }
  });

  it('should create expected controller folders for multi-word tags', async () => {
    await generate(SOPHISTICATED_FIXTURE_PATH, outputDir);

    const expectedFolders = [
      'stake-pools',
      'byron-wallets',
      'byron-addresses',
      'byron-transactions',
      'byron-coin-selections',
      'byron-migrations',
    ];

    for (const folder of expectedFolders) {
      expect(
        fs.existsSync(path.join(outputDir, folder)),
        `Expected folder "${folder}" to exist`,
      ).toBe(true);
    }
  });
});
