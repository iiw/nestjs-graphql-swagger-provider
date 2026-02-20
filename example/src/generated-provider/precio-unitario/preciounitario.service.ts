/* eslint-disable */
import { Inject, Injectable, Optional, HttpException } from '@nestjs/common';
import { Api } from '../api-client';

@Injectable()
export class PrecioUnitarioService {
  constructor(@Inject('API_CLIENT') private readonly apiClient: Api<unknown>, @Optional() @Inject('REQUEST_CONFIG_FACTORY') private readonly requestConfigFactory?: ((methodName: string, args: Record<string, unknown>) => Record<string, unknown> | undefined)) {
  }

  async getPrecioUnitarioContratoAnexoPartida(contrato: string, anexo: string, partida: string): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('getPrecioUnitarioContratoAnexoPartida', { contrato, anexo, partida }) ?? {};
        try {
          const response = await this.apiClient.precioUnitario.getPrecioUnitarioContratoAnexoPartida(contrato, anexo, partida, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
              throw new HttpException('Precio Unitario no encontrado', 404);
            }
            throw error;
        }
  }
}
