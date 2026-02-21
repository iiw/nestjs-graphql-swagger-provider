/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProxyService } from './proxy.service';
import { PostProxyTransactionsInput } from './proxy.dto';

@Resolver()
export class ProxyResolver {
  constructor(private readonly proxyService: ProxyService) {
  }

  @Mutation(() => Boolean)
  async postExternalTransaction(@Args('input') input: PostProxyTransactionsInput): Promise<any> {
        return this.proxyService.postExternalTransaction(input);
  }
}
