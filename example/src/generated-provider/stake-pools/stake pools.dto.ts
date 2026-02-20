/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';
import { PostStakePoolsMaintenanceActionsInputMaintenanceAction } from '../enums';

@InputType()
export class PostStake-poolsMaintenance-actionsInput {
  @Field(() => PostStakePoolsMaintenanceActionsInputMaintenanceAction)
  maintenance_action!: PostStakePoolsMaintenanceActionsInputMaintenanceAction;
}

@InputType()
export class DeleteStake-pools*WalletsWalletIdInput {
  @Field()
  passphrase!: string;
}

@InputType()
export class PutStake-poolsStakePoolIdWalletsWalletIdInput {
  @Field()
  passphrase!: string;
}
