/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';
import { PostByronWalletsWalletIdPaymentFeesInputUnit, PostByronWalletsWalletIdTransactionsInputUnit } from '../enums';

@InputType()
export class PostByronWalletsWalletIdPaymentFeesInput {
  @Field(() => [String], { description: 'A list of target outputs' })
  payments!: string[];
}

@InputType()
export class PostByronWalletsWalletIdTransactionsInput {
  @Field(() => [String], { description: 'A list of target outputs' })
  payments!: string[];

  @Field({ description: 'The wallet\'s master passphrase.' })
  passphrase!: string;
}
