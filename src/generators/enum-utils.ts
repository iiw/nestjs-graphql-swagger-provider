import { toPascalCase } from './utils.js';

export { deriveEnumName } from '../parser/enums.js';

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
