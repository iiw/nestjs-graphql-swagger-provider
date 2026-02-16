import * as fs from 'node:fs';
import * as path from 'node:path';
import { IndentationText, Project, QuoteKind } from 'ts-morph';
import { generateApiClient } from './generators/api-client.js';
import { generateDtos } from './generators/dto.js';
import { generateEnums } from './generators/enums.js';
import { generateModels } from './generators/models.js';
import { generateModule } from './generators/module.js';
import { generateResolver } from './generators/resolver.js';
import { generateService } from './generators/service.js';
import { toKebabCase } from './generators/utils.js';
import { parseSpec } from './parser/parse-spec.js';

export async function generate(input: string, output: string): Promise<void> {
  const outputDir = path.resolve(output);

  fs.mkdirSync(outputDir, { recursive: true });

  console.log('Parsing OpenAPI spec...');
  const spec = await parseSpec(input);

  console.log('Generating REST client...');
  await generateApiClient(input, outputDir);

  const project = new Project({
    manipulationSettings: {
      quoteKind: QuoteKind.Single,
      indentationText: IndentationText.TwoSpaces,
    },
  });

  if (spec.enums.length > 0) {
    console.log('Generating enums...');
    const enumsFile = project.createSourceFile(
      path.join(outputDir, 'enums.ts'),
      '',
      { overwrite: true },
    );
    generateEnums(enumsFile, spec.enums);
  }

  for (const controller of spec.controllers) {
    const controllerDir = path.join(outputDir, toKebabCase(controller.name));
    fs.mkdirSync(controllerDir, { recursive: true });

    const baseName = controller.name.toLowerCase();

    console.log(`Generating module: ${controller.name}...`);

    // Generate models
    const modelsFile = project.createSourceFile(
      path.join(controllerDir, `${baseName}.models.ts`),
      '',
      { overwrite: true },
    );
    generateModels(modelsFile, controller);

    // Generate DTOs
    const dtosFile = project.createSourceFile(
      path.join(controllerDir, `${baseName}.dto.ts`),
      '',
      { overwrite: true },
    );
    generateDtos(dtosFile, controller);

    // Generate service
    const serviceFile = project.createSourceFile(
      path.join(controllerDir, `${baseName}.service.ts`),
      '',
      { overwrite: true },
    );
    generateService(serviceFile, controller);

    // Generate resolver
    const resolverFile = project.createSourceFile(
      path.join(controllerDir, `${baseName}.resolver.ts`),
      '',
      { overwrite: true },
    );
    generateResolver(resolverFile, controller);

    // Generate module
    const moduleFile = project.createSourceFile(
      path.join(controllerDir, `${baseName}.module.ts`),
      '',
      { overwrite: true },
    );
    generateModule(moduleFile, controller);
  }

  await project.save();
  console.log('Done!');
}
