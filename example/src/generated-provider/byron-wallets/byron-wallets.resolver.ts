/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ByronWalletsService } from './byron-wallets.service';
import { PostByronWalletsInput, PutByronWalletsWalletIdInput, PutByronWalletsWalletIdPassphraseInput } from './byron-wallets.dto';
import { GetByronWalletsResponse, PostByronWalletsResponse, GetByronWalletsWalletIdStatisticsUtxosResponse, GetByronWalletsWalletIdResponse, PutByronWalletsWalletIdResponse } from './byron-wallets.models';

@Resolver()
export class ByronWalletsResolver {
  constructor(private readonly byronWalletsService: ByronWalletsService) {
  }

  @Query(() => GetByronWalletsResponse)
  async listByronWallets(): Promise<any> {
        return this.byronWalletsService.listByronWallets();
  }

  @Mutation(() => PostByronWalletsResponse)
  async postByronWallet(@Args('input') input: PostByronWalletsInput): Promise<any> {
        return this.byronWalletsService.postByronWallet(input);
  }

  @Query(() => GetByronWalletsWalletIdStatisticsUtxosResponse)
  async getByronUTxOsStatistics(@Args('walletId') walletId: string): Promise<any> {
        return this.byronWalletsService.getByronUTxOsStatistics(walletId);
  }

  @Query(() => GetByronWalletsWalletIdResponse)
  async getByronWallet(@Args('walletId') walletId: string): Promise<any> {
        return this.byronWalletsService.getByronWallet(walletId);
  }

  @Mutation(() => PutByronWalletsWalletIdResponse)
  async putByronWallet(@Args('walletId') walletId: string, @Args('input') input: PutByronWalletsWalletIdInput): Promise<any> {
        return this.byronWalletsService.putByronWallet(walletId, input);
  }

  @Mutation(() => Boolean)
  async deleteByronWallet(@Args('walletId') walletId: string): Promise<any> {
        return this.byronWalletsService.deleteByronWallet(walletId);
  }

  @Mutation(() => Boolean)
  async putByronWalletPassphrase(@Args('walletId') walletId: string, @Args('input') input: PutByronWalletsWalletIdPassphraseInput): Promise<any> {
        return this.byronWalletsService.putByronWalletPassphrase(walletId, input);
  }
}
