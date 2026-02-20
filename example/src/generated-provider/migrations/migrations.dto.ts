/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class PostWalletsWalletIdMigrationsInput {
  @Field()
  passphrase!: string;

  @Field(() => [String])
  addresses!: string[];
}
