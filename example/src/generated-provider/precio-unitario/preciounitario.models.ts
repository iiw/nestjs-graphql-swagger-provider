/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class GetPrecioUnitarioContratoAnexoPartidaResponse {
  @Field({ nullable: true })
  solicitud?: string;

  @Field({ nullable: true })
  noSolicitudCancelacion?: string;
}
