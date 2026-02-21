/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class PostByronWalletsWalletIdAddressesInput {
  @Field()
  passphrase!: string;

  @Field(() => Float)
  address_index?: number;
}

@InputType()
export class PutByronWalletsWalletIdAddressesInput {
  @Field(() => [String])
  addresses!: string[];
}
