import { describe, expect, it } from 'vitest';
import { enumMemberName } from './enum-utils.js';
import { deriveEnumName } from '../parser/enums.js';

describe('enumMemberName', () => {
  it('should PascalCase string values', () => {
    expect(enumMemberName('available')).toBe('Available');
    expect(enumMemberName('in_progress')).toBe('InProgress');
    expect(enumMemberName('sold')).toBe('Sold');
  });

  it('should handle multi-word strings', () => {
    expect(enumMemberName('not-started')).toBe('NotStarted');
    expect(enumMemberName('UPPER_CASE')).toBe('UPPERCASE');
  });

  it('should prefix leading digits with underscore', () => {
    expect(enumMemberName('3rd')).toBe('_3rd');
  });

  it('should use Value_N format for numbers', () => {
    expect(enumMemberName(1)).toBe('Value_1');
    expect(enumMemberName(42)).toBe('Value_42');
    expect(enumMemberName(0)).toBe('Value_0');
  });

  it('should handle negative numbers', () => {
    expect(enumMemberName(-1)).toBe('Value_Neg1');
  });
});

describe('deriveEnumName', () => {
  it('should combine parent and property names in PascalCase', () => {
    expect(deriveEnumName('Pet', 'status')).toBe('PetStatus');
    expect(deriveEnumName('Pet', 'size')).toBe('PetSize');
  });

  it('should handle already PascalCase names', () => {
    expect(deriveEnumName('UserProfile', 'Role')).toBe('UserProfileRole');
  });

  it('should handle kebab-case inputs', () => {
    expect(deriveEnumName('user-profile', 'access-level')).toBe('UserProfileAccessLevel');
  });
});
