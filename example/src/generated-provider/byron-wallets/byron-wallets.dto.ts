/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class PostByronWalletsInput {
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
