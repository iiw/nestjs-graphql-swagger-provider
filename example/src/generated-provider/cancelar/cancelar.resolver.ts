/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CancelarService } from './cancelar.service';
import { PostCancelarPuCancelaInput } from './cancelar.dto';

@Resolver()
export class CancelarResolver {
  constructor(private readonly cancelarService: CancelarService) {
  }

  @Mutation(() => Boolean)
  async postCancelarPuCancela(@Args('input') input: PostCancelarPuCancelaInput): Promise<any> {
        return this.cancelarService.postCancelarPuCancela(input);
  }
}
