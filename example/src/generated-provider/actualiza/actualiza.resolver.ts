/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ActualizaService } from './actualiza.service';
import { PostActualizaPuAyudantiaInput, PostActualizaPuDopaInput, PostActualizaPuActualizaPartidaAnteriorInput, PostActualizaPuOperacionesInput, PostActualizaPuEncarpetadoInput } from './actualiza.dto';

@Resolver()
export class ActualizaResolver {
  constructor(private readonly actualizaService: ActualizaService) {
  }

  @Mutation(() => Boolean)
  async postActualizaPuAyudantia(@Args('input') input: PostActualizaPuAyudantiaInput): Promise<any> {
        return this.actualizaService.postActualizaPuAyudantia(input);
  }

  @Mutation(() => Boolean)
  async postActualizaPuDopa(@Args('input') input: PostActualizaPuDopaInput): Promise<any> {
        return this.actualizaService.postActualizaPuDopa(input);
  }

  @Mutation(() => Boolean)
  async postActualizaPuActualizaPartidaAnterior(@Args('input') input: PostActualizaPuActualizaPartidaAnteriorInput): Promise<any> {
        return this.actualizaService.postActualizaPuActualizaPartidaAnterior(input);
  }

  @Mutation(() => Boolean)
  async postActualizaPuOperaciones(@Args('input') input: PostActualizaPuOperacionesInput): Promise<any> {
        return this.actualizaService.postActualizaPuOperaciones(input);
  }

  @Mutation(() => Boolean)
  async postActualizaPuEncarpetado(@Args('input') input: PostActualizaPuEncarpetadoInput): Promise<any> {
        return this.actualizaService.postActualizaPuEncarpetado(input);
  }
}
