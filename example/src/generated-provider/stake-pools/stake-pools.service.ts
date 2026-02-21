/* eslint-disable */
import { Inject, Injectable, Optional, HttpException } from '@nestjs/common';
import { Api } from '../api-client';
import { PostStakePoolsMaintenanceActionsInput, DeleteStakePoolsWalletsWalletIdInput, PutStakePoolsStakePoolIdWalletsWalletIdInput } from './stake-pools.dto';

@Injectable()
export class StakePoolsService {
  constructor(@Inject('API_CLIENT') private readonly apiClient: Api<unknown>, @Optional() @Inject('REQUEST_CONFIG_FACTORY') private readonly requestConfigFactory?: ((methodName: string, args: Record<string, unknown>) => Record<string, unknown> | undefined)) {
  }

  async listStakePools(stake: number): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('listStakePools', { stake }) ?? {};
        try {
          const response = await this.apiClient.stakePools.listStakePools({ stake }, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 400) {
              throw new HttpException('Bad Request', 400);
            }
            throw error;
        }
  }

  async getMaintenanceActions(): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('getMaintenanceActions', {}) ?? {};
        const response = await this.apiClient.stakePools.getMaintenanceActions(extraConfig);
        return response.data;
  }

  async postMaintenanceAction(input: PostStakePoolsMaintenanceActionsInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('postMaintenanceAction', { input }) ?? {};
        try {
          const response = await this.apiClient.stakePools.postMaintenanceAction(input, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
              throw new HttpException('Not Found', 404);
            }
            throw error;
        }
  }

  async getDelegationFee(walletId: string): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('getDelegationFee', { walletId }) ?? {};
        try {
          const response = await this.apiClient.wallets.getDelegationFee({ walletId }, extraConfig);
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

  async quitStakePool(walletId: string, input: DeleteStakePoolsWalletsWalletIdInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('quitStakePool', { walletId, input }) ?? {};
        try {
          const response = await this.apiClient.stakePools.quitStakePool({ walletId }, input, extraConfig);
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

  async joinStakePool(stakePoolId: string, walletId: string, input: PutStakePoolsStakePoolIdWalletsWalletIdInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('joinStakePool', { stakePoolId, walletId, input }) ?? {};
        try {
          const response = await this.apiClient.stakePools.joinStakePool({ stakePoolId, walletId }, input, extraConfig);
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
