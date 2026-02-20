/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProxyService } from './proxy.service';

@Resolver()
export class ProxyResolver {
  constructor(private readonly proxyService: ProxyService) {
  }

  @Mutation(() => Boolean)
  async postExternalTransaction(): Promise<any> {
        return this.proxyService.postExternalTransaction();
  }
}
