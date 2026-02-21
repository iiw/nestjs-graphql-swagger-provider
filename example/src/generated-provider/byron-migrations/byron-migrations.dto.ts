/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class PostByronWalletsWalletIdMigrationsInput {
  @Field({ description: 'The wallet\'s master passphrase.' })
  passphrase!: string;

  @Field(() => [String], { description: 'The recipient addresses.' })
  addresses!: string[];
}
