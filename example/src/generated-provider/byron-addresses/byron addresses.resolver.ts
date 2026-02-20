/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ByronAddressesService } from './byron addresses.service';
import { PostByron-walletsWalletIdAddressesInput, PutByron-walletsWalletIdAddressesInput
import { ListByronAddressesState } from '../enums';
import { GetByron-walletsWalletIdAddressesResponse, PostByron-walletsWalletIdAddressesResponse } from './byron addresses.models';

 } from './byron addresses.dto';

@Resolver()
export class ByronAddressesResolver {
  constructor(private readonly byronAddressesService: ByronAddressesService) {
  }

  @Query(() => GetByron-walletsWalletIdAddressesResponse)
  async listByronAddresses(@Args('walletId') walletId: string, @Args('state', { type: () => ListByronAddressesState, nullable: true }) state?: ListByronAddressesState | null): Promise<any> {
        return this.byronAddressesService.listByronAddresses(walletId, state);
  }

  @Mutation(() => PostByron-walletsWalletIdAddressesResponse)
  async createAddress(@Args('walletId') walletId: string, @Args('input') input: PostByron-walletsWalletIdAddressesInput): Promise<any> {
        return this.byronAddressesService.createAddress(walletId, input);
  }

  @Mutation(() => Boolean)
  async importAddresses(@Args('walletId') walletId: string, @Args('input') input: PutByron-walletsWalletIdAddressesInput): Promise<any> {
        return this.byronAddressesService.importAddresses(walletId, input);
  }

  @Mutation(() => Boolean)
  async importAddress(@Args('walletId') walletId: string, @Args('addressId') addressId: string): Promise<any> {
        return this.byronAddressesService.importAddress(walletId, addressId);
  }
}
