import type { ParsedController } from '../parser/types.js';

export function collectDtoNames(controller: ParsedController): string[] {
  return [
    ...new Set(
      controller.endpoints
        .filter((e) => e.requestBody)
        .map((e) => e.requestBody!.name),
    ),
  ];
}

export function collectModelNames(controller: ParsedController): string[] {
  return [
    ...new Set(
      controller.endpoints
        .filter((e) => e.responseSchema && !e.responseSchema.primitiveType)
        .map((e) => e.responseSchema!.name),
    ),
  ];
}

export function collectParameterEnumNames(controller: ParsedController): Set<string> {
  const enumNames = new Set<string>();
  for (const endpoint of controller.endpoints) {
    for (const param of endpoint.parameters) {
      if (param.type === 'enum' && param.enumName) {
        enumNames.add(param.enumName);
      }
    }
  }
  return enumNames;
}
