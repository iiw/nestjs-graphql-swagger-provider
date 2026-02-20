/* eslint-disable */
import { Inject, Injectable, Optional, HttpException } from '@nestjs/common';
import { Api } from '../api-client';
import { PostWalletsWalletIdPayment-feesInput, PostWalletsWalletIdTransactionsInput } from './transactions.dto';

@Injectable()
export class TransactionsService {
  constructor(@Inject('API_CLIENT') private readonly apiClient: Api<unknown>, @Optional() @Inject('REQUEST_CONFIG_FACTORY') private readonly requestConfigFactory?: ((methodName: string, args: Record<string, unknown>) => Record<string, unknown> | undefined)) {
  }

  async postTransactionFee(walletId: string, input: PostWalletsWalletIdPayment-feesInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('postTransactionFee', { walletId, input }) ?? {};
        try {
          const response = await this.apiClient.wallets.postTransactionFee(walletId, input, extraConfig);
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

  async listTransactions(walletId: string, start: string, end: string, order: ListTransactionsOrder, minWithdrawal: number): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('listTransactions', { walletId, start, end, order, minWithdrawal }) ?? {};
        try {
          const response = await this.apiClient.wallets.listTransactions(walletId, { start, end, order, minWithdrawal }, extraConfig);
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

  async postTransaction(walletId: string, input: PostWalletsWalletIdTransactionsInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('postTransaction', { walletId, input }) ?? {};
        try {
          const response = await this.apiClient.wallets.postTransaction(walletId, input, extraConfig);
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

  async getTransaction(walletId: string, transactionId: string): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('getTransaction', { walletId, transactionId }) ?? {};
        try {
          const response = await this.apiClient.wallets.getTransaction(walletId, transactionId, extraConfig);
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

  async deleteTransaction(walletId: string, transactionId: string): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('deleteTransaction', { walletId, transactionId }) ?? {};
        try {
          const response = await this.apiClient.wallets.deleteTransaction(walletId, transactionId, extraConfig);
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
