/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { GetWalletsWalletIdMigrationsResponseUnit, PostWalletsWalletIdMigrationsResponseDirection, PostWalletsWalletIdMigrationsResponseStatus, PostWalletsWalletIdMigrationsResponseUnit } from '../enums';

@ObjectType()
export class GetWalletsWalletIdMigrationsResponseMigrationCost {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsWalletIdMigrationsResponseUnit)
  unit!: GetWalletsWalletIdMigrationsResponseUnit;
}

@ObjectType()
export class GetWalletsWalletIdMigrationsResponseLeftovers {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsWalletIdMigrationsResponseUnit)
  unit!: GetWalletsWalletIdMigrationsResponseUnit;
}

@ObjectType()
export class PostWalletsWalletIdMigrationsResponseAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsWalletIdMigrationsResponseUnit)
  unit!: PostWalletsWalletIdMigrationsResponseUnit;
}

@ObjectType()
export class PostWalletsWalletIdMigrationsResponseInsertedAt {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => PostWalletsWalletIdMigrationsResponseInsertedAtHeight)
  height!: PostWalletsWalletIdMigrationsResponseInsertedAtHeight;
}

@ObjectType()
export class PostWalletsWalletIdMigrationsResponseInsertedAtHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsWalletIdMigrationsResponseUnit)
  unit!: PostWalletsWalletIdMigrationsResponseUnit;
}

@ObjectType()
export class PostWalletsWalletIdMigrationsResponseExpiresAt {
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
export class PostWalletsWalletIdMigrationsResponsePendingSince {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => PostWalletsWalletIdMigrationsResponsePendingSinceHeight)
  height!: PostWalletsWalletIdMigrationsResponsePendingSinceHeight;
}

@ObjectType()
export class PostWalletsWalletIdMigrationsResponsePendingSinceHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsWalletIdMigrationsResponseUnit)
  unit!: PostWalletsWalletIdMigrationsResponseUnit;
}

@ObjectType()
export class PostWalletsWalletIdMigrationsResponseDepth {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsWalletIdMigrationsResponseUnit)
  unit!: PostWalletsWalletIdMigrationsResponseUnit;
}

@ObjectType()
export class PostWalletsWalletIdMigrationsResponseInputs {
  @Field()
  address?: string;

  @Field(() => PostWalletsWalletIdMigrationsResponseInputsAmount, { description: 'Coins, in Lovelace' })
  amount?: PostWalletsWalletIdMigrationsResponseInputsAmount;

  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;

  @Field(() => Float)
  index!: number;
}

@ObjectType()
export class PostWalletsWalletIdMigrationsResponseInputsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsWalletIdMigrationsResponseUnit)
  unit!: PostWalletsWalletIdMigrationsResponseUnit;
}

@ObjectType()
export class PostWalletsWalletIdMigrationsResponseOutputs {
  @Field()
  address!: string;

  @Field(() => PostWalletsWalletIdMigrationsResponseOutputsAmount, { description: 'Coins, in Lovelace' })
  amount!: PostWalletsWalletIdMigrationsResponseOutputsAmount;
}

@ObjectType()
export class PostWalletsWalletIdMigrationsResponseOutputsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsWalletIdMigrationsResponseUnit)
  unit!: PostWalletsWalletIdMigrationsResponseUnit;
}

@ObjectType()
export class PostWalletsWalletIdMigrationsResponseWithdrawals {
  @Field()
  stake_address!: string;

  @Field(() => PostWalletsWalletIdMigrationsResponseWithdrawalsAmount, { description: 'Coins, in Lovelace' })
  amount!: PostWalletsWalletIdMigrationsResponseWithdrawalsAmount;
}

@ObjectType()
export class PostWalletsWalletIdMigrationsResponseWithdrawalsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsWalletIdMigrationsResponseUnit)
  unit!: PostWalletsWalletIdMigrationsResponseUnit;
}

@ObjectType()
export class GetWalletsWalletIdMigrationsResponse {
  @Field(() => GetWalletsWalletIdMigrationsResponseMigrationCost, { description: 'Total amount which will be paid as fees for the migration.' })
  migration_cost!: GetWalletsWalletIdMigrationsResponseMigrationCost;

  @Field(() => GetWalletsWalletIdMigrationsResponseLeftovers, { description: 'Leftovers dust coins which won\'t be migrated nor spent as fees.' })
  leftovers!: GetWalletsWalletIdMigrationsResponseLeftovers;
}

@ObjectType()
export class PostWalletsWalletIdMigrationsResponse {
  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;

  @Field(() => PostWalletsWalletIdMigrationsResponseAmount, { description: 'Coins, in Lovelace' })
  amount!: PostWalletsWalletIdMigrationsResponseAmount;

  @Field(() => PostWalletsWalletIdMigrationsResponseInsertedAt, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == in_ledger\n</span><br/>\nAbsolute time at which the transaction was inserted in a block.\n' })
  inserted_at?: PostWalletsWalletIdMigrationsResponseInsertedAt;

  @Field(() => PostWalletsWalletIdMigrationsResponseExpiresAt, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == pending OR status == expired\n</span><br/>\nAbsolute time and slot at which the pending transaction TTL (time to live) will lapse.\n' })
  expires_at?: PostWalletsWalletIdMigrationsResponseExpiresAt;

  @Field(() => PostWalletsWalletIdMigrationsResponsePendingSince, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == pending\n</span><br/>\nThe point in time at which a transaction became pending.\n' })
  pending_since?: PostWalletsWalletIdMigrationsResponsePendingSince;

  @Field(() => PostWalletsWalletIdMigrationsResponseDepth, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == in_ledger\n</span><br/>\nCurrent depth of the transaction in the local chain\n' })
  depth?: PostWalletsWalletIdMigrationsResponseDepth;

  @Field(() => PostWalletsWalletIdMigrationsResponseDirection)
  direction!: PostWalletsWalletIdMigrationsResponseDirection;

  @Field(() => [PostWalletsWalletIdMigrationsResponseInputs], { description: 'A list of transaction inputs' })
  inputs!: PostWalletsWalletIdMigrationsResponseInputs[];

  @Field(() => [PostWalletsWalletIdMigrationsResponseOutputs], { description: 'A list of target outputs' })
  outputs!: PostWalletsWalletIdMigrationsResponseOutputs[];

  @Field(() => [PostWalletsWalletIdMigrationsResponseWithdrawals], { description: 'A list of withdrawals from stake addresses.' })
  withdrawals!: PostWalletsWalletIdMigrationsResponseWithdrawals[];

  @Field(() => PostWalletsWalletIdMigrationsResponseStatus, { description: 'Current transaction status.\n\n  ```\n         *---------*          *-----------*\n         |         |---------->  EXPIRED  |\n         |         |  (ttl)   *-----------*\n  -------> PENDING |\n         |         <----------------*\n         |         |                |\n         *---------*            (rollback)\n              |                     |\n         (in ledger)          *-----------*\n              |               |           |\n              *---------------> IN_LEDGER |\n                              |           |\n                              *-----------*\n  ```\n' })
  status!: PostWalletsWalletIdMigrationsResponseStatus;

  @Field(() => String, { nullable: true, description: 'Extra application data attached to the transaction.\n\nCardano allows users and developers to embed their own\nauthenticated metadata when submitting transactions. Metadata can\nbe expressed as a JSON object with some restrictions:\n\n1. All top-level keys must be integers between `0` and `2^64 - 1`.\n\n2. Each metadata value is tagged with its type.\n\n3. Strings must be at most 64 bytes when UTF-8 encoded.\n\n4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.\n\nMetadata aren\'t stored as JSON on the Cardano blockchain but are\ninstead stored using a compact binary encoding (CBOR).\n\nThe binary encoding of metadata values supports three simple types:\n\n* Integers in the range `-(2^64 - 1)` to `2^64 - 1`\n* Strings (UTF-8 encoded)\n* Bytestrings\n\nAnd two compound types:\n\n* Lists of metadata values\n* Mappings from metadata values to metadata values\n\nIt is possible to transform any JSON object into this schema.\n\nHowever, if your application uses floating point values, they will\nneed to be converted somehow, according to your\nrequirements. Likewise for `null` or `bool` values. When reading\nmetadata from chain, be aware that integers may exceed the\njavascript numeric range, and may need special "bigint" parsing.\n' })
  metadata?: string;
}
