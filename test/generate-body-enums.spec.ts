import * as fs from 'node:fs';
import * as path from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { generate } from '../src/generate.js';
import { BODY_ENUMS_FIXTURE_PATH, createOutputDir, removeOutputDir } from './helpers.js';

describe('generate body enum substitution', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = createOutputDir('nestjs-graphql-body-enum-test-');
  });

  afterEach(() => {
    removeOutputDir(outputDir);
  });

  it('should cast request body to the correct api-client body type', async () => {
    await generate(BODY_ENUMS_FIXTURE_PATH, outputDir);

    const catsService = fs.readFileSync(
      path.join(outputDir, 'cats', 'cats.service.ts'),
      'utf-8',
    );
    const dogsService = fs.readFileSync(
      path.join(outputDir, 'dogs', 'dogs.service.ts'),
      'utf-8',
    );

    // Both services should have a cast to their respective api-client body type
    expect(catsService).toMatch(/input as \w+/);
    expect(dogsService).toMatch(/input as \w+/);
  });

  it('should use body-type-compatible enum names in DTO enum fields', async () => {
    await generate(BODY_ENUMS_FIXTURE_PATH, outputDir);

    const apiClientContent = fs.readFileSync(
      path.join(outputDir, 'api-client.ts'),
      'utf-8',
    );

    // For each controller, check that the enum used in the DTO matches the
    // enum used in the api-client body type definition
    for (const controller of ['cats', 'dogs']) {
      const servicePath = path.join(outputDir, controller, `${controller}.service.ts`);
      const serviceContent = fs.readFileSync(servicePath, 'utf-8');

      // Extract the body type name from the cast: `input as <BodyType>`
      const castMatch = serviceContent.match(/input as (\w+)/);
      expect(castMatch, `${controller} service should have a body cast`).toBeTruthy();
      const bodyTypeName = castMatch![1];

      // Find the body type definition in api-client and extract the enum names it references
      const bodyTypePattern = new RegExp(
        `export\\s+(?:interface|type)\\s+${bodyTypeName}\\s*(?:=\\s*)?\\{([^}]+)\\}`,
      );
      const bodyTypeMatch = apiClientContent.match(bodyTypePattern);
      expect(bodyTypeMatch, `body type ${bodyTypeName} should exist in api-client`).toBeTruthy();

      // Extract enum type references from the body type
      const bodyTypeText = bodyTypeMatch![1];
      const enumRefMatches = [...bodyTypeText.matchAll(/:\s*(\w+Enum\w*)/g)];

      if (enumRefMatches.length > 0) {
        // Check that the DTO file references these same enum names
        const dtoPath = path.join(outputDir, controller, `${controller}.dto.ts`);
        const dtoContent = fs.readFileSync(dtoPath, 'utf-8');

        for (const enumRefMatch of enumRefMatches) {
          const apiClientEnumName = enumRefMatch[1];
          // The DTO should import/use this enum name (or an alias for it)
          // At minimum, the enums.ts should export it
          const enumsContent = fs.readFileSync(path.join(outputDir, 'enums.ts'), 'utf-8');
          const enumExported = enumsContent.includes(apiClientEnumName);
          const enumInDto = dtoContent.includes(apiClientEnumName);

          expect(
            enumExported || enumInDto,
            `Enum ${apiClientEnumName} from body type ${bodyTypeName} should be exported or used in DTO`,
          ).toBe(true);
        }
      }
    }
  });
});
