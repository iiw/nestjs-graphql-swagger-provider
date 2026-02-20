/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { KeysService } from './keys.service';
import { GetWalletKeyRole } from '../enums';

@Resolver()
export class KeysResolver {
  constructor(private readonly keysService: KeysService) {
  }

  @Query(() => String)
  async getWalletKey(@Args('walletId') walletId: string, @Args('role', { type: () => GetWalletKeyRole, nullable: true }) role?: GetWalletKeyRole | null, @Args('index', { nullable: true }) index?: string | null): Promise<any> {
        return this.keysService.getWalletKey(walletId, role, index);
  }
}
