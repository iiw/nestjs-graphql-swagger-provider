/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { GetByronWalletsResponseDiscovery, GetByronWalletsResponseStatus, GetByronWalletsResponseUnit, GetByronWalletsWalletIdResponseDiscovery, GetByronWalletsWalletIdResponseStatus, GetByronWalletsWalletIdResponseUnit, GetByronWalletsWalletIdStatisticsUtxosResponseScale, GetByronWalletsWalletIdStatisticsUtxosResponseUnit, PostByronWalletsResponseDiscovery, PostByronWalletsResponseStatus, PostByronWalletsResponseUnit, PutByronWalletsWalletIdResponseStatus, PutByronWalletsWalletIdResponseUnit } from '../enums';

@ObjectType()
export class GetByron-walletsResponse {
  @Field()
  id!: string;

  @Field()
  balance!: string;

  @Field(() => GetByronWalletsResponseDiscovery)
  discovery!: GetByronWalletsResponseDiscovery;

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
export class PostByron-walletsResponse {
  @Field()
  id!: string;

  @Field()
  balance!: string;

  @Field(() => PostByronWalletsResponseDiscovery)
  discovery!: PostByronWalletsResponseDiscovery;

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
export class GetByron-walletsWalletIdStatisticsUtxosResponse {
  @Field()
  total!: string;

  @Field(() => GetByronWalletsWalletIdStatisticsUtxosResponseScale)
  scale!: GetByronWalletsWalletIdStatisticsUtxosResponseScale;

  @Field()
  distribution!: string;
}

@ObjectType()
export class GetByron-walletsWalletIdResponse {
  @Field()
  id!: string;

  @Field()
  balance!: string;

  @Field(() => GetByronWalletsWalletIdResponseDiscovery)
  discovery!: GetByronWalletsWalletIdResponseDiscovery;

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
export class PutByron-walletsWalletIdResponse {
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
