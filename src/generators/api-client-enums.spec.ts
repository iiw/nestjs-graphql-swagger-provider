import { describe, expect, it } from 'vitest';
import type { ParsedController, ParsedEnum } from '../parser/types.js';
import {
  type ApiClientEnum,
  type EnumMatchResult,
  matchEnumsToApiClient,
  substituteParameterEnums,
} from './api-client-enums.js';

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

describe('substituteParameterEnums', () => {
  function makeController(endpoints: ParsedController['endpoints']): ParsedController {
    return { name: 'Test', endpoints };
  }

  it('should substitute param.enumName when paramsEnumMap has a matching enum', () => {
    const controllers: ParsedController[] = [
      makeController([
        {
          path: '/items',
          method: 'get',
          operationId: 'listItems',
          parameters: [
            {
              name: 'status',
              location: 'query',
              type: 'enum',
              required: false,
              isArray: false,
              enumName: 'ListItemsStatus',
              enumValues: ['active', 'inactive'],
            },
          ],
          errorResponses: [],
        },
      ]),
    ];
    const apiClientEnums: ApiClientEnum[] = [
      { name: 'ListItemsStatusEnum', values: ['active', 'inactive'] },
      { name: 'StatusEnum1', values: ['active', 'inactive'] },
    ];
    const paramsEnumMap = new Map([['ListItems', new Set(['StatusEnum1'])]]);
    const enumMatchResult: EnumMatchResult = {
      matched: [
        {
          parsedEnum: { name: 'ListItemsStatus', values: ['active', 'inactive'], type: 'string' },
          apiClientEnumName: 'ListItemsStatusEnum',
        },
      ],
      unmatched: [],
    };

    substituteParameterEnums(controllers, apiClientEnums, paramsEnumMap, enumMatchResult);

    expect(controllers[0].endpoints[0].parameters[0].enumName).toBe('StatusEnum1');
  });

  it('should add the params enum to enumMatchResult.matched when not already there', () => {
    const controllers: ParsedController[] = [
      makeController([
        {
          path: '/items',
          method: 'get',
          operationId: 'listItems',
          parameters: [
            {
              name: 'status',
              location: 'query',
              type: 'enum',
              required: false,
              isArray: false,
              enumName: 'ListItemsStatus',
              enumValues: ['active', 'inactive'],
            },
          ],
          errorResponses: [],
        },
      ]),
    ];
    const apiClientEnums: ApiClientEnum[] = [
      { name: 'StatusEnum1', values: ['active', 'inactive'] },
    ];
    const paramsEnumMap = new Map([['ListItems', new Set(['StatusEnum1'])]]);
    const enumMatchResult: EnumMatchResult = { matched: [], unmatched: [] };

    substituteParameterEnums(controllers, apiClientEnums, paramsEnumMap, enumMatchResult);

    expect(enumMatchResult.matched).toHaveLength(1);
    expect(enumMatchResult.matched[0].apiClientEnumName).toBe('StatusEnum1');
    expect(enumMatchResult.matched[0].parsedEnum.name).toBe('StatusEnum1');
  });

  it('should not substitute when paramsEnumMap has no entry for the operation', () => {
    const controllers: ParsedController[] = [
      makeController([
        {
          path: '/items',
          method: 'get',
          operationId: 'listItems',
          parameters: [
            {
              name: 'status',
              location: 'query',
              type: 'enum',
              required: false,
              isArray: false,
              enumName: 'ListItemsStatus',
              enumValues: ['active', 'inactive'],
            },
          ],
          errorResponses: [],
        },
      ]),
    ];
    const apiClientEnums: ApiClientEnum[] = [
      { name: 'StatusEnum1', values: ['active', 'inactive'] },
    ];
    const paramsEnumMap = new Map<string, Set<string>>(); // empty
    const enumMatchResult: EnumMatchResult = { matched: [], unmatched: [] };

    substituteParameterEnums(controllers, apiClientEnums, paramsEnumMap, enumMatchResult);

    expect(controllers[0].endpoints[0].parameters[0].enumName).toBe('ListItemsStatus');
    expect(enumMatchResult.matched).toHaveLength(0);
  });

  it('should not substitute when values do not match', () => {
    const controllers: ParsedController[] = [
      makeController([
        {
          path: '/items',
          method: 'get',
          operationId: 'listItems',
          parameters: [
            {
              name: 'status',
              location: 'query',
              type: 'enum',
              required: false,
              isArray: false,
              enumName: 'ListItemsStatus',
              enumValues: ['active', 'inactive'],
            },
          ],
          errorResponses: [],
        },
      ]),
    ];
    const apiClientEnums: ApiClientEnum[] = [
      { name: 'StatusEnum1', values: ['open', 'closed'] }, // different values
    ];
    const paramsEnumMap = new Map([['ListItems', new Set(['StatusEnum1'])]]);
    const enumMatchResult: EnumMatchResult = { matched: [], unmatched: [] };

    substituteParameterEnums(controllers, apiClientEnums, paramsEnumMap, enumMatchResult);

    expect(controllers[0].endpoints[0].parameters[0].enumName).toBe('ListItemsStatus');
    expect(enumMatchResult.matched).toHaveLength(0);
  });

  it('should handle multiple parameters in the same operation', () => {
    const controllers: ParsedController[] = [
      makeController([
        {
          path: '/items',
          method: 'get',
          operationId: 'listItems',
          parameters: [
            {
              name: 'status',
              location: 'query',
              type: 'enum',
              required: false,
              isArray: false,
              enumName: 'ListItemsStatus',
              enumValues: ['active', 'inactive'],
            },
            {
              name: 'category',
              location: 'query',
              type: 'enum',
              required: false,
              isArray: false,
              enumName: 'ListItemsCategory',
              enumValues: ['food', 'toys'],
            },
          ],
          errorResponses: [],
        },
      ]),
    ];
    const apiClientEnums: ApiClientEnum[] = [
      { name: 'StatusEnum1', values: ['active', 'inactive'] },
      { name: 'CategoryEnum1', values: ['food', 'toys'] },
    ];
    const paramsEnumMap = new Map([
      ['ListItems', new Set(['StatusEnum1', 'CategoryEnum1'])],
    ]);
    const enumMatchResult: EnumMatchResult = { matched: [], unmatched: [] };

    substituteParameterEnums(controllers, apiClientEnums, paramsEnumMap, enumMatchResult);

    expect(controllers[0].endpoints[0].parameters[0].enumName).toBe('StatusEnum1');
    expect(controllers[0].endpoints[0].parameters[1].enumName).toBe('CategoryEnum1');
    expect(enumMatchResult.matched).toHaveLength(2);
  });

  it('should not duplicate matched entry when params enum is already exported under its own name', () => {
    const controllers: ParsedController[] = [
      makeController([
        {
          path: '/items',
          method: 'get',
          operationId: 'listItems',
          parameters: [
            {
              name: 'status',
              location: 'query',
              type: 'enum',
              required: false,
              isArray: false,
              enumName: 'ListItemsStatus',
              enumValues: ['active', 'inactive'],
            },
          ],
          errorResponses: [],
        },
      ]),
    ];
    const apiClientEnums: ApiClientEnum[] = [
      { name: 'StatusEnum1', values: ['active', 'inactive'] },
    ];
    const paramsEnumMap = new Map([['ListItems', new Set(['StatusEnum1'])]]);
    const enumMatchResult: EnumMatchResult = {
      matched: [
        {
          parsedEnum: { name: 'StatusEnum1', values: ['active', 'inactive'], type: 'string' },
          apiClientEnumName: 'StatusEnum1',
        },
      ],
      unmatched: [],
    };

    substituteParameterEnums(controllers, apiClientEnums, paramsEnumMap, enumMatchResult);

    expect(controllers[0].endpoints[0].parameters[0].enumName).toBe('StatusEnum1');
    // Should not add a duplicate since StatusEnum1 is already exported under its own name
    expect(enumMatchResult.matched).toHaveLength(1);
  });

  it('should not substitute when current match already uses the correct params enum', () => {
    const controllers: ParsedController[] = [
      makeController([
        {
          path: '/items',
          method: 'get',
          operationId: 'listItems',
          parameters: [
            {
              name: 'status',
              location: 'query',
              type: 'enum',
              required: false,
              isArray: false,
              enumName: 'ListItemsStatus',
              enumValues: ['active', 'inactive'],
            },
          ],
          errorResponses: [],
        },
      ]),
    ];
    const apiClientEnums: ApiClientEnum[] = [
      { name: 'StatusEnum1', values: ['active', 'inactive'] },
    ];
    const paramsEnumMap = new Map([['ListItems', new Set(['StatusEnum1'])]]);
    // The current match already uses the correct params enum (via value-based matching)
    const enumMatchResult: EnumMatchResult = {
      matched: [
        {
          parsedEnum: { name: 'ListItemsStatus', values: ['active', 'inactive'], type: 'string' },
          apiClientEnumName: 'StatusEnum1',
        },
      ],
      unmatched: [],
    };

    substituteParameterEnums(controllers, apiClientEnums, paramsEnumMap, enumMatchResult);

    // Should NOT substitute — the alias ListItemsStatus → StatusEnum1 is correct
    expect(controllers[0].endpoints[0].parameters[0].enumName).toBe('ListItemsStatus');
    expect(enumMatchResult.matched).toHaveLength(1);
  });
});
