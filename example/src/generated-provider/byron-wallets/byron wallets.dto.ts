/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class PostByron-walletsInput {
}

@InputType()
export class PutByron-walletsWalletIdInput {
  @Field()
  name?: string;
}

@InputType()
export class PutByron-walletsWalletIdPassphraseInput {
  @Field()
  old_passphrase?: string;

  @Field()
  new_passphrase!: string;
}
