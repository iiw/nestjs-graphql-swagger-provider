/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { TransactionsService } from './transactions.service';
import { PostWalletsWalletIdPaymentFeesInput, PostWalletsWalletIdTransactionsInput } from './transactions.dto';
import { ListTransactionsOrder } from '../enums';
import { GetWalletsWalletIdTransactionsResponse, GetWalletsWalletIdTransactionsTransactionIdResponse } from './transactions.models';

@Resolver()
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {
  }

  @Mutation(() => Boolean)
  async postTransactionFee(@Args('walletId') walletId: string, @Args('input') input: PostWalletsWalletIdPaymentFeesInput): Promise<any> {
        return this.transactionsService.postTransactionFee(walletId, input);
  }

  @Query(() => GetWalletsWalletIdTransactionsResponse)
  async listTransactions(@Args('walletId') walletId: string, @Args('start', { nullable: true }) start?: string | null, @Args('end', { nullable: true }) end?: string | null, @Args('order', { type: () => ListTransactionsOrder, nullable: true }) order?: ListTransactionsOrder | null, @Args('minWithdrawal', { nullable: true }) minWithdrawal?: number | null): Promise<any> {
        return this.transactionsService.listTransactions(walletId, start, end, order, minWithdrawal);
  }

  @Mutation(() => Boolean)
  async postTransaction(@Args('walletId') walletId: string, @Args('input') input: PostWalletsWalletIdTransactionsInput): Promise<any> {
        return this.transactionsService.postTransaction(walletId, input);
  }

  @Query(() => GetWalletsWalletIdTransactionsTransactionIdResponse)
  async getTransaction(@Args('walletId') walletId: string, @Args('transactionId') transactionId: string): Promise<any> {
        return this.transactionsService.getTransaction(walletId, transactionId);
  }

  @Mutation(() => Boolean)
  async deleteTransaction(@Args('walletId') walletId: string, @Args('transactionId') transactionId: string): Promise<any> {
        return this.transactionsService.deleteTransaction(walletId, transactionId);
  }
}
