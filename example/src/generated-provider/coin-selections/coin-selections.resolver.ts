/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CoinSelectionsService } from './coin-selections.service';
import { PostWalletsWalletIdCoinSelectionsRandomInput } from './coin-selections.dto';
import { PostWalletsWalletIdCoinSelectionsRandomResponse } from './coin-selections.models';

@Resolver()
export class CoinSelectionsResolver {
  constructor(private readonly coinSelectionsService: CoinSelectionsService) {
  }

  @Mutation(() => PostWalletsWalletIdCoinSelectionsRandomResponse)
  async selectCoins(@Args('walletId') walletId: string, @Args('input') input: PostWalletsWalletIdCoinSelectionsRandomInput): Promise<any> {
        return this.coinSelectionsService.selectCoins(walletId, input);
  }
}
