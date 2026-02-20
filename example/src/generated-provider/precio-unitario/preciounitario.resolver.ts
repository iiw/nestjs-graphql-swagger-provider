/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PrecioUnitarioService } from './preciounitario.service';
import { GetPrecioUnitarioContratoAnexoPartidaResponse } from './preciounitario.models';

@Resolver()
export class PrecioUnitarioResolver {
  constructor(private readonly precioUnitarioService: PrecioUnitarioService) {
  }

  @Query(() => GetPrecioUnitarioContratoAnexoPartidaResponse)
  async getPrecioUnitarioContratoAnexoPartida(@Args('contrato') contrato: string, @Args('anexo') anexo: string, @Args('partida') partida: string): Promise<any> {
        return this.precioUnitarioService.getPrecioUnitarioContratoAnexoPartida(contrato, anexo, partida);
  }
}
