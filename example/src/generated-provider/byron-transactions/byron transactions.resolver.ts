/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ByronTransactionsService } from './byron transactions.service';
import { PostByron-walletsWalletIdPayment-feesInput, PostByron-walletsWalletIdTransactionsInput
import { ListByronTransactionsOrder } from '../enums';
import { GetByron-walletsWalletIdTransactionsResponse, GetByron-walletsWalletIdTransactionsTransactionIdResponse } from './byron transactions.models';

 } from './byron transactions.dto';

@Resolver()
export class ByronTransactionsResolver {
  constructor(private readonly byronTransactionsService: ByronTransactionsService) {
  }

  @Mutation(() => Boolean)
  async postByronTransactionFee(@Args('walletId') walletId: string, @Args('input') input: PostByron-walletsWalletIdPayment-feesInput): Promise<any> {
        return this.byronTransactionsService.postByronTransactionFee(walletId, input);
  }

  @Query(() => GetByron-walletsWalletIdTransactionsResponse)
  async listByronTransactions(@Args('walletId') walletId: string, @Args('start', { nullable: true }) start?: string | null, @Args('end', { nullable: true }) end?: string | null, @Args('order', { type: () => ListByronTransactionsOrder, nullable: true }) order?: ListByronTransactionsOrder | null): Promise<any> {
        return this.byronTransactionsService.listByronTransactions(walletId, start, end, order);
  }

  @Mutation(() => Boolean)
  async postByronTransaction(@Args('walletId') walletId: string, @Args('input') input: PostByron-walletsWalletIdTransactionsInput): Promise<any> {
        return this.byronTransactionsService.postByronTransaction(walletId, input);
  }

  @Query(() => GetByron-walletsWalletIdTransactionsTransactionIdResponse)
  async getByronTransaction(@Args('walletId') walletId: string, @Args('transactionId') transactionId: string): Promise<any> {
        return this.byronTransactionsService.getByronTransaction(walletId, transactionId);
  }

  @Mutation(() => Boolean)
  async deleteByronTransaction(@Args('walletId') walletId: string, @Args('transactionId') transactionId: string): Promise<any> {
        return this.byronTransactionsService.deleteByronTransaction(walletId, transactionId);
  }
}
