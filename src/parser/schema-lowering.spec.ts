import { describe, expect, it } from 'vitest';
import { lowerSchemaToFlat, lowerPropertyNode, type LoweringRegistry } from './schema-lowering.js';
import type {
  SchemaNode,
  ObjectSchemaNode,
  PropertyNode,
  IntersectionSchemaNode,
  UnionSchemaNode,
} from './types.js';

function makeRegistry(schemas?: Record<string, SchemaNode>): LoweringRegistry {
  const map = new Map<string, SchemaNode>();
  if (schemas) {
    for (const [k, v] of Object.entries(schemas)) {
      map.set(k, v);
    }
  }
  return { schemas: map };
}

describe('lowerSchemaToFlat — primitives', () => {
  it('should lower primitive string', () => {
    const result = lowerSchemaToFlat('TestResponse', { kind: 'primitive', type: 'string' }, makeRegistry());
    expect(result.primitiveType).toBe('string');
    expect(result.properties).toEqual([]);
  });

  it('should lower primitive integer', () => {
    const result = lowerSchemaToFlat('TestResponse', { kind: 'primitive', type: 'integer' }, makeRegistry());
    expect(result.primitiveType).toBe('integer');
  });
});

describe('lowerSchemaToFlat — objects', () => {
  it('should lower object with properties', () => {
    const node: ObjectSchemaNode = {
      kind: 'object',
      properties: [
        { name: 'id', schema: { kind: 'primitive', type: 'string' }, required: true, nullable: false },
        { name: 'age', schema: { kind: 'primitive', type: 'integer' }, required: false, nullable: true },
      ],
    };

    const result = lowerSchemaToFlat('Pet', node, makeRegistry());
    expect(result.properties).toHaveLength(2);

    const id = result.properties.find((p) => p.name === 'id')!;
    expect(id.type).toBe('string');
    expect(id.required).toBe(true);
    expect(id.nullable).toBe(false);

    const age = result.properties.find((p) => p.name === 'age')!;
    expect(age.type).toBe('number');
    expect(age.required).toBe(false);
    expect(age.nullable).toBe(true);
  });
});

describe('lowerSchemaToFlat — arrays', () => {
  it('should lower array of primitives', () => {
    const result = lowerSchemaToFlat(
      'TestResponse',
      { kind: 'array', items: { kind: 'primitive', type: 'string' } },
      makeRegistry(),
    );
    expect(result.primitiveType).toBe('string');
    expect(result.isArray).toBe(true);
  });

  it('should lower array of objects', () => {
    const result = lowerSchemaToFlat(
      'TestResponse',
      {
        kind: 'array',
        items: {
          kind: 'object',
          properties: [
            { name: 'name', schema: { kind: 'primitive', type: 'string' }, required: true, nullable: false },
          ],
        },
      },
      makeRegistry(),
    );
    expect(result.properties).toHaveLength(1);
    expect(result.properties[0].name).toBe('name');
  });
});

describe('lowerSchemaToFlat — enums', () => {
  it('should lower enum property', () => {
    const node: ObjectSchemaNode = {
      kind: 'object',
      properties: [
        {
          name: 'status',
          schema: { kind: 'enum', values: ['active', 'inactive'], enumType: 'string' },
          required: true,
          nullable: false,
        },
      ],
    };

    const result = lowerSchemaToFlat('Pet', node, makeRegistry());
    const status = result.properties[0];
    expect(status.type).toBe('enum');
    expect(status.enumValues).toEqual(['active', 'inactive']);
    expect(status.enumName).toBe('PetStatus');
  });

  it('should use enumName from node when present', () => {
    const node: ObjectSchemaNode = {
      kind: 'object',
      properties: [
        {
          name: 'status',
          schema: { kind: 'enum', values: ['active', 'inactive'], enumType: 'string', enumName: 'MyStatus' },
          required: true,
          nullable: false,
        },
      ],
    };

    const result = lowerSchemaToFlat('Pet', node, makeRegistry());
    expect(result.properties[0].enumName).toBe('MyStatus');
  });

  it('should resolve ref to enum schema', () => {
    const registry = makeRegistry({
      PetStatus: { kind: 'enum', values: ['active', 'inactive'], enumType: 'string' },
    });

    const node: ObjectSchemaNode = {
      kind: 'object',
      properties: [
        {
          name: 'status',
          schema: { kind: 'ref', refName: 'PetStatus' },
          required: true,
          nullable: false,
        },
      ],
    };

    const result = lowerSchemaToFlat('Pet', node, registry);
    const status = result.properties[0];
    expect(status.type).toBe('enum');
    expect(status.enumName).toBe('PetStatus');
    expect(status.enumValues).toEqual(['active', 'inactive']);
  });
});

describe('lowerSchemaToFlat — intersection (allOf)', () => {
  it('should merge all member properties', () => {
    const node: IntersectionSchemaNode = {
      kind: 'intersection',
      members: [
        {
          kind: 'object',
          properties: [
            { name: 'id', schema: { kind: 'primitive', type: 'string' }, required: true, nullable: false },
            { name: 'name', schema: { kind: 'primitive', type: 'string' }, required: true, nullable: false },
          ],
        },
        {
          kind: 'object',
          properties: [
            { name: 'breed', schema: { kind: 'primitive', type: 'string' }, required: true, nullable: false },
          ],
        },
      ],
    };

    const result = lowerSchemaToFlat('Dog', node, makeRegistry());
    expect(result.properties).toHaveLength(3);
    expect(result.properties.map((p) => p.name).sort()).toEqual(['breed', 'id', 'name']);
  });

  it('should set extends from first ref member', () => {
    const registry = makeRegistry({
      Animal: {
        kind: 'object',
        properties: [
          { name: 'id', schema: { kind: 'primitive', type: 'string' }, required: true, nullable: false },
          { name: 'name', schema: { kind: 'primitive', type: 'string' }, required: true, nullable: false },
        ],
      },
    });

    const node: IntersectionSchemaNode = {
      kind: 'intersection',
      members: [
        { kind: 'ref', refName: 'Animal' },
        {
          kind: 'object',
          properties: [
            { name: 'breed', schema: { kind: 'primitive', type: 'string' }, required: true, nullable: false },
          ],
        },
      ],
    };

    const result = lowerSchemaToFlat('Dog', node, registry);
    expect(result.extends).toBe('Animal');
    expect(result.properties).toHaveLength(3);
  });
});

describe('lowerSchemaToFlat — union (oneOf/anyOf)', () => {
  it('should merge variant properties', () => {
    const node: UnionSchemaNode = {
      kind: 'union',
      variant: 'oneOf',
      members: [
        {
          kind: 'object',
          properties: [
            { name: 'name', schema: { kind: 'primitive', type: 'string' }, required: true, nullable: false },
            { name: 'personalId', schema: { kind: 'primitive', type: 'string' }, required: true, nullable: false },
          ],
        },
        {
          kind: 'object',
          properties: [
            { name: 'name', schema: { kind: 'primitive', type: 'string' }, required: true, nullable: false },
            { name: 'businessId', schema: { kind: 'primitive', type: 'string' }, required: true, nullable: false },
          ],
        },
      ],
    };

    const result = lowerSchemaToFlat('CreateWalletInput', node, makeRegistry());
    expect(result.properties).toHaveLength(3);

    // name is required in both → required
    const name = result.properties.find((p) => p.name === 'name')!;
    expect(name.required).toBe(true);

    // personalId is only in first variant → not required
    const personalId = result.properties.find((p) => p.name === 'personalId')!;
    expect(personalId.required).toBe(false);

    // businessId is only in second variant → not required
    const businessId = result.properties.find((p) => p.name === 'businessId')!;
    expect(businessId.required).toBe(false);
  });

  it('should collect unionMembers from ref members', () => {
    const registry = makeRegistry({
      PersonalWalletInput: {
        kind: 'object',
        properties: [
          { name: 'name', schema: { kind: 'primitive', type: 'string' }, required: true, nullable: false },
        ],
      },
      BusinessWalletInput: {
        kind: 'object',
        properties: [
          { name: 'name', schema: { kind: 'primitive', type: 'string' }, required: true, nullable: false },
        ],
      },
    });

    const node: UnionSchemaNode = {
      kind: 'union',
      variant: 'oneOf',
      members: [
        { kind: 'ref', refName: 'PersonalWalletInput' },
        { kind: 'ref', refName: 'BusinessWalletInput' },
      ],
    };

    const result = lowerSchemaToFlat('CreateWalletInput', node, registry);
    expect(result.unionMembers).toEqual(['PersonalWalletInput', 'BusinessWalletInput']);
  });

  it('should attach discriminator', () => {
    const node: UnionSchemaNode = {
      kind: 'union',
      variant: 'oneOf',
      members: [
        { kind: 'object', properties: [] },
        { kind: 'object', properties: [] },
      ],
      discriminator: { propertyName: 'type', mapping: { a: 'A', b: 'B' } },
    };

    const result = lowerSchemaToFlat('Test', node, makeRegistry());
    expect(result.discriminator).toEqual({ propertyName: 'type', mapping: { a: 'A', b: 'B' } });
  });
});

describe('lowerSchemaToFlat — refs', () => {
  it('should resolve ref to object schema', () => {
    const registry = makeRegistry({
      Pet: {
        kind: 'object',
        properties: [
          { name: 'id', schema: { kind: 'primitive', type: 'string' }, required: true, nullable: false },
          { name: 'name', schema: { kind: 'primitive', type: 'string' }, required: true, nullable: false },
        ],
      },
    });

    const result = lowerSchemaToFlat('PetResponse', { kind: 'ref', refName: 'Pet' }, registry);
    expect(result.properties).toHaveLength(2);
    expect(result.properties.map((p) => p.name).sort()).toEqual(['id', 'name']);
  });
});

describe('lowerSchemaToFlat — maps', () => {
  it('should lower map to empty object (backward-compat)', () => {
    const result = lowerSchemaToFlat(
      'Metadata',
      { kind: 'map', valueSchema: { kind: 'primitive', type: 'string' } },
      makeRegistry(),
    );
    expect(result.properties).toEqual([]);
  });
});

describe('lowerPropertyNode — readOnly/writeOnly', () => {
  it('should preserve readOnly on lowered property', () => {
    const propNode: PropertyNode = {
      name: 'id',
      schema: { kind: 'primitive', type: 'string' },
      required: true,
      nullable: false,
      readOnly: true,
    };

    const result = lowerPropertyNode(propNode, makeRegistry(), 'Pet');
    expect(result.readOnly).toBe(true);
  });

  it('should preserve writeOnly on lowered property', () => {
    const propNode: PropertyNode = {
      name: 'password',
      schema: { kind: 'primitive', type: 'string' },
      required: true,
      nullable: false,
      writeOnly: true,
    };

    const result = lowerPropertyNode(propNode, makeRegistry(), 'User');
    expect(result.writeOnly).toBe(true);
  });

  it('should not set readOnly/writeOnly when not present', () => {
    const propNode: PropertyNode = {
      name: 'name',
      schema: { kind: 'primitive', type: 'string' },
      required: true,
      nullable: false,
    };

    const result = lowerPropertyNode(propNode, makeRegistry(), 'Pet');
    expect(result.readOnly).toBeUndefined();
    expect(result.writeOnly).toBeUndefined();
  });
});

describe('lowerPropertyNode — description', () => {
  it('should preserve description on lowered property', () => {
    const propNode: PropertyNode = {
      name: 'name',
      schema: { kind: 'primitive', type: 'string' },
      required: true,
      nullable: false,
      description: 'The pet name',
    };

    const result = lowerPropertyNode(propNode, makeRegistry(), 'Pet');
    expect(result.description).toBe('The pet name');
  });

  it('should not set description when not present', () => {
    const propNode: PropertyNode = {
      name: 'name',
      schema: { kind: 'primitive', type: 'string' },
      required: true,
      nullable: false,
    };

    const result = lowerPropertyNode(propNode, makeRegistry(), 'Pet');
    expect(result.description).toBeUndefined();
  });
});

describe('lowerPropertyNode — deprecated', () => {
  it('should preserve deprecated on lowered property', () => {
    const propNode: PropertyNode = {
      name: 'legacyId',
      schema: { kind: 'primitive', type: 'string' },
      required: false,
      nullable: false,
      deprecated: true,
    };

    const result = lowerPropertyNode(propNode, makeRegistry(), 'Pet');
    expect(result.deprecated).toBe(true);
  });

  it('should not set deprecated when not present', () => {
    const propNode: PropertyNode = {
      name: 'name',
      schema: { kind: 'primitive', type: 'string' },
      required: true,
      nullable: false,
    };

    const result = lowerPropertyNode(propNode, makeRegistry(), 'Pet');
    expect(result.deprecated).toBeUndefined();
  });
});

describe('lowerPropertyNode — array of enums', () => {
  it('should lower array of enums correctly', () => {
    const propNode: PropertyNode = {
      name: 'tags',
      schema: {
        kind: 'array',
        items: { kind: 'enum', values: ['a', 'b'], enumType: 'string', enumName: 'Tag' },
      },
      required: false,
      nullable: false,
    };

    const result = lowerPropertyNode(propNode, makeRegistry(), 'Pet');
    expect(result.isArray).toBe(true);
    expect(result.type).toBe('enum');
    expect(result.enumName).toBe('Tag');
    expect(result.enumValues).toEqual(['a', 'b']);
  });
});
