# Changelog

## 0.0.12

### Bug Fixes

- **Params-interface enum substitution**: When a parameter has an inline enum, the generated resolver and service now use the correct api-client params-interface enum (e.g. `StateEnum1`) instead of incorrectly matching the response enum (e.g. `ListByronAddressesStateEnum`). A new `substituteParameterEnums` post-processing step looks up the correct enum from the params interface and ensures it is registered in `enums.ts`.
- **paramsEnumMap population**: Fixed `extractApiClientEnums` to use `prop.getType().getText(prop)` instead of `prop.getType().getText()`, which returned fully-qualified import paths and prevented the params-interface enum map from ever being populated.

## 0.0.11

### Features

- **Context-aware enum matching**: Enums parsed from parameters, response models, and request bodies now carry context and operationId metadata. The enum matcher uses a two-pass strategy (name-based first, then value-based with params-interface preference) to correctly map duplicate enums with the same values but different contexts to distinct api-client enums.

## 0.0.10

### Features

- **Enum imports from api-client**: Enums are now imported from the generated `api-client.ts` instead of generating duplicate enum definitions, reducing code duplication and keeping a single source of truth.

## 0.0.9

### Features

- **OpenAPI descriptions**: Property descriptions, parameter descriptions, and operation summaries are now forwarded to `@Field()`, `@Args()`, `@Query()`, and `@Mutation()` decorators via the `description` option. Falls back to `operation.description` when `summary` is absent.
- **Deprecation markers**: `deprecated: true` on OpenAPI schema properties, parameters, and operations now generates `deprecationReason: 'Deprecated'` on the corresponding GraphQL decorators.
- **`--overwrite` CLI flag**: New optional flag that deletes the output directory before generation, ensuring a clean output.

### Documentation

- Documented intentionally out-of-scope features (default values, validation decorators, discriminator unions, file uploads, security schemes) with rationale in CLAUDE.md.
- Added CLI options table and updated Swagger-to-GraphQL mapping table in README.

## 0.0.8

### Features

- **`oneOf`/`anyOf` support**: Request bodies and models using `oneOf` or `anyOf` schemas now generate properly populated `@InputType()` and `@ObjectType()` classes instead of empty ones. All variant properties are merged into a single flat class; a property is required only if required in every variant.

### Bug Fixes

- **Circular schema protection**: Added `WeakSet`-based cycle detection to both `flattenAllOf` and `flattenOneOf` to prevent infinite recursion on recursive schemas (e.g. Cardano `ScriptValue`).
- **Schema guards**: `oneOf`/`anyOf` schemas are no longer incorrectly treated as primitives or filtered out of global schema extraction.

### Tests

- Added `petstore-oneof.json` fixture and integration tests for `oneOf` request body generation.

## 0.0.7

### Bug Fixes

- **Enum imports in services**: Generated service files now import enum types used in method parameters (matching resolver behavior).
- **API client argument count**: `buildApiMethodCall()` now bundles all path and query params into a single destructured object to match `swagger-typescript-api`'s calling convention, fixing argument count mismatches.
- **Non-JSON request bodies**: `extractRequestBody()` now falls back to the first content-type with a schema when `application/json` is unavailable (e.g. `application/octet-stream`).
- **Invalid class names**: `schemaToName()` now strips all non-alphanumeric characters from path segments, fixing invalid identifiers like `DeleteStakePools*WalletsWalletIdInput` caused by wildcard paths.

### Tests

- Added failing tests for enum import and argument count bugs.

## 0.0.6

### Bug Fixes

- **Import paths**: Fixed generated module, resolver, and service files using space-separated import paths instead of kebab-case for multi-word controllers (e.g. `from './stake pools.service'` → `from './stake-pools.service'`).

### Tests

- Split monolithic `src/generate.spec.ts` (1200 lines) into 7 focused test files under `test/` by concern (basic, enums, schemas, DI, service, primitives, hyphenated).
- Moved fixtures from `src/__fixtures__/` to `test/__fixtures__/`.
- Added shared test helpers (`test/helpers.ts`).
- Added real-world pricing API swagger spec tests.
- Added sophisticated Cardano Wallet API smoke tests.

## 0.0.5

### Bug Fixes

- **Generated filenames**: Fixed filenames containing spaces instead of hyphens for multi-word controllers (e.g. `byron wallets.service.ts` → `byron-wallets.service.ts`).
- **Generated class names**: Fixed invalid TypeScript identifiers caused by hyphens in generated class names (e.g. `GetByron-walletsResponse` → `GetByronWalletsResponse`). Path segments are now properly PascalCased.

## 0.0.4

### Bug Fixes

- **API client method names**: Generated services now use the actual method and namespace names from the `swagger-typescript-api` generated client instead of deriving them independently via `toCamelCase(operationId)`. This fixes mismatches where `swagger-typescript-api`'s naming algorithm produces different names (e.g. `pendientesDetail()` vs `getConsultaPendientesFolioLPE()`).

## 0.0.3

### Bug Fixes

- **Generic Api class**: Fixed TypeScript errors in generated code by using `Api<unknown>` instead of `Api` to match the generic class signature from `swagger-typescript-api`.

### Improvements

- **ESLint**: All generated files now include `/* eslint-disable */` on the first line to prevent lint errors in generated code.
- **Formatting**: Added blank lines between fields in generated models and DTOs for better readability.

## 0.0.2

### Bug Fixes

- **$ref resolution**: Fixed `Unable to resolve $ref pointer` error when loading specs from a URL. The spec is now fetched into memory before parsing, so internal `$ref` pointers (e.g. `#/components/schemas/...`) are resolved correctly regardless of how the spec is loaded.

### Other Changes

- Set license to MIT.
- Simplified generated code dependencies in README (removed packages already implied by NestJS).

## 0.0.1

Initial release.

- Generate NestJS GraphQL modules from OpenAPI 3.0/3.1 specs.
- Code-first GraphQL with `@ObjectType`, `@InputType`, `@Query`, `@Mutation` decorators.
- Typed REST client generation via `swagger-typescript-api`.
- One feature folder per Swagger controller.
- Support for enums (`registerEnumType`), `allOf` inheritance, and `$ref` resolution.
- `RequestConfigFactory` hook for customizing API client requests.
- Error handling generation from declared error responses.
