/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';
import { PostStakePoolsMaintenanceActionsInputMaintenanceAction } from '../enums';

@InputType()
export class PostStakePoolsMaintenanceActionsInput {
  @Field(() => PostStakePoolsMaintenanceActionsInputMaintenanceAction)
  maintenance_action!: PostStakePoolsMaintenanceActionsInputMaintenanceAction;
}

@InputType()
export class DeleteStakePoolsWalletsWalletIdInput {
  @Field({ description: 'The source Byron wallet\'s master passphrase.' })
  passphrase!: string;
}

@InputType()
export class PutStakePoolsStakePoolIdWalletsWalletIdInput {
  @Field({ description: 'The source Byron wallet\'s master passphrase.' })
  passphrase!: string;
}
