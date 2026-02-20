/* eslint-disable */
import { DynamicModule, Module } from '@nestjs/common';
import { Api } from '../api-client';
import { ConsultaResolver } from './consulta.resolver';
import { ConsultaService } from './consulta.service';

/**
 * Factory function for customizing HTTP requests made by the generated service.
 * Receives the service method name and all arguments, returns extra axios config
 * (e.g., headers, auth) to merge into each request.
 */
export type RequestConfigFactory = (methodName: string, args: Record<string, unknown>) => Record<string, unknown> | undefined;

@Module({})
export class ConsultaModule {
  static register(apiClient: Api<unknown>, requestConfigFactory?: RequestConfigFactory): DynamicModule {
        const providers: any[] = [
          {
            provide: 'API_CLIENT',
            useValue: apiClient,
          },
          ConsultaResolver,
          ConsultaService,
        ];
        if (requestConfigFactory) {
          providers.push({
            provide: 'REQUEST_CONFIG_FACTORY',
            useValue: requestConfigFactory,
          });
        }
        return {
          module: ConsultaModule,
          providers,
        };
  }
}
