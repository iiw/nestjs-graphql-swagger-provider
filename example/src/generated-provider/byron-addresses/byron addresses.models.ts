/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { GetByronWalletsWalletIdAddressesResponseState, PostByronWalletsWalletIdAddressesResponseState } from '../enums';

@ObjectType()
export class GetByron-walletsWalletIdAddressesResponse {
  @Field()
  id!: string;

  @Field(() => GetByronWalletsWalletIdAddressesResponseState)
  state!: GetByronWalletsWalletIdAddressesResponseState;
}

@ObjectType()
export class PostByron-walletsWalletIdAddressesResponse {
  @Field()
  id!: string;

  @Field(() => PostByronWalletsWalletIdAddressesResponseState)
  state!: PostByronWalletsWalletIdAddressesResponseState;
}
