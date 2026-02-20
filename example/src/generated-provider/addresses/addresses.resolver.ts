/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AddressesService } from './addresses.service';
import { PostAddressesInput } from './addresses.dto';
import { ListAddressesState } from '../enums';
import { GetWalletsWalletIdAddressesResponse, GetAddressesAddressIdResponse } from './addresses.models';

@Resolver()
export class AddressesResolver {
  constructor(private readonly addressesService: AddressesService) {
  }

  @Query(() => GetWalletsWalletIdAddressesResponse)
  async listAddresses(@Args('walletId') walletId: string, @Args('state', { type: () => ListAddressesState, nullable: true }) state?: ListAddressesState | null): Promise<any> {
        return this.addressesService.listAddresses(walletId, state);
  }

  @Query(() => GetAddressesAddressIdResponse)
  async inspectAddress(@Args('addressId') addressId: string): Promise<any> {
        return this.addressesService.inspectAddress(addressId);
  }

  @Mutation(() => Boolean)
  async postAnyAddress(@Args('input') input: PostAddressesInput): Promise<any> {
        return this.addressesService.postAnyAddress(input);
  }
}
