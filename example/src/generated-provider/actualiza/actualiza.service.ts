/* eslint-disable */
import { Inject, Injectable, Optional, HttpException } from '@nestjs/common';
import { Api } from '../api-client';
import { PostActualizaPuAyudantiaInput, PostActualizaPuDopaInput, PostActualizaPuActualizaPartidaAnteriorInput, PostActualizaPuOperacionesInput, PostActualizaPuEncarpetadoInput } from './actualiza.dto';

@Injectable()
export class ActualizaService {
  constructor(@Inject('API_CLIENT') private readonly apiClient: Api<unknown>, @Optional() @Inject('REQUEST_CONFIG_FACTORY') private readonly requestConfigFactory?: ((methodName: string, args: Record<string, unknown>) => Record<string, unknown> | undefined)) {
  }

  async postActualizaPuAyudantia(input: PostActualizaPuAyudantiaInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('postActualizaPuAyudantia', { input }) ?? {};
        try {
          const response = await this.apiClient.actualiza.postActualizaPuAyudantia(input, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
              throw new HttpException('Folio no encontrado', 404);
            }
            throw error;
        }
  }

  async postActualizaPuDopa(input: PostActualizaPuDopaInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('postActualizaPuDopa', { input }) ?? {};
        try {
          const response = await this.apiClient.actualiza.postActualizaPuDopa(input, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
              throw new HttpException('Folio no encontrado', 404);
            }
            throw error;
        }
  }

  async postActualizaPuActualizaPartidaAnterior(input: PostActualizaPuActualizaPartidaAnteriorInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('postActualizaPuActualizaPartidaAnterior', { input }) ?? {};
        try {
          const response = await this.apiClient.actualiza.postActualizaPuActualizaPartidaAnterior(input, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
              throw new HttpException('Folio no encontrado', 404);
            }
            throw error;
        }
  }

  async postActualizaPuOperaciones(input: PostActualizaPuOperacionesInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('postActualizaPuOperaciones', { input }) ?? {};
        try {
          const response = await this.apiClient.actualiza.postActualizaPuOperaciones(input, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
              throw new HttpException('Folio no encontrado', 404);
            }
            throw error;
        }
  }

  async postActualizaPuEncarpetado(input: PostActualizaPuEncarpetadoInput): Promise<any> {
        const extraConfig = this.requestConfigFactory?.('postActualizaPuEncarpetado', { input }) ?? {};
        try {
          const response = await this.apiClient.actualiza.postActualizaPuEncarpetado(input, extraConfig);
          return response.data;
        } catch (error: any) {
            if (error.response?.status === 404) {
              throw new HttpException('Folio no encontrado', 404);
            }
            throw error;
        }
  }
}
