/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NetworkService } from './network.service';
import { GetNetworkInformationResponse, GetNetworkClockResponse, GetNetworkParametersResponse } from './network.models';

@Resolver()
export class NetworkResolver {
  constructor(private readonly networkService: NetworkService) {
  }

  @Query(() => GetNetworkInformationResponse)
  async getNetworkInformation(): Promise<any> {
        return this.networkService.getNetworkInformation();
  }

  @Query(() => GetNetworkClockResponse)
  async getNetworkClock(@Args('forceNtpCheck', { nullable: true }) forceNtpCheck?: boolean | null): Promise<any> {
        return this.networkService.getNetworkClock(forceNtpCheck);
  }

  @Query(() => GetNetworkParametersResponse)
  async getNetworkParameters(): Promise<any> {
        return this.networkService.getNetworkParameters();
  }
}
