/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ByronAddressesService } from './byron-addresses.service';
import { PostByronWalletsWalletIdAddressesInput, PutByronWalletsWalletIdAddressesInput } from './byron-addresses.dto';
import { StateEnum1 } from '../enums';
import { GetByronWalletsWalletIdAddressesResponse, PostByronWalletsWalletIdAddressesResponse } from './byron-addresses.models';

@Resolver()
export class ByronAddressesResolver {
  constructor(private readonly byronAddressesService: ByronAddressesService) {
  }

  @Query(() => GetByronWalletsWalletIdAddressesResponse, { description: 'List' })
  async listByronAddresses(@Args('walletId') walletId: string, @Args('state', { type: () => StateEnum1, nullable: true, description: 'An optional filter on the address state.' }) state?: StateEnum1 | null): Promise<any> {
        return this.byronAddressesService.listByronAddresses(walletId, state);
  }

  @Mutation(() => PostByronWalletsWalletIdAddressesResponse, { description: 'Create Address' })
  async createAddress(@Args('walletId') walletId: string, @Args('input') input: PostByronWalletsWalletIdAddressesInput): Promise<any> {
        return this.byronAddressesService.createAddress(walletId, input);
  }

  @Mutation(() => Boolean, { description: 'Import Addresses' })
  async importAddresses(@Args('walletId') walletId: string, @Args('input') input: PutByronWalletsWalletIdAddressesInput): Promise<any> {
        return this.byronAddressesService.importAddresses(walletId, input);
  }

  @Mutation(() => Boolean, { description: 'Import Address' })
  async importAddress(@Args('walletId') walletId: string, @Args('addressId') addressId: string): Promise<any> {
        return this.byronAddressesService.importAddress(walletId, addressId);
  }
}
