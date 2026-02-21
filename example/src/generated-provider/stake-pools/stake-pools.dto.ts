/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';
import { PostStakePoolsMaintenanceActionsInputMaintenanceAction } from '../enums';

@InputType()
export class PostStakePoolsMaintenanceActionsInput {
  @Field(() => PostStakePoolsMaintenanceActionsInputMaintenanceAction)
  maintenance_action!: PostStakePoolsMaintenanceActionsInputMaintenanceAction;
}

@InputType()
export class DeleteStakePools*WalletsWalletIdInput {
  @Field()
  passphrase!: string;
}

@InputType()
export class PutStakePoolsStakePoolIdWalletsWalletIdInput {
  @Field()
  passphrase!: string;
}
