/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class PostActualizaPuAyudantiaInput {
  @Field({ nullable: true })
  solicitud?: string;

  @Field({ nullable: true })
  _Oficio?: string;

  @Field({ nullable: true })
  fechaRecepcion?: string;

  @Field({ nullable: true })
  fechaSello?: string;

  @Field({ nullable: true })
  usuario?: string;
}

@InputType()
export class PostActualizaPuDopaInput {
  @Field({ nullable: true })
  solicitud?: string;

  @Field({ nullable: true })
  _Oficio?: string;

  @Field({ nullable: true })
  fechaRecepcion?: string;

  @Field({ nullable: true })
  fechaSello?: string;

  @Field({ nullable: true })
  usuario?: string;
}

@InputType()
export class PostActualizaPuActualizaPartidaAnteriorInput {
  @Field({ nullable: true })
  solicitud?: string;

  @Field({ nullable: true })
  solicitudAnterior?: string;
}

@InputType()
export class PostActualizaPuOperacionesInput {
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

@InputType()
export class PostActualizaPuEncarpetadoInput {
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
