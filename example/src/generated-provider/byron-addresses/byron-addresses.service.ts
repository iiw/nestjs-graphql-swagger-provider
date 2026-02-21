/* eslint-disable */
import { Inject, Injectable, Optional, HttpException } from '@nestjs/common';
import { Api } from '../api-client';
import { PostByronWalletsWalletIdAddressesInput, PutByronWalletsWalletIdAddressesInput } from './byron-addresses.dto';
import { StateEnum1 } from '../enums';

@Injectable()
export class ByronAddressesService {
  constructor(@Inject('API_CLIENT') private readonly apiClient: Api<unknown>, @Optional() @Inject('REQUEST_CONFIG_FACTORY') private readonly requestConfigFactory?: ((methodName: string, args: Record<string, unknown>) => Record<string, unknown> | undefined)) {
  }

  async listByronAddresses(walletId: string, state: StateEnum1): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('listByronAddresses', { walletId, state }) ?? {};
        try {
          const response = await this.apiClient.byronWallets.listByronAddresses({ walletId, state }, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 400) {
              throw new HttpException('Bad Request', 400);
            }
            if (error.response?.status === 404) {
              throw new HttpException('Not Found', 404);
            }
            if (error.response?.status === 406) {
              throw new HttpException('Not Acceptable', 406);
            }
            throw error;
        }
  }

  async createAddress(walletId: string, input: PostByronWalletsWalletIdAddressesInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('createAddress', { walletId, input }) ?? {};
        try {
          const response = await this.apiClient.byronWallets.createAddress({ walletId }, input, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 400) {
              throw new HttpException('Bad Request', 400);
            }
            if (error.response?.status === 403) {
              throw new HttpException('Forbidden', 403);
            }
            if (error.response?.status === 406) {
              throw new HttpException('Not Acceptable', 406);
            }
            if (error.response?.status === 415) {
              throw new HttpException('Unsupported Media Type', 415);
            }
            throw error;
        }
  }

  async importAddresses(walletId: string, input: PutByronWalletsWalletIdAddressesInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('importAddresses', { walletId, input }) ?? {};
        try {
          const response = await this.apiClient.byronWallets.importAddresses({ walletId }, input, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 400) {
              throw new HttpException('Bad Request', 400);
            }
            if (error.response?.status === 403) {
              throw new HttpException('Forbidden', 403);
            }
            throw error;
        }
  }

  async importAddress(walletId: string, addressId: string): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('importAddress', { walletId, addressId }) ?? {};
        try {
          const response = await this.apiClient.byronWallets.importAddress({ walletId, addressId }, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 400) {
              throw new HttpException('Bad Request', 400);
            }
            if (error.response?.status === 403) {
              throw new HttpException('Forbidden', 403);
            }
            throw error;
        }
  }
}
