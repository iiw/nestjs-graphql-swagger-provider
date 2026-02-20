/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { GetAddressesAddressIdResponseAddressStyle, GetAddressesAddressIdResponseStakeReference, GetWalletsWalletIdAddressesResponseState } from '../enums';

@ObjectType()
export class GetWalletsWalletIdAddressesResponse {
  @Field()
  id!: string;

  @Field(() => GetWalletsWalletIdAddressesResponseState)
  state!: GetWalletsWalletIdAddressesResponseState;
}

@ObjectType()
export class GetAddressesAddressIdResponse {
  @Field(() => GetAddressesAddressIdResponseAddressStyle)
  address_style!: GetAddressesAddressIdResponseAddressStyle;

  @Field(() => GetAddressesAddressIdResponseStakeReference)
  stake_reference!: GetAddressesAddressIdResponseStakeReference;

  @Field(() => Float)
  network_tag?: number;

  @Field()
  spending_key_hash?: string;

  @Field()
  stake_key_hash?: string;

  @Field()
  script_hash?: string;

  @Field()
  pointer?: string;

  @Field()
  address_root?: string;

  @Field()
  derivation_path?: string;
}
