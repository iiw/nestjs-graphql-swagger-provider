import { describe, expect, it } from 'vitest';
import type { ParsedEnum } from '../parser/types.js';
import { type ApiClientEnum, matchEnumsToApiClient } from './api-client-enums.js';

describe('matchEnumsToApiClient', () => {
  it('should match by exact name', () => {
    const parsed: ParsedEnum[] = [
      { name: 'PetStatus', values: ['available', 'pending', 'sold'], type: 'string' },
    ];
    const apiClient: ApiClientEnum[] = [
      { name: 'PetStatus', values: ['available', 'pending', 'sold'] },
    ];

    const result = matchEnumsToApiClient(parsed, apiClient);

    expect(result.matched).toHaveLength(1);
    expect(result.matched[0].parsedEnum.name).toBe('PetStatus');
    expect(result.matched[0].apiClientEnumName).toBe('PetStatus');
    expect(result.unmatched).toHaveLength(0);
  });

  it('should match by name + "Enum" suffix', () => {
    const parsed: ParsedEnum[] = [
      { name: 'PetSize', values: ['small', 'medium', 'large'], type: 'string' },
    ];
    const apiClient: ApiClientEnum[] = [
      { name: 'PetSizeEnum', values: ['small', 'medium', 'large'] },
    ];

    const result = matchEnumsToApiClient(parsed, apiClient);

    expect(result.matched).toHaveLength(1);
    expect(result.matched[0].parsedEnum.name).toBe('PetSize');
    expect(result.matched[0].apiClientEnumName).toBe('PetSizeEnum');
    expect(result.unmatched).toHaveLength(0);
  });

  it('should match by values as fallback', () => {
    const parsed: ParsedEnum[] = [
      { name: 'MyEnum', values: ['a', 'b', 'c'], type: 'string' },
    ];
    const apiClient: ApiClientEnum[] = [
      { name: 'TotallyDifferentName', values: ['c', 'a', 'b'] },
    ];

    const result = matchEnumsToApiClient(parsed, apiClient);

    expect(result.matched).toHaveLength(1);
    expect(result.matched[0].apiClientEnumName).toBe('TotallyDifferentName');
    expect(result.unmatched).toHaveLength(0);
  });

  it('should report unmatched enums', () => {
    const parsed: ParsedEnum[] = [
      { name: 'Unique', values: ['x', 'y'], type: 'string' },
    ];
    const apiClient: ApiClientEnum[] = [
      { name: 'Other', values: ['a', 'b'] },
    ];

    const result = matchEnumsToApiClient(parsed, apiClient);

    expect(result.matched).toHaveLength(0);
    expect(result.unmatched).toHaveLength(1);
    expect(result.unmatched[0].name).toBe('Unique');
  });

  it('should handle same-value enums with different names via name-based matching', () => {
    const parsed: ParsedEnum[] = [
      { name: 'PetStatus', values: ['active', 'inactive'], type: 'string' },
      { name: 'OwnerStatus', values: ['active', 'inactive'], type: 'string' },
    ];
    const apiClient: ApiClientEnum[] = [
      { name: 'PetStatus', values: ['active', 'inactive'] },
      { name: 'OwnerStatus', values: ['active', 'inactive'] },
    ];

    const result = matchEnumsToApiClient(parsed, apiClient);

    expect(result.matched).toHaveLength(2);
    expect(result.matched[0].parsedEnum.name).toBe('PetStatus');
    expect(result.matched[0].apiClientEnumName).toBe('PetStatus');
    expect(result.matched[1].parsedEnum.name).toBe('OwnerStatus');
    expect(result.matched[1].apiClientEnumName).toBe('OwnerStatus');
    expect(result.unmatched).toHaveLength(0);
  });

  it('should not double-match consumed api-client enums', () => {
    const parsed: ParsedEnum[] = [
      { name: 'Alpha', values: ['x', 'y'], type: 'string' },
      { name: 'Beta', values: ['x', 'y'], type: 'string' },
    ];
    const apiClient: ApiClientEnum[] = [
      { name: 'Alpha', values: ['x', 'y'] },
    ];

    const result = matchEnumsToApiClient(parsed, apiClient);

    expect(result.matched).toHaveLength(1);
    expect(result.matched[0].parsedEnum.name).toBe('Alpha');
    expect(result.unmatched).toHaveLength(1);
    expect(result.unmatched[0].name).toBe('Beta');
  });

  it('should match integer enums', () => {
    const parsed: ParsedEnum[] = [
      { name: 'Priority', values: [1, 2, 3], type: 'integer' },
    ];
    const apiClient: ApiClientEnum[] = [
      { name: 'Priority', values: [1, 2, 3] },
    ];

    const result = matchEnumsToApiClient(parsed, apiClient);

    expect(result.matched).toHaveLength(1);
    expect(result.matched[0].apiClientEnumName).toBe('Priority');
    expect(result.unmatched).toHaveLength(0);
  });

  it('should prefer exact name over suffix match', () => {
    const parsed: ParsedEnum[] = [
      { name: 'Status', values: ['a', 'b'], type: 'string' },
    ];
    const apiClient: ApiClientEnum[] = [
      { name: 'StatusEnum', values: ['a', 'b'] },
      { name: 'Status', values: ['a', 'b'] },
    ];

    const result = matchEnumsToApiClient(parsed, apiClient);

    expect(result.matched).toHaveLength(1);
    expect(result.matched[0].apiClientEnumName).toBe('Status');
  });

  it('should prefer params-interface enum for value-based matching when operationId is set', () => {
    // Simulates: ListByronAddressesStateEnum (method-level) and StateEnum1 (in ListByronAddressesParams)
    const parsed: ParsedEnum[] = [
      {
        name: 'AddressState',
        values: ['used', 'unused'],
        type: 'string',
        context: 'parameter',
        operationId: 'listByronAddresses',
      },
      {
        name: 'ResponseAddressState',
        values: ['used', 'unused'],
        type: 'string',
        context: 'response',
        operationId: 'listByronAddresses',
      },
    ];
    const apiClient: ApiClientEnum[] = [
      { name: 'ListByronAddressesStateEnum', values: ['used', 'unused'] },
      { name: 'StateEnum1', values: ['used', 'unused'] },
    ];
    // StateEnum1 is referenced in the ListByronAddressesParams interface
    const paramsEnumMap = new Map<string, Set<string>>([
      ['ListByronAddresses', new Set(['StateEnum1'])],
    ]);

    const result = matchEnumsToApiClient(parsed, apiClient, paramsEnumMap);

    expect(result.matched).toHaveLength(2);
    // The parameter enum (first) should match the params-interface enum
    const paramMatch = result.matched.find((m) => m.parsedEnum.name === 'AddressState');
    expect(paramMatch?.apiClientEnumName).toBe('StateEnum1');
    // The response enum should get the remaining one
    const responseMatch = result.matched.find((m) => m.parsedEnum.name === 'ResponseAddressState');
    expect(responseMatch?.apiClientEnumName).toBe('ListByronAddressesStateEnum');
    expect(result.unmatched).toHaveLength(0);
  });

  it('should fall back to regular value-based matching when no paramsEnumMap entry exists', () => {
    const parsed: ParsedEnum[] = [
      {
        name: 'SomeEnum',
        values: ['x', 'y'],
        type: 'string',
        context: 'response',
        operationId: 'getItems',
      },
    ];
    const apiClient: ApiClientEnum[] = [
      { name: 'DifferentName', values: ['x', 'y'] },
    ];
    const paramsEnumMap = new Map<string, Set<string>>();

    const result = matchEnumsToApiClient(parsed, apiClient, paramsEnumMap);

    expect(result.matched).toHaveLength(1);
    expect(result.matched[0].apiClientEnumName).toBe('DifferentName');
  });

  it('should work without paramsEnumMap (backward compatible)', () => {
    const parsed: ParsedEnum[] = [
      { name: 'MyEnum', values: ['a', 'b'], type: 'string' },
    ];
    const apiClient: ApiClientEnum[] = [
      { name: 'MyEnum', values: ['a', 'b'] },
    ];

    const result = matchEnumsToApiClient(parsed, apiClient);

    expect(result.matched).toHaveLength(1);
    expect(result.matched[0].apiClientEnumName).toBe('MyEnum');
  });
});
