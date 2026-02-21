import * as path from 'node:path';
import { Project } from 'ts-morph';
import type { ParsedEnum } from '../parser/types.js';

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

export function extractApiClientEnums(outputDir: string): ApiClientEnum[] {
  const apiClientPath = path.join(outputDir, 'api-client.ts');
  const project = new Project();
  const sourceFile = project.addSourceFileAtPath(apiClientPath);

  const result: ApiClientEnum[] = [];

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

    result.push({ name, values });
  }

  return result;
}

export function matchEnumsToApiClient(
  parsedEnums: ParsedEnum[],
  apiClientEnums: ApiClientEnum[],
): EnumMatchResult {
  const matched: EnumMapping[] = [];
  const unmatched: ParsedEnum[] = [];
  const consumed = new Set<string>();

  for (const parsedEnum of parsedEnums) {
    const match = findMatch(parsedEnum, apiClientEnums, consumed);
    if (match) {
      matched.push({ parsedEnum, apiClientEnumName: match.name });
      consumed.add(match.name);
    } else {
      unmatched.push(parsedEnum);
    }
  }

  return { matched, unmatched };
}

function findMatch(
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

  // Strategy 3: Value-based match
  const parsedValues = [...parsedEnum.values].map(String).sort();
  for (const ac of apiClientEnums) {
    if (consumed.has(ac.name)) continue;
    const acValues = [...ac.values].map(String).sort();
    if (
      parsedValues.length === acValues.length &&
      parsedValues.every((v, i) => v === acValues[i])
    ) {
      return ac;
    }
  }

  return undefined;
}
