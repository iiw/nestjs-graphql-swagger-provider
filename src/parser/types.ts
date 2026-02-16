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
  enumValues?: string[];
}

export interface ParsedSchema {
  name: string;
  properties: ParsedProperty[];
}

export interface ParsedParameter {
  name: string;
  location: 'path' | 'query';
  type: string;
  required: boolean;
  isArray: boolean;
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
}
