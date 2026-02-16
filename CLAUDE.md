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

## Architecture (rules)

This is a **CLI code generator**. It reads a Swagger/OpenAPI spec and outputs files into the consuming project's directory: a Swagger REST client and NestJS modules that consume that client to expose the REST API as GraphQL.

### Data flow

`npx nestjs-graphql-swagger-provider generate --input <swagger-url-or-path> --output <dir>` → generates into `<dir>/`:
1. **Swagger REST client** (via `swagger-typescript-api`) — single file, all types extracted to separate interfaces
2. **NestJS modules** — one feature folder per Swagger controller, each consuming the generated REST client

### Generated output structure

For each Swagger controller (e.g. `Users`), generates a feature folder:
```
<output-dir>/
  api-client.ts              # swagger-typescript-api generated REST client (single file)
  users/
    users.module.ts
    users.resolver.ts
    users.service.ts          # delegates to the generated REST client
    users.models.ts
    users.dto.ts
```

### Key rules

- Code generation is done via CLI only — users do not import this library as a project dependency
- Library depends on `swagger-typescript-api` to generate the REST client from Swagger/OpenAPI
- Generated services use the REST client to proxy requests to the original API
- Generated code is organized by feature (one folder per Swagger controller)
- The Swagger REST client is placed in a single file for easy regeneration
