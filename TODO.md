# TODO

## Bugs

### ~~Missing enum imports in generated service files~~ (fixed in 0.0.7)

### Service-to-API-client argument count mismatch

`swagger-typescript-api` bundles all path params into a single destructured object as the first argument (e.g. `getPet({ petId }, params)`), but the generator passes path params as separate positional arguments (e.g. `getPet(petId, extraConfig)`). This causes argument count mismatches, especially with multiple path params.

**Reproduction**: generate from `petstore.json` — `updatePet` is called with `(petId, input, extraConfig)` (3 args) but the API client signature is `({ petId }, data, params)` (3 params where first is an object). Generate from `sophisticated-swagger.json` — `joinStakePool` is called with `(stakePoolId, walletId, input, extraConfig)` (4 args) but API client expects `({ stakePoolId, walletId }, data, params)` (3 params).

**Failing tests**: `test/generate-service.spec.ts` ("should call API client methods with matching argument count", "should match argument count for methods with multiple path params").

### Invalid characters in generated class names

The generator produces class names containing `*` for DELETE endpoints with path params (e.g. `DeleteStakePools*WalletsWalletIdInput`). This creates invalid TypeScript identifiers.

**Reproduction**: generate from `sophisticated-swagger.json` — `stake-pools.dto.ts` contains `DeleteStakePools*WalletsWalletIdInput`.

**Failing test**: `test/generate-hyphenated.spec.ts` ("all types referenced in service files should have corresponding imports" — fails because the regex stops at `*`).
