/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ByronCoinSelectionsService } from './byron-coin-selections.service';
import { PostByronWalletsWalletIdCoinSelectionsRandomInput } from './byron-coin-selections.dto';
import { PostByronWalletsWalletIdCoinSelectionsRandomResponse } from './byron-coin-selections.models';

@Resolver()
export class ByronCoinSelectionsResolver {
  constructor(private readonly byronCoinSelectionsService: ByronCoinSelectionsService) {
  }

  @Mutation(() => PostByronWalletsWalletIdCoinSelectionsRandomResponse)
  async byronSelectCoins(@Args('walletId') walletId: string, @Args('input') input: PostByronWalletsWalletIdCoinSelectionsRandomInput): Promise<any> {
        return this.byronCoinSelectionsService.byronSelectCoins(walletId, input);
  }
}
