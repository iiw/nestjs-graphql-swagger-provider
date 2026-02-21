# TODO

## Bugs

### ~~Missing enum imports in generated service files~~ (fixed in 0.0.7)

### ~~Service-to-API-client argument count mismatch~~ (fixed in 0.0.7)

Two issues caused argument count mismatches between generated services and the API client:

1. **Path/query params not bundled**: `buildApiMethodCall()` passed path params as separate positional args instead of bundling all path+query params into a single destructured object (matching `swagger-typescript-api`'s convention).
2. **Non-JSON request bodies ignored**: `extractRequestBody()` only handled `application/json` content-type, skipping bodies like `application/octet-stream` (e.g. `postExternalTransaction`).

Fixed in `src/generators/service.ts` and `src/parser/request-body.ts`.

### Invalid characters in generated class names

The generator produces class names containing `*` for DELETE endpoints with path params (e.g. `DeleteStakePools*WalletsWalletIdInput`). This creates invalid TypeScript identifiers.

**Reproduction**: generate from `sophisticated-swagger.json` — `stake-pools.dto.ts` contains `DeleteStakePools*WalletsWalletIdInput`.

**Failing test**: `test/generate-hyphenated.spec.ts` ("all types referenced in service files should have corresponding imports" — fails because the regex stops at `*`).
