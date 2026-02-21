#!/usr/bin/env node

import { Command } from 'commander';
import { generate } from '../generate.js';

const program = new Command();

program
  .name('nestjs-graphql-swagger-provider')
  .description('Generate NestJS GraphQL modules from a Swagger/OpenAPI spec')
  .version('0.0.1');

program
  .command('generate')
  .description('Generate NestJS GraphQL modules and REST client from an OpenAPI spec')
  .requiredOption('--input <path-or-url>', 'Path or URL to the OpenAPI spec')
  .requiredOption('--output <dir>', 'Output directory for generated files')
  .option('--overwrite', 'Delete output directory before generation')
  .action(async (options: { input: string; output: string; overwrite?: boolean }) => {
    try {
      await generate(options.input, options.output, { overwrite: options.overwrite });
    } catch (error) {
      console.error('Generation failed:', error instanceof Error ? error.message : error);
      process.exit(1);
    }
  });

program.parse();
