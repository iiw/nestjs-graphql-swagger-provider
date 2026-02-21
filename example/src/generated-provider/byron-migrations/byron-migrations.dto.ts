/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class PostByronWalletsWalletIdMigrationsInput {
  @Field()
  passphrase!: string;

  @Field(() => [String])
  addresses!: string[];
}
