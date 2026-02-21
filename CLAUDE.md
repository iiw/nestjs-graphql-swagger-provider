# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

nestjs-graphql-swagger-provider — a CLI code generator that reads a Swagger/OpenAPI spec and outputs NestJS GraphQL modules with a REST client. Requires Node.js >= 24.

## Commands

- `npm run build` — compile TypeScript (`tsc`)
- `npm run lint` / `npm run lint:fix` — lint with ESLint (flat config, typescript-eslint)
- `npm run format` — format with Prettier
- `npm test` — run tests with vitest
- `npm run test:watch` — run tests in watch mode
- `npm run test:cov` — run tests with coverage

## Architecture

- **CLI package**: distributed via npm, invoked with `npx`. No runtime dependency for consumers — this is a code generator only.
- **Source**: `src/` directory, CLI source in `src/cli/`. Prefer small, focused files — split by responsibility where possible.
- **Tests**: unit tests colocated as `*.spec.ts` next to source (`src/`); integration tests in `test/` directory with fixtures in `test/__fixtures__/`. Fixture-based: feed sample `swagger.json` files and verify generated output.
- **TypeScript**: strict mode, decorators enabled (`experimentalDecorators` + `emitDecoratorMetadata`)

### Key dependencies (this CLI tool)

- `commander` — CLI argument parsing
- `ts-morph` — AST-based TypeScript code generation for NestJS modules
- `@apidevtools/swagger-parser` — parse and validate OpenAPI specs
- `swagger-typescript-api` — generate the REST client from OpenAPI

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

### GraphQL approach

- **Code-first** — generated code uses `@nestjs/graphql` decorators (`@ObjectType`, `@Field`, `@Query`, `@Mutation`, `@Args`, `@InputType`)

### Swagger-to-GraphQL mapping

- **GET** endpoints → `@Query()` resolvers
- **POST / PUT / PATCH / DELETE** endpoints → `@Mutation()` resolvers
- **Request body DTOs** → `@InputType()` classes
- **Path and query parameters** → `@Args()` on resolver methods
- **Response types** → `@ObjectType()` models
- **OpenAPI descriptions** → `description` option on `@Field()`, `@Args()`, `@Query()`, `@Mutation()` decorators
- **Header / cookie parameters** → **intentionally ignored**. GraphQL operates at a higher abstraction level than HTTP; headers are a transport concern. Auth headers, rate-limit headers, custom headers etc. belong in the HTTP layer (interceptors, middleware, or the `RequestConfigFactory` hook) — not in the GraphQL schema. The generated `RequestConfigFactory` injection point is the intended extension mechanism for consumers who need to pass headers to the underlying REST client.

### Generated code runtime dependencies

The generated code requires these packages in the consuming project:
- `@nestjs/common`, `@nestjs/core`, `@nestjs/graphql`
- `axios` (used by the generated REST client)
- `reflect-metadata`, `rxjs`

### Key rules

- All generated output is TypeScript (`.ts` files)
- Code generation is done via CLI only — users do not import this library as a project dependency
- Library depends on `swagger-typescript-api` to generate the REST client from Swagger/OpenAPI
- Generated services use the REST client to proxy requests to the original API
- Generated code is organized by feature (one folder per Swagger controller)
- The Swagger REST client is placed in a single file for easy regeneration
- **OpenAPI 3.0+** (supports 3.0.x and 3.1.x)
- **Overwrite** on regeneration — no prompts, no skip logic
- If error responses are declared in the OpenAPI spec, generate corresponding error handling in services; otherwise let exceptions propagate

## Releasing a new version

1. **Ensure tests pass**: `npm test`
2. **Bump version** in `package.json` (e.g. `"version": "0.0.7"`)
3. **Update `CHANGELOG.md`**: add a new `## X.Y.Z` section at the top (below `# Changelog`) describing bug fixes, features, and other changes since the last release
4. **Commit**: `git commit -m "chore: release X.Y.Z"` with the version bump + changelog
5. **Build**: `npm run build`
6. **Publish**: `npm publish`
7. **Tag** (optional): `git tag X.Y.Z && git push --tags` (not vX.Y.Z)
