/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { GetWalletsWalletIdTransactionsResponseDirection, GetWalletsWalletIdTransactionsResponseStatus, GetWalletsWalletIdTransactionsResponseUnit, GetWalletsWalletIdTransactionsTransactionIdResponseDirection, GetWalletsWalletIdTransactionsTransactionIdResponseStatus, GetWalletsWalletIdTransactionsTransactionIdResponseUnit, PostWalletsWalletIdPaymentFeesResponseUnit, PostWalletsWalletIdTransactionsResponseDirection, PostWalletsWalletIdTransactionsResponseStatus, PostWalletsWalletIdTransactionsResponseUnit } from '../enums';

@ObjectType()
export class PostWalletsWalletIdPaymentFeesResponseEstimatedMin {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsWalletIdPaymentFeesResponseUnit)
  unit!: PostWalletsWalletIdPaymentFeesResponseUnit;
}

@ObjectType()
export class PostWalletsWalletIdPaymentFeesResponseEstimatedMax {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsWalletIdPaymentFeesResponseUnit)
  unit!: PostWalletsWalletIdPaymentFeesResponseUnit;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsResponseAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsWalletIdTransactionsResponseUnit)
  unit!: GetWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsResponseInsertedAt {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => GetWalletsWalletIdTransactionsResponseInsertedAtHeight)
  height!: GetWalletsWalletIdTransactionsResponseInsertedAtHeight;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsResponseInsertedAtHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsWalletIdTransactionsResponseUnit)
  unit!: GetWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsResponseExpiresAt {
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
export class GetWalletsWalletIdTransactionsResponsePendingSince {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => GetWalletsWalletIdTransactionsResponsePendingSinceHeight)
  height!: GetWalletsWalletIdTransactionsResponsePendingSinceHeight;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsResponsePendingSinceHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsWalletIdTransactionsResponseUnit)
  unit!: GetWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsResponseDepth {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsWalletIdTransactionsResponseUnit)
  unit!: GetWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsResponseInputs {
  @Field()
  address?: string;

  @Field(() => GetWalletsWalletIdTransactionsResponseInputsAmount, { description: 'Coins, in Lovelace' })
  amount?: GetWalletsWalletIdTransactionsResponseInputsAmount;

  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;

  @Field(() => Float)
  index!: number;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsResponseInputsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsWalletIdTransactionsResponseUnit)
  unit!: GetWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsResponseOutputs {
  @Field()
  address!: string;

  @Field(() => GetWalletsWalletIdTransactionsResponseOutputsAmount, { description: 'Coins, in Lovelace' })
  amount!: GetWalletsWalletIdTransactionsResponseOutputsAmount;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsResponseOutputsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsWalletIdTransactionsResponseUnit)
  unit!: GetWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsResponseWithdrawals {
  @Field()
  stake_address!: string;

  @Field(() => GetWalletsWalletIdTransactionsResponseWithdrawalsAmount, { description: 'Coins, in Lovelace' })
  amount!: GetWalletsWalletIdTransactionsResponseWithdrawalsAmount;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsResponseWithdrawalsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsWalletIdTransactionsResponseUnit)
  unit!: GetWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class PostWalletsWalletIdTransactionsResponseAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsWalletIdTransactionsResponseUnit)
  unit!: PostWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class PostWalletsWalletIdTransactionsResponseInsertedAt {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => PostWalletsWalletIdTransactionsResponseInsertedAtHeight)
  height!: PostWalletsWalletIdTransactionsResponseInsertedAtHeight;
}

@ObjectType()
export class PostWalletsWalletIdTransactionsResponseInsertedAtHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsWalletIdTransactionsResponseUnit)
  unit!: PostWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class PostWalletsWalletIdTransactionsResponseExpiresAt {
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
export class PostWalletsWalletIdTransactionsResponsePendingSince {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => PostWalletsWalletIdTransactionsResponsePendingSinceHeight)
  height!: PostWalletsWalletIdTransactionsResponsePendingSinceHeight;
}

@ObjectType()
export class PostWalletsWalletIdTransactionsResponsePendingSinceHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsWalletIdTransactionsResponseUnit)
  unit!: PostWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class PostWalletsWalletIdTransactionsResponseDepth {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsWalletIdTransactionsResponseUnit)
  unit!: PostWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class PostWalletsWalletIdTransactionsResponseInputs {
  @Field()
  address?: string;

  @Field(() => PostWalletsWalletIdTransactionsResponseInputsAmount, { description: 'Coins, in Lovelace' })
  amount?: PostWalletsWalletIdTransactionsResponseInputsAmount;

  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;

  @Field(() => Float)
  index!: number;
}

@ObjectType()
export class PostWalletsWalletIdTransactionsResponseInputsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsWalletIdTransactionsResponseUnit)
  unit!: PostWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class PostWalletsWalletIdTransactionsResponseOutputs {
  @Field()
  address!: string;

  @Field(() => PostWalletsWalletIdTransactionsResponseOutputsAmount, { description: 'Coins, in Lovelace' })
  amount!: PostWalletsWalletIdTransactionsResponseOutputsAmount;
}

@ObjectType()
export class PostWalletsWalletIdTransactionsResponseOutputsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsWalletIdTransactionsResponseUnit)
  unit!: PostWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class PostWalletsWalletIdTransactionsResponseWithdrawals {
  @Field()
  stake_address!: string;

  @Field(() => PostWalletsWalletIdTransactionsResponseWithdrawalsAmount, { description: 'Coins, in Lovelace' })
  amount!: PostWalletsWalletIdTransactionsResponseWithdrawalsAmount;
}

@ObjectType()
export class PostWalletsWalletIdTransactionsResponseWithdrawalsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsWalletIdTransactionsResponseUnit)
  unit!: PostWalletsWalletIdTransactionsResponseUnit;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsTransactionIdResponseAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsWalletIdTransactionsTransactionIdResponseUnit)
  unit!: GetWalletsWalletIdTransactionsTransactionIdResponseUnit;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsTransactionIdResponseInsertedAt {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => GetWalletsWalletIdTransactionsTransactionIdResponseInsertedAtHeight)
  height!: GetWalletsWalletIdTransactionsTransactionIdResponseInsertedAtHeight;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsTransactionIdResponseInsertedAtHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsWalletIdTransactionsTransactionIdResponseUnit)
  unit!: GetWalletsWalletIdTransactionsTransactionIdResponseUnit;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsTransactionIdResponseExpiresAt {
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
export class GetWalletsWalletIdTransactionsTransactionIdResponsePendingSince {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => GetWalletsWalletIdTransactionsTransactionIdResponsePendingSinceHeight)
  height!: GetWalletsWalletIdTransactionsTransactionIdResponsePendingSinceHeight;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsTransactionIdResponsePendingSinceHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsWalletIdTransactionsTransactionIdResponseUnit)
  unit!: GetWalletsWalletIdTransactionsTransactionIdResponseUnit;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsTransactionIdResponseDepth {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsWalletIdTransactionsTransactionIdResponseUnit)
  unit!: GetWalletsWalletIdTransactionsTransactionIdResponseUnit;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsTransactionIdResponseInputs {
  @Field()
  address?: string;

  @Field(() => GetWalletsWalletIdTransactionsTransactionIdResponseInputsAmount, { description: 'Coins, in Lovelace' })
  amount?: GetWalletsWalletIdTransactionsTransactionIdResponseInputsAmount;

  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;

  @Field(() => Float)
  index!: number;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsTransactionIdResponseInputsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsWalletIdTransactionsTransactionIdResponseUnit)
  unit!: GetWalletsWalletIdTransactionsTransactionIdResponseUnit;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsTransactionIdResponseOutputs {
  @Field()
  address!: string;

  @Field(() => GetWalletsWalletIdTransactionsTransactionIdResponseOutputsAmount, { description: 'Coins, in Lovelace' })
  amount!: GetWalletsWalletIdTransactionsTransactionIdResponseOutputsAmount;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsTransactionIdResponseOutputsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsWalletIdTransactionsTransactionIdResponseUnit)
  unit!: GetWalletsWalletIdTransactionsTransactionIdResponseUnit;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsTransactionIdResponseWithdrawals {
  @Field()
  stake_address!: string;

  @Field(() => GetWalletsWalletIdTransactionsTransactionIdResponseWithdrawalsAmount, { description: 'Coins, in Lovelace' })
  amount!: GetWalletsWalletIdTransactionsTransactionIdResponseWithdrawalsAmount;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsTransactionIdResponseWithdrawalsAmount {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsWalletIdTransactionsTransactionIdResponseUnit)
  unit!: GetWalletsWalletIdTransactionsTransactionIdResponseUnit;
}

@ObjectType()
export class PostWalletsWalletIdPaymentFeesResponse {
  @Field(() => PostWalletsWalletIdPaymentFeesResponseEstimatedMin, { description: 'Coins, in Lovelace' })
  estimated_min!: PostWalletsWalletIdPaymentFeesResponseEstimatedMin;

  @Field(() => PostWalletsWalletIdPaymentFeesResponseEstimatedMax, { description: 'Coins, in Lovelace' })
  estimated_max!: PostWalletsWalletIdPaymentFeesResponseEstimatedMax;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsResponse {
  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;

  @Field(() => GetWalletsWalletIdTransactionsResponseAmount, { description: 'Coins, in Lovelace' })
  amount!: GetWalletsWalletIdTransactionsResponseAmount;

  @Field(() => GetWalletsWalletIdTransactionsResponseInsertedAt, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == in_ledger\n</span><br/>\nAbsolute time at which the transaction was inserted in a block.\n' })
  inserted_at?: GetWalletsWalletIdTransactionsResponseInsertedAt;

  @Field(() => GetWalletsWalletIdTransactionsResponseExpiresAt, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == pending OR status == expired\n</span><br/>\nAbsolute time and slot at which the pending transaction TTL (time to live) will lapse.\n' })
  expires_at?: GetWalletsWalletIdTransactionsResponseExpiresAt;

  @Field(() => GetWalletsWalletIdTransactionsResponsePendingSince, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == pending\n</span><br/>\nThe point in time at which a transaction became pending.\n' })
  pending_since?: GetWalletsWalletIdTransactionsResponsePendingSince;

  @Field(() => GetWalletsWalletIdTransactionsResponseDepth, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == in_ledger\n</span><br/>\nCurrent depth of the transaction in the local chain\n' })
  depth?: GetWalletsWalletIdTransactionsResponseDepth;

  @Field(() => GetWalletsWalletIdTransactionsResponseDirection)
  direction!: GetWalletsWalletIdTransactionsResponseDirection;

  @Field(() => [GetWalletsWalletIdTransactionsResponseInputs], { description: 'A list of transaction inputs' })
  inputs!: GetWalletsWalletIdTransactionsResponseInputs[];

  @Field(() => [GetWalletsWalletIdTransactionsResponseOutputs], { description: 'A list of target outputs' })
  outputs!: GetWalletsWalletIdTransactionsResponseOutputs[];

  @Field(() => [GetWalletsWalletIdTransactionsResponseWithdrawals], { description: 'A list of withdrawals from stake addresses.' })
  withdrawals!: GetWalletsWalletIdTransactionsResponseWithdrawals[];

  @Field(() => GetWalletsWalletIdTransactionsResponseStatus, { description: 'Current transaction status.\n\n  ```\n         *---------*          *-----------*\n         |         |---------->  EXPIRED  |\n         |         |  (ttl)   *-----------*\n  -------> PENDING |\n         |         <----------------*\n         |         |                |\n         *---------*            (rollback)\n              |                     |\n         (in ledger)          *-----------*\n              |               |           |\n              *---------------> IN_LEDGER |\n                              |           |\n                              *-----------*\n  ```\n' })
  status!: GetWalletsWalletIdTransactionsResponseStatus;

  @Field(() => String, { nullable: true, description: 'Extra application data attached to the transaction.\n\nCardano allows users and developers to embed their own\nauthenticated metadata when submitting transactions. Metadata can\nbe expressed as a JSON object with some restrictions:\n\n1. All top-level keys must be integers between `0` and `2^64 - 1`.\n\n2. Each metadata value is tagged with its type.\n\n3. Strings must be at most 64 bytes when UTF-8 encoded.\n\n4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.\n\nMetadata aren\'t stored as JSON on the Cardano blockchain but are\ninstead stored using a compact binary encoding (CBOR).\n\nThe binary encoding of metadata values supports three simple types:\n\n* Integers in the range `-(2^64 - 1)` to `2^64 - 1`\n* Strings (UTF-8 encoded)\n* Bytestrings\n\nAnd two compound types:\n\n* Lists of metadata values\n* Mappings from metadata values to metadata values\n\nIt is possible to transform any JSON object into this schema.\n\nHowever, if your application uses floating point values, they will\nneed to be converted somehow, according to your\nrequirements. Likewise for `null` or `bool` values. When reading\nmetadata from chain, be aware that integers may exceed the\njavascript numeric range, and may need special "bigint" parsing.\n' })
  metadata?: string;
}

@ObjectType()
export class PostWalletsWalletIdTransactionsResponse {
  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;

  @Field(() => PostWalletsWalletIdTransactionsResponseAmount, { description: 'Coins, in Lovelace' })
  amount!: PostWalletsWalletIdTransactionsResponseAmount;

  @Field(() => PostWalletsWalletIdTransactionsResponseInsertedAt, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == in_ledger\n</span><br/>\nAbsolute time at which the transaction was inserted in a block.\n' })
  inserted_at?: PostWalletsWalletIdTransactionsResponseInsertedAt;

  @Field(() => PostWalletsWalletIdTransactionsResponseExpiresAt, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == pending OR status == expired\n</span><br/>\nAbsolute time and slot at which the pending transaction TTL (time to live) will lapse.\n' })
  expires_at?: PostWalletsWalletIdTransactionsResponseExpiresAt;

  @Field(() => PostWalletsWalletIdTransactionsResponsePendingSince, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == pending\n</span><br/>\nThe point in time at which a transaction became pending.\n' })
  pending_since?: PostWalletsWalletIdTransactionsResponsePendingSince;

  @Field(() => PostWalletsWalletIdTransactionsResponseDepth, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == in_ledger\n</span><br/>\nCurrent depth of the transaction in the local chain\n' })
  depth?: PostWalletsWalletIdTransactionsResponseDepth;

  @Field(() => PostWalletsWalletIdTransactionsResponseDirection)
  direction!: PostWalletsWalletIdTransactionsResponseDirection;

  @Field(() => [PostWalletsWalletIdTransactionsResponseInputs], { description: 'A list of transaction inputs' })
  inputs!: PostWalletsWalletIdTransactionsResponseInputs[];

  @Field(() => [PostWalletsWalletIdTransactionsResponseOutputs], { description: 'A list of target outputs' })
  outputs!: PostWalletsWalletIdTransactionsResponseOutputs[];

  @Field(() => [PostWalletsWalletIdTransactionsResponseWithdrawals], { description: 'A list of withdrawals from stake addresses.' })
  withdrawals!: PostWalletsWalletIdTransactionsResponseWithdrawals[];

  @Field(() => PostWalletsWalletIdTransactionsResponseStatus, { description: 'Current transaction status.\n\n  ```\n         *---------*          *-----------*\n         |         |---------->  EXPIRED  |\n         |         |  (ttl)   *-----------*\n  -------> PENDING |\n         |         <----------------*\n         |         |                |\n         *---------*            (rollback)\n              |                     |\n         (in ledger)          *-----------*\n              |               |           |\n              *---------------> IN_LEDGER |\n                              |           |\n                              *-----------*\n  ```\n' })
  status!: PostWalletsWalletIdTransactionsResponseStatus;

  @Field(() => String, { nullable: true, description: 'Extra application data attached to the transaction.\n\nCardano allows users and developers to embed their own\nauthenticated metadata when submitting transactions. Metadata can\nbe expressed as a JSON object with some restrictions:\n\n1. All top-level keys must be integers between `0` and `2^64 - 1`.\n\n2. Each metadata value is tagged with its type.\n\n3. Strings must be at most 64 bytes when UTF-8 encoded.\n\n4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.\n\nMetadata aren\'t stored as JSON on the Cardano blockchain but are\ninstead stored using a compact binary encoding (CBOR).\n\nThe binary encoding of metadata values supports three simple types:\n\n* Integers in the range `-(2^64 - 1)` to `2^64 - 1`\n* Strings (UTF-8 encoded)\n* Bytestrings\n\nAnd two compound types:\n\n* Lists of metadata values\n* Mappings from metadata values to metadata values\n\nIt is possible to transform any JSON object into this schema.\n\nHowever, if your application uses floating point values, they will\nneed to be converted somehow, according to your\nrequirements. Likewise for `null` or `bool` values. When reading\nmetadata from chain, be aware that integers may exceed the\njavascript numeric range, and may need special "bigint" parsing.\n' })
  metadata?: string;
}

@ObjectType()
export class GetWalletsWalletIdTransactionsTransactionIdResponse {
  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;

  @Field(() => GetWalletsWalletIdTransactionsTransactionIdResponseAmount, { description: 'Coins, in Lovelace' })
  amount!: GetWalletsWalletIdTransactionsTransactionIdResponseAmount;

  @Field(() => GetWalletsWalletIdTransactionsTransactionIdResponseInsertedAt, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == in_ledger\n</span><br/>\nAbsolute time at which the transaction was inserted in a block.\n' })
  inserted_at?: GetWalletsWalletIdTransactionsTransactionIdResponseInsertedAt;

  @Field(() => GetWalletsWalletIdTransactionsTransactionIdResponseExpiresAt, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == pending OR status == expired\n</span><br/>\nAbsolute time and slot at which the pending transaction TTL (time to live) will lapse.\n' })
  expires_at?: GetWalletsWalletIdTransactionsTransactionIdResponseExpiresAt;

  @Field(() => GetWalletsWalletIdTransactionsTransactionIdResponsePendingSince, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == pending\n</span><br/>\nThe point in time at which a transaction became pending.\n' })
  pending_since?: GetWalletsWalletIdTransactionsTransactionIdResponsePendingSince;

  @Field(() => GetWalletsWalletIdTransactionsTransactionIdResponseDepth, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == in_ledger\n</span><br/>\nCurrent depth of the transaction in the local chain\n' })
  depth?: GetWalletsWalletIdTransactionsTransactionIdResponseDepth;

  @Field(() => GetWalletsWalletIdTransactionsTransactionIdResponseDirection)
  direction!: GetWalletsWalletIdTransactionsTransactionIdResponseDirection;

  @Field(() => [GetWalletsWalletIdTransactionsTransactionIdResponseInputs], { description: 'A list of transaction inputs' })
  inputs!: GetWalletsWalletIdTransactionsTransactionIdResponseInputs[];

  @Field(() => [GetWalletsWalletIdTransactionsTransactionIdResponseOutputs], { description: 'A list of target outputs' })
  outputs!: GetWalletsWalletIdTransactionsTransactionIdResponseOutputs[];

  @Field(() => [GetWalletsWalletIdTransactionsTransactionIdResponseWithdrawals], { description: 'A list of withdrawals from stake addresses.' })
  withdrawals!: GetWalletsWalletIdTransactionsTransactionIdResponseWithdrawals[];

  @Field(() => GetWalletsWalletIdTransactionsTransactionIdResponseStatus, { description: 'Current transaction status.\n\n  ```\n         *---------*          *-----------*\n         |         |---------->  EXPIRED  |\n         |         |  (ttl)   *-----------*\n  -------> PENDING |\n         |         <----------------*\n         |         |                |\n         *---------*            (rollback)\n              |                     |\n         (in ledger)          *-----------*\n              |               |           |\n              *---------------> IN_LEDGER |\n                              |           |\n                              *-----------*\n  ```\n' })
  status!: GetWalletsWalletIdTransactionsTransactionIdResponseStatus;

  @Field(() => String, { nullable: true, description: 'Extra application data attached to the transaction.\n\nCardano allows users and developers to embed their own\nauthenticated metadata when submitting transactions. Metadata can\nbe expressed as a JSON object with some restrictions:\n\n1. All top-level keys must be integers between `0` and `2^64 - 1`.\n\n2. Each metadata value is tagged with its type.\n\n3. Strings must be at most 64 bytes when UTF-8 encoded.\n\n4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.\n\nMetadata aren\'t stored as JSON on the Cardano blockchain but are\ninstead stored using a compact binary encoding (CBOR).\n\nThe binary encoding of metadata values supports three simple types:\n\n* Integers in the range `-(2^64 - 1)` to `2^64 - 1`\n* Strings (UTF-8 encoded)\n* Bytestrings\n\nAnd two compound types:\n\n* Lists of metadata values\n* Mappings from metadata values to metadata values\n\nIt is possible to transform any JSON object into this schema.\n\nHowever, if your application uses floating point values, they will\nneed to be converted somehow, according to your\nrequirements. Likewise for `null` or `bool` values. When reading\nmetadata from chain, be aware that integers may exceed the\njavascript numeric range, and may need special "bigint" parsing.\n' })
  metadata?: string;
}
