/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';
import { PostWalletsWalletIdCoinSelectionsRandomInputAction, PostWalletsWalletIdCoinSelectionsRandomInputUnit } from '../enums';

@InputType()
export class PostWalletsWalletIdCoinSelectionsRandomInput {
  @Field(() => [String], { description: 'A list of target outputs' })
  payments?: string[];

  @Field({ description: 'A delegation action.\n\nPool id is only required for "join".\n' })
  delegation_action?: string;
}
