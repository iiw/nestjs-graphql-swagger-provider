/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { GetByronWalletsWalletIdAddressesResponseState, PostByronWalletsWalletIdAddressesResponseState } from '../enums';

@ObjectType()
export class GetByronWalletsWalletIdAddressesResponse {
  @Field()
  id!: string;

  @Field(() => GetByronWalletsWalletIdAddressesResponseState)
  state!: GetByronWalletsWalletIdAddressesResponseState;
}

@ObjectType()
export class PostByronWalletsWalletIdAddressesResponse {
  @Field()
  id!: string;

  @Field(() => PostByronWalletsWalletIdAddressesResponseState)
  state!: PostByronWalletsWalletIdAddressesResponseState;
}
