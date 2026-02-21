/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class PostByronWalletsWalletIdPaymentFeesInput {
  @Field(() => [String])
  payments!: string[];
}

@InputType()
export class PostByronWalletsWalletIdTransactionsInput {
  @Field(() => [String])
  payments!: string[];

  @Field()
  passphrase!: string;
}
