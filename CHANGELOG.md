# Changelog

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
