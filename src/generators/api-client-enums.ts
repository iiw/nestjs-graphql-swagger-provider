import * as path from 'node:path';
import { Project } from 'ts-morph';
import type { ParsedController, ParsedEnum } from '../parser/types.js';
import { toPascalCase } from '../utils.js';

export interface ApiClientEnum {
  name: string;
  values: (string | number)[];
}

export interface EnumMapping {
  parsedEnum: ParsedEnum;
  apiClientEnumName: string;
}

export interface EnumMatchResult {
  matched: EnumMapping[];
  unmatched: ParsedEnum[];
}

export interface ApiClientEnumResult {
  enums: ApiClientEnum[];
  paramsEnumMap: Map<string, Set<string>>;
}

export function extractApiClientEnums(outputDir: string): ApiClientEnumResult {
  const apiClientPath = path.join(outputDir, 'api-client.ts');
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(apiClientPath);

  const enums: ApiClientEnum[] = [];
  const enumNames = new Set<string>();

  for (const enumDecl of sourceFile.getEnums()) {
    if (!enumDecl.isExported()) continue;

    const name = enumDecl.getName();
    const values: (string | number)[] = [];

    for (const member of enumDecl.getMembers()) {
      const initializer = member.getInitializer();
      if (initializer) {
        const text = initializer.getText();
        // String literal: remove quotes
        if (text.startsWith('"') || text.startsWith("'")) {
          values.push(text.slice(1, -1));
        } else {
          // Numeric literal
          const num = Number(text);
          if (!isNaN(num)) {
            values.push(num);
          } else {
            values.push(text);
          }
        }
      } else {
        // Auto-incremented numeric enum
        values.push(values.length === 0 ? 0 : (values[values.length - 1] as number) + 1);
      }
    }

    enums.push({ name, values });
    enumNames.add(name);
  }

  // Parse *Params interfaces to build paramsEnumMap
  const paramsEnumMap = new Map<string, Set<string>>();
  const paramsPattern = /^(.+?)Params\d*$/;

  for (const iface of sourceFile.getInterfaces()) {
    if (!iface.isExported()) continue;
    const ifaceName = iface.getName();
    const match = paramsPattern.exec(ifaceName);
    if (!match) continue;

    const operationPrefix = match[1]; // e.g. "ListByronAddresses"
    const referencedEnums = new Set<string>();

    for (const prop of iface.getProperties()) {
      const typeText = prop.getType().getText(prop);
      // Check if any known enum name appears as the property type.
      for (const enumName of enumNames) {
        if (typeText === enumName) {
          referencedEnums.add(enumName);
        }
      }
    }

    if (referencedEnums.size > 0) {
      const existing = paramsEnumMap.get(operationPrefix);
      if (existing) {
        for (const e of referencedEnums) existing.add(e);
      } else {
        paramsEnumMap.set(operationPrefix, referencedEnums);
      }
    }
  }

  return { enums, paramsEnumMap };
}

export function matchEnumsToApiClient(
  parsedEnums: ParsedEnum[],
  apiClientEnums: ApiClientEnum[],
  paramsEnumMap?: Map<string, Set<string>>,
): EnumMatchResult {
  const matched: EnumMapping[] = [];
  const unmatched: ParsedEnum[] = [];
  const consumed = new Set<string>();

  // Pass 1: Name-based matching only (exact name + suffix)
  const pendingAfterPass1: ParsedEnum[] = [];
  for (const parsedEnum of parsedEnums) {
    const match = findNameMatch(parsedEnum, apiClientEnums, consumed);
    if (match) {
      matched.push({ parsedEnum, apiClientEnumName: match.name });
      consumed.add(match.name);
    } else {
      pendingAfterPass1.push(parsedEnum);
    }
  }

  // Pass 2: Value-based matching with params-interface preference
  for (const parsedEnum of pendingAfterPass1) {
    const match = findValueMatch(parsedEnum, apiClientEnums, consumed, paramsEnumMap);
    if (match) {
      matched.push({ parsedEnum, apiClientEnumName: match.name });
      consumed.add(match.name);
    } else {
      unmatched.push(parsedEnum);
    }
  }

  return { matched, unmatched };
}

function findNameMatch(
  parsedEnum: ParsedEnum,
  apiClientEnums: ApiClientEnum[],
  consumed: Set<string>,
): ApiClientEnum | undefined {
  // Strategy 1: Exact name match
  const exactMatch = apiClientEnums.find(
    (ac) => ac.name === parsedEnum.name && !consumed.has(ac.name),
  );
  if (exactMatch) return exactMatch;

  // Strategy 2: Name + "Enum" suffix
  const suffixName = parsedEnum.name + 'Enum';
  const suffixMatch = apiClientEnums.find(
    (ac) => ac.name === suffixName && !consumed.has(ac.name),
  );
  if (suffixMatch) return suffixMatch;

  return undefined;
}

export function valuesMatch(a: (string | number)[], b: (string | number)[]): boolean {
  const sortedA = [...a].map(String).sort();
  const sortedB = [...b].map(String).sort();
  return (
    sortedA.length === sortedB.length &&
    sortedA.every((v, i) => v === sortedB[i])
  );
}

function findValueMatch(
  parsedEnum: ParsedEnum,
  apiClientEnums: ApiClientEnum[],
  consumed: Set<string>,
  paramsEnumMap?: Map<string, Set<string>>,
): ApiClientEnum | undefined {
  // If the parsed enum has an operationId and a params-interface enum exists, prefer it
  if (paramsEnumMap && parsedEnum.operationId) {
    const operationPrefix = toPascalCase(parsedEnum.operationId);
    const paramsEnumNames = paramsEnumMap.get(operationPrefix);
    if (paramsEnumNames) {
      for (const candidateName of paramsEnumNames) {
        if (consumed.has(candidateName)) continue;
        const candidate = apiClientEnums.find((ac) => ac.name === candidateName);
        if (candidate && valuesMatch(parsedEnum.values, candidate.values)) {
          return candidate;
        }
      }
    }
  }

  // Fallback: first unconsumed enum with matching values
  for (const ac of apiClientEnums) {
    if (consumed.has(ac.name)) continue;
    if (valuesMatch(parsedEnum.values, ac.values)) {
      return ac;
    }
  }

  return undefined;
}

export function substituteParameterEnums(
  controllers: ParsedController[],
  apiClientEnums: ApiClientEnum[],
  paramsEnumMap: Map<string, Set<string>>,
  enumMatchResult: EnumMatchResult,
): void {
  for (const controller of controllers) {
    for (const endpoint of controller.endpoints) {
      for (const param of endpoint.parameters) {
        if (param.type !== 'enum' || !param.enumName || !param.enumValues) continue;

        const operationPrefix = toPascalCase(endpoint.operationId);
        const paramsEnumNames = paramsEnumMap.get(operationPrefix);
        if (!paramsEnumNames) continue;

        // Check which api-client enum the current param.enumName is mapped to
        const currentMatch = enumMatchResult.matched.find(
          (m) => m.parsedEnum.name === param.enumName,
        );
        const currentApiClientEnum = currentMatch?.apiClientEnumName;

        for (const candidateName of paramsEnumNames) {
          const candidate = apiClientEnums.find((ac) => ac.name === candidateName);
          if (candidate && valuesMatch(param.enumValues, candidate.values)) {
            // Only substitute if the current match uses a different api-client enum
            if (currentApiClientEnum === candidateName) break;

            param.enumName = candidateName;
            // Ensure the params enum is exported under its own name in enums.ts
            const alreadyExported = enumMatchResult.matched.some(
              (m) =>
                m.apiClientEnumName === candidateName &&
                m.parsedEnum.name === candidateName,
            );
            if (!alreadyExported) {
              enumMatchResult.matched.push({
                parsedEnum: {
                  name: candidateName,
                  values: candidate.values as (string | number)[],
                  type: typeof candidate.values[0] === 'number' ? 'integer' : 'string',
                },
                apiClientEnumName: candidateName,
              });
            }
            break;
          }
        }
      }
    }
  }
}
