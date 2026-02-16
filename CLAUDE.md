# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

nestjs-graphql-swagger-provider — an NPM library for NestJS that bridges GraphQL and Swagger/OpenAPI documentation. Requires Node.js >= 24.

## Commands

- `npm run build` — compile TypeScript (`tsc`)
- `npm run lint` / `npm run lint:fix` — lint with ESLint (flat config, typescript-eslint)
- `npm run format` — format with Prettier
- `npm test` — run tests with vitest
- `npm run test:watch` — run tests in watch mode
- `npm run test:cov` — run tests with coverage

## Architecture

- **Library package**: published as CommonJS with TypeScript declarations (`dist/`)
- **Source**: `src/` directory, entry point is `src/index.ts`
- **Tests**: colocated as `*.spec.ts` files next to source
- **Peer dependencies**: `@nestjs/common`, `@nestjs/core`, `reflect-metadata`, `rxjs` — consumers provide these
- **TypeScript**: strict mode, decorators enabled (`experimentalDecorators` + `emitDecoratorMetadata`)
