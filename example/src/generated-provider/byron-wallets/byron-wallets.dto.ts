/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';
import { PostByronWalletsInputStyle } from '../enums';

@InputType()
export class PostByronWalletsInput {
  @Field(() => PostByronWalletsInputStyle)
  style?: PostByronWalletsInputStyle;

  @Field()
  name!: string;

  @Field({ description: 'A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds)' })
  passphrase?: string;

  @Field(() => [String], { description: 'A list of mnemonic words' })
  mnemonic_sentence?: string[];

  @Field({ description: 'An extended account public key (public key + chain code)' })
  account_public_key?: string;

  @Field(() => Float, { description: 'Number of consecutive unused addresses allowed.\n\n**IMPORTANT DISCLAIMER:** Using values other than `20` automatically makes your wallet invalid with regards to BIP-44 address discovery. It means that you **will not** be able to fully restore\nyour wallet in a different software which is strictly following BIP-44.\n\nBeside, using large gaps is **not recommended** as it may induce important performance degradations. Use at your own risks.\n' })
  address_pool_gap?: number;

  @Field({ description: 'A root private key, encrypted using a given passphrase. The underlying key should contain:\n- A private key\n- A chain code\n- A public key\n', deprecationReason: 'Deprecated' })
  encrypted_root_private_key?: string;

  @Field({ description: 'A hash of master passphrase. The hash should be an output of a Scrypt function with the following parameters:\n- logN = 14\n- r = 8\n- p = 1\n', deprecationReason: 'Deprecated' })
  passphrase_hash?: string;
}

@InputType()
export class PutByronWalletsWalletIdInput {
  @Field()
  name?: string;
}

@InputType()
export class PutByronWalletsWalletIdPassphraseInput {
  @Field({ description: 'The current passphrase if present.' })
  old_passphrase?: string;

  @Field({ description: 'A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds).' })
  new_passphrase!: string;
}
