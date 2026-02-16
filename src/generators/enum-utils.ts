import { toPascalCase } from './utils.js';

/**
 * Derive a PascalCase enum member name from a value.
 * - Strings → PascalCase (e.g. "in_progress" → "InProgress")
 * - Numbers → Value_N (e.g. 1 → "Value_1")
 * - Leading digits get prefixed with "_"
 */
export function enumMemberName(value: string | number): string {
  if (typeof value === 'number') {
    const sign = value < 0 ? 'Neg' : '';
    return `Value_${sign}${Math.abs(value)}`;
  }

  const pascal = toPascalCase(value);
  if (/^\d/.test(pascal)) {
    return `_${pascal}`;
  }
  return pascal;
}

/**
 * Derive an enum name from a parent schema name and property name.
 * e.g. ("Pet", "status") → "PetStatus"
 */
export function deriveEnumName(parentName: string, propName: string): string {
  return `${toPascalCase(parentName)}${toPascalCase(propName)}`;
}
