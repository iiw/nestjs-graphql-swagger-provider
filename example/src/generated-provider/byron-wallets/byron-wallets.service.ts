/* eslint-disable */
import { Inject, Injectable, Optional, HttpException } from '@nestjs/common';
import { Api } from '../api-client';
import { PostByronWalletsInput, PutByronWalletsWalletIdInput, PutByronWalletsWalletIdPassphraseInput } from './byron-wallets.dto';

@Injectable()
export class ByronWalletsService {
  constructor(@Inject('API_CLIENT') private readonly apiClient: Api<unknown>, @Optional() @Inject('REQUEST_CONFIG_FACTORY') private readonly requestConfigFactory?: ((methodName: string, args: Record<string, unknown>) => Record<string, unknown> | undefined)) {
  }

  async listByronWallets(): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('listByronWallets', {}) ?? {};
        try {
          const response = await this.apiClient.byronWallets.listByronWallets(extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 406) {
              throw new HttpException('Not Acceptable', 406);
            }
            throw error;
        }
  }

  async postByronWallet(input: PostByronWalletsInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('postByronWallet', { input }) ?? {};
        try {
          const response = await this.apiClient.byronWallets.postByronWallet(input, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 400) {
              throw new HttpException('Bad Request', 400);
            }
            if (error.response?.status === 406) {
              throw new HttpException('Not Acceptable', 406);
            }
            if (error.response?.status === 409) {
              throw new HttpException('Conflict', 409);
            }
            if (error.response?.status === 415) {
              throw new HttpException('Unsupported Media Type', 415);
            }
            throw error;
        }
  }

  async getByronUTxOsStatistics(walletId: string): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('getByronUTxOsStatistics', { walletId }) ?? {};
        try {
          const response = await this.apiClient.byronWallets.getByronUTxOsStatistics({ walletId }, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
              throw new HttpException('Not Found', 404);
            }
            if (error.response?.status === 406) {
              throw new HttpException('Not Acceptable', 406);
            }
            throw error;
        }
  }

  async getByronWallet(walletId: string): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('getByronWallet', { walletId }) ?? {};
        try {
          const response = await this.apiClient.byronWallets.getByronWallet({ walletId }, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
              throw new HttpException('Not Found', 404);
            }
            if (error.response?.status === 406) {
              throw new HttpException('Not Acceptable', 406);
            }
            throw error;
        }
  }

  async putByronWallet(walletId: string, input: PutByronWalletsWalletIdInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('putByronWallet', { walletId, input }) ?? {};
        try {
          const response = await this.apiClient.byronWallets.putByronWallet({ walletId }, input, extraConfig);
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
            if (error.response?.status === 415) {
              throw new HttpException('Unsupported Media Type', 415);
            }
            throw error;
        }
  }

  async deleteByronWallet(walletId: string): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('deleteByronWallet', { walletId }) ?? {};
        try {
          const response = await this.apiClient.byronWallets.deleteByronWallet({ walletId }, extraConfig);
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

  async putByronWalletPassphrase(walletId: string, input: PutByronWalletsWalletIdPassphraseInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('putByronWalletPassphrase', { walletId, input }) ?? {};
        try {
          const response = await this.apiClient.byronWallets.putByronWalletPassphrase({ walletId }, input, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 400) {
              throw new HttpException('Bad Request', 400);
            }
            if (error.response?.status === 403) {
              throw new HttpException('Forbidden', 403);
            }
            if (error.response?.status === 404) {
              throw new HttpException('Not Found', 404);
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
}
