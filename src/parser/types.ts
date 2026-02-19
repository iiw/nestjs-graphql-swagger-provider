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
}

export interface ParsedParameter {
  name: string;
  location: 'path' | 'query';
  type: string;
  required: boolean;
  isArray: boolean;
  enumName?: string;
  enumValues?: (string | number)[];
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
}

export interface ParsedController {
  name: string;
  endpoints: ParsedEndpoint[];
}

export interface ParsedSpec {
  controllers: ParsedController[];
  schemas: ParsedSchema[];
  enums: ParsedEnum[];
}
