/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { DeleteStakePoolsWalletsWalletIdResponseDirection, DeleteStakePoolsWalletsWalletIdResponseStatus, DeleteStakePoolsWalletsWalletIdResponseUnit, GetStakePoolsMaintenanceActionsResponseStatus, GetStakePoolsResponseFlags, GetStakePoolsResponseUnit, GetWalletsWalletIdDelegationFeesResponseUnit, PutStakePoolsStakePoolIdWalletsWalletIdResponseDirection, PutStakePoolsStakePoolIdWalletsWalletIdResponseStatus, PutStakePoolsStakePoolIdWalletsWalletIdResponseUnit } from '../enums';

@ObjectType()
export class GetStakePoolsResponse {
  @Field({ description: 'A unique identifier for the pool.' })
  id!: string;

  @Field()
  metrics!: string;

  @Field({ description: 'Estimated cost set by the pool operator when registering his pool.\nThis fixed cost is taken from each reward earned by the pool before splitting rewards between stakeholders.\n\nMay be omitted if the wallet hasn\'t found the pool\'s registration cerificate yet.\n' })
  cost!: string;

  @Field({ description: 'Variable margin on the total reward given to an operator before splitting rewards between stakeholders.\n\nMay be omitted if the wallet hasn\'t found the pool\'s registration cerificate yet.\n' })
  margin!: string;

  @Field({ description: 'Minimal stake amount that a stake pool is willing to honor.\n\nMay be omitted if the wallet hasn\'t found the pool\'s registration cerificate yet.\n' })
  pledge!: string;

  @Field({ description: 'Information about the stake pool.\n' })
  metadata?: string;

  @Field({ description: 'The epoch in which a stake pool retires.\n\nMay be omitted if the wallet hasn\'t yet found a retirement certificate\nfor this stake pool.\n' })
  retirement?: string;

  @Field(() => [GetStakePoolsResponseFlags], { description: 'Various flags applicable to stake pools. Possible flags:\n\n| flag     | description                                                                                                      |\n| ---      | ---                                                                                                              |\n| delisted | The pool is marked as delisted on a configured SMASH server; metadata for this pool have therefore been dropped. |\n' })
  flags!: GetStakePoolsResponseFlags[];
}

@ObjectType()
export class GetStakePoolsMaintenanceActionsResponse {
  @Field({ description: 'Gives an indication if metadata GC checking for delisted pools\nhas run and if so, when.\n\nPossible values are:\n  - not_applicable -> we\'re currently not querying a SMASH server for metadata\n  - not_started -> the GC hasn\'t started yet, try again in a short while\n  - restarting -> the GC thread is currently restarting, try again in short while\n  - has_run -> the GC has run successfully\n\nWhen \'status\' is \'restarting\' or \'has_run\' then the field \'last_run\'\nis set to the last GC time in UTC.\n' })
  gc_stake_pools!: string;
}

@ObjectType()
export class GetWalletsWalletIdDelegationFeesResponse {
  @Field({ description: 'Coins, in Lovelace' })
  estimated_min!: string;

  @Field({ description: 'Coins, in Lovelace' })
  estimated_max!: string;
}

@ObjectType()
export class DeleteStakePoolsWalletsWalletIdResponse {
  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;

  @Field({ description: 'Coins, in Lovelace' })
  amount!: string;

  @Field({ description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == in_ledger\n</span><br/>\nAbsolute time at which the transaction was inserted in a block.\n' })
  inserted_at?: string;

  @Field({ description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == pending OR status == expired\n</span><br/>\nAbsolute time and slot at which the pending transaction TTL (time to live) will lapse.\n' })
  expires_at?: string;

  @Field({ description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == pending\n</span><br/>\nThe point in time at which a transaction became pending.\n' })
  pending_since?: string;

  @Field({ description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == in_ledger\n</span><br/>\nCurrent depth of the transaction in the local chain\n' })
  depth?: string;

  @Field(() => DeleteStakePoolsWalletsWalletIdResponseDirection)
  direction!: DeleteStakePoolsWalletsWalletIdResponseDirection;

  @Field(() => [String], { description: 'A list of transaction inputs' })
  inputs!: string[];

  @Field(() => [String], { description: 'A list of target outputs' })
  outputs!: string[];

  @Field(() => [String], { description: 'A list of withdrawals from stake addresses.' })
  withdrawals!: string[];

  @Field(() => DeleteStakePoolsWalletsWalletIdResponseStatus, { description: 'Current transaction status.\n\n  ```\n         *---------*          *-----------*\n         |         |---------->  EXPIRED  |\n         |         |  (ttl)   *-----------*\n  -------> PENDING |\n         |         <----------------*\n         |         |                |\n         *---------*            (rollback)\n              |                     |\n         (in ledger)          *-----------*\n              |               |           |\n              *---------------> IN_LEDGER |\n                              |           |\n                              *-----------*\n  ```\n' })
  status!: DeleteStakePoolsWalletsWalletIdResponseStatus;

  @Field({ nullable: true, description: 'Extra application data attached to the transaction.\n\nCardano allows users and developers to embed their own\nauthenticated metadata when submitting transactions. Metadata can\nbe expressed as a JSON object with some restrictions:\n\n1. All top-level keys must be integers between `0` and `2^64 - 1`.\n\n2. Each metadata value is tagged with its type.\n\n3. Strings must be at most 64 bytes when UTF-8 encoded.\n\n4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.\n\nMetadata aren\'t stored as JSON on the Cardano blockchain but are\ninstead stored using a compact binary encoding (CBOR).\n\nThe binary encoding of metadata values supports three simple types:\n\n* Integers in the range `-(2^64 - 1)` to `2^64 - 1`\n* Strings (UTF-8 encoded)\n* Bytestrings\n\nAnd two compound types:\n\n* Lists of metadata values\n* Mappings from metadata values to metadata values\n\nIt is possible to transform any JSON object into this schema.\n\nHowever, if your application uses floating point values, they will\nneed to be converted somehow, according to your\nrequirements. Likewise for `null` or `bool` values. When reading\nmetadata from chain, be aware that integers may exceed the\njavascript numeric range, and may need special "bigint" parsing.\n' })
  metadata?: string;
}

@ObjectType()
export class PutStakePoolsStakePoolIdWalletsWalletIdResponse {
  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;

  @Field({ description: 'Coins, in Lovelace' })
  amount!: string;

  @Field({ description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == in_ledger\n</span><br/>\nAbsolute time at which the transaction was inserted in a block.\n' })
  inserted_at?: string;

  @Field({ description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == pending OR status == expired\n</span><br/>\nAbsolute time and slot at which the pending transaction TTL (time to live) will lapse.\n' })
  expires_at?: string;

  @Field({ description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == pending\n</span><br/>\nThe point in time at which a transaction became pending.\n' })
  pending_since?: string;

  @Field({ description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == in_ledger\n</span><br/>\nCurrent depth of the transaction in the local chain\n' })
  depth?: string;

  @Field(() => PutStakePoolsStakePoolIdWalletsWalletIdResponseDirection)
  direction!: PutStakePoolsStakePoolIdWalletsWalletIdResponseDirection;

  @Field(() => [String], { description: 'A list of transaction inputs' })
  inputs!: string[];

  @Field(() => [String], { description: 'A list of target outputs' })
  outputs!: string[];

  @Field(() => [String], { description: 'A list of withdrawals from stake addresses.' })
  withdrawals!: string[];

  @Field(() => PutStakePoolsStakePoolIdWalletsWalletIdResponseStatus, { description: 'Current transaction status.\n\n  ```\n         *---------*          *-----------*\n         |         |---------->  EXPIRED  |\n         |         |  (ttl)   *-----------*\n  -------> PENDING |\n         |         <----------------*\n         |         |                |\n         *---------*            (rollback)\n              |                     |\n         (in ledger)          *-----------*\n              |               |           |\n              *---------------> IN_LEDGER |\n                              |           |\n                              *-----------*\n  ```\n' })
  status!: PutStakePoolsStakePoolIdWalletsWalletIdResponseStatus;

  @Field({ nullable: true, description: 'Extra application data attached to the transaction.\n\nCardano allows users and developers to embed their own\nauthenticated metadata when submitting transactions. Metadata can\nbe expressed as a JSON object with some restrictions:\n\n1. All top-level keys must be integers between `0` and `2^64 - 1`.\n\n2. Each metadata value is tagged with its type.\n\n3. Strings must be at most 64 bytes when UTF-8 encoded.\n\n4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.\n\nMetadata aren\'t stored as JSON on the Cardano blockchain but are\ninstead stored using a compact binary encoding (CBOR).\n\nThe binary encoding of metadata values supports three simple types:\n\n* Integers in the range `-(2^64 - 1)` to `2^64 - 1`\n* Strings (UTF-8 encoded)\n* Bytestrings\n\nAnd two compound types:\n\n* Lists of metadata values\n* Mappings from metadata values to metadata values\n\nIt is possible to transform any JSON object into this schema.\n\nHowever, if your application uses floating point values, they will\nneed to be converted somehow, according to your\nrequirements. Likewise for `null` or `bool` values. When reading\nmetadata from chain, be aware that integers may exceed the\njavascript numeric range, and may need special "bigint" parsing.\n' })
  metadata?: string;
}
