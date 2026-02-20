/* eslint-disable */
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ExperimentalService } from './experimental.service';
import { PostWalletsWalletIdSignaturesRoleIndexInput } from './experimental.dto';
import { SignMetadataRole } from '../enums';

@Resolver()
export class ExperimentalResolver {
  constructor(private readonly experimentalService: ExperimentalService) {
  }

  @Mutation(() => Boolean)
  async signMetadata(@Args('walletId') walletId: string, @Args('role', { type: () => SignMetadataRole, nullable: true }) role?: SignMetadataRole | null, @Args('index', { nullable: true }) index?: string | null, @Args('input') input: PostWalletsWalletIdSignaturesRoleIndexInput): Promise<any> {
        return this.experimentalService.signMetadata(walletId, role, index, input);
  }
}
