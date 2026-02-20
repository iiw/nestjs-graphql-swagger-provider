/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { GetByronWalletsWalletIdMigrationsResponseUnit, PostByronWalletsWalletIdMigrationsResponseDirection, PostByronWalletsWalletIdMigrationsResponseStatus, PostByronWalletsWalletIdMigrationsResponseUnit } from '../enums';

@ObjectType()
export class GetByron-walletsWalletIdMigrationsResponse {
  @Field()
  migration_cost!: string;

  @Field()
  leftovers!: string;
}

@ObjectType()
export class PostByron-walletsWalletIdMigrationsResponse {
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

  @Field(() => PostByronWalletsWalletIdMigrationsResponseDirection)
  direction!: PostByronWalletsWalletIdMigrationsResponseDirection;

  @Field(() => [String])
  inputs!: string[];

  @Field(() => [String])
  outputs!: string[];

  @Field(() => [String])
  withdrawals!: string[];

  @Field(() => PostByronWalletsWalletIdMigrationsResponseStatus)
  status!: PostByronWalletsWalletIdMigrationsResponseStatus;

  @Field({ nullable: true })
  metadata?: string;
}
