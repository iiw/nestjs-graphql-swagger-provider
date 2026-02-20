/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { GetByronWalletsWalletIdTransactionsResponseDirection, GetByronWalletsWalletIdTransactionsResponseStatus, GetByronWalletsWalletIdTransactionsResponseUnit, GetByronWalletsWalletIdTransactionsTransactionIdResponseDirection, GetByronWalletsWalletIdTransactionsTransactionIdResponseStatus, GetByronWalletsWalletIdTransactionsTransactionIdResponseUnit } from '../enums';

@ObjectType()
export class GetByron-walletsWalletIdTransactionsResponse {
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

  @Field(() => GetByronWalletsWalletIdTransactionsResponseDirection)
  direction!: GetByronWalletsWalletIdTransactionsResponseDirection;

  @Field(() => [String])
  inputs!: string[];

  @Field(() => [String])
  outputs!: string[];

  @Field(() => [String])
  withdrawals!: string[];

  @Field(() => GetByronWalletsWalletIdTransactionsResponseStatus)
  status!: GetByronWalletsWalletIdTransactionsResponseStatus;

  @Field({ nullable: true })
  metadata?: string;
}

@ObjectType()
export class GetByron-walletsWalletIdTransactionsTransactionIdResponse {
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

  @Field(() => GetByronWalletsWalletIdTransactionsTransactionIdResponseDirection)
  direction!: GetByronWalletsWalletIdTransactionsTransactionIdResponseDirection;

  @Field(() => [String])
  inputs!: string[];

  @Field(() => [String])
  outputs!: string[];

  @Field(() => [String])
  withdrawals!: string[];

  @Field(() => GetByronWalletsWalletIdTransactionsTransactionIdResponseStatus)
  status!: GetByronWalletsWalletIdTransactionsTransactionIdResponseStatus;

  @Field({ nullable: true })
  metadata?: string;
}
