/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ByronMigrationsService } from './byron-migrations.service';
import { PostByronWalletsWalletIdMigrationsInput } from './byron-migrations.dto';
import { GetByronWalletsWalletIdMigrationsResponse, PostByronWalletsWalletIdMigrationsResponse } from './byron-migrations.models';

@Resolver()
export class ByronMigrationsResolver {
  constructor(private readonly byronMigrationsService: ByronMigrationsService) {
  }

  @Query(() => GetByronWalletsWalletIdMigrationsResponse)
  async getByronWalletMigrationInfo(@Args('walletId') walletId: string): Promise<any> {
        return this.byronMigrationsService.getByronWalletMigrationInfo(walletId);
  }

  @Mutation(() => PostByronWalletsWalletIdMigrationsResponse)
  async migrateByronWallet(@Args('walletId') walletId: string, @Args('input') input: PostByronWalletsWalletIdMigrationsInput): Promise<any> {
        return this.byronMigrationsService.migrateByronWallet(walletId, input);
  }
}
