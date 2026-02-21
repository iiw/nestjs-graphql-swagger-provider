/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProxyService } from './proxy.service';
import { PostProxyTransactionsInput } from './proxy.dto';
import { PostProxyTransactionsResponse } from './proxy.models';

@Resolver()
export class ProxyResolver {
  constructor(private readonly proxyService: ProxyService) {
  }

  @Mutation(() => PostProxyTransactionsResponse, { description: 'Submit External Transaction' })
  async postExternalTransaction(@Args('input') input: PostProxyTransactionsInput): Promise<any> {
        return this.proxyService.postExternalTransaction(input);
  }
}
