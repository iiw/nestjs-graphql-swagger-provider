/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';
import { PostByronTransactionFeeUnitEnum2, PostByronTransactionUnitEnum7 } from '../enums';

@InputType()
export class PostByronWalletsWalletIdPaymentFeesInputPayments {
  @Field()
  address!: string;

  @Field(() => PostByronWalletsWalletIdPaymentFeesInputPaymentsAmount, { description: 'Coins, in Lovelace' })
  amount!: PostByronWalletsWalletIdPaymentFeesInputPaymentsAmount;
}

@InputType()
export class PostByronWalletsWalletIdPaymentFeesInputPaymentsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronTransactionFeeUnitEnum2)
  unit!: PostByronTransactionFeeUnitEnum2;
}

@InputType()
export class PostByronWalletsWalletIdTransactionsInputPayments {
  @Field()
  address!: string;

  @Field(() => PostByronWalletsWalletIdTransactionsInputPaymentsAmount, { description: 'Coins, in Lovelace' })
  amount!: PostByronWalletsWalletIdTransactionsInputPaymentsAmount;
}

@InputType()
export class PostByronWalletsWalletIdTransactionsInputPaymentsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronTransactionUnitEnum7)
  unit!: PostByronTransactionUnitEnum7;
}

@InputType()
export class PostByronWalletsWalletIdPaymentFeesInput {
  @Field(() => [PostByronWalletsWalletIdPaymentFeesInputPayments], { description: 'A list of target outputs' })
  payments!: PostByronWalletsWalletIdPaymentFeesInputPayments[];
}

@InputType()
export class PostByronWalletsWalletIdTransactionsInput {
  @Field(() => [PostByronWalletsWalletIdTransactionsInputPayments], { description: 'A list of target outputs' })
  payments!: PostByronWalletsWalletIdTransactionsInputPayments[];

  @Field({ description: 'The wallet\'s master passphrase.' })
  passphrase!: string;
}
