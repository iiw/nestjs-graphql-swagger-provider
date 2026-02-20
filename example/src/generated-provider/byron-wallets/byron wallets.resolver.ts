/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ByronWalletsService } from './byron wallets.service';
import { PostByron-walletsInput, PutByron-walletsWalletIdInput, PutByron-walletsWalletIdPassphraseInput
import { GetByron-walletsResponse, PostByron-walletsResponse, GetByron-walletsWalletIdStatisticsUtxosResponse, GetByron-walletsWalletIdResponse, PutByron-walletsWalletIdResponse } from './byron wallets.models';

 } from './byron wallets.dto';

@Resolver()
export class ByronWalletsResolver {
  constructor(private readonly byronWalletsService: ByronWalletsService) {
  }

  @Query(() => GetByron-walletsResponse)
  async listByronWallets(): Promise<any> {
        return this.byronWalletsService.listByronWallets();
  }

  @Mutation(() => PostByron-walletsResponse)
  async postByronWallet(@Args('input') input: PostByron-walletsInput): Promise<any> {
        return this.byronWalletsService.postByronWallet(input);
  }

  @Query(() => GetByron-walletsWalletIdStatisticsUtxosResponse)
  async getByronUTxOsStatistics(@Args('walletId') walletId: string): Promise<any> {
        return this.byronWalletsService.getByronUTxOsStatistics(walletId);
  }

  @Query(() => GetByron-walletsWalletIdResponse)
  async getByronWallet(@Args('walletId') walletId: string): Promise<any> {
        return this.byronWalletsService.getByronWallet(walletId);
  }

  @Mutation(() => PutByron-walletsWalletIdResponse)
  async putByronWallet(@Args('walletId') walletId: string, @Args('input') input: PutByron-walletsWalletIdInput): Promise<any> {
        return this.byronWalletsService.putByronWallet(walletId, input);
  }

  @Mutation(() => Boolean)
  async deleteByronWallet(@Args('walletId') walletId: string): Promise<any> {
        return this.byronWalletsService.deleteByronWallet(walletId);
  }

  @Mutation(() => Boolean)
  async putByronWalletPassphrase(@Args('walletId') walletId: string, @Args('input') input: PutByron-walletsWalletIdPassphraseInput): Promise<any> {
        return this.byronWalletsService.putByronWalletPassphrase(walletId, input);
  }
}
