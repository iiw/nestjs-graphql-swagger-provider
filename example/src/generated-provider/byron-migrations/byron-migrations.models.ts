/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { GetByronWalletsWalletIdMigrationsResponseUnit, PostByronWalletsWalletIdMigrationsResponseDirection, PostByronWalletsWalletIdMigrationsResponseStatus, PostByronWalletsWalletIdMigrationsResponseUnit } from '../enums';

@ObjectType()
export class GetByronWalletsWalletIdMigrationsResponseMigrationCost {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsWalletIdMigrationsResponseUnit)
  unit!: GetByronWalletsWalletIdMigrationsResponseUnit;
}

@ObjectType()
export class GetByronWalletsWalletIdMigrationsResponseLeftovers {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsWalletIdMigrationsResponseUnit)
  unit!: GetByronWalletsWalletIdMigrationsResponseUnit;
}

@ObjectType()
export class PostByronWalletsWalletIdMigrationsResponseAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronWalletsWalletIdMigrationsResponseUnit)
  unit!: PostByronWalletsWalletIdMigrationsResponseUnit;
}

@ObjectType()
export class PostByronWalletsWalletIdMigrationsResponseInsertedAt {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => PostByronWalletsWalletIdMigrationsResponseInsertedAtHeight)
  height!: PostByronWalletsWalletIdMigrationsResponseInsertedAtHeight;
}

@ObjectType()
export class PostByronWalletsWalletIdMigrationsResponseInsertedAtHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronWalletsWalletIdMigrationsResponseUnit)
  unit!: PostByronWalletsWalletIdMigrationsResponseUnit;
}

@ObjectType()
export class PostByronWalletsWalletIdMigrationsResponseExpiresAt {
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
export class PostByronWalletsWalletIdMigrationsResponsePendingSince {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => PostByronWalletsWalletIdMigrationsResponsePendingSinceHeight)
  height!: PostByronWalletsWalletIdMigrationsResponsePendingSinceHeight;
}

@ObjectType()
export class PostByronWalletsWalletIdMigrationsResponsePendingSinceHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronWalletsWalletIdMigrationsResponseUnit)
  unit!: PostByronWalletsWalletIdMigrationsResponseUnit;
}

@ObjectType()
export class PostByronWalletsWalletIdMigrationsResponseDepth {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronWalletsWalletIdMigrationsResponseUnit)
  unit!: PostByronWalletsWalletIdMigrationsResponseUnit;
}

@ObjectType()
export class PostByronWalletsWalletIdMigrationsResponseInputs {
  @Field()
  address?: string;

  @Field(() => PostByronWalletsWalletIdMigrationsResponseInputsAmount, { description: 'Coins, in Lovelace' })
  amount?: PostByronWalletsWalletIdMigrationsResponseInputsAmount;

  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;

  @Field(() => Float)
  index!: number;
}

@ObjectType()
export class PostByronWalletsWalletIdMigrationsResponseInputsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronWalletsWalletIdMigrationsResponseUnit)
  unit!: PostByronWalletsWalletIdMigrationsResponseUnit;
}

@ObjectType()
export class PostByronWalletsWalletIdMigrationsResponseOutputs {
  @Field()
  address!: string;

  @Field(() => PostByronWalletsWalletIdMigrationsResponseOutputsAmount, { description: 'Coins, in Lovelace' })
  amount!: PostByronWalletsWalletIdMigrationsResponseOutputsAmount;
}

@ObjectType()
export class PostByronWalletsWalletIdMigrationsResponseOutputsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronWalletsWalletIdMigrationsResponseUnit)
  unit!: PostByronWalletsWalletIdMigrationsResponseUnit;
}

@ObjectType()
export class PostByronWalletsWalletIdMigrationsResponseWithdrawals {
  @Field()
  stake_address!: string;

  @Field(() => PostByronWalletsWalletIdMigrationsResponseWithdrawalsAmount, { description: 'Coins, in Lovelace' })
  amount!: PostByronWalletsWalletIdMigrationsResponseWithdrawalsAmount;
}

@ObjectType()
export class PostByronWalletsWalletIdMigrationsResponseWithdrawalsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronWalletsWalletIdMigrationsResponseUnit)
  unit!: PostByronWalletsWalletIdMigrationsResponseUnit;
}

@ObjectType()
export class GetByronWalletsWalletIdMigrationsResponse {
  @Field(() => GetByronWalletsWalletIdMigrationsResponseMigrationCost, { description: 'Total amount which will be paid as fees for the migration.' })
  migration_cost!: GetByronWalletsWalletIdMigrationsResponseMigrationCost;

  @Field(() => GetByronWalletsWalletIdMigrationsResponseLeftovers, { description: 'Leftovers dust coins which won\'t be migrated nor spent as fees.' })
  leftovers!: GetByronWalletsWalletIdMigrationsResponseLeftovers;
}

@ObjectType()
export class PostByronWalletsWalletIdMigrationsResponse {
  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;

  @Field(() => PostByronWalletsWalletIdMigrationsResponseAmount, { description: 'Coins, in Lovelace' })
  amount!: PostByronWalletsWalletIdMigrationsResponseAmount;

  @Field(() => PostByronWalletsWalletIdMigrationsResponseInsertedAt, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == in_ledger\n</span><br/>\nAbsolute time at which the transaction was inserted in a block.\n' })
  inserted_at?: PostByronWalletsWalletIdMigrationsResponseInsertedAt;

  @Field(() => PostByronWalletsWalletIdMigrationsResponseExpiresAt, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == pending OR status == expired\n</span><br/>\nAbsolute time and slot at which the pending transaction TTL (time to live) will lapse.\n' })
  expires_at?: PostByronWalletsWalletIdMigrationsResponseExpiresAt;

  @Field(() => PostByronWalletsWalletIdMigrationsResponsePendingSince, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == pending\n</span><br/>\nThe point in time at which a transaction became pending.\n' })
  pending_since?: PostByronWalletsWalletIdMigrationsResponsePendingSince;

  @Field(() => PostByronWalletsWalletIdMigrationsResponseDepth, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == in_ledger\n</span><br/>\nCurrent depth of the transaction in the local chain\n' })
  depth?: PostByronWalletsWalletIdMigrationsResponseDepth;

  @Field(() => PostByronWalletsWalletIdMigrationsResponseDirection)
  direction!: PostByronWalletsWalletIdMigrationsResponseDirection;

  @Field(() => [PostByronWalletsWalletIdMigrationsResponseInputs], { description: 'A list of transaction inputs' })
  inputs!: PostByronWalletsWalletIdMigrationsResponseInputs[];

  @Field(() => [PostByronWalletsWalletIdMigrationsResponseOutputs], { description: 'A list of target outputs' })
  outputs!: PostByronWalletsWalletIdMigrationsResponseOutputs[];

  @Field(() => [PostByronWalletsWalletIdMigrationsResponseWithdrawals], { description: 'A list of withdrawals from stake addresses.' })
  withdrawals!: PostByronWalletsWalletIdMigrationsResponseWithdrawals[];

  @Field(() => PostByronWalletsWalletIdMigrationsResponseStatus, { description: 'Current transaction status.\n\n  ```\n         *---------*          *-----------*\n         |         |---------->  EXPIRED  |\n         |         |  (ttl)   *-----------*\n  -------> PENDING |\n         |         <----------------*\n         |         |                |\n         *---------*            (rollback)\n              |                     |\n         (in ledger)          *-----------*\n              |               |           |\n              *---------------> IN_LEDGER |\n                              |           |\n                              *-----------*\n  ```\n' })
  status!: PostByronWalletsWalletIdMigrationsResponseStatus;

  @Field(() => String, { nullable: true, description: 'Extra application data attached to the transaction.\n\nCardano allows users and developers to embed their own\nauthenticated metadata when submitting transactions. Metadata can\nbe expressed as a JSON object with some restrictions:\n\n1. All top-level keys must be integers between `0` and `2^64 - 1`.\n\n2. Each metadata value is tagged with its type.\n\n3. Strings must be at most 64 bytes when UTF-8 encoded.\n\n4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.\n\nMetadata aren\'t stored as JSON on the Cardano blockchain but are\ninstead stored using a compact binary encoding (CBOR).\n\nThe binary encoding of metadata values supports three simple types:\n\n* Integers in the range `-(2^64 - 1)` to `2^64 - 1`\n* Strings (UTF-8 encoded)\n* Bytestrings\n\nAnd two compound types:\n\n* Lists of metadata values\n* Mappings from metadata values to metadata values\n\nIt is possible to transform any JSON object into this schema.\n\nHowever, if your application uses floating point values, they will\nneed to be converted somehow, according to your\nrequirements. Likewise for `null` or `bool` values. When reading\nmetadata from chain, be aware that integers may exceed the\njavascript numeric range, and may need special "bigint" parsing.\n' })
  metadata?: string;
}
