/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class PostByron-walletsWalletIdMigrationsInput {
  @Field()
  passphrase!: string;

  @Field(() => [String])
  addresses!: string[];
}
