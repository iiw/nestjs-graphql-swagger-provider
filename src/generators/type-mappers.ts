export function graphqlTypeForProperty(prop: {
  type: string;
  enumName?: string;
  typeName?: string;
}): string {
  switch (prop.type) {
    case 'object':
      return prop.typeName ?? 'String';
    case 'enum':
      return prop.enumName ?? 'String';
    case 'number':
      // Both OpenAPI `number` and `integer` IR types map to Float. integer is
      // collapsed to number in schema-lowering (see lowerSchemaToProperty) so
      // that the IR stays TypeScript-idiomatic. Float is a safe superset of
      // Int and this mapping is intentional for model/DTO properties.
      return 'Float';
    case 'boolean':
      return 'Boolean';
    case 'string':
    default:
      return 'String';
  }
}

export function graphqlScalarForPrimitive(openApiType: string): string {
  switch (openApiType) {
    case 'integer':
      return 'Int';
    case 'number':
      return 'Float';
    case 'boolean':
      return 'Boolean';
    case 'string':
    default:
      return 'String';
  }
}

export function tsTypeForProperty(prop: {
  type: string;
  enumName?: string;
  typeName?: string;
}): string {
  switch (prop.type) {
    case 'object':
      return prop.typeName ?? 'string';
    case 'enum':
      return prop.enumName ?? 'string';
    case 'number':
      return 'number';
    case 'boolean':
      return 'boolean';
    case 'string':
    default:
      return 'string';
  }
}
