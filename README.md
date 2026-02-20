# nestjs-graphql-swagger-provider

> Turn any Swagger/OpenAPI spec into a fully-wired NestJS GraphQL API — in one command.

**This project is in active development. APIs and generated output may change without notice.**

## What It Does

Point it at an OpenAPI 3.0 or 3.1 spec. It generates:

```
<output-dir>/
  api-client.ts              # Typed REST client (via swagger-typescript-api)
  enums.ts                   # Shared enums with registerEnumType()
  pets/
    pets.module.ts
    pets.resolver.ts          # @Query for GET, @Mutation for POST/PUT/PATCH/DELETE
    pets.service.ts           # Delegates to the generated REST client
    pets.models.ts            # @ObjectType response models
    pets.dto.ts               # @InputType request DTOs
```

One folder per Swagger controller. Code-first GraphQL. Zero boilerplate.

## Quick Start

```bash
npx nestjs-graphql-swagger-provider generate \
  --input https://api.example.com/swagger.json \
  --output ./src/generated
```

### Requirements

- Node.js >= 24

### Generated Code Dependencies

Your NestJS project needs these additional packages:

```bash
npm install @nestjs/graphql axios
```

## Swagger-to-GraphQL Mapping

| OpenAPI | GraphQL |
|---|---|
| `GET` endpoints | `@Query()` resolvers |
| `POST / PUT / PATCH / DELETE` | `@Mutation()` resolvers |
| Request bodies | `@InputType()` classes |
| Path & query params | `@Args()` parameters |
| Response schemas | `@ObjectType()` models |
| String & integer enums | TypeScript enums + `registerEnumType()` |

## Development

```bash
npm run build        # Compile TypeScript
npm run lint         # Lint with ESLint
npm run format       # Format with Prettier
npm test             # Run tests with Vitest
npm run test:cov     # Tests with coverage
```

## Author

Viktor Buzanov

## License

MIT
