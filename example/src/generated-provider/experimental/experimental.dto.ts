/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class PostWalletsWalletIdSignaturesRoleIndexInput {
  @Field()
  passphrase!: string;

  @Field({ nullable: true })
  metadata?: string;
}
