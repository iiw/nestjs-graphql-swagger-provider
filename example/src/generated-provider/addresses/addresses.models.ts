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

  @Field(() => Float, { description: 'Can be null for \'Icarus\' and \'Byron\' styles.' })
  network_tag?: number;

  @Field()
  spending_key_hash?: string;

  @Field()
  stake_key_hash?: string;

  @Field()
  script_hash?: string;

  @Field()
  pointer?: string;

  @Field({ description: 'Only for \'Icarus\' and \'Byron\' styles.' })
  address_root?: string;

  @Field({ description: 'Only for \'Byron\' style.' })
  derivation_path?: string;
}

@ObjectType()
export class PostAddressesResponse {
  @Field({ description: 'A Shelley address representing either enterprise, reward account or delegating address' })
  address!: string;
}
