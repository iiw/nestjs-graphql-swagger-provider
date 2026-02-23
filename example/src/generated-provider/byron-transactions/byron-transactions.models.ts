/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { GetByronWalletsWalletIdTransactionsResponseDirection, GetByronWalletsWalletIdTransactionsResponseStatus, GetByronWalletsWalletIdTransactionsResponseUnit, GetByronWalletsWalletIdTransactionsTransactionIdResponseDirection, GetByronWalletsWalletIdTransactionsTransactionIdResponseStatus, GetByronWalletsWalletIdTransactionsTransactionIdResponseUnit, PostByronWalletsWalletIdPaymentFeesResponseUnit, PostByronWalletsWalletIdTransactionsResponseDirection, PostByronWalletsWalletIdTransactionsResponseStatus, PostByronWalletsWalletIdTransactionsResponseUnit } from '../enums';

@ObjectType()
export class PostByronWalletsWalletIdPaymentFeesResponseEstimatedMin {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronWalletsWalletIdPaymentFeesResponseUnit)
  unit!: PostByronWalletsWalletIdPaymentFeesResponseUnit;
}

@ObjectType()
export class PostByronWalletsWalletIdPaymentFeesResponseEstimatedMax {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronWalletsWalletIdPaymentFeesResponseUnit)
  unit!: PostByronWalletsWalletIdPaymentFeesResponseUnit;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsResponseAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsWalletIdTransactionsResponseUnit)
  unit!: GetByronWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsResponseInsertedAt {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => GetByronWalletsWalletIdTransactionsResponseInsertedAtHeight)
  height!: GetByronWalletsWalletIdTransactionsResponseInsertedAtHeight;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsResponseInsertedAtHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsWalletIdTransactionsResponseUnit)
  unit!: GetByronWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsResponseExpiresAt {
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
export class GetByronWalletsWalletIdTransactionsResponsePendingSince {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => GetByronWalletsWalletIdTransactionsResponsePendingSinceHeight)
  height!: GetByronWalletsWalletIdTransactionsResponsePendingSinceHeight;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsResponsePendingSinceHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsWalletIdTransactionsResponseUnit)
  unit!: GetByronWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsResponseDepth {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsWalletIdTransactionsResponseUnit)
  unit!: GetByronWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsResponseInputs {
  @Field()
  address?: string;

  @Field(() => GetByronWalletsWalletIdTransactionsResponseInputsAmount, { description: 'Coins, in Lovelace' })
  amount?: GetByronWalletsWalletIdTransactionsResponseInputsAmount;

  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;

  @Field(() => Float)
  index!: number;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsResponseInputsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsWalletIdTransactionsResponseUnit)
  unit!: GetByronWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsResponseOutputs {
  @Field()
  address!: string;

  @Field(() => GetByronWalletsWalletIdTransactionsResponseOutputsAmount, { description: 'Coins, in Lovelace' })
  amount!: GetByronWalletsWalletIdTransactionsResponseOutputsAmount;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsResponseOutputsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsWalletIdTransactionsResponseUnit)
  unit!: GetByronWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsResponseWithdrawals {
  @Field()
  stake_address!: string;

  @Field(() => GetByronWalletsWalletIdTransactionsResponseWithdrawalsAmount, { description: 'Coins, in Lovelace' })
  amount!: GetByronWalletsWalletIdTransactionsResponseWithdrawalsAmount;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsResponseWithdrawalsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsWalletIdTransactionsResponseUnit)
  unit!: GetByronWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class PostByronWalletsWalletIdTransactionsResponseAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronWalletsWalletIdTransactionsResponseUnit)
  unit!: PostByronWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class PostByronWalletsWalletIdTransactionsResponseInsertedAt {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => PostByronWalletsWalletIdTransactionsResponseInsertedAtHeight)
  height!: PostByronWalletsWalletIdTransactionsResponseInsertedAtHeight;
}

@ObjectType()
export class PostByronWalletsWalletIdTransactionsResponseInsertedAtHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronWalletsWalletIdTransactionsResponseUnit)
  unit!: PostByronWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class PostByronWalletsWalletIdTransactionsResponseExpiresAt {
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
export class PostByronWalletsWalletIdTransactionsResponsePendingSince {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => PostByronWalletsWalletIdTransactionsResponsePendingSinceHeight)
  height!: PostByronWalletsWalletIdTransactionsResponsePendingSinceHeight;
}

@ObjectType()
export class PostByronWalletsWalletIdTransactionsResponsePendingSinceHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronWalletsWalletIdTransactionsResponseUnit)
  unit!: PostByronWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class PostByronWalletsWalletIdTransactionsResponseDepth {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronWalletsWalletIdTransactionsResponseUnit)
  unit!: PostByronWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class PostByronWalletsWalletIdTransactionsResponseInputs {
  @Field()
  address?: string;

  @Field(() => PostByronWalletsWalletIdTransactionsResponseInputsAmount, { description: 'Coins, in Lovelace' })
  amount?: PostByronWalletsWalletIdTransactionsResponseInputsAmount;

  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;

  @Field(() => Float)
  index!: number;
}

@ObjectType()
export class PostByronWalletsWalletIdTransactionsResponseInputsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronWalletsWalletIdTransactionsResponseUnit)
  unit!: PostByronWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class PostByronWalletsWalletIdTransactionsResponseOutputs {
  @Field()
  address!: string;

  @Field(() => PostByronWalletsWalletIdTransactionsResponseOutputsAmount, { description: 'Coins, in Lovelace' })
  amount!: PostByronWalletsWalletIdTransactionsResponseOutputsAmount;
}

@ObjectType()
export class PostByronWalletsWalletIdTransactionsResponseOutputsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronWalletsWalletIdTransactionsResponseUnit)
  unit!: PostByronWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class PostByronWalletsWalletIdTransactionsResponseWithdrawals {
  @Field()
  stake_address!: string;

  @Field(() => PostByronWalletsWalletIdTransactionsResponseWithdrawalsAmount, { description: 'Coins, in Lovelace' })
  amount!: PostByronWalletsWalletIdTransactionsResponseWithdrawalsAmount;
}

@ObjectType()
export class PostByronWalletsWalletIdTransactionsResponseWithdrawalsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronWalletsWalletIdTransactionsResponseUnit)
  unit!: PostByronWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsTransactionIdResponseAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsWalletIdTransactionsTransactionIdResponseUnit)
  unit!: GetByronWalletsWalletIdTransactionsTransactionIdResponseUnit;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsTransactionIdResponseInsertedAt {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => GetByronWalletsWalletIdTransactionsTransactionIdResponseInsertedAtHeight)
  height!: GetByronWalletsWalletIdTransactionsTransactionIdResponseInsertedAtHeight;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsTransactionIdResponseInsertedAtHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsWalletIdTransactionsTransactionIdResponseUnit)
  unit!: GetByronWalletsWalletIdTransactionsTransactionIdResponseUnit;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsTransactionIdResponseExpiresAt {
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
export class GetByronWalletsWalletIdTransactionsTransactionIdResponsePendingSince {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => GetByronWalletsWalletIdTransactionsTransactionIdResponsePendingSinceHeight)
  height!: GetByronWalletsWalletIdTransactionsTransactionIdResponsePendingSinceHeight;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsTransactionIdResponsePendingSinceHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsWalletIdTransactionsTransactionIdResponseUnit)
  unit!: GetByronWalletsWalletIdTransactionsTransactionIdResponseUnit;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsTransactionIdResponseDepth {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsWalletIdTransactionsTransactionIdResponseUnit)
  unit!: GetByronWalletsWalletIdTransactionsTransactionIdResponseUnit;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsTransactionIdResponseInputs {
  @Field()
  address?: string;

  @Field(() => GetByronWalletsWalletIdTransactionsTransactionIdResponseInputsAmount, { description: 'Coins, in Lovelace' })
  amount?: GetByronWalletsWalletIdTransactionsTransactionIdResponseInputsAmount;

  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;

  @Field(() => Float)
  index!: number;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsTransactionIdResponseInputsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsWalletIdTransactionsTransactionIdResponseUnit)
  unit!: GetByronWalletsWalletIdTransactionsTransactionIdResponseUnit;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsTransactionIdResponseOutputs {
  @Field()
  address!: string;

  @Field(() => GetByronWalletsWalletIdTransactionsTransactionIdResponseOutputsAmount, { description: 'Coins, in Lovelace' })
  amount!: GetByronWalletsWalletIdTransactionsTransactionIdResponseOutputsAmount;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsTransactionIdResponseOutputsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsWalletIdTransactionsTransactionIdResponseUnit)
  unit!: GetByronWalletsWalletIdTransactionsTransactionIdResponseUnit;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsTransactionIdResponseWithdrawals {
  @Field()
  stake_address!: string;

  @Field(() => GetByronWalletsWalletIdTransactionsTransactionIdResponseWithdrawalsAmount, { description: 'Coins, in Lovelace' })
  amount!: GetByronWalletsWalletIdTransactionsTransactionIdResponseWithdrawalsAmount;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsTransactionIdResponseWithdrawalsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsWalletIdTransactionsTransactionIdResponseUnit)
  unit!: GetByronWalletsWalletIdTransactionsTransactionIdResponseUnit;
}

@ObjectType()
export class PostByronWalletsWalletIdPaymentFeesResponse {
  @Field(() => PostByronWalletsWalletIdPaymentFeesResponseEstimatedMin, { description: 'Coins, in Lovelace' })
  estimated_min!: PostByronWalletsWalletIdPaymentFeesResponseEstimatedMin;

  @Field(() => PostByronWalletsWalletIdPaymentFeesResponseEstimatedMax, { description: 'Coins, in Lovelace' })
  estimated_max!: PostByronWalletsWalletIdPaymentFeesResponseEstimatedMax;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsResponse {
  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;

  @Field(() => GetByronWalletsWalletIdTransactionsResponseAmount, { description: 'Coins, in Lovelace' })
  amount!: GetByronWalletsWalletIdTransactionsResponseAmount;

  @Field(() => GetByronWalletsWalletIdTransactionsResponseInsertedAt, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == in_ledger\n</span><br/>\nAbsolute time at which the transaction was inserted in a block.\n' })
  inserted_at?: GetByronWalletsWalletIdTransactionsResponseInsertedAt;

  @Field(() => GetByronWalletsWalletIdTransactionsResponseExpiresAt, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == pending OR status == expired\n</span><br/>\nAbsolute time and slot at which the pending transaction TTL (time to live) will lapse.\n' })
  expires_at?: GetByronWalletsWalletIdTransactionsResponseExpiresAt;

  @Field(() => GetByronWalletsWalletIdTransactionsResponsePendingSince, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == pending\n</span><br/>\nThe point in time at which a transaction became pending.\n' })
  pending_since?: GetByronWalletsWalletIdTransactionsResponsePendingSince;

  @Field(() => GetByronWalletsWalletIdTransactionsResponseDepth, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == in_ledger\n</span><br/>\nCurrent depth of the transaction in the local chain\n' })
  depth?: GetByronWalletsWalletIdTransactionsResponseDepth;

  @Field(() => GetByronWalletsWalletIdTransactionsResponseDirection)
  direction!: GetByronWalletsWalletIdTransactionsResponseDirection;

  @Field(() => [GetByronWalletsWalletIdTransactionsResponseInputs], { description: 'A list of transaction inputs' })
  inputs!: GetByronWalletsWalletIdTransactionsResponseInputs[];

  @Field(() => [GetByronWalletsWalletIdTransactionsResponseOutputs], { description: 'A list of target outputs' })
  outputs!: GetByronWalletsWalletIdTransactionsResponseOutputs[];

  @Field(() => [GetByronWalletsWalletIdTransactionsResponseWithdrawals], { description: 'A list of withdrawals from stake addresses.' })
  withdrawals!: GetByronWalletsWalletIdTransactionsResponseWithdrawals[];

  @Field(() => GetByronWalletsWalletIdTransactionsResponseStatus, { description: 'Current transaction status.\n\n  ```\n         *---------*          *-----------*\n         |         |---------->  EXPIRED  |\n         |         |  (ttl)   *-----------*\n  -------> PENDING |\n         |         <----------------*\n         |         |                |\n         *---------*            (rollback)\n              |                     |\n         (in ledger)          *-----------*\n              |               |           |\n              *---------------> IN_LEDGER |\n                              |           |\n                              *-----------*\n  ```\n' })
  status!: GetByronWalletsWalletIdTransactionsResponseStatus;

  @Field(() => String, { nullable: true, description: 'Extra application data attached to the transaction.\n\nCardano allows users and developers to embed their own\nauthenticated metadata when submitting transactions. Metadata can\nbe expressed as a JSON object with some restrictions:\n\n1. All top-level keys must be integers between `0` and `2^64 - 1`.\n\n2. Each metadata value is tagged with its type.\n\n3. Strings must be at most 64 bytes when UTF-8 encoded.\n\n4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.\n\nMetadata aren\'t stored as JSON on the Cardano blockchain but are\ninstead stored using a compact binary encoding (CBOR).\n\nThe binary encoding of metadata values supports three simple types:\n\n* Integers in the range `-(2^64 - 1)` to `2^64 - 1`\n* Strings (UTF-8 encoded)\n* Bytestrings\n\nAnd two compound types:\n\n* Lists of metadata values\n* Mappings from metadata values to metadata values\n\nIt is possible to transform any JSON object into this schema.\n\nHowever, if your application uses floating point values, they will\nneed to be converted somehow, according to your\nrequirements. Likewise for `null` or `bool` values. When reading\nmetadata from chain, be aware that integers may exceed the\njavascript numeric range, and may need special "bigint" parsing.\n' })
  metadata?: string;
}

@ObjectType()
export class PostByronWalletsWalletIdTransactionsResponse {
  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;

  @Field(() => PostByronWalletsWalletIdTransactionsResponseAmount, { description: 'Coins, in Lovelace' })
  amount!: PostByronWalletsWalletIdTransactionsResponseAmount;

  @Field(() => PostByronWalletsWalletIdTransactionsResponseInsertedAt, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == in_ledger\n</span><br/>\nAbsolute time at which the transaction was inserted in a block.\n' })
  inserted_at?: PostByronWalletsWalletIdTransactionsResponseInsertedAt;

  @Field(() => PostByronWalletsWalletIdTransactionsResponseExpiresAt, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == pending OR status == expired\n</span><br/>\nAbsolute time and slot at which the pending transaction TTL (time to live) will lapse.\n' })
  expires_at?: PostByronWalletsWalletIdTransactionsResponseExpiresAt;

  @Field(() => PostByronWalletsWalletIdTransactionsResponsePendingSince, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == pending\n</span><br/>\nThe point in time at which a transaction became pending.\n' })
  pending_since?: PostByronWalletsWalletIdTransactionsResponsePendingSince;

  @Field(() => PostByronWalletsWalletIdTransactionsResponseDepth, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == in_ledger\n</span><br/>\nCurrent depth of the transaction in the local chain\n' })
  depth?: PostByronWalletsWalletIdTransactionsResponseDepth;

  @Field(() => PostByronWalletsWalletIdTransactionsResponseDirection)
  direction!: PostByronWalletsWalletIdTransactionsResponseDirection;

  @Field(() => [PostByronWalletsWalletIdTransactionsResponseInputs], { description: 'A list of transaction inputs' })
  inputs!: PostByronWalletsWalletIdTransactionsResponseInputs[];

  @Field(() => [PostByronWalletsWalletIdTransactionsResponseOutputs], { description: 'A list of target outputs' })
  outputs!: PostByronWalletsWalletIdTransactionsResponseOutputs[];

  @Field(() => [PostByronWalletsWalletIdTransactionsResponseWithdrawals], { description: 'A list of withdrawals from stake addresses.' })
  withdrawals!: PostByronWalletsWalletIdTransactionsResponseWithdrawals[];

  @Field(() => PostByronWalletsWalletIdTransactionsResponseStatus, { description: 'Current transaction status.\n\n  ```\n         *---------*          *-----------*\n         |         |---------->  EXPIRED  |\n         |         |  (ttl)   *-----------*\n  -------> PENDING |\n         |         <----------------*\n         |         |                |\n         *---------*            (rollback)\n              |                     |\n         (in ledger)          *-----------*\n              |               |           |\n              *---------------> IN_LEDGER |\n                              |           |\n                              *-----------*\n  ```\n' })
  status!: PostByronWalletsWalletIdTransactionsResponseStatus;

  @Field(() => String, { nullable: true, description: 'Extra application data attached to the transaction.\n\nCardano allows users and developers to embed their own\nauthenticated metadata when submitting transactions. Metadata can\nbe expressed as a JSON object with some restrictions:\n\n1. All top-level keys must be integers between `0` and `2^64 - 1`.\n\n2. Each metadata value is tagged with its type.\n\n3. Strings must be at most 64 bytes when UTF-8 encoded.\n\n4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.\n\nMetadata aren\'t stored as JSON on the Cardano blockchain but are\ninstead stored using a compact binary encoding (CBOR).\n\nThe binary encoding of metadata values supports three simple types:\n\n* Integers in the range `-(2^64 - 1)` to `2^64 - 1`\n* Strings (UTF-8 encoded)\n* Bytestrings\n\nAnd two compound types:\n\n* Lists of metadata values\n* Mappings from metadata values to metadata values\n\nIt is possible to transform any JSON object into this schema.\n\nHowever, if your application uses floating point values, they will\nneed to be converted somehow, according to your\nrequirements. Likewise for `null` or `bool` values. When reading\nmetadata from chain, be aware that integers may exceed the\njavascript numeric range, and may need special "bigint" parsing.\n' })
  metadata?: string;
}

@ObjectType()
export class GetByronWalletsWalletIdTransactionsTransactionIdResponse {
  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;

  @Field(() => GetByronWalletsWalletIdTransactionsTransactionIdResponseAmount, { description: 'Coins, in Lovelace' })
  amount!: GetByronWalletsWalletIdTransactionsTransactionIdResponseAmount;

  @Field(() => GetByronWalletsWalletIdTransactionsTransactionIdResponseInsertedAt, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == in_ledger\n</span><br/>\nAbsolute time at which the transaction was inserted in a block.\n' })
  inserted_at?: GetByronWalletsWalletIdTransactionsTransactionIdResponseInsertedAt;

  @Field(() => GetByronWalletsWalletIdTransactionsTransactionIdResponseExpiresAt, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == pending OR status == expired\n</span><br/>\nAbsolute time and slot at which the pending transaction TTL (time to live) will lapse.\n' })
  expires_at?: GetByronWalletsWalletIdTransactionsTransactionIdResponseExpiresAt;

  @Field(() => GetByronWalletsWalletIdTransactionsTransactionIdResponsePendingSince, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == pending\n</span><br/>\nThe point in time at which a transaction became pending.\n' })
  pending_since?: GetByronWalletsWalletIdTransactionsTransactionIdResponsePendingSince;

  @Field(() => GetByronWalletsWalletIdTransactionsTransactionIdResponseDepth, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == in_ledger\n</span><br/>\nCurrent depth of the transaction in the local chain\n' })
  depth?: GetByronWalletsWalletIdTransactionsTransactionIdResponseDepth;

  @Field(() => GetByronWalletsWalletIdTransactionsTransactionIdResponseDirection)
  direction!: GetByronWalletsWalletIdTransactionsTransactionIdResponseDirection;

  @Field(() => [GetByronWalletsWalletIdTransactionsTransactionIdResponseInputs], { description: 'A list of transaction inputs' })
  inputs!: GetByronWalletsWalletIdTransactionsTransactionIdResponseInputs[];

  @Field(() => [GetByronWalletsWalletIdTransactionsTransactionIdResponseOutputs], { description: 'A list of target outputs' })
  outputs!: GetByronWalletsWalletIdTransactionsTransactionIdResponseOutputs[];

  @Field(() => [GetByronWalletsWalletIdTransactionsTransactionIdResponseWithdrawals], { description: 'A list of withdrawals from stake addresses.' })
  withdrawals!: GetByronWalletsWalletIdTransactionsTransactionIdResponseWithdrawals[];

  @Field(() => GetByronWalletsWalletIdTransactionsTransactionIdResponseStatus, { description: 'Current transaction status.\n\n  ```\n         *---------*          *-----------*\n         |         |---------->  EXPIRED  |\n         |         |  (ttl)   *-----------*\n  -------> PENDING |\n         |         <----------------*\n         |         |                |\n         *---------*            (rollback)\n              |                     |\n         (in ledger)          *-----------*\n              |               |           |\n              *---------------> IN_LEDGER |\n                              |           |\n                              *-----------*\n  ```\n' })
  status!: GetByronWalletsWalletIdTransactionsTransactionIdResponseStatus;

  @Field(() => String, { nullable: true, description: 'Extra application data attached to the transaction.\n\nCardano allows users and developers to embed their own\nauthenticated metadata when submitting transactions. Metadata can\nbe expressed as a JSON object with some restrictions:\n\n1. All top-level keys must be integers between `0` and `2^64 - 1`.\n\n2. Each metadata value is tagged with its type.\n\n3. Strings must be at most 64 bytes when UTF-8 encoded.\n\n4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.\n\nMetadata aren\'t stored as JSON on the Cardano blockchain but are\ninstead stored using a compact binary encoding (CBOR).\n\nThe binary encoding of metadata values supports three simple types:\n\n* Integers in the range `-(2^64 - 1)` to `2^64 - 1`\n* Strings (UTF-8 encoded)\n* Bytestrings\n\nAnd two compound types:\n\n* Lists of metadata values\n* Mappings from metadata values to metadata values\n\nIt is possible to transform any JSON object into this schema.\n\nHowever, if your application uses floating point values, they will\nneed to be converted somehow, according to your\nrequirements. Likewise for `null` or `bool` values. When reading\nmetadata from chain, be aware that integers may exceed the\njavascript numeric range, and may need special "bigint" parsing.\n' })
  metadata?: string;
}
