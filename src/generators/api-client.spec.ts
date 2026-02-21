import { describe, expect, it } from 'vitest';
import { extractApiClientBodyTypes } from './api-client.js';

describe('extractApiClientBodyTypes', () => {
  it('should extract body type from a simple method signature', () => {
    const content = `
      createWallet: (data: CreateWalletInput, params: RequestParams = {}) =>
        this.request<Wallet, any>({
    `;
    const result = extractApiClientBodyTypes(content, ['createWallet']);
    expect(result.get('createWallet')).toBe('CreateWalletInput');
  });

  it('should extract body type from a method with path params', () => {
    const content = `
      updateUser: (userId: string, data: UpdateUserBody, params: RequestParams = {}) =>
        this.request<User, any>({
    `;
    const result = extractApiClientBodyTypes(content, ['updateUser']);
    expect(result.get('updateUser')).toBe('UpdateUserBody');
  });

  it('should return empty for a method without body', () => {
    const content = `
      listPets: (query: { limit?: number }, params: RequestParams = {}) =>
        this.request<Pet[], any>({
    `;
    const result = extractApiClientBodyTypes(content, ['listPets']);
    expect(result.has('listPets')).toBe(false);
  });

  it('should handle multiple methods', () => {
    const content = `
      createWallet: (data: CreateWalletInput, params: RequestParams = {}) =>
        this.request<Wallet, any>({
          path: '/wallets',
        }),
      updateWallet: (walletId: string, data: UpdateWalletInput, params: RequestParams = {}) =>
        this.request<Wallet, any>({
          path: '/wallets/' + walletId,
        }),
    `;
    const result = extractApiClientBodyTypes(content, ['createWallet', 'updateWallet']);
    expect(result.get('createWallet')).toBe('CreateWalletInput');
    expect(result.get('updateWallet')).toBe('UpdateWalletInput');
  });

  it('should return empty map when method name not found', () => {
    const content = `
      createWallet: (data: CreateWalletInput, params: RequestParams = {}) =>
        this.request<Wallet, any>({
    `;
    const result = extractApiClientBodyTypes(content, ['nonExistent']);
    expect(result.size).toBe(0);
  });
});
