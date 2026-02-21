/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StakePoolsService } from './stake-pools.service';
import { PostStakePoolsMaintenanceActionsInput, DeleteStakePools*WalletsWalletIdInput, PutStakePoolsStakePoolIdWalletsWalletIdInput
import { GetStakePoolsResponse, GetStakePoolsMaintenanceActionsResponse, GetWalletsWalletIdDelegationFeesResponse } from './stake-pools.models';

 } from './stake-pools.dto';

@Resolver()
export class StakePoolsResolver {
  constructor(private readonly stakePoolsService: StakePoolsService) {
  }

  @Query(() => GetStakePoolsResponse)
  async listStakePools(@Args('stake') stake: number): Promise<any> {
        return this.stakePoolsService.listStakePools(stake);
  }

  @Query(() => GetStakePoolsMaintenanceActionsResponse)
  async getMaintenanceActions(): Promise<any> {
        return this.stakePoolsService.getMaintenanceActions();
  }

  @Mutation(() => Boolean)
  async postMaintenanceAction(@Args('input') input: PostStakePoolsMaintenanceActionsInput): Promise<any> {
        return this.stakePoolsService.postMaintenanceAction(input);
  }

  @Query(() => GetWalletsWalletIdDelegationFeesResponse)
  async getDelegationFee(@Args('walletId') walletId: string): Promise<any> {
        return this.stakePoolsService.getDelegationFee(walletId);
  }

  @Mutation(() => Boolean)
  async quitStakePool(@Args('walletId') walletId: string, @Args('input') input: DeleteStakePools*WalletsWalletIdInput): Promise<any> {
        return this.stakePoolsService.quitStakePool(walletId, input);
  }

  @Mutation(() => Boolean)
  async joinStakePool(@Args('stakePoolId') stakePoolId: string, @Args('walletId') walletId: string, @Args('input') input: PutStakePoolsStakePoolIdWalletsWalletIdInput): Promise<any> {
        return this.stakePoolsService.joinStakePool(stakePoolId, walletId, input);
  }
}
