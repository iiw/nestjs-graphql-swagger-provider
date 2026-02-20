/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CoinSelectionsService } from './coin selections.service';
import { PostWalletsWalletIdCoin-selectionsRandomInput
import { PostWalletsWalletIdCoin-selectionsRandomResponse } from './coin selections.models';

 } from './coin selections.dto';

@Resolver()
export class CoinSelectionsResolver {
  constructor(private readonly coinSelectionsService: CoinSelectionsService) {
  }

  @Mutation(() => PostWalletsWalletIdCoin-selectionsRandomResponse)
  async selectCoins(@Args('walletId') walletId: string, @Args('input') input: PostWalletsWalletIdCoin-selectionsRandomInput): Promise<any> {
        return this.coinSelectionsService.selectCoins(walletId, input);
  }
}
