/* eslint-disable */
import { Inject, Injectable, Optional, HttpException } from '@nestjs/common';
import { Api } from '../api-client';

@Injectable()
export class NetworkService {
  constructor(@Inject('API_CLIENT') private readonly apiClient: Api<unknown>, @Optional() @Inject('REQUEST_CONFIG_FACTORY') private readonly requestConfigFactory?: ((methodName: string, args: Record<string, unknown>) => Record<string, unknown> | undefined)) {
  }

  async getNetworkInformation(): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('getNetworkInformation', {}) ?? {};
        try {
          const response = await this.apiClient.network.getNetworkInformation(extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 406) {
              throw new HttpException('Not Acceptable', 406);
            }
            throw error;
        }
  }

  async getNetworkClock(forceNtpCheck: boolean): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('getNetworkClock', { forceNtpCheck }) ?? {};
        try {
          const response = await this.apiClient.network.getNetworkClock({ forceNtpCheck }, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 406) {
              throw new HttpException('Not Acceptable', 406);
            }
            throw error;
        }
  }

  async getNetworkParameters(): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('getNetworkParameters', {}) ?? {};
        try {
          const response = await this.apiClient.network.getNetworkParameters(extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 406) {
              throw new HttpException('Not Acceptable', 406);
            }
            throw error;
        }
  }
}
