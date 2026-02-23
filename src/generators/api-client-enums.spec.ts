import { describe, expect, it } from 'vitest';
import type { ParsedController, ParsedEnum } from '../parser/types.js';
import {
  type ApiClientEnum,
  type EnumMatchResult,
  extractBodyTypeEnumNames,
  matchEnumsToApiClient,
  substituteBodyEnums,
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

describe('extractBodyTypeEnumNames', () => {
  it('should find enums in an interface definition', () => {
    const content = `
export interface CreatePetPayload {
  name: string;
  status: PetStatusEnum;
  size: PetSizeEnum;
}`;
    const apiClientEnums: ApiClientEnum[] = [
      { name: 'PetStatusEnum', values: ['active', 'inactive'] },
      { name: 'PetSizeEnum', values: ['small', 'large'] },
      { name: 'OtherEnum', values: ['x'] },
    ];

    const result = extractBodyTypeEnumNames(content, 'CreatePetPayload', apiClientEnums);

    expect(result).toEqual(new Set(['PetStatusEnum', 'PetSizeEnum']));
  });

  it('should find enums in a type alias definition', () => {
    const content = `
export type CreatePetPayload = {
  status: PetStatusEnum;
}`;
    const apiClientEnums: ApiClientEnum[] = [
      { name: 'PetStatusEnum', values: ['active', 'inactive'] },
    ];

    const result = extractBodyTypeEnumNames(content, 'CreatePetPayload', apiClientEnums);

    expect(result).toEqual(new Set(['PetStatusEnum']));
  });

  it('should handle nested inline objects', () => {
    const content = `
export interface CreatePetPayload {
  outer: string;
  nested: {
    unit: UnitEnum3;
  };
}`;
    const apiClientEnums: ApiClientEnum[] = [
      { name: 'UnitEnum3', values: ['lovelace'] },
    ];

    const result = extractBodyTypeEnumNames(content, 'CreatePetPayload', apiClientEnums);

    expect(result).toEqual(new Set(['UnitEnum3']));
  });

  it('should return empty set when body type is not found', () => {
    const content = `export interface OtherType { name: string; }`;
    const apiClientEnums: ApiClientEnum[] = [
      { name: 'SomeEnum', values: ['a'] },
    ];

    const result = extractBodyTypeEnumNames(content, 'MissingType', apiClientEnums);

    expect(result).toEqual(new Set());
  });

  it('should use whole-word matching only (no partial matches)', () => {
    const content = `
export interface CreatePayload {
  status: MyStatusEnum;
}`;
    const apiClientEnums: ApiClientEnum[] = [
      { name: 'MyStatusEnum', values: ['a'] },
      { name: 'Status', values: ['b'] }, // "Status" is a substring but not a whole word match as type
    ];

    const result = extractBodyTypeEnumNames(content, 'CreatePayload', apiClientEnums);

    // "Status" appears as a substring of "MyStatusEnum" but as a word boundary match it would
    // also match because "Status" appears in "MyStatusEnum" — however it appears in the body text
    // as part of "MyStatusEnum" so let's check: the body text is "  status: MyStatusEnum;\n"
    // \bStatus\b would match inside "MyStatusEnum"? No — "MyStatusEnum" has no word boundary before "Status"
    // because 'y' is a word char. So \bStatus\b would NOT match "MyStatusEnum". Good.
    expect(result).toEqual(new Set(['MyStatusEnum']));
  });
});

describe('substituteBodyEnums', () => {
  function makeController(endpoints: ParsedController['endpoints']): ParsedController {
    return { name: 'Test', endpoints };
  }

  it('should substitute prop.enumName when body type uses a different API client enum', () => {
    const controllers: ParsedController[] = [
      makeController([
        {
          path: '/pets',
          method: 'post',
          operationId: 'createPet',
          parameters: [],
          errorResponses: [],
          apiClientMethodName: 'createPet',
          apiClientBodyTypeName: 'CreatePetPayload',
          requestBody: {
            name: 'CreatePetInput',
            properties: [
              {
                name: 'status',
                type: 'enum',
                isArray: false,
                required: true,
                nullable: false,
                enumName: 'PostPetStatusEnum1',
                enumValues: ['active', 'inactive'],
              },
            ],
          },
        },
      ]),
    ];
    const apiClientContent = `
export interface CreatePetPayload {
  status: CreatePetStatusEnum2;
}`;
    const apiClientEnums: ApiClientEnum[] = [
      { name: 'PostPetStatusEnum1', values: ['active', 'inactive'] },
      { name: 'CreatePetStatusEnum2', values: ['active', 'inactive'] },
    ];
    const enumMatchResult: EnumMatchResult = {
      matched: [
        {
          parsedEnum: { name: 'PostPetStatusEnum1', values: ['active', 'inactive'], type: 'string' },
          apiClientEnumName: 'PostPetStatusEnum1',
        },
      ],
      unmatched: [],
    };

    substituteBodyEnums(controllers, apiClientContent, apiClientEnums, enumMatchResult);

    expect(controllers[0].endpoints[0].requestBody!.properties[0].enumName).toBe('CreatePetStatusEnum2');
  });

  it('should add body enum to enumMatchResult.matched', () => {
    const controllers: ParsedController[] = [
      makeController([
        {
          path: '/pets',
          method: 'post',
          operationId: 'createPet',
          parameters: [],
          errorResponses: [],
          apiClientMethodName: 'createPet',
          apiClientBodyTypeName: 'CreatePetPayload',
          requestBody: {
            name: 'CreatePetInput',
            properties: [
              {
                name: 'unit',
                type: 'enum',
                isArray: false,
                required: true,
                nullable: false,
                enumName: 'WrongUnitEnum',
                enumValues: ['lovelace'],
              },
            ],
          },
        },
      ]),
    ];
    const apiClientContent = `
export interface CreatePetPayload {
  unit: CorrectUnitEnum;
}`;
    const apiClientEnums: ApiClientEnum[] = [
      { name: 'WrongUnitEnum', values: ['lovelace'] },
      { name: 'CorrectUnitEnum', values: ['lovelace'] },
    ];
    const enumMatchResult: EnumMatchResult = {
      matched: [
        {
          parsedEnum: { name: 'WrongUnitEnum', values: ['lovelace'], type: 'string' },
          apiClientEnumName: 'WrongUnitEnum',
        },
      ],
      unmatched: [],
    };

    substituteBodyEnums(controllers, apiClientContent, apiClientEnums, enumMatchResult);

    // Should have added CorrectUnitEnum
    const addedEntry = enumMatchResult.matched.find(
      (m) => m.apiClientEnumName === 'CorrectUnitEnum',
    );
    expect(addedEntry).toBeDefined();
    expect(addedEntry!.parsedEnum.name).toBe('CorrectUnitEnum');
  });

  it('should be a no-op when current match already points to a body-type enum', () => {
    const controllers: ParsedController[] = [
      makeController([
        {
          path: '/pets',
          method: 'post',
          operationId: 'createPet',
          parameters: [],
          errorResponses: [],
          apiClientMethodName: 'createPet',
          apiClientBodyTypeName: 'CreatePetPayload',
          requestBody: {
            name: 'CreatePetInput',
            properties: [
              {
                name: 'status',
                type: 'enum',
                isArray: false,
                required: true,
                nullable: false,
                enumName: 'CorrectEnum',
                enumValues: ['active', 'inactive'],
              },
            ],
          },
        },
      ]),
    ];
    const apiClientContent = `
export interface CreatePetPayload {
  status: CorrectEnum;
}`;
    const apiClientEnums: ApiClientEnum[] = [
      { name: 'CorrectEnum', values: ['active', 'inactive'] },
    ];
    const enumMatchResult: EnumMatchResult = {
      matched: [
        {
          parsedEnum: { name: 'CorrectEnum', values: ['active', 'inactive'], type: 'string' },
          apiClientEnumName: 'CorrectEnum',
        },
      ],
      unmatched: [],
    };

    substituteBodyEnums(controllers, apiClientContent, apiClientEnums, enumMatchResult);

    // Should not change anything
    expect(controllers[0].endpoints[0].requestBody!.properties[0].enumName).toBe('CorrectEnum');
    expect(enumMatchResult.matched).toHaveLength(1);
  });

  it('should handle nested properties', () => {
    const controllers: ParsedController[] = [
      makeController([
        {
          path: '/pets',
          method: 'post',
          operationId: 'createPet',
          parameters: [],
          errorResponses: [],
          apiClientMethodName: 'createPet',
          apiClientBodyTypeName: 'CreatePetPayload',
          requestBody: {
            name: 'CreatePetInput',
            properties: [
              {
                name: 'details',
                type: 'object',
                isArray: false,
                required: true,
                nullable: false,
                properties: [
                  {
                    name: 'unit',
                    type: 'enum',
                    isArray: false,
                    required: true,
                    nullable: false,
                    enumName: 'WrongUnitEnum',
                    enumValues: ['lovelace'],
                  },
                ],
              },
            ],
          },
        },
      ]),
    ];
    const apiClientContent = `
export interface CreatePetPayload {
  details: {
    unit: BodyUnitEnum;
  };
}`;
    const apiClientEnums: ApiClientEnum[] = [
      { name: 'WrongUnitEnum', values: ['lovelace'] },
      { name: 'BodyUnitEnum', values: ['lovelace'] },
    ];
    const enumMatchResult: EnumMatchResult = {
      matched: [
        {
          parsedEnum: { name: 'WrongUnitEnum', values: ['lovelace'], type: 'string' },
          apiClientEnumName: 'WrongUnitEnum',
        },
      ],
      unmatched: [],
    };

    substituteBodyEnums(controllers, apiClientContent, apiClientEnums, enumMatchResult);

    expect(controllers[0].endpoints[0].requestBody!.properties[0].properties![0].enumName).toBe('BodyUnitEnum');
  });

  it('should handle multiple endpoints with different body types', () => {
    const controllers: ParsedController[] = [
      makeController([
        {
          path: '/cats',
          method: 'post',
          operationId: 'createCat',
          parameters: [],
          errorResponses: [],
          apiClientMethodName: 'createCat',
          apiClientBodyTypeName: 'CreateCatPayload',
          requestBody: {
            name: 'CreateCatInput',
            properties: [
              {
                name: 'unit',
                type: 'enum',
                isArray: false,
                required: true,
                nullable: false,
                enumName: 'WrongEnum',
                enumValues: ['lovelace'],
              },
            ],
          },
        },
        {
          path: '/dogs',
          method: 'post',
          operationId: 'createDog',
          parameters: [],
          errorResponses: [],
          apiClientMethodName: 'createDog',
          apiClientBodyTypeName: 'CreateDogPayload',
          requestBody: {
            name: 'CreateDogInput',
            properties: [
              {
                name: 'unit',
                type: 'enum',
                isArray: false,
                required: true,
                nullable: false,
                enumName: 'WrongEnum',
                enumValues: ['lovelace'],
              },
            ],
          },
        },
      ]),
    ];
    const apiClientContent = `
export interface CreateCatPayload {
  unit: CatUnitEnum;
}
export interface CreateDogPayload {
  unit: DogUnitEnum;
}`;
    const apiClientEnums: ApiClientEnum[] = [
      { name: 'WrongEnum', values: ['lovelace'] },
      { name: 'CatUnitEnum', values: ['lovelace'] },
      { name: 'DogUnitEnum', values: ['lovelace'] },
    ];
    const enumMatchResult: EnumMatchResult = {
      matched: [
        {
          parsedEnum: { name: 'WrongEnum', values: ['lovelace'], type: 'string' },
          apiClientEnumName: 'WrongEnum',
        },
      ],
      unmatched: [],
    };

    substituteBodyEnums(controllers, apiClientContent, apiClientEnums, enumMatchResult);

    expect(controllers[0].endpoints[0].requestBody!.properties[0].enumName).toBe('CatUnitEnum');
    expect(controllers[0].endpoints[1].requestBody!.properties[0].enumName).toBe('DogUnitEnum');
  });

  it('should skip endpoints without requestBody or apiClientBodyTypeName', () => {
    const controllers: ParsedController[] = [
      makeController([
        {
          path: '/pets',
          method: 'get',
          operationId: 'listPets',
          parameters: [],
          errorResponses: [],
        },
      ]),
    ];
    const enumMatchResult: EnumMatchResult = { matched: [], unmatched: [] };

    // Should not throw
    substituteBodyEnums(controllers, '', [], enumMatchResult);

    expect(enumMatchResult.matched).toHaveLength(0);
  });
});
