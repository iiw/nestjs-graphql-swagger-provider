/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { GetByronWalletsResponseDiscovery, GetByronWalletsResponseStatus, GetByronWalletsResponseUnit, GetByronWalletsWalletIdResponseDiscovery, GetByronWalletsWalletIdResponseStatus, GetByronWalletsWalletIdResponseUnit, GetByronWalletsWalletIdStatisticsUtxosResponseScale, GetByronWalletsWalletIdStatisticsUtxosResponseUnit, PostByronWalletsResponseDiscovery, PostByronWalletsResponseStatus, PostByronWalletsResponseUnit, PutByronWalletsWalletIdResponseStatus, PutByronWalletsWalletIdResponseUnit } from '../enums';

@ObjectType()
export class GetByronWalletsResponse {
  @Field({ description: 'A unique identifier for the wallet' })
  id!: string;

  @Field({ description: 'Byron wallet\'s current balance(s)' })
  balance!: string;

  @Field(() => GetByronWalletsResponseDiscovery, { description: 'Mechanism used for discovering addresses.' })
  discovery!: GetByronWalletsResponseDiscovery;

  @Field()
  name!: string;

  @Field({ description: 'Information about the wallet\'s passphrase' })
  passphrase?: string;

  @Field({ description: 'Whether a wallet is ready to use or still syncing' })
  state!: string;

  @Field({ description: 'A reference to a particular time slot, and the block height at that point.' })
  tip!: string;
}

@ObjectType()
export class PostByronWalletsResponse {
  @Field({ description: 'A unique identifier for the wallet' })
  id!: string;

  @Field({ description: 'Byron wallet\'s current balance(s)' })
  balance!: string;

  @Field(() => PostByronWalletsResponseDiscovery, { description: 'Mechanism used for discovering addresses.' })
  discovery!: PostByronWalletsResponseDiscovery;

  @Field()
  name!: string;

  @Field({ description: 'Information about the wallet\'s passphrase' })
  passphrase?: string;

  @Field({ description: 'Whether a wallet is ready to use or still syncing' })
  state!: string;

  @Field({ description: 'A reference to a particular time slot, and the block height at that point.' })
  tip!: string;
}

@ObjectType()
export class GetByronWalletsWalletIdStatisticsUtxosResponse {
  @Field({ description: 'Coins, in Lovelace' })
  total!: string;

  @Field(() => GetByronWalletsWalletIdStatisticsUtxosResponseScale)
  scale!: GetByronWalletsWalletIdStatisticsUtxosResponseScale;

  @Field()
  distribution!: string;
}

@ObjectType()
export class GetByronWalletsWalletIdResponse {
  @Field({ description: 'A unique identifier for the wallet' })
  id!: string;

  @Field({ description: 'Byron wallet\'s current balance(s)' })
  balance!: string;

  @Field(() => GetByronWalletsWalletIdResponseDiscovery, { description: 'Mechanism used for discovering addresses.' })
  discovery!: GetByronWalletsWalletIdResponseDiscovery;

  @Field()
  name!: string;

  @Field({ description: 'Information about the wallet\'s passphrase' })
  passphrase?: string;

  @Field({ description: 'Whether a wallet is ready to use or still syncing' })
  state!: string;

  @Field({ description: 'A reference to a particular time slot, and the block height at that point.' })
  tip!: string;
}

@ObjectType()
export class PutByronWalletsWalletIdResponse {
  @Field({ description: 'A unique identifier for the wallet' })
  id!: string;

  @Field(() => Float, { description: 'Number of consecutive unused addresses allowed.\n\n**IMPORTANT DISCLAIMER:** Using values other than `20` automatically makes your wallet invalid with regards to BIP-44 address discovery. It means that you **will not** be able to fully restore\nyour wallet in a different software which is strictly following BIP-44.\n\nBeside, using large gaps is **not recommended** as it may induce important performance degradations. Use at your own risks.\n' })
  address_pool_gap!: number;

  @Field({ description: 'Wallet current balance(s)' })
  balance!: string;

  @Field({ description: 'Delegation settings' })
  delegation!: string;

  @Field()
  name!: string;

  @Field({ description: 'Information about the wallet\'s passphrase' })
  passphrase?: string;

  @Field({ description: 'Whether a wallet is ready to use or still syncing' })
  state!: string;

  @Field({ description: 'A reference to a particular time slot, and the block height at that point.' })
  tip!: string;
}
