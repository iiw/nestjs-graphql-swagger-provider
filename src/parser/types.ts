// ─── SchemaNode IR ───────────────────────────────────────────────────

export interface ObjectSchemaNode {
  kind: 'object';
  properties: PropertyNode[];
  additionalProperties?: SchemaNode | boolean;
}

export interface PrimitiveSchemaNode {
  kind: 'primitive';
  type: 'string' | 'number' | 'integer' | 'boolean';
}

export interface ArraySchemaNode {
  kind: 'array';
  items: SchemaNode;
}

export interface EnumSchemaNode {
  kind: 'enum';
  values: (string | number)[];
  enumType: 'string' | 'integer';
  enumName?: string;
}

export interface RefSchemaNode {
  kind: 'ref';
  refName: string;
}

export interface DiscriminatorNode {
  propertyName: string;
  mapping?: Record<string, string>;
}

export interface UnionSchemaNode {
  kind: 'union';
  variant: 'oneOf' | 'anyOf';
  members: SchemaNode[];
  discriminator?: DiscriminatorNode;
}

export interface IntersectionSchemaNode {
  kind: 'intersection';
  members: SchemaNode[];
}

export interface MapSchemaNode {
  kind: 'map';
  valueSchema: SchemaNode;
}

export type SchemaNode =
  | ObjectSchemaNode
  | PrimitiveSchemaNode
  | ArraySchemaNode
  | EnumSchemaNode
  | RefSchemaNode
  | UnionSchemaNode
  | IntersectionSchemaNode
  | MapSchemaNode;

export interface PropertyNode {
  name: string;
  schema: SchemaNode;
  required: boolean;
  nullable: boolean;
  readOnly?: boolean;
  writeOnly?: boolean;
  description?: string;
}

// ─── Flat types (consumed by generators) ─────────────────────────────

export interface ParsedEnum {
  name: string;
  values: (string | number)[];
  type: 'string' | 'integer';
}

export interface ParsedProperty {
  name: string;
  type: string;
  isArray: boolean;
  required: boolean;
  nullable: boolean;
  /** For object/enum types — the referenced type name */
  typeName?: string;
  /** Nested properties when this is an inline object */
  properties?: ParsedProperty[];
  /** Enum values when type is 'enum' */
  enumValues?: (string | number)[];
  /** Enum type name for referencing the generated TS enum */
  enumName?: string;
  /** Whether this property is readOnly (skip in InputType) */
  readOnly?: boolean;
  /** Whether this property is writeOnly (skip in ObjectType) */
  writeOnly?: boolean;
  /** OpenAPI description for this property */
  description?: string;
}

export interface ParsedSchema {
  name: string;
  properties: ParsedProperty[];
  /** Parent schema name from allOf composition */
  extends?: string;
  /** OpenAPI primitive type when schema has no object properties */
  primitiveType?: 'string' | 'number' | 'integer' | 'boolean';
  /** Whether the outer schema was type: array */
  isArray?: boolean;
  /** SchemaNode IR tree (attached for forward-compat; generators don't consume this yet) */
  schemaNode?: SchemaNode;
  /** Union member type names when this schema is a oneOf/anyOf */
  unionMembers?: string[];
  /** Discriminator info when this schema is a discriminated union */
  discriminator?: DiscriminatorNode;
}

export interface ParsedParameter {
  name: string;
  location: 'path' | 'query';
  type: string;
  required: boolean;
  isArray: boolean;
  enumName?: string;
  enumValues?: (string | number)[];
  /** OpenAPI description for this parameter */
  description?: string;
}

export interface ParsedErrorResponse {
  statusCode: number;
  description: string;
  schema?: ParsedSchema;
}

export interface ParsedEndpoint {
  path: string;
  method: 'get' | 'post' | 'put' | 'patch' | 'delete';
  operationId: string;
  summary?: string;
  parameters: ParsedParameter[];
  requestBody?: ParsedSchema;
  responseSchema?: ParsedSchema;
  errorResponses: ParsedErrorResponse[];
  /** Actual method name from swagger-typescript-api generated client */
  apiClientMethodName?: string;
  /** Actual namespace/module name from swagger-typescript-api generated client */
  apiClientNamespace?: string;
}

export interface ParsedController {
  name: string;
  endpoints: ParsedEndpoint[];
}

export interface ParsedSpec {
  controllers: ParsedController[];
  schemas: ParsedSchema[];
  enums: ParsedEnum[];
  /** Named schema registry from component schemas (SchemaNode IR) */
  namedSchemas?: Map<string, { name: string; schema: SchemaNode }>;
}
