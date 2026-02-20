/* eslint-disable */
import { Inject, Injectable, Optional, HttpException } from '@nestjs/common';
import { Api } from '../api-client';
import { PostReingresoPuReingresoSolicitudInput } from './reingreso.dto';

@Injectable()
export class ReingresoService {
  constructor(@Inject('API_CLIENT') private readonly apiClient: Api<unknown>, @Optional() @Inject('REQUEST_CONFIG_FACTORY') private readonly requestConfigFactory?: ((methodName: string, args: Record<string, unknown>) => Record<string, unknown> | undefined)) {
  }

  async postReingresoPuReingresoSolicitud(input: PostReingresoPuReingresoSolicitudInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('postReingresoPuReingresoSolicitud', { input }) ?? {};
        try {
          const response = await this.apiClient.reingreso.postReingresoPuReingresoSolicitud(input, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
              throw new HttpException('Solicitud no encontrada', 404);
            }
            throw error;
        }
  }
}
