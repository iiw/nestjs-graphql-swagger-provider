/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';
import { PostByronWalletsWalletIdCoinSelectionsRandomInputUnit } from '../enums';

@InputType()
export class PostByronWalletsWalletIdCoinSelectionsRandomInput {
  @Field(() => [String], { description: 'A list of target outputs' })
  payments!: string[];
}
