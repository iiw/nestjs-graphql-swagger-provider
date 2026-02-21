/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class PostWalletsWalletIdCoinSelectionsRandomResponse {
  @Field(() => [String])
  inputs!: string[];

  @Field(() => [String])
  outputs!: string[];

  @Field(() => [String])
  change!: string[];

  @Field(() => [String])
  certificates?: string[];
}
