/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';
import { PostWalletsWalletIdCoinSelectionsRandomInputAction } from '../enums';

@InputType()
export class PostWalletsWalletIdCoinSelectionsRandomInput {
  @Field(() => [String])
  payments?: string[];

  @Field()
  delegation_action?: string;
}
