/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class PostWalletsInput {
  @Field()
  name!: string;

  @Field(() => [String], { description: 'A list of mnemonic words' })
  mnemonic_sentence?: string[];

  @Field(() => [String], { description: 'An optional passphrase used to encrypt the mnemonic sentence.' })
  mnemonic_second_factor?: string[];

  @Field({ description: 'A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds)' })
  passphrase?: string;

  @Field(() => Float, { description: 'Number of consecutive unused addresses allowed.\n\n**IMPORTANT DISCLAIMER:** Using values other than `20` automatically makes your wallet invalid with regards to BIP-44 address discovery. It means that you **will not** be able to fully restore\nyour wallet in a different software which is strictly following BIP-44.\n\nBeside, using large gaps is **not recommended** as it may induce important performance degradations. Use at your own risks.\n' })
  address_pool_gap?: number;

  @Field({ description: 'An extended account public key (public key + chain code)' })
  account_public_key?: string;
}

@InputType()
export class PutWalletsWalletIdInput {
  @Field()
  name?: string;
}

@InputType()
export class PutWalletsWalletIdPassphraseInput {
  @Field({ description: 'The current passphrase.' })
  old_passphrase!: string;

  @Field({ description: 'A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds).' })
  new_passphrase!: string;
}
