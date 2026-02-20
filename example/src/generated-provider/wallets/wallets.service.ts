/* eslint-disable */
import { Inject, Injectable, Optional, HttpException } from '@nestjs/common';
import { Api } from '../api-client';
import { PostWalletsInput, PutWalletsWalletIdInput, PutWalletsWalletIdPassphraseInput } from './wallets.dto';

@Injectable()
export class WalletsService {
  constructor(@Inject('API_CLIENT') private readonly apiClient: Api<unknown>, @Optional() @Inject('REQUEST_CONFIG_FACTORY') private readonly requestConfigFactory?: ((methodName: string, args: Record<string, unknown>) => Record<string, unknown> | undefined)) {
  }

  async listWallets(): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('listWallets', {}) ?? {};
        try {
          const response = await this.apiClient.wallets.listWallets(extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 406) {
              throw new HttpException('Not Acceptable', 406);
            }
            throw error;
        }
  }

  async postWallet(input: PostWalletsInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('postWallet', { input }) ?? {};
        try {
          const response = await this.apiClient.wallets.postWallet(input, extraConfig);
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

  async getUTxOsStatistics(walletId: string): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('getUTxOsStatistics', { walletId }) ?? {};
        try {
          const response = await this.apiClient.wallets.getUTxOsStatistics(walletId, extraConfig);
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

  async getWallet(walletId: string): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('getWallet', { walletId }) ?? {};
        try {
          const response = await this.apiClient.wallets.getWallet(walletId, extraConfig);
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

  async putWallet(walletId: string, input: PutWalletsWalletIdInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('putWallet', { walletId, input }) ?? {};
        try {
          const response = await this.apiClient.wallets.putWallet(walletId, input, extraConfig);
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

  async deleteWallet(walletId: string): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('deleteWallet', { walletId }) ?? {};
        try {
          const response = await this.apiClient.wallets.deleteWallet(walletId, extraConfig);
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

  async putWalletPassphrase(walletId: string, input: PutWalletsWalletIdPassphraseInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('putWalletPassphrase', { walletId, input }) ?? {};
        try {
          const response = await this.apiClient.wallets.putWalletPassphrase(walletId, input, extraConfig);
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
