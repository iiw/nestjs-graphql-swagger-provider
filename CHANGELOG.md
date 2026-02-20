# Changelog

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
