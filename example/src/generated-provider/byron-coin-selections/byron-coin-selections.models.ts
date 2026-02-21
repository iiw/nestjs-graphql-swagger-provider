/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { PostByronWalletsWalletIdCoinSelectionsRandomResponseCertificateType, PostByronWalletsWalletIdCoinSelectionsRandomResponseUnit } from '../enums';

@ObjectType()
export class PostByronWalletsWalletIdCoinSelectionsRandomResponse {
  @Field(() => [String], { description: 'A list of transaction inputs' })
  inputs!: string[];

  @Field(() => [String], { description: 'A list of target outputs' })
  outputs!: string[];

  @Field(() => [String], { description: 'A list of transaction change outputs.' })
  change!: string[];

  @Field(() => [String])
  certificates?: string[];
}
