/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ByronWalletsService } from './byron-wallets.service';
import { PostByronWalletsInput, PutByronWalletsWalletIdInput, PutByronWalletsWalletIdPassphraseInput } from './byron-wallets.dto';
import { GetByronWalletsResponse, PostByronWalletsResponse, GetByronWalletsWalletIdStatisticsUtxosResponse, GetByronWalletsWalletIdResponse, PutByronWalletsWalletIdResponse } from './byron-wallets.models';

@Resolver()
export class ByronWalletsResolver {
  constructor(private readonly byronWalletsService: ByronWalletsService) {
  }

  @Query(() => GetByronWalletsResponse, { description: 'List' })
  async listByronWallets(): Promise<any> {
        return this.byronWalletsService.listByronWallets();
  }

  @Mutation(() => PostByronWalletsResponse, { description: 'Restore' })
  async postByronWallet(@Args('input') input: PostByronWalletsInput): Promise<any> {
        return this.byronWalletsService.postByronWallet(input);
  }

  @Query(() => GetByronWalletsWalletIdStatisticsUtxosResponse, { description: 'UTxO Statistics' })
  async getByronUTxOsStatistics(@Args('walletId') walletId: string): Promise<any> {
        return this.byronWalletsService.getByronUTxOsStatistics(walletId);
  }

  @Query(() => GetByronWalletsWalletIdResponse, { description: 'Get' })
  async getByronWallet(@Args('walletId') walletId: string): Promise<any> {
        return this.byronWalletsService.getByronWallet(walletId);
  }

  @Mutation(() => PutByronWalletsWalletIdResponse, { description: 'Update Metadata' })
  async putByronWallet(@Args('walletId') walletId: string, @Args('input') input: PutByronWalletsWalletIdInput): Promise<any> {
        return this.byronWalletsService.putByronWallet(walletId, input);
  }

  @Mutation(() => Boolean, { description: 'Delete' })
  async deleteByronWallet(@Args('walletId') walletId: string): Promise<any> {
        return this.byronWalletsService.deleteByronWallet(walletId);
  }

  @Mutation(() => Boolean, { description: 'Update Passphrase' })
  async putByronWalletPassphrase(@Args('walletId') walletId: string, @Args('input') input: PutByronWalletsWalletIdPassphraseInput): Promise<any> {
        return this.byronWalletsService.putByronWalletPassphrase(walletId, input);
  }
}
