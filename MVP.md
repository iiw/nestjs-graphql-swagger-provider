# MVP Status Report

## CRITICAL — Generated code won't work

### 1. Service `AxiosInstance` DI is broken
`src/generators/service.ts:119-125` — Service constructor requires `AxiosInstance`, but `src/generators/module.ts:34` only registers `[Resolver, Service]` as providers. NestJS will throw at runtime:
```
Nest can't resolve dependencies of PetsService (?)
```
**Fix**: Module must provide/inject the httpClient (factory provider, or `@Inject` token).

### 2. Optional query params are required in GraphQL
`src/generators/resolver.ts:37-46` — `@Args('limit')` is generated without `{ nullable: true }` even when `required: false`. GraphQL schema makes them mandatory, breaking clients that omit optional params.

### 3. Request body typed as `Record<string, unknown>` in service
`src/generators/service.ts:15` — Resolver correctly passes `CreatePetInput` but service accepts `Record<string, unknown>`. Loses all type safety at the service layer.

## HIGH — Broken for common real-world patterns

### 4. Primitive return types generate empty classes
If an endpoint returns `type: "string"`, it generates `class GetStatusResponse {}` with no properties — an empty `@ObjectType`. GraphQL schema is invalid.

### 5. Resolver doesn't import parent models (allOf)
After allOf work, resolver imports `{ Dog }` from models — but if it needs `Animal` as a GraphQL return type (e.g., `GET /animals`), the Animals controller resolver needs `Animal` imported. The models file generates both classes so this works within a single controller, but cross-controller parent type references may break.

### 6. Header parameters silently dropped
`src/parser/parameters.ts:16` — Filters to `path | query` only. APIs requiring `Authorization`, `X-Api-Key`, etc. lose those params with no warning.

## MODERATE — Limits real-world applicability

| Gap | Location | Impact |
|-----|----------|--------|
| multipart/form-data ignored | `request-body.ts:13` | File upload endpoints silently get no body params |
| Non-JSON responses ignored | `responses.ts:18` | CSV/XML/binary endpoints treated as no response |
| No `description` passthrough | All parsers | Generated code has zero documentation |
| No oneOf/anyOf | Parser | Polymorphic/union schemas silently skipped |
| Only 200/201 success codes | `responses.ts:13` | 202/204 responses ignored |
| `operation.summary` parsed but unused | `parse-spec.ts:46` | Wasted data, no resolver comments |

## LOW — Polish for release

| Gap | Notes |
|-----|-------|
| CLI error messages generic | "Generation failed: ..." with no guidance |
| No OpenAPI version validation | Silently accepts 2.0 specs, produces garbage |
| Empty .dto.ts/.models.ts files created | When controller has no request bodies or responses |
| `api-client.ts` generated but never imported | Services use raw axios instead of typed client |
| No `@Deprecated()` markers | deprecated fields/operations ignored |
| No validation decorators | min/max/pattern constraints lost |

## Suggested MVP priority order

1. Fix service DI (AxiosInstance provider in module)
2. Fix optional query param nullable handling
3. Type service request body with actual DTO name
4. Handle primitive return types (use GraphQL scalars directly)
5. Warn/skip on unsupported content types instead of silent failure
6. Add description passthrough to `@Field({ description })` and resolver JSDoc
