import type {
  SchemaNode,
  PropertyNode,
  ParsedSchema,
  ParsedProperty,
} from './types.js';
import { deriveEnumName } from './enums.js';

export interface LoweringRegistry {
  /** Named schemas from components — used to resolve RefSchemaNode */
  schemas: Map<string, SchemaNode>;
}

/**
 * Lower a SchemaNode tree to a flat ParsedSchema (the format generators consume).
 */
export function lowerSchemaToFlat(
  name: string,
  node: SchemaNode,
  registry: LoweringRegistry,
  parentName?: string,
): ParsedSchema {
  const result: ParsedSchema = {
    name,
    properties: [],
    schemaNode: node,
  };

  switch (node.kind) {
    case 'object': {
      result.properties = node.properties.map((p) =>
        lowerPropertyNode(p, registry, name),
      );
      break;
    }

    case 'primitive': {
      result.primitiveType = node.type;
      break;
    }

    case 'array': {
      const inner = node.items;
      if (inner.kind === 'primitive') {
        result.primitiveType = inner.type;
        result.isArray = true;
      } else {
        // Lower the items as if it were a schema and take its properties
        const itemSchema = lowerSchemaToFlat(name, inner, registry, parentName);
        result.properties = itemSchema.properties;
        result.extends = itemSchema.extends;
      }
      break;
    }

    case 'enum': {
      // Enums at schema level are handled as global enums, not as ParsedSchema
      // This would only happen if a schema is purely an enum
      result.primitiveType = node.enumType === 'integer' ? 'integer' : 'string';
      break;
    }

    case 'ref': {
      // Resolve the ref and lower it
      const resolved = registry.schemas.get(node.refName);
      if (resolved) {
        const inner = lowerSchemaToFlat(name, resolved, registry, parentName);
        result.properties = inner.properties;
        result.extends = inner.extends;
        result.primitiveType = inner.primitiveType;
        result.isArray = inner.isArray;
      }
      break;
    }

    case 'intersection': {
      result.properties = lowerIntersection(node.members, registry, name);
      // First ref member is the parent (extends)
      for (const member of node.members) {
        if (member.kind === 'ref') {
          result.extends = member.refName;
          break;
        }
      }
      break;
    }

    case 'union': {
      const { properties, unionMembers } = lowerUnion(
        node.members,
        node.variant,
        registry,
        name,
      );
      result.properties = properties;
      if (unionMembers.length > 0) {
        result.unionMembers = unionMembers;
      }
      if (node.discriminator) {
        result.discriminator = node.discriminator;
      }
      break;
    }

    case 'map': {
      // Maps lower to a plain object for backward-compat
      result.properties = [];
      break;
    }
  }

  return result;
}

/**
 * Lower a PropertyNode to a flat ParsedProperty.
 */
export function lowerPropertyNode(
  prop: PropertyNode,
  registry: LoweringRegistry,
  parentName?: string,
): ParsedProperty {
  const result: ParsedProperty = {
    name: prop.name,
    type: 'object',
    isArray: false,
    required: prop.required,
    nullable: prop.nullable,
  };

  if (prop.readOnly) result.readOnly = true;
  if (prop.writeOnly) result.writeOnly = true;
  if (prop.description) result.description = prop.description;

  lowerSchemaToProperty(prop.schema, result, registry, parentName, prop.name);

  return result;
}

// ── Internal helpers ────────────────────────────────────────────────

function lowerSchemaToProperty(
  node: SchemaNode,
  result: ParsedProperty,
  registry: LoweringRegistry,
  parentName?: string,
  propName?: string,
): void {
  switch (node.kind) {
    case 'primitive': {
      result.type = node.type === 'integer' ? 'number' : node.type;
      break;
    }

    case 'enum': {
      result.type = 'enum';
      result.enumValues = node.values;
      result.enumName = node.enumName ?? (parentName && propName ? deriveEnumName(parentName, propName) : undefined);
      break;
    }

    case 'array': {
      result.isArray = true;
      // Recurse into items for the inner type
      lowerSchemaToProperty(node.items, result, registry, parentName, propName);
      // Restore isArray after inner recursion (inner might set type)
      result.isArray = true;
      break;
    }

    case 'ref': {
      // Check if ref points to an enum schema
      const resolved = registry.schemas.get(node.refName);
      if (resolved?.kind === 'enum') {
        result.type = 'enum';
        result.enumValues = resolved.values;
        result.enumName = node.refName;
      } else {
        result.type = 'object';
        result.typeName = node.refName;
      }
      break;
    }

    case 'object': {
      result.type = 'object';
      if (node.properties.length > 0) {
        result.properties = node.properties.map((p) =>
          lowerPropertyNode(p, registry, parentName),
        );
      }
      break;
    }

    case 'union': {
      // Flatten union into merged properties (backward-compat)
      const { properties } = lowerUnion(
        node.members,
        node.variant,
        registry,
        parentName ?? '',
      );
      if (properties.length > 0) {
        result.type = 'object';
        result.properties = properties;
      }
      break;
    }

    case 'intersection': {
      // Flatten intersection into merged properties
      result.type = 'object';
      result.properties = lowerIntersection(
        node.members,
        registry,
        parentName ?? '',
      );
      break;
    }

    case 'map': {
      result.type = 'object';
      break;
    }
  }
}

/**
 * Lower an intersection (allOf) by merging all member properties.
 */
function lowerIntersection(
  members: SchemaNode[],
  registry: LoweringRegistry,
  parentName: string,
): ParsedProperty[] {
  const propMap = new Map<string, ParsedProperty>();

  for (const member of members) {
    const flat = lowerSchemaToFlat('_tmp', member, registry, parentName);
    for (const prop of flat.properties) {
      propMap.set(prop.name, prop);
    }
  }

  return Array.from(propMap.values());
}

/**
 * Lower a union (oneOf/anyOf) by merging all variant properties.
 * A property is required only if required in every variant.
 */
function lowerUnion(
  members: SchemaNode[],
  _variant: 'oneOf' | 'anyOf',
  registry: LoweringRegistry,
  parentName: string,
): { properties: ParsedProperty[]; unionMembers: string[] } {
  const propMap = new Map<string, ParsedProperty>();
  const requiredSets: Set<string>[] = [];
  const unionMembers: string[] = [];

  for (const member of members) {
    if (member.kind === 'ref') {
      unionMembers.push(member.refName);
    }

    const flat = lowerSchemaToFlat('_tmp', member, registry, parentName);
    const requiredInVariant = new Set<string>();

    for (const prop of flat.properties) {
      if (prop.required) requiredInVariant.add(prop.name);
      propMap.set(prop.name, { ...prop });
    }

    if (flat.properties.length > 0) {
      requiredSets.push(requiredInVariant);
    }
  }

  // A property is required only if required in every variant
  for (const prop of propMap.values()) {
    if (requiredSets.length > 0) {
      prop.required = requiredSets.every((s) => s.has(prop.name));
    } else {
      prop.required = false;
    }
  }

  return { properties: Array.from(propMap.values()), unionMembers };
}
