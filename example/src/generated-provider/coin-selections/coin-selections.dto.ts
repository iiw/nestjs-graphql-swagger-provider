/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';
import { PostWalletsWalletIdCoinSelectionsRandomInputAction, PostWalletsWalletIdCoinSelectionsRandomInputUnit } from '../enums';

@InputType()
export class PostWalletsWalletIdCoinSelectionsRandomInputPayments {
  @Field()
  address!: string;

  @Field(() => PostWalletsWalletIdCoinSelectionsRandomInputPaymentsAmount, { description: 'Coins, in Lovelace' })
  amount!: PostWalletsWalletIdCoinSelectionsRandomInputPaymentsAmount;
}

@InputType()
export class PostWalletsWalletIdCoinSelectionsRandomInputPaymentsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsWalletIdCoinSelectionsRandomInputUnit)
  unit!: PostWalletsWalletIdCoinSelectionsRandomInputUnit;
}

@InputType()
export class PostWalletsWalletIdCoinSelectionsRandomInputDelegationAction {
  @Field(() => PostWalletsWalletIdCoinSelectionsRandomInputAction)
  action!: PostWalletsWalletIdCoinSelectionsRandomInputAction;

  @Field({ description: 'A unique identifier for the pool.' })
  pool?: string;
}

@InputType()
export class PostWalletsWalletIdCoinSelectionsRandomInput {
  @Field(() => [PostWalletsWalletIdCoinSelectionsRandomInputPayments], { description: 'A list of target outputs' })
  payments?: PostWalletsWalletIdCoinSelectionsRandomInputPayments[];

  @Field(() => PostWalletsWalletIdCoinSelectionsRandomInputDelegationAction, { description: 'A delegation action.\n\nPool id is only required for "join".\n' })
  delegation_action?: PostWalletsWalletIdCoinSelectionsRandomInputDelegationAction;
}
