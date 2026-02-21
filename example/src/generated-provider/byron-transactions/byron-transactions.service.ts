/* eslint-disable */
import { Inject, Injectable, Optional, HttpException } from '@nestjs/common';
import { Api } from '../api-client';
import { PostByronWalletsWalletIdPaymentFeesInput, PostByronWalletsWalletIdTransactionsInput } from './byron-transactions.dto';
import { ListByronTransactionsOrder } from '../enums';

@Injectable()
export class ByronTransactionsService {
  constructor(@Inject('API_CLIENT') private readonly apiClient: Api<unknown>, @Optional() @Inject('REQUEST_CONFIG_FACTORY') private readonly requestConfigFactory?: ((methodName: string, args: Record<string, unknown>) => Record<string, unknown> | undefined)) {
  }

  async postByronTransactionFee(walletId: string, input: PostByronWalletsWalletIdPaymentFeesInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('postByronTransactionFee', { walletId, input }) ?? {};
        try {
          const response = await this.apiClient.byronWallets.postByronTransactionFee({ walletId }, input, extraConfig);
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

  async listByronTransactions(walletId: string, start: string, end: string, order: ListByronTransactionsOrder): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('listByronTransactions', { walletId, start, end, order }) ?? {};
        try {
          const response = await this.apiClient.byronWallets.listByronTransactions({ walletId, start, end, order }, extraConfig);
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

  async postByronTransaction(walletId: string, input: PostByronWalletsWalletIdTransactionsInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('postByronTransaction', { walletId, input }) ?? {};
        try {
          const response = await this.apiClient.byronWallets.postByronTransaction({ walletId }, input, extraConfig);
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

  async getByronTransaction(walletId: string, transactionId: string): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('getByronTransaction', { walletId, transactionId }) ?? {};
        try {
          const response = await this.apiClient.byronWallets.getByronTransaction({ walletId, transactionId }, extraConfig);
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

  async deleteByronTransaction(walletId: string, transactionId: string): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('deleteByronTransaction', { walletId, transactionId }) ?? {};
        try {
          const response = await this.apiClient.byronWallets.deleteByronTransaction({ walletId, transactionId }, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 403) {
              throw new HttpException('Forbidden', 403);
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
}
