/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';
import { PostByronWalletsInputStyle } from '../enums';

@InputType()
export class PostByronWalletsInput {
  @Field(() => PostByronWalletsInputStyle)
  style?: PostByronWalletsInputStyle;

  @Field()
  name!: string;

  @Field()
  passphrase?: string;

  @Field(() => [String])
  mnemonic_sentence?: string[];

  @Field()
  account_public_key?: string;

  @Field(() => Float)
  address_pool_gap?: number;

  @Field()
  encrypted_root_private_key?: string;

  @Field()
  passphrase_hash?: string;
}

@InputType()
export class PutByronWalletsWalletIdInput {
  @Field()
  name?: string;
}

@InputType()
export class PutByronWalletsWalletIdPassphraseInput {
  @Field()
  old_passphrase?: string;

  @Field()
  new_passphrase!: string;
}
