/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ConsultaService } from './consulta.service';
import { GetConsultaPendientesFolioLPEResponse, GetConsultaPuObtenerPUsAutorizadosEnGestionResponse, GetConsultaPUInterfazSAPFechaCreacionResponse, GetConsultaPUVoBoObtenerPUSResponse, GetConsultaPUVoBoObtenerContratosResponse, GetConsultaPUVoBoObtenerObrasResponse, GetConsultaPUEncarpetadoResponse } from './consulta.models';

@Resolver()
export class ConsultaResolver {
  constructor(private readonly consultaService: ConsultaService) {
  }

  @Query(() => GetConsultaPendientesFolioLPEResponse)
  async getConsultaPendientesFolioLPE(@Args('folioLPE') folioLPE: string): Promise<any> {
        return this.consultaService.getConsultaPendientesFolioLPE(folioLPE);
  }

  @Query(() => GetConsultaPuObtenerPUsAutorizadosEnGestionResponse)
  async getConsultaPuObtenerPUsAutorizadosEnGestion(): Promise<any> {
        return this.consultaService.getConsultaPuObtenerPUsAutorizadosEnGestion();
  }

  @Query(() => GetConsultaPUInterfazSAPFechaCreacionResponse)
  async getConsultaPUInterfazSAPFechaCreacion(@Args('fechaCreacion') fechaCreacion: string): Promise<any> {
        return this.consultaService.getConsultaPUInterfazSAPFechaCreacion(fechaCreacion);
  }

  @Query(() => GetConsultaPUVoBoObtenerPUSResponse)
  async getConsultaPUVoBoObtenerPUS(@Args('solicitud', { nullable: true }) solicitud?: string | null, @Args('contrato', { nullable: true }) contrato?: string | null, @Args('anexo', { nullable: true }) anexo?: string | null, @Args('partida', { nullable: true }) partida?: string | null, @Args('obra', { nullable: true }) obra?: string | null, @Args('usuario', { nullable: true }) usuario?: string | null, @Args('cancelado', { nullable: true }) cancelado?: boolean | null): Promise<any> {
        return this.consultaService.getConsultaPUVoBoObtenerPUS(solicitud, contrato, anexo, partida, obra, usuario, cancelado);
  }

  @Query(() => GetConsultaPUVoBoObtenerContratosResponse)
  async getConsultaPUVoBoObtenerContratos(@Args('usuario', { nullable: true }) usuario?: string | null): Promise<any> {
        return this.consultaService.getConsultaPUVoBoObtenerContratos(usuario);
  }

  @Query(() => GetConsultaPUVoBoObtenerObrasResponse)
  async getConsultaPUVoBoObtenerObras(@Args('contrato', { nullable: true }) contrato?: string | null): Promise<any> {
        return this.consultaService.getConsultaPUVoBoObtenerObras(contrato);
  }

  @Query(() => GetConsultaPUEncarpetadoResponse)
  async getConsultaPUEncarpetado(@Args('solicitud', { nullable: true }) solicitud?: string | null, @Args('contrato', { nullable: true }) contrato?: string | null, @Args('anexo', { nullable: true }) anexo?: string | null, @Args('partida', { nullable: true }) partida?: string | null, @Args('obra', { nullable: true }) obra?: string | null): Promise<any> {
        return this.consultaService.getConsultaPUEncarpetado(solicitud, contrato, anexo, partida, obra);
  }
}
