/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { GetNetworkClockResponseStatus, GetNetworkClockResponseUnit, GetNetworkInformationResponseStatus, GetNetworkInformationResponseUnit, GetNetworkParametersResponseUnit } from '../enums';

@ObjectType()
export class GetNetworkInformationResponse {
  @Field({ description: 'Estimated synchronization progress of the node with the underlying network. Note that this may\nchange quite arbitrarily as the node may switch to shorter or longer chain forks.\n' })
  sync_progress!: string;

  @Field({ description: 'Underlying node\'s tip' })
  node_tip!: string;

  @Field({ description: 'The time slot corresponding the network tip.' })
  network_tip?: string;

  @Field()
  next_epoch?: string;
}

@ObjectType()
export class GetNetworkClockResponse {
  @Field(() => GetNetworkClockResponseStatus)
  status!: GetNetworkClockResponseStatus;

  @Field({ description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == available\n</span><br/>\nDrift offset of the local clock.\n' })
  offset?: string;
}

@ObjectType()
export class GetNetworkParametersResponse {
  @Field({ description: 'The hash of genesis block' })
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

  @Field({ description: 'Coins, in Lovelace' })
  minimum_utxo_value!: string;

  @Field()
  hardfork_at?: string;
}
