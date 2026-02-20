/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { WalletsService } from './wallets.service';
import { PostWalletsInput, PutWalletsWalletIdInput, PutWalletsWalletIdPassphraseInput } from './wallets.dto';
import { GetWalletsResponse, PostWalletsResponse, GetWalletsWalletIdStatisticsUtxosResponse, GetWalletsWalletIdResponse, PutWalletsWalletIdResponse } from './wallets.models';

@Resolver()
export class WalletsResolver {
  constructor(private readonly walletsService: WalletsService) {
  }

  @Query(() => GetWalletsResponse)
  async listWallets(): Promise<any> {
        return this.walletsService.listWallets();
  }

  @Mutation(() => PostWalletsResponse)
  async postWallet(@Args('input') input: PostWalletsInput): Promise<any> {
        return this.walletsService.postWallet(input);
  }

  @Query(() => GetWalletsWalletIdStatisticsUtxosResponse)
  async getUTxOsStatistics(@Args('walletId') walletId: string): Promise<any> {
        return this.walletsService.getUTxOsStatistics(walletId);
  }

  @Query(() => GetWalletsWalletIdResponse)
  async getWallet(@Args('walletId') walletId: string): Promise<any> {
        return this.walletsService.getWallet(walletId);
  }

  @Mutation(() => PutWalletsWalletIdResponse)
  async putWallet(@Args('walletId') walletId: string, @Args('input') input: PutWalletsWalletIdInput): Promise<any> {
        return this.walletsService.putWallet(walletId, input);
  }

  @Mutation(() => Boolean)
  async deleteWallet(@Args('walletId') walletId: string): Promise<any> {
        return this.walletsService.deleteWallet(walletId);
  }

  @Mutation(() => Boolean)
  async putWalletPassphrase(@Args('walletId') walletId: string, @Args('input') input: PutWalletsWalletIdPassphraseInput): Promise<any> {
        return this.walletsService.putWalletPassphrase(walletId, input);
  }
}
