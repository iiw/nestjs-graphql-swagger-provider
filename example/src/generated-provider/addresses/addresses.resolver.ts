/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { AddressesService } from './addresses.service';
import { PostAddressesInput } from './addresses.dto';
import { ListAddressesState } from '../enums';
import { GetWalletsWalletIdAddressesResponse, GetAddressesAddressIdResponse, PostAddressesResponse } from './addresses.models';

@Resolver()
export class AddressesResolver {
  constructor(private readonly addressesService: AddressesService) {
  }

  @Query(() => GetWalletsWalletIdAddressesResponse, { description: 'List' })
  async listAddresses(@Args('walletId') walletId: string, @Args('state', { type: () => ListAddressesState, nullable: true, description: 'An optional filter on the address state.' }) state?: ListAddressesState | null): Promise<any> {
        return this.addressesService.listAddresses(walletId, state);
  }

  @Query(() => GetAddressesAddressIdResponse, { description: 'Inspect Address' })
  async inspectAddress(@Args('addressId') addressId: string): Promise<any> {
        return this.addressesService.inspectAddress(addressId);
  }

  @Mutation(() => PostAddressesResponse, { description: 'Construct Address' })
  async postAnyAddress(@Args('input') input: PostAddressesInput): Promise<any> {
        return this.addressesService.postAnyAddress(input);
  }
}
