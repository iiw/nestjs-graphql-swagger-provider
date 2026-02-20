/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class PostByron-walletsWalletIdAddressesInput {
  @Field()
  passphrase!: string;

  @Field(() => Float)
  address_index?: number;
}

@InputType()
export class PutByron-walletsWalletIdAddressesInput {
  @Field(() => [String])
  addresses!: string[];
}
