/* eslint-disable */
import { Inject, Injectable, Optional, HttpException } from '@nestjs/common';
import { Api } from '../api-client';
import { PostWalletsWalletIdSignaturesRoleIndexInput } from './experimental.dto';

@Injectable()
export class ExperimentalService {
  constructor(@Inject('API_CLIENT') private readonly apiClient: Api<unknown>, @Optional() @Inject('REQUEST_CONFIG_FACTORY') private readonly requestConfigFactory?: ((methodName: string, args: Record<string, unknown>) => Record<string, unknown> | undefined)) {
  }

  async signMetadata(walletId: string, role: SignMetadataRole, index: string, input: PostWalletsWalletIdSignaturesRoleIndexInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('signMetadata', { walletId, role, index, input }) ?? {};
        try {
          const response = await this.apiClient.wallets.signMetadata(walletId, role, index, input, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 400) {
              throw new HttpException('Bad Request', 400);
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
