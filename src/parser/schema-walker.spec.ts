import type { OpenAPIV3_1 } from 'openapi-types';
import { describe, expect, it } from 'vitest';
import { walkSchema, type WalkContext } from './schema-walker.js';
import { REF_NAME_SYMBOL, type AnnotatedSchema } from './schema-resolver.js';
import type {
  ObjectSchemaNode,
  PrimitiveSchemaNode,
  ArraySchemaNode,
  EnumSchemaNode,
  UnionSchemaNode,
  IntersectionSchemaNode,
  MapSchemaNode,
} from './types.js';

function makeCtx(definingName?: string): WalkContext {
  return { visited: new WeakSet(), definingName };
}

describe('walkSchema primitives', () => {
  it('should walk string type', () => {
    const node = walkSchema({ type: 'string' }, makeCtx());
    expect(node).toEqual({ kind: 'primitive', type: 'string' });
  });

  it('should walk number type', () => {
    const node = walkSchema({ type: 'number' }, makeCtx());
    expect(node).toEqual({ kind: 'primitive', type: 'number' });
  });

  it('should walk integer type', () => {
    const node = walkSchema({ type: 'integer' }, makeCtx());
    expect(node).toEqual({ kind: 'primitive', type: 'integer' });
  });

  it('should walk boolean type', () => {
    const node = walkSchema({ type: 'boolean' }, makeCtx());
    expect(node).toEqual({ kind: 'primitive', type: 'boolean' });
  });

  it('should return empty object for undefined schema', () => {
    const node = walkSchema(undefined, makeCtx());
    expect(node).toEqual({ kind: 'object', properties: [] });
  });
});

describe('walkSchema enums', () => {
  it('should walk string enum', () => {
    const node = walkSchema(
      { type: 'string', enum: ['a', 'b', 'c'] },
      makeCtx(),
    ) as EnumSchemaNode;

    expect(node.kind).toBe('enum');
    expect(node.values).toEqual(['a', 'b', 'c']);
    expect(node.enumType).toBe('string');
  });

  it('should walk integer enum', () => {
    const node = walkSchema(
      { type: 'integer', enum: [1, 2, 3] },
      makeCtx(),
    ) as EnumSchemaNode;

    expect(node.kind).toBe('enum');
    expect(node.values).toEqual([1, 2, 3]);
    expect(node.enumType).toBe('integer');
  });

  it('should use REF_NAME_SYMBOL as enumName when defining', () => {
    const schema: AnnotatedSchema = {
      type: 'string',
      enum: ['active', 'inactive'],
    };
    schema[REF_NAME_SYMBOL] = 'PetStatus';

    const node = walkSchema(schema, makeCtx('PetStatus')) as EnumSchemaNode;
    expect(node.kind).toBe('enum');
    expect(node.enumName).toBe('PetStatus');
  });
});

describe('walkSchema arrays', () => {
  it('should walk array of strings', () => {
    const node = walkSchema(
      { type: 'array', items: { type: 'string' } },
      makeCtx(),
    ) as ArraySchemaNode;

    expect(node.kind).toBe('array');
    expect(node.items).toEqual({ kind: 'primitive', type: 'string' });
  });

  it('should walk array of objects', () => {
    const node = walkSchema(
      {
        type: 'array',
        items: {
          type: 'object',
          properties: { name: { type: 'string' } },
          required: ['name'],
        },
      },
      makeCtx(),
    ) as ArraySchemaNode;

    expect(node.kind).toBe('array');
    const items = node.items as ObjectSchemaNode;
    expect(items.kind).toBe('object');
    expect(items.properties).toHaveLength(1);
    expect(items.properties[0].name).toBe('name');
    expect(items.properties[0].required).toBe(true);
  });
});

describe('walkSchema objects', () => {
  it('should walk object with properties', () => {
    const node = walkSchema(
      {
        type: 'object',
        properties: {
          id: { type: 'string' },
          age: { type: 'integer' },
        },
        required: ['id'],
      },
      makeCtx(),
    ) as ObjectSchemaNode;

    expect(node.kind).toBe('object');
    expect(node.properties).toHaveLength(2);

    const id = node.properties.find((p) => p.name === 'id')!;
    expect(id.required).toBe(true);
    expect((id.schema as PrimitiveSchemaNode).type).toBe('string');

    const age = node.properties.find((p) => p.name === 'age')!;
    expect(age.required).toBe(false);
  });

  it('should extract readOnly from properties', () => {
    const node = walkSchema(
      {
        type: 'object',
        properties: {
          id: { type: 'string', readOnly: true },
          name: { type: 'string' },
        },
      },
      makeCtx(),
    ) as ObjectSchemaNode;

    const id = node.properties.find((p) => p.name === 'id')!;
    expect(id.readOnly).toBe(true);

    const name = node.properties.find((p) => p.name === 'name')!;
    expect(name.readOnly).toBeUndefined();
  });

  it('should extract writeOnly from properties', () => {
    const node = walkSchema(
      {
        type: 'object',
        properties: {
          password: { type: 'string', writeOnly: true },
          username: { type: 'string' },
        },
      },
      makeCtx(),
    ) as ObjectSchemaNode;

    const password = node.properties.find((p) => p.name === 'password')!;
    expect(password.writeOnly).toBe(true);

    const username = node.properties.find((p) => p.name === 'username')!;
    expect(username.writeOnly).toBeUndefined();
  });

  it('should extract description from properties', () => {
    const node = walkSchema(
      {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'The pet name' },
        },
      },
      makeCtx(),
    ) as ObjectSchemaNode;

    expect(node.properties[0].description).toBe('The pet name');
  });

  it('should detect nullable via nullable flag', () => {
    const node = walkSchema(
      {
        type: 'object',
        properties: {
          age: { type: 'integer', nullable: true } as unknown as OpenAPIV3_1.SchemaObject,
        },
      },
      makeCtx(),
    ) as ObjectSchemaNode;

    expect(node.properties[0].nullable).toBe(true);
  });

  it('should detect nullable via type array with null', () => {
    const node = walkSchema(
      {
        type: 'object',
        properties: {
          age: { type: ['integer', 'null'] } as unknown as OpenAPIV3_1.SchemaObject,
        },
      },
      makeCtx(),
    ) as ObjectSchemaNode;

    expect(node.properties[0].nullable).toBe(true);
  });
});

describe('walkSchema $ref (Symbol annotation)', () => {
  it('should return RefSchemaNode for annotated schemas', () => {
    const schema: AnnotatedSchema = {
      type: 'object',
      properties: { id: { type: 'string' } },
    };
    schema[REF_NAME_SYMBOL] = 'Pet';

    const node = walkSchema(schema, makeCtx());
    expect(node).toEqual({ kind: 'ref', refName: 'Pet' });
  });

  it('should NOT return ref when definingName matches', () => {
    const schema: AnnotatedSchema = {
      type: 'object',
      properties: { id: { type: 'string' } },
      required: ['id'],
    };
    schema[REF_NAME_SYMBOL] = 'Pet';

    const node = walkSchema(schema, makeCtx('Pet'));
    expect(node.kind).toBe('object');
  });
});

describe('walkSchema allOf', () => {
  it('should produce IntersectionSchemaNode', () => {
    const node = walkSchema(
      {
        allOf: [
          {
            type: 'object',
            properties: { id: { type: 'string' } },
            required: ['id'],
          },
          {
            type: 'object',
            properties: { breed: { type: 'string' } },
          },
        ],
      },
      makeCtx(),
    ) as IntersectionSchemaNode;

    expect(node.kind).toBe('intersection');
    expect(node.members).toHaveLength(2);
    expect(node.members[0].kind).toBe('object');
    expect(node.members[1].kind).toBe('object');
  });

  it('should produce ref member when allOf entry is annotated', () => {
    const animalSchema: AnnotatedSchema = {
      type: 'object',
      properties: { id: { type: 'string' } },
    };
    animalSchema[REF_NAME_SYMBOL] = 'Animal';

    const node = walkSchema(
      {
        allOf: [
          animalSchema,
          {
            type: 'object',
            properties: { breed: { type: 'string' } },
          },
        ],
      },
      makeCtx(),
    ) as IntersectionSchemaNode;

    expect(node.kind).toBe('intersection');
    expect(node.members[0]).toEqual({ kind: 'ref', refName: 'Animal' });
    expect(node.members[1].kind).toBe('object');
  });
});

describe('walkSchema oneOf', () => {
  it('should produce UnionSchemaNode with oneOf variant', () => {
    const node = walkSchema(
      {
        oneOf: [
          {
            type: 'object',
            properties: { personalId: { type: 'string' } },
          },
          {
            type: 'object',
            properties: { businessId: { type: 'string' } },
          },
        ],
      },
      makeCtx(),
    ) as UnionSchemaNode;

    expect(node.kind).toBe('union');
    expect(node.variant).toBe('oneOf');
    expect(node.members).toHaveLength(2);
  });

  it('should extract discriminator', () => {
    const node = walkSchema(
      {
        oneOf: [
          { type: 'object', properties: { type: { type: 'string' } } },
          { type: 'object', properties: { type: { type: 'string' } } },
        ],
        discriminator: {
          propertyName: 'type',
          mapping: { dog: '#/components/schemas/Dog', cat: '#/components/schemas/Cat' },
        },
      } as unknown as OpenAPIV3_1.SchemaObject,
      makeCtx(),
    ) as UnionSchemaNode;

    expect(node.kind).toBe('union');
    expect(node.discriminator).toBeDefined();
    expect(node.discriminator!.propertyName).toBe('type');
    expect(node.discriminator!.mapping).toEqual({
      dog: '#/components/schemas/Dog',
      cat: '#/components/schemas/Cat',
    });
  });
});

describe('walkSchema anyOf', () => {
  it('should produce UnionSchemaNode with anyOf variant', () => {
    const node = walkSchema(
      {
        anyOf: [
          { type: 'object', properties: { x: { type: 'string' } } },
          { type: 'object', properties: { y: { type: 'string' } } },
        ],
      },
      makeCtx(),
    ) as UnionSchemaNode;

    expect(node.kind).toBe('union');
    expect(node.variant).toBe('anyOf');
    expect(node.members).toHaveLength(2);
  });
});

describe('walkSchema additionalProperties', () => {
  it('should produce MapSchemaNode for object with only additionalProperties', () => {
    const node = walkSchema(
      {
        type: 'object',
        additionalProperties: { type: 'string' },
      },
      makeCtx(),
    ) as MapSchemaNode;

    expect(node.kind).toBe('map');
    expect(node.valueSchema).toEqual({ kind: 'primitive', type: 'string' });
  });

  it('should attach additionalProperties to ObjectSchemaNode when properties exist', () => {
    const node = walkSchema(
      {
        type: 'object',
        properties: { id: { type: 'string' } },
        additionalProperties: { type: 'number' },
      },
      makeCtx(),
    ) as ObjectSchemaNode;

    expect(node.kind).toBe('object');
    expect(node.properties).toHaveLength(1);
    expect(node.additionalProperties).toEqual({ kind: 'primitive', type: 'number' });
  });

  it('should handle additionalProperties: true', () => {
    const node = walkSchema(
      {
        type: 'object',
        additionalProperties: true,
      },
      makeCtx(),
    ) as MapSchemaNode;

    expect(node.kind).toBe('map');
    expect(node.valueSchema).toEqual({ kind: 'object', properties: [] });
  });

  it('should handle additionalProperties: false on object with properties', () => {
    const node = walkSchema(
      {
        type: 'object',
        properties: { id: { type: 'string' } },
        additionalProperties: false,
      },
      makeCtx(),
    ) as ObjectSchemaNode;

    expect(node.kind).toBe('object');
    expect(node.additionalProperties).toBe(false);
  });
});
