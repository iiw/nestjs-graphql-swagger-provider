/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class PostByron-walletsWalletIdPayment-feesInput {
  @Field(() => [String])
  payments!: string[];
}

@InputType()
export class PostByron-walletsWalletIdTransactionsInput {
  @Field(() => [String])
  payments!: string[];

  @Field()
  passphrase!: string;
}
