/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { PostWalletsWalletIdCoinSelectionsRandomResponseCertificateType, PostWalletsWalletIdCoinSelectionsRandomResponseUnit } from '../enums';

@ObjectType()
export class PostWalletsWalletIdCoinSelectionsRandomResponseInputs {
  @Field()
  address!: string;

  @Field(() => PostWalletsWalletIdCoinSelectionsRandomResponseInputsAmount, { description: 'Coins, in Lovelace' })
  amount!: PostWalletsWalletIdCoinSelectionsRandomResponseInputsAmount;

  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;

  @Field(() => [String], { description: 'A path for deriving a child key from a parent key.' })
  derivation_path!: string[];

  @Field(() => Float)
  index!: number;
}

@ObjectType()
export class PostWalletsWalletIdCoinSelectionsRandomResponseInputsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsWalletIdCoinSelectionsRandomResponseUnit)
  unit!: PostWalletsWalletIdCoinSelectionsRandomResponseUnit;
}

@ObjectType()
export class PostWalletsWalletIdCoinSelectionsRandomResponseOutputs {
  @Field()
  address!: string;

  @Field(() => PostWalletsWalletIdCoinSelectionsRandomResponseOutputsAmount, { description: 'Coins, in Lovelace' })
  amount!: PostWalletsWalletIdCoinSelectionsRandomResponseOutputsAmount;
}

@ObjectType()
export class PostWalletsWalletIdCoinSelectionsRandomResponseOutputsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsWalletIdCoinSelectionsRandomResponseUnit)
  unit!: PostWalletsWalletIdCoinSelectionsRandomResponseUnit;
}

@ObjectType()
export class PostWalletsWalletIdCoinSelectionsRandomResponseChange {
  @Field()
  address!: string;

  @Field(() => PostWalletsWalletIdCoinSelectionsRandomResponseChangeAmount, { description: 'Coins, in Lovelace' })
  amount!: PostWalletsWalletIdCoinSelectionsRandomResponseChangeAmount;

  @Field(() => [String], { description: 'A path for deriving a child key from a parent key.' })
  derivation_path!: string[];
}

@ObjectType()
export class PostWalletsWalletIdCoinSelectionsRandomResponseChangeAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsWalletIdCoinSelectionsRandomResponseUnit)
  unit!: PostWalletsWalletIdCoinSelectionsRandomResponseUnit;
}

@ObjectType()
export class PostWalletsWalletIdCoinSelectionsRandomResponseCertificates {
  @Field(() => PostWalletsWalletIdCoinSelectionsRandomResponseCertificateType)
  certificate_type!: PostWalletsWalletIdCoinSelectionsRandomResponseCertificateType;

  @Field({ description: 'A unique identifier for the pool.' })
  pool?: string;

  @Field(() => [String])
  reward_account_path!: string[];
}

@ObjectType()
export class PostWalletsWalletIdCoinSelectionsRandomResponse {
  @Field(() => [PostWalletsWalletIdCoinSelectionsRandomResponseInputs], { description: 'A list of transaction inputs' })
  inputs!: PostWalletsWalletIdCoinSelectionsRandomResponseInputs[];

  @Field(() => [PostWalletsWalletIdCoinSelectionsRandomResponseOutputs], { description: 'A list of target outputs' })
  outputs!: PostWalletsWalletIdCoinSelectionsRandomResponseOutputs[];

  @Field(() => [PostWalletsWalletIdCoinSelectionsRandomResponseChange], { description: 'A list of transaction change outputs.' })
  change!: PostWalletsWalletIdCoinSelectionsRandomResponseChange[];

  @Field(() => [PostWalletsWalletIdCoinSelectionsRandomResponseCertificates])
  certificates?: PostWalletsWalletIdCoinSelectionsRandomResponseCertificates[];
}
