/* eslint-disable */
import { Inject, Injectable, Optional, HttpException } from '@nestjs/common';
import { Api } from '../api-client';
import { PostAddressesInput } from './addresses.dto';
import { ListAddressesState } from '../enums';

@Injectable()
export class AddressesService {
  constructor(@Inject('API_CLIENT') private readonly apiClient: Api<unknown>, @Optional() @Inject('REQUEST_CONFIG_FACTORY') private readonly requestConfigFactory?: ((methodName: string, args: Record<string, unknown>) => Record<string, unknown> | undefined)) {
  }

  async listAddresses(walletId: string, state: ListAddressesState): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('listAddresses', { walletId, state }) ?? {};
        try {
          const response = await this.apiClient.wallets.listAddresses({ walletId, state }, extraConfig);
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

  async inspectAddress(addressId: string): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('inspectAddress', { addressId }) ?? {};
        try {
          const response = await this.apiClient.addresses.inspectAddress({ addressId }, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 400) {
              throw new HttpException('Bad Request', 400);
            }
            throw error;
        }
  }

  async postAnyAddress(input: PostAddressesInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('postAnyAddress', { input }) ?? {};
        try {
          const response = await this.apiClient.addresses.postAnyAddress(input, extraConfig);
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
