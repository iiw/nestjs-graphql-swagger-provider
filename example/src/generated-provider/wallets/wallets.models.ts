/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { GetWalletsResponseStatus, GetWalletsResponseUnit, GetWalletsWalletIdResponseStatus, GetWalletsWalletIdResponseUnit, GetWalletsWalletIdStatisticsUtxosResponseScale, GetWalletsWalletIdStatisticsUtxosResponseUnit, PostWalletsResponseStatus, PostWalletsResponseUnit, PutWalletsWalletIdResponseStatus, PutWalletsWalletIdResponseUnit } from '../enums';

@ObjectType()
export class GetWalletsResponse {
  @Field()
  id!: string;

  @Field(() => Float)
  address_pool_gap!: number;

  @Field()
  balance!: string;

  @Field()
  delegation!: string;

  @Field()
  name!: string;

  @Field()
  passphrase?: string;

  @Field()
  state!: string;

  @Field()
  tip!: string;
}

@ObjectType()
export class PostWalletsResponse {
  @Field()
  id!: string;

  @Field(() => Float)
  address_pool_gap!: number;

  @Field()
  balance!: string;

  @Field()
  delegation!: string;

  @Field()
  name!: string;

  @Field()
  passphrase?: string;

  @Field()
  state!: string;

  @Field()
  tip!: string;
}

@ObjectType()
export class GetWalletsWalletIdStatisticsUtxosResponse {
  @Field()
  total!: string;

  @Field(() => GetWalletsWalletIdStatisticsUtxosResponseScale)
  scale!: GetWalletsWalletIdStatisticsUtxosResponseScale;

  @Field()
  distribution!: string;
}

@ObjectType()
export class GetWalletsWalletIdResponse {
  @Field()
  id!: string;

  @Field(() => Float)
  address_pool_gap!: number;

  @Field()
  balance!: string;

  @Field()
  delegation!: string;

  @Field()
  name!: string;

  @Field()
  passphrase?: string;

  @Field()
  state!: string;

  @Field()
  tip!: string;
}

@ObjectType()
export class PutWalletsWalletIdResponse {
  @Field()
  id!: string;

  @Field(() => Float)
  address_pool_gap!: number;

  @Field()
  balance!: string;

  @Field()
  delegation!: string;

  @Field()
  name!: string;

  @Field()
  passphrase?: string;

  @Field()
  state!: string;

  @Field()
  tip!: string;
}
