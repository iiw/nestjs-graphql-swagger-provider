/* eslint-disable */
import { Inject, Injectable, Optional, HttpException } from '@nestjs/common';
import { Api } from '../api-client';

@Injectable()
export class ConsultaService {
  constructor(@Inject('API_CLIENT') private readonly apiClient: Api<unknown>, @Optional() @Inject('REQUEST_CONFIG_FACTORY') private readonly requestConfigFactory?: ((methodName: string, args: Record<string, unknown>) => Record<string, unknown> | undefined)) {
  }

  async getConsultaPendientesFolioLPE(folioLPE: string): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('getConsultaPendientesFolioLPE', { folioLPE }) ?? {};
        try {
          const response = await this.apiClient.consulta.getConsultaPendientesFolioLPE(folioLPE, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
              throw new HttpException('Folio no encontrado', 404);
            }
            throw error;
        }
  }

  async getConsultaPuObtenerPUsAutorizadosEnGestion(): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('getConsultaPuObtenerPUsAutorizadosEnGestion', {}) ?? {};
        const response = await this.apiClient.consulta.getConsultaPuObtenerPUsAutorizadosEnGestion(extraConfig);
        return response.data;
  }

  async getConsultaPUInterfazSAPFechaCreacion(fechaCreacion: string): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('getConsultaPUInterfazSAPFechaCreacion', { fechaCreacion }) ?? {};
        try {
          const response = await this.apiClient.consulta.getConsultaPUInterfazSAPFechaCreacion(fechaCreacion, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
              throw new HttpException('Precio Unitario no encontrado', 404);
            }
            throw error;
        }
  }

  async getConsultaPUVoBoObtenerPUS(solicitud: string, contrato: string, anexo: string, partida: string, obra: string, usuario: string, cancelado: boolean): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('getConsultaPUVoBoObtenerPUS', { solicitud, contrato, anexo, partida, obra, usuario, cancelado }) ?? {};
        try {
          const response = await this.apiClient.consulta.getConsultaPUVoBoObtenerPUS({ solicitud, contrato, anexo, partida, obra, usuario, cancelado }, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
              throw new HttpException('Precio Unitario no encontrado', 404);
            }
            throw error;
        }
  }

  async getConsultaPUVoBoObtenerContratos(usuario: string): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('getConsultaPUVoBoObtenerContratos', { usuario }) ?? {};
        try {
          const response = await this.apiClient.consulta.getConsultaPUVoBoObtenerContratos({ usuario }, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
              throw new HttpException('Contrato no encontrado', 404);
            }
            throw error;
        }
  }

  async getConsultaPUVoBoObtenerObras(contrato: string): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('getConsultaPUVoBoObtenerObras', { contrato }) ?? {};
        try {
          const response = await this.apiClient.consulta.getConsultaPUVoBoObtenerObras({ contrato }, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
              throw new HttpException('Obras', 404);
            }
            throw error;
        }
  }

  async getConsultaPUEncarpetado(solicitud: string, contrato: string, anexo: string, partida: string, obra: string): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('getConsultaPUEncarpetado', { solicitud, contrato, anexo, partida, obra }) ?? {};
        try {
          const response = await this.apiClient.consulta.getConsultaPUEncarpetado({ solicitud, contrato, anexo, partida, obra }, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
              throw new HttpException('Precio Unitario no encontrado', 404);
            }
            throw error;
        }
  }
}
