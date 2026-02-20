/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StakePoolsService } from './stake pools.service';
import { PostStake-poolsMaintenance-actionsInput, DeleteStake-pools*WalletsWalletIdInput, PutStake-poolsStakePoolIdWalletsWalletIdInput
import { GetStake-poolsResponse, GetStake-poolsMaintenance-actionsResponse, GetWalletsWalletIdDelegation-feesResponse } from './stake pools.models';

 } from './stake pools.dto';

@Resolver()
export class StakePoolsResolver {
  constructor(private readonly stakePoolsService: StakePoolsService) {
  }

  @Query(() => GetStake-poolsResponse)
  async listStakePools(@Args('stake') stake: number): Promise<any> {
        return this.stakePoolsService.listStakePools(stake);
  }

  @Query(() => GetStake-poolsMaintenance-actionsResponse)
  async getMaintenanceActions(): Promise<any> {
        return this.stakePoolsService.getMaintenanceActions();
  }

  @Mutation(() => Boolean)
  async postMaintenanceAction(@Args('input') input: PostStake-poolsMaintenance-actionsInput): Promise<any> {
        return this.stakePoolsService.postMaintenanceAction(input);
  }

  @Query(() => GetWalletsWalletIdDelegation-feesResponse)
  async getDelegationFee(@Args('walletId') walletId: string): Promise<any> {
        return this.stakePoolsService.getDelegationFee(walletId);
  }

  @Mutation(() => Boolean)
  async quitStakePool(@Args('walletId') walletId: string, @Args('input') input: DeleteStake-pools*WalletsWalletIdInput): Promise<any> {
        return this.stakePoolsService.quitStakePool(walletId, input);
  }

  @Mutation(() => Boolean)
  async joinStakePool(@Args('stakePoolId') stakePoolId: string, @Args('walletId') walletId: string, @Args('input') input: PutStake-poolsStakePoolIdWalletsWalletIdInput): Promise<any> {
        return this.stakePoolsService.joinStakePool(stakePoolId, walletId, input);
  }
}
