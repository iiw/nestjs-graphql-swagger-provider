/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { GetStakePoolsMaintenanceActionsResponseStatus, GetStakePoolsResponseFlags, GetStakePoolsResponseUnit, GetWalletsWalletIdDelegationFeesResponseUnit } from '../enums';

@ObjectType()
export class GetStakePoolsResponse {
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
export class GetStakePoolsMaintenanceActionsResponse {
  @Field()
  gc_stake_pools!: string;
}

@ObjectType()
export class GetWalletsWalletIdDelegationFeesResponse {
  @Field()
  estimated_min!: string;

  @Field()
  estimated_max!: string;
}
