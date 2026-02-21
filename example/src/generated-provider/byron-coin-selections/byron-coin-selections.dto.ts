/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class PostByronWalletsWalletIdCoinSelectionsRandomInput {
  @Field(() => [String])
  payments!: string[];
}
