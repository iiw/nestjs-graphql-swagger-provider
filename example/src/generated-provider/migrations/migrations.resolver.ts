/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MigrationsService } from './migrations.service';
import { PostWalletsWalletIdMigrationsInput } from './migrations.dto';
import { GetWalletsWalletIdMigrationsResponse, PostWalletsWalletIdMigrationsResponse } from './migrations.models';

@Resolver()
export class MigrationsResolver {
  constructor(private readonly migrationsService: MigrationsService) {
  }

  @Query(() => GetWalletsWalletIdMigrationsResponse)
  async getShelleyWalletMigrationInfo(@Args('walletId') walletId: string): Promise<any> {
        return this.migrationsService.getShelleyWalletMigrationInfo(walletId);
  }

  @Mutation(() => PostWalletsWalletIdMigrationsResponse)
  async migrateShelleyWallet(@Args('walletId') walletId: string, @Args('input') input: PostWalletsWalletIdMigrationsInput): Promise<any> {
        return this.migrationsService.migrateShelleyWallet(walletId, input);
  }
}
