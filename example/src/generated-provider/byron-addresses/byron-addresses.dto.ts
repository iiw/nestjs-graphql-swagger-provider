/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class PostByronWalletsWalletIdAddressesInput {
  @Field({ description: 'A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds)' })
  passphrase!: string;

  @Field(() => Float, { description: 'An address derivation index.\n' })
  address_index?: number;
}

@InputType()
export class PutByronWalletsWalletIdAddressesInput {
  @Field(() => [String], { description: 'The imported addresses.' })
  addresses!: string[];
}
