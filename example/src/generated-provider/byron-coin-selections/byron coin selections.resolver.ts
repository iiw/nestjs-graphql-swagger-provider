/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ByronCoinSelectionsService } from './byron coin selections.service';
import { PostByron-walletsWalletIdCoin-selectionsRandomInput
import { PostByron-walletsWalletIdCoin-selectionsRandomResponse } from './byron coin selections.models';

 } from './byron coin selections.dto';

@Resolver()
export class ByronCoinSelectionsResolver {
  constructor(private readonly byronCoinSelectionsService: ByronCoinSelectionsService) {
  }

  @Mutation(() => PostByron-walletsWalletIdCoin-selectionsRandomResponse)
  async byronSelectCoins(@Args('walletId') walletId: string, @Args('input') input: PostByron-walletsWalletIdCoin-selectionsRandomInput): Promise<any> {
        return this.byronCoinSelectionsService.byronSelectCoins(walletId, input);
  }
}
