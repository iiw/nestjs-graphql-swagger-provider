/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class GetConsultaPendientesFolioLPEResponse {
  @Field({ nullable: true })
  llave?: string;

  @Field({ nullable: true })
  contrato?: string;

  @Field({ nullable: true })
  anexo?: string;

  @Field({ nullable: true })
  partida?: string;

  @Field({ nullable: true })
  solicitud?: string;

  @Field({ nullable: true })
  obra?: string;

  @Field({ nullable: true })
  descripcion?: string;

  @Field({ nullable: true })
  unidad?: string;

  @Field(() => Float, { nullable: true })
  precioOriginalMXN?: number;

  @Field(() => Float, { nullable: true })
  precioOriginalUSD?: number;

  @Field(() => Float, { nullable: true })
  precioGMCIMSancionadoMXN?: number;

  @Field(() => Float, { nullable: true })
  precioGMCIMSancionadoUSD?: number;

  @Field(() => Float, { nullable: true })
  precioDOPASancionadoMXN?: number;

  @Field(() => Float, { nullable: true })
  precioDOPASancionadoUSD?: number;
}

@ObjectType()
export class GetConsultaPuObtenerPUsAutorizadosEnGestionResponse {
  @Field({ nullable: true })
  solicitud?: string;
}

@ObjectType()
export class GetConsultaPUInterfazSAPFechaCreacionResponse {
  @Field({ nullable: true })
  solicitudBPM?: string;

  @Field({ nullable: true })
  solicitudBPMReferencia?: string;

  @Field({ nullable: true })
  contrato?: string;

  @Field({ nullable: true })
  anexoPartida?: string;

  @Field({ nullable: true })
  anexo?: string;

  @Field({ nullable: true })
  partida?: string;

  @Field({ nullable: true })
  estatus?: string;

  @Field({ nullable: true })
  unidad?: string;

  @Field({ nullable: true })
  embarcacion?: string;
}

@ObjectType()
export class GetConsultaPUVoBoObtenerPUSResponse {
  @Field({ nullable: true })
  llave?: string;

  @Field({ nullable: true })
  solicitud?: string;

  @Field({ nullable: true })
  contrato?: string;

  @Field({ nullable: true })
  anexo?: string;

  @Field({ nullable: true })
  partida?: string;

  @Field({ nullable: true })
  estatus?: string;

  @Field({ nullable: true })
  unidad?: string;

  @Field({ nullable: true })
  descripcion?: string;

  @Field({ nullable: true })
  obra?: string;

  @Field()
  faltaOficioSC?: boolean;

  @Field()
  voBo?: boolean;

  @Field({ nullable: true })
  observaciones?: string;

  @Field()
  docsOk?: boolean;
}

@ObjectType()
export class GetConsultaPUVoBoObtenerContratosResponse {
  @Field({ nullable: true })
  contratoId?: string;

  @Field({ nullable: true })
  nombre?: string;
}

@ObjectType()
export class GetConsultaPUVoBoObtenerObrasResponse {
  @Field({ nullable: true })
  codigo?: string;

  @Field({ nullable: true })
  nombre?: string;
}

@ObjectType()
export class GetConsultaPUEncarpetadoResponse {
  @Field({ nullable: true })
  llave?: string;

  @Field({ nullable: true })
  solicitud?: string;

  @Field({ nullable: true })
  contrato?: string;

  @Field({ nullable: true })
  anexo?: string;

  @Field({ nullable: true })
  partida?: string;

  @Field({ nullable: true })
  estatus?: string;

  @Field({ nullable: true })
  unidad?: string;

  @Field({ nullable: true })
  descripcion?: string;

  @Field({ nullable: true })
  obra?: string;

  @Field()
  faltaOficioSC?: boolean;

  @Field()
  voBo?: boolean;

  @Field({ nullable: true })
  observaciones?: string;

  @Field()
  docsOk?: boolean;
}
