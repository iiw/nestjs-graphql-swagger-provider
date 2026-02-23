/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { DeleteStakePoolsWalletsWalletIdResponseDirection, DeleteStakePoolsWalletsWalletIdResponseStatus, DeleteStakePoolsWalletsWalletIdResponseUnit, GetStakePoolsMaintenanceActionsResponseStatus, GetStakePoolsResponseFlags, GetStakePoolsResponseUnit, GetWalletsWalletIdDelegationFeesResponseUnit, PutStakePoolsStakePoolIdWalletsWalletIdResponseDirection, PutStakePoolsStakePoolIdWalletsWalletIdResponseStatus, PutStakePoolsStakePoolIdWalletsWalletIdResponseUnit } from '../enums';

@ObjectType()
export class GetStakePoolsResponseMetrics {
  @Field(() => GetStakePoolsResponseMetricsNonMyopicMemberRewards, { description: 'The rewards the wallet can expect to receive at the end of an epoch, in the long term, if delegating to\nthis pool.\n\nFor more details, see the\n[Design Specification for Delegation and Incentives in Cardano](https://hydra.iohk.io/job/Cardano/cardano-ledger-specs/delegationDesignSpec/latest/download-by-type/doc-pdf/delegation_design_spec)\ndocument.\n' })
  non_myopic_member_rewards!: GetStakePoolsResponseMetricsNonMyopicMemberRewards;

  @Field(() => GetStakePoolsResponseMetricsRelativeStake, { description: 'The live pool stake relative to the *total* stake.\n\nFor more details, see the section "Relative Stake: Active vs Total" in\n[Design Specification for Delegation and Incentives in Cardano](https://hydra.iohk.io/job/Cardano/cardano-ledger-specs/delegationDesignSpec/latest/download-by-type/doc-pdf/delegation_design_spec).\n' })
  relative_stake!: GetStakePoolsResponseMetricsRelativeStake;

  @Field(() => Float, { description: 'Saturation-level of the pool based on the desired number of pools aimed by the network.\nA value above `1` indicates that the pool is saturated.\n\nThe `non_myopic_member_rewards` take oversaturation into account, as specified by the [specs](https://hydra.iohk.io/job/Cardano/cardano-ledger-specs/delegationDesignSpec/latest/download-by-type/doc-pdf/delegation_design_spec).\n\nThe saturation is based on the live `relative_stake`. The saturation at the end of epoch e,\nwill affect the rewards paid out at the end of epoch e+3.\n' })
  saturation!: number;

  @Field(() => GetStakePoolsResponseMetricsProducedBlocks, { description: 'Number of blocks produced by a given stake pool in its lifetime.' })
  produced_blocks!: GetStakePoolsResponseMetricsProducedBlocks;
}

@ObjectType()
export class GetStakePoolsResponseMetricsNonMyopicMemberRewards {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetStakePoolsResponseUnit)
  unit!: GetStakePoolsResponseUnit;
}

@ObjectType()
export class GetStakePoolsResponseMetricsRelativeStake {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetStakePoolsResponseUnit)
  unit!: GetStakePoolsResponseUnit;
}

@ObjectType()
export class GetStakePoolsResponseMetricsProducedBlocks {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetStakePoolsResponseUnit)
  unit!: GetStakePoolsResponseUnit;
}

@ObjectType()
export class GetStakePoolsResponseCost {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetStakePoolsResponseUnit)
  unit!: GetStakePoolsResponseUnit;
}

@ObjectType()
export class GetStakePoolsResponseMargin {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetStakePoolsResponseUnit)
  unit!: GetStakePoolsResponseUnit;
}

@ObjectType()
export class GetStakePoolsResponsePledge {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetStakePoolsResponseUnit)
  unit!: GetStakePoolsResponseUnit;
}

@ObjectType()
export class GetStakePoolsResponseMetadata {
  @Field()
  ticker!: string;

  @Field()
  name!: string;

  @Field()
  description?: string;

  @Field()
  homepage!: string;
}

@ObjectType()
export class GetStakePoolsResponseRetirement {
  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  epoch_start_time!: string;
}

@ObjectType()
export class GetStakePoolsMaintenanceActionsResponseGcStakePools {
  @Field(() => GetStakePoolsMaintenanceActionsResponseStatus)
  status!: GetStakePoolsMaintenanceActionsResponseStatus;

  @Field()
  last_run?: string;
}

@ObjectType()
export class GetWalletsWalletIdDelegationFeesResponseEstimatedMin {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsWalletIdDelegationFeesResponseUnit)
  unit!: GetWalletsWalletIdDelegationFeesResponseUnit;
}

@ObjectType()
export class GetWalletsWalletIdDelegationFeesResponseEstimatedMax {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsWalletIdDelegationFeesResponseUnit)
  unit!: GetWalletsWalletIdDelegationFeesResponseUnit;
}

@ObjectType()
export class DeleteStakePoolsWalletsWalletIdResponseAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => DeleteStakePoolsWalletsWalletIdResponseUnit)
  unit!: DeleteStakePoolsWalletsWalletIdResponseUnit;
}

@ObjectType()
export class DeleteStakePoolsWalletsWalletIdResponseInsertedAt {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => DeleteStakePoolsWalletsWalletIdResponseInsertedAtHeight)
  height!: DeleteStakePoolsWalletsWalletIdResponseInsertedAtHeight;
}

@ObjectType()
export class DeleteStakePoolsWalletsWalletIdResponseInsertedAtHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => DeleteStakePoolsWalletsWalletIdResponseUnit)
  unit!: DeleteStakePoolsWalletsWalletIdResponseUnit;
}

@ObjectType()
export class DeleteStakePoolsWalletsWalletIdResponseExpiresAt {
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
export class DeleteStakePoolsWalletsWalletIdResponsePendingSince {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => DeleteStakePoolsWalletsWalletIdResponsePendingSinceHeight)
  height!: DeleteStakePoolsWalletsWalletIdResponsePendingSinceHeight;
}

@ObjectType()
export class DeleteStakePoolsWalletsWalletIdResponsePendingSinceHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => DeleteStakePoolsWalletsWalletIdResponseUnit)
  unit!: DeleteStakePoolsWalletsWalletIdResponseUnit;
}

@ObjectType()
export class DeleteStakePoolsWalletsWalletIdResponseDepth {
  @Field(() => Float)
  quantity!: number;

  @Field(() => DeleteStakePoolsWalletsWalletIdResponseUnit)
  unit!: DeleteStakePoolsWalletsWalletIdResponseUnit;
}

@ObjectType()
export class DeleteStakePoolsWalletsWalletIdResponseInputs {
  @Field()
  address?: string;

  @Field(() => DeleteStakePoolsWalletsWalletIdResponseInputsAmount, { description: 'Coins, in Lovelace' })
  amount?: DeleteStakePoolsWalletsWalletIdResponseInputsAmount;

  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;

  @Field(() => Float)
  index!: number;
}

@ObjectType()
export class DeleteStakePoolsWalletsWalletIdResponseInputsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => DeleteStakePoolsWalletsWalletIdResponseUnit)
  unit!: DeleteStakePoolsWalletsWalletIdResponseUnit;
}

@ObjectType()
export class DeleteStakePoolsWalletsWalletIdResponseOutputs {
  @Field()
  address!: string;

  @Field(() => DeleteStakePoolsWalletsWalletIdResponseOutputsAmount, { description: 'Coins, in Lovelace' })
  amount!: DeleteStakePoolsWalletsWalletIdResponseOutputsAmount;
}

@ObjectType()
export class DeleteStakePoolsWalletsWalletIdResponseOutputsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => DeleteStakePoolsWalletsWalletIdResponseUnit)
  unit!: DeleteStakePoolsWalletsWalletIdResponseUnit;
}

@ObjectType()
export class DeleteStakePoolsWalletsWalletIdResponseWithdrawals {
  @Field()
  stake_address!: string;

  @Field(() => DeleteStakePoolsWalletsWalletIdResponseWithdrawalsAmount, { description: 'Coins, in Lovelace' })
  amount!: DeleteStakePoolsWalletsWalletIdResponseWithdrawalsAmount;
}

@ObjectType()
export class DeleteStakePoolsWalletsWalletIdResponseWithdrawalsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => DeleteStakePoolsWalletsWalletIdResponseUnit)
  unit!: DeleteStakePoolsWalletsWalletIdResponseUnit;
}

@ObjectType()
export class PutStakePoolsStakePoolIdWalletsWalletIdResponseAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PutStakePoolsStakePoolIdWalletsWalletIdResponseUnit)
  unit!: PutStakePoolsStakePoolIdWalletsWalletIdResponseUnit;
}

@ObjectType()
export class PutStakePoolsStakePoolIdWalletsWalletIdResponseInsertedAt {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => PutStakePoolsStakePoolIdWalletsWalletIdResponseInsertedAtHeight)
  height!: PutStakePoolsStakePoolIdWalletsWalletIdResponseInsertedAtHeight;
}

@ObjectType()
export class PutStakePoolsStakePoolIdWalletsWalletIdResponseInsertedAtHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PutStakePoolsStakePoolIdWalletsWalletIdResponseUnit)
  unit!: PutStakePoolsStakePoolIdWalletsWalletIdResponseUnit;
}

@ObjectType()
export class PutStakePoolsStakePoolIdWalletsWalletIdResponseExpiresAt {
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
export class PutStakePoolsStakePoolIdWalletsWalletIdResponsePendingSince {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => PutStakePoolsStakePoolIdWalletsWalletIdResponsePendingSinceHeight)
  height!: PutStakePoolsStakePoolIdWalletsWalletIdResponsePendingSinceHeight;
}

@ObjectType()
export class PutStakePoolsStakePoolIdWalletsWalletIdResponsePendingSinceHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PutStakePoolsStakePoolIdWalletsWalletIdResponseUnit)
  unit!: PutStakePoolsStakePoolIdWalletsWalletIdResponseUnit;
}

@ObjectType()
export class PutStakePoolsStakePoolIdWalletsWalletIdResponseDepth {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PutStakePoolsStakePoolIdWalletsWalletIdResponseUnit)
  unit!: PutStakePoolsStakePoolIdWalletsWalletIdResponseUnit;
}

@ObjectType()
export class PutStakePoolsStakePoolIdWalletsWalletIdResponseInputs {
  @Field()
  address?: string;

  @Field(() => PutStakePoolsStakePoolIdWalletsWalletIdResponseInputsAmount, { description: 'Coins, in Lovelace' })
  amount?: PutStakePoolsStakePoolIdWalletsWalletIdResponseInputsAmount;

  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;

  @Field(() => Float)
  index!: number;
}

@ObjectType()
export class PutStakePoolsStakePoolIdWalletsWalletIdResponseInputsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PutStakePoolsStakePoolIdWalletsWalletIdResponseUnit)
  unit!: PutStakePoolsStakePoolIdWalletsWalletIdResponseUnit;
}

@ObjectType()
export class PutStakePoolsStakePoolIdWalletsWalletIdResponseOutputs {
  @Field()
  address!: string;

  @Field(() => PutStakePoolsStakePoolIdWalletsWalletIdResponseOutputsAmount, { description: 'Coins, in Lovelace' })
  amount!: PutStakePoolsStakePoolIdWalletsWalletIdResponseOutputsAmount;
}

@ObjectType()
export class PutStakePoolsStakePoolIdWalletsWalletIdResponseOutputsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PutStakePoolsStakePoolIdWalletsWalletIdResponseUnit)
  unit!: PutStakePoolsStakePoolIdWalletsWalletIdResponseUnit;
}

@ObjectType()
export class PutStakePoolsStakePoolIdWalletsWalletIdResponseWithdrawals {
  @Field()
  stake_address!: string;

  @Field(() => PutStakePoolsStakePoolIdWalletsWalletIdResponseWithdrawalsAmount, { description: 'Coins, in Lovelace' })
  amount!: PutStakePoolsStakePoolIdWalletsWalletIdResponseWithdrawalsAmount;
}

@ObjectType()
export class PutStakePoolsStakePoolIdWalletsWalletIdResponseWithdrawalsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PutStakePoolsStakePoolIdWalletsWalletIdResponseUnit)
  unit!: PutStakePoolsStakePoolIdWalletsWalletIdResponseUnit;
}

@ObjectType()
export class GetStakePoolsResponse {
  @Field({ description: 'A unique identifier for the pool.' })
  id!: string;

  @Field(() => GetStakePoolsResponseMetrics)
  metrics!: GetStakePoolsResponseMetrics;

  @Field(() => GetStakePoolsResponseCost, { description: 'Estimated cost set by the pool operator when registering his pool.\nThis fixed cost is taken from each reward earned by the pool before splitting rewards between stakeholders.\n\nMay be omitted if the wallet hasn\'t found the pool\'s registration cerificate yet.\n' })
  cost!: GetStakePoolsResponseCost;

  @Field(() => GetStakePoolsResponseMargin, { description: 'Variable margin on the total reward given to an operator before splitting rewards between stakeholders.\n\nMay be omitted if the wallet hasn\'t found the pool\'s registration cerificate yet.\n' })
  margin!: GetStakePoolsResponseMargin;

  @Field(() => GetStakePoolsResponsePledge, { description: 'Minimal stake amount that a stake pool is willing to honor.\n\nMay be omitted if the wallet hasn\'t found the pool\'s registration cerificate yet.\n' })
  pledge!: GetStakePoolsResponsePledge;

  @Field(() => GetStakePoolsResponseMetadata, { description: 'Information about the stake pool.\n' })
  metadata?: GetStakePoolsResponseMetadata;

  @Field(() => GetStakePoolsResponseRetirement, { description: 'The epoch in which a stake pool retires.\n\nMay be omitted if the wallet hasn\'t yet found a retirement certificate\nfor this stake pool.\n' })
  retirement?: GetStakePoolsResponseRetirement;

  @Field(() => [GetStakePoolsResponseFlags], { description: 'Various flags applicable to stake pools. Possible flags:\n\n| flag     | description                                                                                                      |\n| ---      | ---                                                                                                              |\n| delisted | The pool is marked as delisted on a configured SMASH server; metadata for this pool have therefore been dropped. |\n' })
  flags!: GetStakePoolsResponseFlags[];
}

@ObjectType()
export class GetStakePoolsMaintenanceActionsResponse {
  @Field(() => GetStakePoolsMaintenanceActionsResponseGcStakePools, { description: 'Gives an indication if metadata GC checking for delisted pools\nhas run and if so, when.\n\nPossible values are:\n  - not_applicable -> we\'re currently not querying a SMASH server for metadata\n  - not_started -> the GC hasn\'t started yet, try again in a short while\n  - restarting -> the GC thread is currently restarting, try again in short while\n  - has_run -> the GC has run successfully\n\nWhen \'status\' is \'restarting\' or \'has_run\' then the field \'last_run\'\nis set to the last GC time in UTC.\n' })
  gc_stake_pools!: GetStakePoolsMaintenanceActionsResponseGcStakePools;
}

@ObjectType()
export class GetWalletsWalletIdDelegationFeesResponse {
  @Field(() => GetWalletsWalletIdDelegationFeesResponseEstimatedMin, { description: 'Coins, in Lovelace' })
  estimated_min!: GetWalletsWalletIdDelegationFeesResponseEstimatedMin;

  @Field(() => GetWalletsWalletIdDelegationFeesResponseEstimatedMax, { description: 'Coins, in Lovelace' })
  estimated_max!: GetWalletsWalletIdDelegationFeesResponseEstimatedMax;
}

@ObjectType()
export class DeleteStakePoolsWalletsWalletIdResponse {
  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;

  @Field(() => DeleteStakePoolsWalletsWalletIdResponseAmount, { description: 'Coins, in Lovelace' })
  amount!: DeleteStakePoolsWalletsWalletIdResponseAmount;

  @Field(() => DeleteStakePoolsWalletsWalletIdResponseInsertedAt, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == in_ledger\n</span><br/>\nAbsolute time at which the transaction was inserted in a block.\n' })
  inserted_at?: DeleteStakePoolsWalletsWalletIdResponseInsertedAt;

  @Field(() => DeleteStakePoolsWalletsWalletIdResponseExpiresAt, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == pending OR status == expired\n</span><br/>\nAbsolute time and slot at which the pending transaction TTL (time to live) will lapse.\n' })
  expires_at?: DeleteStakePoolsWalletsWalletIdResponseExpiresAt;

  @Field(() => DeleteStakePoolsWalletsWalletIdResponsePendingSince, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == pending\n</span><br/>\nThe point in time at which a transaction became pending.\n' })
  pending_since?: DeleteStakePoolsWalletsWalletIdResponsePendingSince;

  @Field(() => DeleteStakePoolsWalletsWalletIdResponseDepth, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == in_ledger\n</span><br/>\nCurrent depth of the transaction in the local chain\n' })
  depth?: DeleteStakePoolsWalletsWalletIdResponseDepth;

  @Field(() => DeleteStakePoolsWalletsWalletIdResponseDirection)
  direction!: DeleteStakePoolsWalletsWalletIdResponseDirection;

  @Field(() => [DeleteStakePoolsWalletsWalletIdResponseInputs], { description: 'A list of transaction inputs' })
  inputs!: DeleteStakePoolsWalletsWalletIdResponseInputs[];

  @Field(() => [DeleteStakePoolsWalletsWalletIdResponseOutputs], { description: 'A list of target outputs' })
  outputs!: DeleteStakePoolsWalletsWalletIdResponseOutputs[];

  @Field(() => [DeleteStakePoolsWalletsWalletIdResponseWithdrawals], { description: 'A list of withdrawals from stake addresses.' })
  withdrawals!: DeleteStakePoolsWalletsWalletIdResponseWithdrawals[];

  @Field(() => DeleteStakePoolsWalletsWalletIdResponseStatus, { description: 'Current transaction status.\n\n  ```\n         *---------*          *-----------*\n         |         |---------->  EXPIRED  |\n         |         |  (ttl)   *-----------*\n  -------> PENDING |\n         |         <----------------*\n         |         |                |\n         *---------*            (rollback)\n              |                     |\n         (in ledger)          *-----------*\n              |               |           |\n              *---------------> IN_LEDGER |\n                              |           |\n                              *-----------*\n  ```\n' })
  status!: DeleteStakePoolsWalletsWalletIdResponseStatus;

  @Field(() => String, { nullable: true, description: 'Extra application data attached to the transaction.\n\nCardano allows users and developers to embed their own\nauthenticated metadata when submitting transactions. Metadata can\nbe expressed as a JSON object with some restrictions:\n\n1. All top-level keys must be integers between `0` and `2^64 - 1`.\n\n2. Each metadata value is tagged with its type.\n\n3. Strings must be at most 64 bytes when UTF-8 encoded.\n\n4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.\n\nMetadata aren\'t stored as JSON on the Cardano blockchain but are\ninstead stored using a compact binary encoding (CBOR).\n\nThe binary encoding of metadata values supports three simple types:\n\n* Integers in the range `-(2^64 - 1)` to `2^64 - 1`\n* Strings (UTF-8 encoded)\n* Bytestrings\n\nAnd two compound types:\n\n* Lists of metadata values\n* Mappings from metadata values to metadata values\n\nIt is possible to transform any JSON object into this schema.\n\nHowever, if your application uses floating point values, they will\nneed to be converted somehow, according to your\nrequirements. Likewise for `null` or `bool` values. When reading\nmetadata from chain, be aware that integers may exceed the\njavascript numeric range, and may need special "bigint" parsing.\n' })
  metadata?: string;
}

@ObjectType()
export class PutStakePoolsStakePoolIdWalletsWalletIdResponse {
  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;

  @Field(() => PutStakePoolsStakePoolIdWalletsWalletIdResponseAmount, { description: 'Coins, in Lovelace' })
  amount!: PutStakePoolsStakePoolIdWalletsWalletIdResponseAmount;

  @Field(() => PutStakePoolsStakePoolIdWalletsWalletIdResponseInsertedAt, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == in_ledger\n</span><br/>\nAbsolute time at which the transaction was inserted in a block.\n' })
  inserted_at?: PutStakePoolsStakePoolIdWalletsWalletIdResponseInsertedAt;

  @Field(() => PutStakePoolsStakePoolIdWalletsWalletIdResponseExpiresAt, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == pending OR status == expired\n</span><br/>\nAbsolute time and slot at which the pending transaction TTL (time to live) will lapse.\n' })
  expires_at?: PutStakePoolsStakePoolIdWalletsWalletIdResponseExpiresAt;

  @Field(() => PutStakePoolsStakePoolIdWalletsWalletIdResponsePendingSince, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == pending\n</span><br/>\nThe point in time at which a transaction became pending.\n' })
  pending_since?: PutStakePoolsStakePoolIdWalletsWalletIdResponsePendingSince;

  @Field(() => PutStakePoolsStakePoolIdWalletsWalletIdResponseDepth, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == in_ledger\n</span><br/>\nCurrent depth of the transaction in the local chain\n' })
  depth?: PutStakePoolsStakePoolIdWalletsWalletIdResponseDepth;

  @Field(() => PutStakePoolsStakePoolIdWalletsWalletIdResponseDirection)
  direction!: PutStakePoolsStakePoolIdWalletsWalletIdResponseDirection;

  @Field(() => [PutStakePoolsStakePoolIdWalletsWalletIdResponseInputs], { description: 'A list of transaction inputs' })
  inputs!: PutStakePoolsStakePoolIdWalletsWalletIdResponseInputs[];

  @Field(() => [PutStakePoolsStakePoolIdWalletsWalletIdResponseOutputs], { description: 'A list of target outputs' })
  outputs!: PutStakePoolsStakePoolIdWalletsWalletIdResponseOutputs[];

  @Field(() => [PutStakePoolsStakePoolIdWalletsWalletIdResponseWithdrawals], { description: 'A list of withdrawals from stake addresses.' })
  withdrawals!: PutStakePoolsStakePoolIdWalletsWalletIdResponseWithdrawals[];

  @Field(() => PutStakePoolsStakePoolIdWalletsWalletIdResponseStatus, { description: 'Current transaction status.\n\n  ```\n         *---------*          *-----------*\n         |         |---------->  EXPIRED  |\n         |         |  (ttl)   *-----------*\n  -------> PENDING |\n         |         <----------------*\n         |         |                |\n         *---------*            (rollback)\n              |                     |\n         (in ledger)          *-----------*\n              |               |           |\n              *---------------> IN_LEDGER |\n                              |           |\n                              *-----------*\n  ```\n' })
  status!: PutStakePoolsStakePoolIdWalletsWalletIdResponseStatus;

  @Field(() => String, { nullable: true, description: 'Extra application data attached to the transaction.\n\nCardano allows users and developers to embed their own\nauthenticated metadata when submitting transactions. Metadata can\nbe expressed as a JSON object with some restrictions:\n\n1. All top-level keys must be integers between `0` and `2^64 - 1`.\n\n2. Each metadata value is tagged with its type.\n\n3. Strings must be at most 64 bytes when UTF-8 encoded.\n\n4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.\n\nMetadata aren\'t stored as JSON on the Cardano blockchain but are\ninstead stored using a compact binary encoding (CBOR).\n\nThe binary encoding of metadata values supports three simple types:\n\n* Integers in the range `-(2^64 - 1)` to `2^64 - 1`\n* Strings (UTF-8 encoded)\n* Bytestrings\n\nAnd two compound types:\n\n* Lists of metadata values\n* Mappings from metadata values to metadata values\n\nIt is possible to transform any JSON object into this schema.\n\nHowever, if your application uses floating point values, they will\nneed to be converted somehow, according to your\nrequirements. Likewise for `null` or `bool` values. When reading\nmetadata from chain, be aware that integers may exceed the\njavascript numeric range, and may need special "bigint" parsing.\n' })
  metadata?: string;
}
