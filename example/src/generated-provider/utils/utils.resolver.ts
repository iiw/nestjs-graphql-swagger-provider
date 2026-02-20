/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UtilsService } from './utils.service';
import { GetSmashHealthResponse } from './utils.models';

@Resolver()
export class UtilsResolver {
  constructor(private readonly utilsService: UtilsService) {
  }

  @Query(() => GetSmashHealthResponse)
  async getCurrentSmashHealth(@Args('url', { nullable: true }) url?: string | null): Promise<any> {
        return this.utilsService.getCurrentSmashHealth(url);
  }
}
