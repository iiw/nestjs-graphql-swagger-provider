/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { GetWalletsWalletIdMigrationsResponseUnit, PostWalletsWalletIdMigrationsResponseDirection, PostWalletsWalletIdMigrationsResponseStatus, PostWalletsWalletIdMigrationsResponseUnit } from '../enums';

@ObjectType()
export class GetWalletsWalletIdMigrationsResponse {
  @Field()
  migration_cost!: string;

  @Field()
  leftovers!: string;
}

@ObjectType()
export class PostWalletsWalletIdMigrationsResponse {
  @Field()
  id!: string;

  @Field()
  amount!: string;

  @Field()
  inserted_at?: string;

  @Field()
  expires_at?: string;

  @Field()
  pending_since?: string;

  @Field()
  depth?: string;

  @Field(() => PostWalletsWalletIdMigrationsResponseDirection)
  direction!: PostWalletsWalletIdMigrationsResponseDirection;

  @Field(() => [String])
  inputs!: string[];

  @Field(() => [String])
  outputs!: string[];

  @Field(() => [String])
  withdrawals!: string[];

  @Field(() => PostWalletsWalletIdMigrationsResponseStatus)
  status!: PostWalletsWalletIdMigrationsResponseStatus;

  @Field({ nullable: true })
  metadata?: string;
}
