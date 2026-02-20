/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class PostWalletsInput {
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
