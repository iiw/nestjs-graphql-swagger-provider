/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';
import { PostWalletsWalletIdPaymentFeesInputUnit, PostWalletsWalletIdTransactionsInputUnit } from '../enums';

@InputType()
export class PostWalletsWalletIdPaymentFeesInput {
  @Field(() => [String], { description: 'A list of target outputs' })
  payments!: string[];

  @Field(() => [String], { description: 'When provided, attempts to withdraw rewards from the default stake address corresponding to the given mnemonic.\n\nShould the rewards be null or too small to be worth withdrawing (i.e. the cost of adding them into the transaction\nis more than their own intrinsic value), the server will reject the request with a `withdrawal_not_worth` error.\n\nwithdrawal field    | reward balance | result\n---                 | ---            | ---\nany recovery phrase | too small      | x Error 403 `withdrawal_not_worth`\nany recovery phrase | big enough     | ✓ withdrawal generated\n' })
  withdrawal?: string[];

  @Field({ nullable: true, description: 'Extra application data attached to the transaction.\n\nCardano allows users and developers to embed their own\nauthenticated metadata when submitting transactions. Metadata can\nbe expressed as a JSON object with some restrictions:\n\n1. All top-level keys must be integers between `0` and `2^64 - 1`.\n\n2. Each metadata value is tagged with its type.\n\n3. Strings must be at most 64 bytes when UTF-8 encoded.\n\n4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.\n\nMetadata aren\'t stored as JSON on the Cardano blockchain but are\ninstead stored using a compact binary encoding (CBOR).\n\nThe binary encoding of metadata values supports three simple types:\n\n* Integers in the range `-(2^64 - 1)` to `2^64 - 1`\n* Strings (UTF-8 encoded)\n* Bytestrings\n\nAnd two compound types:\n\n* Lists of metadata values\n* Mappings from metadata values to metadata values\n\nIt is possible to transform any JSON object into this schema.\n\nHowever, if your application uses floating point values, they will\nneed to be converted somehow, according to your\nrequirements. Likewise for `null` or `bool` values. When reading\nmetadata from chain, be aware that integers may exceed the\njavascript numeric range, and may need special "bigint" parsing.\n' })
  metadata?: string;

  @Field({ description: 'The TTL (time to live) is the time period in which the transaction\nwill be accepted into node mempools.\n\nAfter the TTL has lapsed, the transaction is considered\nexpired. At this point, nodes will give up on broadcasting the\ntransaction, and the wallet will release the funds allocated to\nthe transaction so they can be used for other payments.\n\nThe TTL should be long enough that the transaction has time to be\npropagated through the network and confirmed, but short enough so\nthat - in the event of failures - UTxO are returned to the wallet\nin a timely manner.\n\nThe TTL value is given in seconds. It will be converted to a slot\nnumber internally.\n\nIf the TTL is not provided for a payment, a reasonable default\nvalue will be used.\n' })
  time_to_live?: string;
}

@InputType()
export class PostWalletsWalletIdTransactionsInput {
  @Field({ description: 'The wallet\'s master passphrase.' })
  passphrase!: string;

  @Field(() => [String], { description: 'A list of target outputs' })
  payments!: string[];

  @Field(() => [String], { description: 'When provided, attempts to withdraw rewards from the default stake address corresponding to the given mnemonic.\n\nShould the rewards be null or too small to be worth withdrawing (i.e. the cost of adding them into the transaction\nis more than their own intrinsic value), the server will reject the request with a `withdrawal_not_worth` error.\n\nwithdrawal field    | reward balance | result\n---                 | ---            | ---\nany recovery phrase | too small      | x Error 403 `withdrawal_not_worth`\nany recovery phrase | big enough     | ✓ withdrawal generated\n' })
  withdrawal?: string[];

  @Field({ nullable: true, description: 'Extra application data attached to the transaction.\n\nCardano allows users and developers to embed their own\nauthenticated metadata when submitting transactions. Metadata can\nbe expressed as a JSON object with some restrictions:\n\n1. All top-level keys must be integers between `0` and `2^64 - 1`.\n\n2. Each metadata value is tagged with its type.\n\n3. Strings must be at most 64 bytes when UTF-8 encoded.\n\n4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.\n\nMetadata aren\'t stored as JSON on the Cardano blockchain but are\ninstead stored using a compact binary encoding (CBOR).\n\nThe binary encoding of metadata values supports three simple types:\n\n* Integers in the range `-(2^64 - 1)` to `2^64 - 1`\n* Strings (UTF-8 encoded)\n* Bytestrings\n\nAnd two compound types:\n\n* Lists of metadata values\n* Mappings from metadata values to metadata values\n\nIt is possible to transform any JSON object into this schema.\n\nHowever, if your application uses floating point values, they will\nneed to be converted somehow, according to your\nrequirements. Likewise for `null` or `bool` values. When reading\nmetadata from chain, be aware that integers may exceed the\njavascript numeric range, and may need special "bigint" parsing.\n' })
  metadata?: string;

  @Field({ description: 'The TTL (time to live) is the time period in which the transaction\nwill be accepted into node mempools.\n\nAfter the TTL has lapsed, the transaction is considered\nexpired. At this point, nodes will give up on broadcasting the\ntransaction, and the wallet will release the funds allocated to\nthe transaction so they can be used for other payments.\n\nThe TTL should be long enough that the transaction has time to be\npropagated through the network and confirmed, but short enough so\nthat - in the event of failures - UTxO are returned to the wallet\nin a timely manner.\n\nThe TTL value is given in seconds. It will be converted to a slot\nnumber internally.\n\nIf the TTL is not provided for a payment, a reasonable default\nvalue will be used.\n' })
  time_to_live?: string;
}
