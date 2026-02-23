/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';
import { PostByronWalletsWalletIdCoinSelectionsRandomInputUnit } from '../enums';

@InputType()
export class PostByronWalletsWalletIdCoinSelectionsRandomInputPayments {
  @Field()
  address!: string;

  @Field(() => PostByronWalletsWalletIdCoinSelectionsRandomInputPaymentsAmount, { description: 'Coins, in Lovelace' })
  amount!: PostByronWalletsWalletIdCoinSelectionsRandomInputPaymentsAmount;
}

@InputType()
export class PostByronWalletsWalletIdCoinSelectionsRandomInputPaymentsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronWalletsWalletIdCoinSelectionsRandomInputUnit)
  unit!: PostByronWalletsWalletIdCoinSelectionsRandomInputUnit;
}

@InputType()
export class PostByronWalletsWalletIdCoinSelectionsRandomInput {
  @Field(() => [PostByronWalletsWalletIdCoinSelectionsRandomInputPayments], { description: 'A list of target outputs' })
  payments!: PostByronWalletsWalletIdCoinSelectionsRandomInputPayments[];
}
