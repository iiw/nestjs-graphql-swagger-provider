/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { GetNetworkClockResponseStatus, GetNetworkClockResponseUnit, GetNetworkInformationResponseStatus, GetNetworkInformationResponseUnit, GetNetworkParametersResponseUnit } from '../enums';

@ObjectType()
export class GetNetworkInformationResponseSyncProgress {
  @Field(() => GetNetworkInformationResponseStatus)
  status!: GetNetworkInformationResponseStatus;

  @Field(() => GetNetworkInformationResponseSyncProgressProgress, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == syncing\n</span><br/>\n' })
  progress?: GetNetworkInformationResponseSyncProgressProgress;
}

@ObjectType()
export class GetNetworkInformationResponseSyncProgressProgress {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetNetworkInformationResponseUnit)
  unit!: GetNetworkInformationResponseUnit;
}

@ObjectType()
export class GetNetworkInformationResponseNodeTip {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => GetNetworkInformationResponseNodeTipHeight)
  height!: GetNetworkInformationResponseNodeTipHeight;
}

@ObjectType()
export class GetNetworkInformationResponseNodeTipHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetNetworkInformationResponseUnit)
  unit!: GetNetworkInformationResponseUnit;
}

@ObjectType()
export class GetNetworkInformationResponseNetworkTip {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field()
  time!: string;
}

@ObjectType()
export class GetNetworkInformationResponseNextEpoch {
  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  epoch_start_time!: string;
}

@ObjectType()
export class GetNetworkClockResponseOffset {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetNetworkClockResponseUnit)
  unit!: GetNetworkClockResponseUnit;
}

@ObjectType()
export class GetNetworkParametersResponseSlotLength {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetNetworkParametersResponseUnit)
  unit!: GetNetworkParametersResponseUnit;
}

@ObjectType()
export class GetNetworkParametersResponseEpochLength {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetNetworkParametersResponseUnit)
  unit!: GetNetworkParametersResponseUnit;
}

@ObjectType()
export class GetNetworkParametersResponseEpochStability {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetNetworkParametersResponseUnit)
  unit!: GetNetworkParametersResponseUnit;
}

@ObjectType()
export class GetNetworkParametersResponseActiveSlotCoefficient {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetNetworkParametersResponseUnit)
  unit!: GetNetworkParametersResponseUnit;
}

@ObjectType()
export class GetNetworkParametersResponseDecentralizationLevel {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetNetworkParametersResponseUnit)
  unit!: GetNetworkParametersResponseUnit;
}

@ObjectType()
export class GetNetworkParametersResponseMinimumUtxoValue {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetNetworkParametersResponseUnit)
  unit!: GetNetworkParametersResponseUnit;
}

@ObjectType()
export class GetNetworkParametersResponseHardforkAt {
  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  epoch_start_time!: string;
}

@ObjectType()
export class GetNetworkInformationResponse {
  @Field(() => GetNetworkInformationResponseSyncProgress, { description: 'Estimated synchronization progress of the node with the underlying network. Note that this may\nchange quite arbitrarily as the node may switch to shorter or longer chain forks.\n' })
  sync_progress!: GetNetworkInformationResponseSyncProgress;

  @Field(() => GetNetworkInformationResponseNodeTip, { description: 'Underlying node\'s tip' })
  node_tip!: GetNetworkInformationResponseNodeTip;

  @Field(() => GetNetworkInformationResponseNetworkTip, { description: 'The time slot corresponding the network tip.' })
  network_tip?: GetNetworkInformationResponseNetworkTip;

  @Field(() => GetNetworkInformationResponseNextEpoch)
  next_epoch?: GetNetworkInformationResponseNextEpoch;
}

@ObjectType()
export class GetNetworkClockResponse {
  @Field(() => GetNetworkClockResponseStatus)
  status!: GetNetworkClockResponseStatus;

  @Field(() => GetNetworkClockResponseOffset, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == available\n</span><br/>\nDrift offset of the local clock.\n' })
  offset?: GetNetworkClockResponseOffset;
}

@ObjectType()
export class GetNetworkParametersResponse {
  @Field({ description: 'The hash of genesis block' })
  genesis_block_hash!: string;

  @Field()
  blockchain_start_time!: string;

  @Field(() => GetNetworkParametersResponseSlotLength)
  slot_length!: GetNetworkParametersResponseSlotLength;

  @Field(() => GetNetworkParametersResponseEpochLength)
  epoch_length!: GetNetworkParametersResponseEpochLength;

  @Field(() => GetNetworkParametersResponseEpochStability)
  epoch_stability!: GetNetworkParametersResponseEpochStability;

  @Field(() => GetNetworkParametersResponseActiveSlotCoefficient)
  active_slot_coefficient!: GetNetworkParametersResponseActiveSlotCoefficient;

  @Field(() => GetNetworkParametersResponseDecentralizationLevel)
  decentralization_level!: GetNetworkParametersResponseDecentralizationLevel;

  @Field(() => Float)
  desired_pool_number!: number;

  @Field(() => GetNetworkParametersResponseMinimumUtxoValue, { description: 'Coins, in Lovelace' })
  minimum_utxo_value!: GetNetworkParametersResponseMinimumUtxoValue;

  @Field(() => GetNetworkParametersResponseHardforkAt)
  hardfork_at?: GetNetworkParametersResponseHardforkAt;
}
