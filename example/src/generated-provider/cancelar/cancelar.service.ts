/* eslint-disable */
import { Inject, Injectable, Optional, HttpException } from '@nestjs/common';
import { Api } from '../api-client';
import { PostCancelarPuCancelaInput } from './cancelar.dto';

@Injectable()
export class CancelarService {
  constructor(@Inject('API_CLIENT') private readonly apiClient: Api<unknown>, @Optional() @Inject('REQUEST_CONFIG_FACTORY') private readonly requestConfigFactory?: ((methodName: string, args: Record<string, unknown>) => Record<string, unknown> | undefined)) {
  }

  async postCancelarPuCancela(input: PostCancelarPuCancelaInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('postCancelarPuCancela', { input }) ?? {};
        try {
          const response = await this.apiClient.cancelar.postCancelarPuCancela(input, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
              throw new HttpException('Solicitud no encontrada', 404);
            }
            throw error;
        }
  }
}
