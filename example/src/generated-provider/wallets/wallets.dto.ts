/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class PostWalletsInput {
  @Field()
  name!: string;

  @Field(() => [String])
  mnemonic_sentence?: string[];

  @Field(() => [String])
  mnemonic_second_factor?: string[];

  @Field()
  passphrase?: string;

  @Field(() => Float)
  address_pool_gap?: number;

  @Field()
  account_public_key?: string;
}

@InputType()
export class PutWalletsWalletIdInput {
  @Field()
  name?: string;
}

@InputType()
export class PutWalletsWalletIdPassphraseInput {
  @Field()
  old_passphrase!: string;

  @Field()
  new_passphrase!: string;
}
