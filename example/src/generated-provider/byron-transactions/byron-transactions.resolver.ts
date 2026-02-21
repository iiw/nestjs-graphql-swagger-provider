/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ByronTransactionsService } from './byron-transactions.service';
import { PostByronWalletsWalletIdPaymentFeesInput, PostByronWalletsWalletIdTransactionsInput } from './byron-transactions.dto';
import { ListByronTransactionsOrder } from '../enums';
import { PostByronWalletsWalletIdPaymentFeesResponse, GetByronWalletsWalletIdTransactionsResponse, PostByronWalletsWalletIdTransactionsResponse, GetByronWalletsWalletIdTransactionsTransactionIdResponse } from './byron-transactions.models';

@Resolver()
export class ByronTransactionsResolver {
  constructor(private readonly byronTransactionsService: ByronTransactionsService) {
  }

  @Mutation(() => PostByronWalletsWalletIdPaymentFeesResponse, { description: 'Estimate Fee' })
  async postByronTransactionFee(@Args('walletId') walletId: string, @Args('input') input: PostByronWalletsWalletIdPaymentFeesInput): Promise<any> {
        return this.byronTransactionsService.postByronTransactionFee(walletId, input);
  }

  @Query(() => GetByronWalletsWalletIdTransactionsResponse, { description: 'List' })
  async listByronTransactions(@Args('walletId') walletId: string, @Args('start', { nullable: true, description: 'An optional start time in ISO 8601 date-and-time format. Basic and\nextended formats are both accepted. Times can be local (with a\ntimezone offset) or UTC.\n\nIf both a start time and an end time are specified, then the start\ntime must not be later than the end time.\n\nExample: `2008-08-08T08:08:08Z`\n' }) start?: string | null, @Args('end', { nullable: true, description: 'An optional end time in ISO 8601 date-and-time format. Basic and\nextended formats are both accepted. Times can be local (with a\ntimezone offset) or UTC.\n\nIf both a start time and an end time are specified, then the start\ntime must not be later than the end time.\n\nExample: `2008-08-08T08:08:08Z`\n' }) end?: string | null, @Args('order', { type: () => ListByronTransactionsOrder, nullable: true, description: 'An optional sort order.' }) order?: ListByronTransactionsOrder | null): Promise<any> {
        return this.byronTransactionsService.listByronTransactions(walletId, start, end, order);
  }

  @Mutation(() => PostByronWalletsWalletIdTransactionsResponse, { description: 'Create' })
  async postByronTransaction(@Args('walletId') walletId: string, @Args('input') input: PostByronWalletsWalletIdTransactionsInput): Promise<any> {
        return this.byronTransactionsService.postByronTransaction(walletId, input);
  }

  @Query(() => GetByronWalletsWalletIdTransactionsTransactionIdResponse, { description: 'Get' })
  async getByronTransaction(@Args('walletId') walletId: string, @Args('transactionId') transactionId: string): Promise<any> {
        return this.byronTransactionsService.getByronTransaction(walletId, transactionId);
  }

  @Mutation(() => Boolean, { description: 'Forget' })
  async deleteByronTransaction(@Args('walletId') walletId: string, @Args('transactionId') transactionId: string): Promise<any> {
        return this.byronTransactionsService.deleteByronTransaction(walletId, transactionId);
  }
}
