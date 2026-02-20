/* eslint-disable */
import { Inject, Injectable, Optional, HttpException } from '@nestjs/common';
import { Api } from '../api-client';
import { PutSettingsInput } from './settings.dto';

@Injectable()
export class SettingsService {
  constructor(@Inject('API_CLIENT') private readonly apiClient: Api<unknown>, @Optional() @Inject('REQUEST_CONFIG_FACTORY') private readonly requestConfigFactory?: ((methodName: string, args: Record<string, unknown>) => Record<string, unknown> | undefined)) {
  }

  async getSettings(): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('getSettings', {}) ?? {};
        const response = await this.apiClient.settings.getSettings(extraConfig);
        return response.data;
  }

  async putSettings(input: PutSettingsInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('putSettings', { input }) ?? {};
        try {
          const response = await this.apiClient.settings.putSettings(input, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 400) {
              throw new HttpException('Bad Request', 400);
            }
            if (error.response?.status === 415) {
              throw new HttpException('Unsupported Media Type', 415);
            }
            throw error;
        }
  }
}
