/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { PostByronWalletsWalletIdCoinSelectionsRandomResponseCertificateType, PostByronWalletsWalletIdCoinSelectionsRandomResponseUnit } from '../enums';

@ObjectType()
export class PostByronWalletsWalletIdCoinSelectionsRandomResponseInputs {
  @Field()
  address!: string;

  @Field(() => PostByronWalletsWalletIdCoinSelectionsRandomResponseInputsAmount, { description: 'Coins, in Lovelace' })
  amount!: PostByronWalletsWalletIdCoinSelectionsRandomResponseInputsAmount;

  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;

  @Field(() => [String], { description: 'A path for deriving a child key from a parent key.' })
  derivation_path!: string[];

  @Field(() => Float)
  index!: number;
}

@ObjectType()
export class PostByronWalletsWalletIdCoinSelectionsRandomResponseInputsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronWalletsWalletIdCoinSelectionsRandomResponseUnit)
  unit!: PostByronWalletsWalletIdCoinSelectionsRandomResponseUnit;
}

@ObjectType()
export class PostByronWalletsWalletIdCoinSelectionsRandomResponseOutputs {
  @Field()
  address!: string;

  @Field(() => PostByronWalletsWalletIdCoinSelectionsRandomResponseOutputsAmount, { description: 'Coins, in Lovelace' })
  amount!: PostByronWalletsWalletIdCoinSelectionsRandomResponseOutputsAmount;
}

@ObjectType()
export class PostByronWalletsWalletIdCoinSelectionsRandomResponseOutputsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronWalletsWalletIdCoinSelectionsRandomResponseUnit)
  unit!: PostByronWalletsWalletIdCoinSelectionsRandomResponseUnit;
}

@ObjectType()
export class PostByronWalletsWalletIdCoinSelectionsRandomResponseChange {
  @Field()
  address!: string;

  @Field(() => PostByronWalletsWalletIdCoinSelectionsRandomResponseChangeAmount, { description: 'Coins, in Lovelace' })
  amount!: PostByronWalletsWalletIdCoinSelectionsRandomResponseChangeAmount;

  @Field(() => [String], { description: 'A path for deriving a child key from a parent key.' })
  derivation_path!: string[];
}

@ObjectType()
export class PostByronWalletsWalletIdCoinSelectionsRandomResponseChangeAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronWalletsWalletIdCoinSelectionsRandomResponseUnit)
  unit!: PostByronWalletsWalletIdCoinSelectionsRandomResponseUnit;
}

@ObjectType()
export class PostByronWalletsWalletIdCoinSelectionsRandomResponseCertificates {
  @Field(() => PostByronWalletsWalletIdCoinSelectionsRandomResponseCertificateType)
  certificate_type!: PostByronWalletsWalletIdCoinSelectionsRandomResponseCertificateType;

  @Field({ description: 'A unique identifier for the pool.' })
  pool?: string;

  @Field(() => [String])
  reward_account_path!: string[];
}

@ObjectType()
export class PostByronWalletsWalletIdCoinSelectionsRandomResponse {
  @Field(() => [PostByronWalletsWalletIdCoinSelectionsRandomResponseInputs], { description: 'A list of transaction inputs' })
  inputs!: PostByronWalletsWalletIdCoinSelectionsRandomResponseInputs[];

  @Field(() => [PostByronWalletsWalletIdCoinSelectionsRandomResponseOutputs], { description: 'A list of target outputs' })
  outputs!: PostByronWalletsWalletIdCoinSelectionsRandomResponseOutputs[];

  @Field(() => [PostByronWalletsWalletIdCoinSelectionsRandomResponseChange], { description: 'A list of transaction change outputs.' })
  change!: PostByronWalletsWalletIdCoinSelectionsRandomResponseChange[];

  @Field(() => [PostByronWalletsWalletIdCoinSelectionsRandomResponseCertificates])
  certificates?: PostByronWalletsWalletIdCoinSelectionsRandomResponseCertificates[];
}
