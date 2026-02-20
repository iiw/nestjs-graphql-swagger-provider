/* eslint-disable */
import { Inject, Injectable, Optional, HttpException } from '@nestjs/common';
import { Api } from '../api-client';
import { PostByron-walletsWalletIdCoin-selectionsRandomInput } from './byron coin selections.dto';

@Injectable()
export class ByronCoinSelectionsService {
  constructor(@Inject('API_CLIENT') private readonly apiClient: Api<unknown>, @Optional() @Inject('REQUEST_CONFIG_FACTORY') private readonly requestConfigFactory?: ((methodName: string, args: Record<string, unknown>) => Record<string, unknown> | undefined)) {
  }

  async byronSelectCoins(walletId: string, input: PostByron-walletsWalletIdCoin-selectionsRandomInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('byronSelectCoins', { walletId, input }) ?? {};
        try {
          const response = await this.apiClient.byronWallets.byronSelectCoins(walletId, input, extraConfig);
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
