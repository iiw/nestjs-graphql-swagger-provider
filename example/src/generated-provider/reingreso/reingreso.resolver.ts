/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ReingresoService } from './reingreso.service';
import { PostReingresoPuReingresoSolicitudInput } from './reingreso.dto';

@Resolver()
export class ReingresoResolver {
  constructor(private readonly reingresoService: ReingresoService) {
  }

  @Mutation(() => Boolean)
  async postReingresoPuReingresoSolicitud(@Args('input') input: PostReingresoPuReingresoSolicitudInput): Promise<any> {
        return this.reingresoService.postReingresoPuReingresoSolicitud(input);
  }
}
