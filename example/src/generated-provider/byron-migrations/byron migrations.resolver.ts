/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ByronMigrationsService } from './byron migrations.service';
import { PostByron-walletsWalletIdMigrationsInput
import { GetByron-walletsWalletIdMigrationsResponse, PostByron-walletsWalletIdMigrationsResponse } from './byron migrations.models';

 } from './byron migrations.dto';

@Resolver()
export class ByronMigrationsResolver {
  constructor(private readonly byronMigrationsService: ByronMigrationsService) {
  }

  @Query(() => GetByron-walletsWalletIdMigrationsResponse)
  async getByronWalletMigrationInfo(@Args('walletId') walletId: string): Promise<any> {
        return this.byronMigrationsService.getByronWalletMigrationInfo(walletId);
  }

  @Mutation(() => PostByron-walletsWalletIdMigrationsResponse)
  async migrateByronWallet(@Args('walletId') walletId: string, @Args('input') input: PostByron-walletsWalletIdMigrationsInput): Promise<any> {
        return this.byronMigrationsService.migrateByronWallet(walletId, input);
  }
}
