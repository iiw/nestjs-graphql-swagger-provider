/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { NetworkService } from './network.service';
import { GetNetworkInformationResponse, GetNetworkClockResponse, GetNetworkParametersResponse } from './network.models';

@Resolver()
export class NetworkResolver {
  constructor(private readonly networkService: NetworkService) {
  }

  @Query(() => GetNetworkInformationResponse, { description: 'Information' })
  async getNetworkInformation(): Promise<any> {
        return this.networkService.getNetworkInformation();
  }

  @Query(() => GetNetworkClockResponse, { description: 'Clock' })
  async getNetworkClock(@Args('forceNtpCheck', { nullable: true, description: 'NTP checks are cached for short duration to avoid sending too many queries to the central NTP servers. In some cases however, a client may want to force a new check.\n\nWhen this flag is set, the request **will block** until NTP server responds or will timeout after a while without any answer from the NTP server.\n' }) forceNtpCheck?: boolean | null): Promise<any> {
        return this.networkService.getNetworkClock(forceNtpCheck);
  }

  @Query(() => GetNetworkParametersResponse, { description: 'Parameters' })
  async getNetworkParameters(): Promise<any> {
        return this.networkService.getNetworkParameters();
  }
}
