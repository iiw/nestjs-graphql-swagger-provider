/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { GetNetworkClockResponseStatus, GetNetworkClockResponseUnit, GetNetworkInformationResponseStatus, GetNetworkInformationResponseUnit, GetNetworkParametersResponseUnit } from '../enums';

@ObjectType()
export class GetNetworkInformationResponse {
  @Field()
  sync_progress!: string;

  @Field()
  node_tip!: string;

  @Field()
  network_tip?: string;

  @Field()
  next_epoch?: string;
}

@ObjectType()
export class GetNetworkClockResponse {
  @Field(() => GetNetworkClockResponseStatus)
  status!: GetNetworkClockResponseStatus;

  @Field()
  offset?: string;
}

@ObjectType()
export class GetNetworkParametersResponse {
  @Field()
  genesis_block_hash!: string;

  @Field()
  blockchain_start_time!: string;

  @Field()
  slot_length!: string;

  @Field()
  epoch_length!: string;

  @Field()
  epoch_stability!: string;

  @Field()
  active_slot_coefficient!: string;

  @Field()
  decentralization_level!: string;

  @Field(() => Float)
  desired_pool_number!: number;

  @Field()
  minimum_utxo_value!: string;

  @Field()
  hardfork_at?: string;
}
