/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TransactionsService } from './transactions.service';
import { PostWalletsWalletIdPaymentFeesInput, PostWalletsWalletIdTransactionsInput } from './transactions.dto';
import { ListTransactionsOrder } from '../enums';
import { PostWalletsWalletIdPaymentFeesResponse, GetWalletsWalletIdTransactionsResponse, PostWalletsWalletIdTransactionsResponse, GetWalletsWalletIdTransactionsTransactionIdResponse } from './transactions.models';

@Resolver()
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {
  }

  @Mutation(() => PostWalletsWalletIdPaymentFeesResponse, { description: 'Estimate Fee' })
  async postTransactionFee(@Args('walletId') walletId: string, @Args('input') input: PostWalletsWalletIdPaymentFeesInput): Promise<any> {
        return this.transactionsService.postTransactionFee(walletId, input);
  }

  @Query(() => GetWalletsWalletIdTransactionsResponse, { description: 'List' })
  async listTransactions(@Args('walletId') walletId: string, @Args('start', { nullable: true, description: 'An optional start time in ISO 8601 date-and-time format. Basic and\nextended formats are both accepted. Times can be local (with a\ntimezone offset) or UTC.\n\nIf both a start time and an end time are specified, then the start\ntime must not be later than the end time.\n\nExample: `2008-08-08T08:08:08Z`\n' }) start?: string | null, @Args('end', { nullable: true, description: 'An optional end time in ISO 8601 date-and-time format. Basic and\nextended formats are both accepted. Times can be local (with a\ntimezone offset) or UTC.\n\nIf both a start time and an end time are specified, then the start\ntime must not be later than the end time.\n\nExample: `2008-08-08T08:08:08Z`\n' }) end?: string | null, @Args('order', { type: () => ListTransactionsOrder, nullable: true, description: 'An optional sort order.' }) order?: ListTransactionsOrder | null, @Args('minWithdrawal', { nullable: true, description: 'Returns only transactions that have at least one withdrawal above the given amount.\nThis is particularly useful when set to `1` in order to list the withdrawal history of a wallet.\n' }) minWithdrawal?: number | null): Promise<any> {
        return this.transactionsService.listTransactions(walletId, start, end, order, minWithdrawal);
  }

  @Mutation(() => PostWalletsWalletIdTransactionsResponse, { description: 'Create' })
  async postTransaction(@Args('walletId') walletId: string, @Args('input') input: PostWalletsWalletIdTransactionsInput): Promise<any> {
        return this.transactionsService.postTransaction(walletId, input);
  }

  @Query(() => GetWalletsWalletIdTransactionsTransactionIdResponse, { description: 'Get' })
  async getTransaction(@Args('walletId') walletId: string, @Args('transactionId') transactionId: string): Promise<any> {
        return this.transactionsService.getTransaction(walletId, transactionId);
  }

  @Mutation(() => Boolean, { description: 'Forget' })
  async deleteTransaction(@Args('walletId') walletId: string, @Args('transactionId') transactionId: string): Promise<any> {
        return this.transactionsService.deleteTransaction(walletId, transactionId);
  }
}
