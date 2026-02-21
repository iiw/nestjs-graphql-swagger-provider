/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';
import { PostWalletsWalletIdPaymentFeesInputUnit, PostWalletsWalletIdTransactionsInputUnit } from '../enums';

@InputType()
export class PostWalletsWalletIdPaymentFeesInput {
  @Field(() => [String])
  payments!: string[];

  @Field(() => [String])
  withdrawal?: string[];

  @Field({ nullable: true })
  metadata?: string;

  @Field()
  time_to_live?: string;
}

@InputType()
export class PostWalletsWalletIdTransactionsInput {
  @Field()
  passphrase!: string;

  @Field(() => [String])
  payments!: string[];

  @Field(() => [String])
  withdrawal?: string[];

  @Field({ nullable: true })
  metadata?: string;

  @Field()
  time_to_live?: string;
}
