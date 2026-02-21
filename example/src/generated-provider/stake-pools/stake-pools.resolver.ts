/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StakePoolsService } from './stake-pools.service';
import { PostStakePoolsMaintenanceActionsInput, DeleteStakePoolsWalletsWalletIdInput, PutStakePoolsStakePoolIdWalletsWalletIdInput } from './stake-pools.dto';
import { GetStakePoolsResponse, GetStakePoolsMaintenanceActionsResponse, GetWalletsWalletIdDelegationFeesResponse, DeleteStakePoolsWalletsWalletIdResponse, PutStakePoolsStakePoolIdWalletsWalletIdResponse } from './stake-pools.models';

@Resolver()
export class StakePoolsResolver {
  constructor(private readonly stakePoolsService: StakePoolsService) {
  }

  @Query(() => GetStakePoolsResponse, { description: 'List' })
  async listStakePools(@Args('stake', { description: 'The stake the user intends to delegate in Lovelace. Required.\n' }) stake: number): Promise<any> {
        return this.stakePoolsService.listStakePools(stake);
  }

  @Query(() => GetStakePoolsMaintenanceActionsResponse, { description: 'View maintenance actions' })
  async getMaintenanceActions(): Promise<any> {
        return this.stakePoolsService.getMaintenanceActions();
  }

  @Mutation(() => Boolean, { description: 'Trigger Maintenance actions' })
  async postMaintenanceAction(@Args('input') input: PostStakePoolsMaintenanceActionsInput): Promise<any> {
        return this.stakePoolsService.postMaintenanceAction(input);
  }

  @Query(() => GetWalletsWalletIdDelegationFeesResponse, { description: 'Estimate Fee' })
  async getDelegationFee(@Args('walletId') walletId: string): Promise<any> {
        return this.stakePoolsService.getDelegationFee(walletId);
  }

  @Mutation(() => DeleteStakePoolsWalletsWalletIdResponse, { description: 'Quit' })
  async quitStakePool(@Args('walletId') walletId: string, @Args('input') input: DeleteStakePoolsWalletsWalletIdInput): Promise<any> {
        return this.stakePoolsService.quitStakePool(walletId, input);
  }

  @Mutation(() => PutStakePoolsStakePoolIdWalletsWalletIdResponse, { description: 'Join' })
  async joinStakePool(@Args('stakePoolId') stakePoolId: string, @Args('walletId') walletId: string, @Args('input') input: PutStakePoolsStakePoolIdWalletsWalletIdInput): Promise<any> {
        return this.stakePoolsService.joinStakePool(stakePoolId, walletId, input);
  }
}
