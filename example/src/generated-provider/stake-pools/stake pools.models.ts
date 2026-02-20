/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { GetStakePoolsMaintenanceActionsResponseStatus, GetStakePoolsResponseFlags, GetStakePoolsResponseUnit, GetWalletsWalletIdDelegationFeesResponseUnit } from '../enums';

@ObjectType()
export class GetStake-poolsResponse {
  @Field()
  id!: string;

  @Field()
  metrics!: string;

  @Field()
  cost!: string;

  @Field()
  margin!: string;

  @Field()
  pledge!: string;

  @Field()
  metadata?: string;

  @Field()
  retirement?: string;

  @Field(() => [GetStakePoolsResponseFlags])
  flags!: GetStakePoolsResponseFlags[];
}

@ObjectType()
export class GetStake-poolsMaintenance-actionsResponse {
  @Field()
  gc_stake_pools!: string;
}

@ObjectType()
export class GetWalletsWalletIdDelegation-feesResponse {
  @Field()
  estimated_min!: string;

  @Field()
  estimated_max!: string;
}
