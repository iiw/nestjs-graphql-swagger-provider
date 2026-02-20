import type { OpenAPIV3_1 } from 'openapi-types';
import { describe, expect, it } from 'vitest';
import { extractSchema, schemaToName } from './schemas.js';

describe('schemaToName', () => {
  it('should produce valid PascalCase names from simple paths', () => {
    expect(schemaToName('/pets', 'get', 'Response')).toBe('GetPetsResponse');
  });

  it('should produce valid PascalCase names from hyphenated path segments', () => {
    expect(schemaToName('/stake-pools', 'get', 'Response')).toBe('GetStakePoolsResponse');
  });

  it('should produce valid PascalCase names from multiple hyphenated segments', () => {
    expect(schemaToName('/stake-pools/maintenance-actions', 'get', 'Response')).toBe(
      'GetStakePoolsMaintenanceActionsResponse',
    );
  });

  it('should handle path params with hyphenated segments', () => {
    expect(schemaToName('/byron-wallets/{walletId}', 'get', 'Response')).toBe(
      'GetByronWalletsWalletIdResponse',
    );
  });

  it('should not contain hyphens in the generated name', () => {
    const name = schemaToName('/byron-wallets/{walletId}/addresses', 'post', 'Input');
    expect(name).not.toContain('-');
    expect(name).toBe('PostByronWalletsWalletIdAddressesInput');
  });
});

describe('extractSchema primitive detection', () => {
  it('should detect string primitive type', () => {
    const schema: OpenAPIV3_1.SchemaObject = { type: 'string' };
    const result = extractSchema(schema, 'TestResponse');

    expect(result).toBeDefined();
    expect(result!.primitiveType).toBe('string');
    expect(result!.properties).toEqual([]);
    expect(result!.isArray).toBeUndefined();
  });

  it('should detect integer primitive type', () => {
    const schema: OpenAPIV3_1.SchemaObject = { type: 'integer' };
    const result = extractSchema(schema, 'TestResponse');

    expect(result).toBeDefined();
    expect(result!.primitiveType).toBe('integer');
    expect(result!.properties).toEqual([]);
  });

  it('should detect boolean primitive type', () => {
    const schema: OpenAPIV3_1.SchemaObject = { type: 'boolean' };
    const result = extractSchema(schema, 'TestResponse');

    expect(result).toBeDefined();
    expect(result!.primitiveType).toBe('boolean');
    expect(result!.properties).toEqual([]);
  });

  it('should detect number primitive type', () => {
    const schema: OpenAPIV3_1.SchemaObject = { type: 'number' };
    const result = extractSchema(schema, 'TestResponse');

    expect(result).toBeDefined();
    expect(result!.primitiveType).toBe('number');
    expect(result!.properties).toEqual([]);
  });

  it('should detect array of string primitives', () => {
    const schema: OpenAPIV3_1.SchemaObject = {
      type: 'array',
      items: { type: 'string' },
    };
    const result = extractSchema(schema, 'TestResponse');

    expect(result).toBeDefined();
    expect(result!.primitiveType).toBe('string');
    expect(result!.isArray).toBe(true);
    expect(result!.properties).toEqual([]);
  });

  it('should detect array of integer primitives', () => {
    const schema: OpenAPIV3_1.SchemaObject = {
      type: 'array',
      items: { type: 'integer' },
    };
    const result = extractSchema(schema, 'TestResponse');

    expect(result).toBeDefined();
    expect(result!.primitiveType).toBe('integer');
    expect(result!.isArray).toBe(true);
  });

  it('should not set primitiveType on object schemas', () => {
    const schema: OpenAPIV3_1.SchemaObject = {
      type: 'object',
      properties: {
        id: { type: 'string' },
      },
    };
    const result = extractSchema(schema, 'TestResponse');

    expect(result).toBeDefined();
    expect(result!.primitiveType).toBeUndefined();
    expect(result!.properties.length).toBeGreaterThan(0);
  });

  it('should not set primitiveType on array of objects', () => {
    const schema: OpenAPIV3_1.SchemaObject = {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
        },
      },
    };
    const result = extractSchema(schema, 'TestResponse');

    expect(result).toBeDefined();
    expect(result!.primitiveType).toBeUndefined();
    expect(result!.properties.length).toBeGreaterThan(0);
  });

  it('should return undefined for undefined schema', () => {
    const result = extractSchema(undefined, 'TestResponse');
    expect(result).toBeUndefined();
  });
});
