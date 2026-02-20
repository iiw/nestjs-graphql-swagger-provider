/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { GetWalletsWalletIdTransactionsResponseDirection, GetWalletsWalletIdTransactionsResponseStatus, GetWalletsWalletIdTransactionsResponseUnit, GetWalletsWalletIdTransactionsTransactionIdResponseDirection, GetWalletsWalletIdTransactionsTransactionIdResponseStatus, GetWalletsWalletIdTransactionsTransactionIdResponseUnit } from '../enums';

@ObjectType()
export class GetWalletsWalletIdTransactionsResponse {
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

  @Field(() => GetWalletsWalletIdTransactionsResponseDirection)
  direction!: GetWalletsWalletIdTransactionsResponseDirection;

  @Field(() => [String])
  inputs!: string[];

  @Field(() => [String])
  outputs!: string[];

  @Field(() => [String])
  withdrawals!: string[];

  @Field(() => GetWalletsWalletIdTransactionsResponseStatus)
  status!: GetWalletsWalletIdTransactionsResponseStatus;

  @Field({ nullable: true })
  metadata?: string;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsTransactionIdResponse {
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

  @Field(() => GetWalletsWalletIdTransactionsTransactionIdResponseDirection)
  direction!: GetWalletsWalletIdTransactionsTransactionIdResponseDirection;

  @Field(() => [String])
  inputs!: string[];

  @Field(() => [String])
  outputs!: string[];

  @Field(() => [String])
  withdrawals!: string[];

  @Field(() => GetWalletsWalletIdTransactionsTransactionIdResponseStatus)
  status!: GetWalletsWalletIdTransactionsTransactionIdResponseStatus;

  @Field({ nullable: true })
  metadata?: string;
}
