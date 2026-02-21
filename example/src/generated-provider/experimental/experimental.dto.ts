/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class PostWalletsWalletIdSignaturesRoleIndexInput {
  @Field({ description: 'A master passphrase to lock and protect the wallet for sensitive operation (e.g. sending funds)' })
  passphrase!: string;

  @Field({ nullable: true, description: 'Extra application data attached to the transaction.\n\nCardano allows users and developers to embed their own\nauthenticated metadata when submitting transactions. Metadata can\nbe expressed as a JSON object with some restrictions:\n\n1. All top-level keys must be integers between `0` and `2^64 - 1`.\n\n2. Each metadata value is tagged with its type.\n\n3. Strings must be at most 64 bytes when UTF-8 encoded.\n\n4. Bytestrings are hex-encoded, with a maximum length of 64 bytes.\n\nMetadata aren\'t stored as JSON on the Cardano blockchain but are\ninstead stored using a compact binary encoding (CBOR).\n\nThe binary encoding of metadata values supports three simple types:\n\n* Integers in the range `-(2^64 - 1)` to `2^64 - 1`\n* Strings (UTF-8 encoded)\n* Bytestrings\n\nAnd two compound types:\n\n* Lists of metadata values\n* Mappings from metadata values to metadata values\n\nIt is possible to transform any JSON object into this schema.\n\nHowever, if your application uses floating point values, they will\nneed to be converted somehow, according to your\nrequirements. Likewise for `null` or `bool` values. When reading\nmetadata from chain, be aware that integers may exceed the\njavascript numeric range, and may need special "bigint" parsing.\n' })
  metadata?: string;
}
