/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { GetByronWalletsResponseDiscovery, GetByronWalletsResponseStatus, GetByronWalletsResponseUnit, GetByronWalletsWalletIdResponseDiscovery, GetByronWalletsWalletIdResponseStatus, GetByronWalletsWalletIdResponseUnit, GetByronWalletsWalletIdStatisticsUtxosResponseScale, GetByronWalletsWalletIdStatisticsUtxosResponseUnit, PostByronWalletsResponseDiscovery, PostByronWalletsResponseStatus, PostByronWalletsResponseUnit, PutByronWalletsWalletIdResponseStatus, PutByronWalletsWalletIdResponseUnit } from '../enums';

@ObjectType()
export class GetByronWalletsResponseBalance {
  @Field(() => GetByronWalletsResponseBalanceAvailable, { description: 'Available balance (funds that can be spent)' })
  available!: GetByronWalletsResponseBalanceAvailable;

  @Field(() => GetByronWalletsResponseBalanceTotal, { description: 'Total balance (available balance plus pending change)' })
  total!: GetByronWalletsResponseBalanceTotal;
}

@ObjectType()
export class GetByronWalletsResponseBalanceAvailable {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsResponseUnit)
  unit!: GetByronWalletsResponseUnit;
}

@ObjectType()
export class GetByronWalletsResponseBalanceTotal {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsResponseUnit)
  unit!: GetByronWalletsResponseUnit;
}

@ObjectType()
export class GetByronWalletsResponsePassphrase {
  @Field()
  last_updated_at!: string;
}

@ObjectType()
export class GetByronWalletsResponseState {
  @Field(() => GetByronWalletsResponseStatus)
  status!: GetByronWalletsResponseStatus;

  @Field(() => GetByronWalletsResponseStateProgress, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == syncing\n</span><br/>\n' })
  progress?: GetByronWalletsResponseStateProgress;
}

@ObjectType()
export class GetByronWalletsResponseStateProgress {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsResponseUnit)
  unit!: GetByronWalletsResponseUnit;
}

@ObjectType()
export class GetByronWalletsResponseTip {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => GetByronWalletsResponseTipHeight)
  height!: GetByronWalletsResponseTipHeight;
}

@ObjectType()
export class GetByronWalletsResponseTipHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsResponseUnit)
  unit!: GetByronWalletsResponseUnit;
}

@ObjectType()
export class PostByronWalletsResponseBalance {
  @Field(() => PostByronWalletsResponseBalanceAvailable, { description: 'Available balance (funds that can be spent)' })
  available!: PostByronWalletsResponseBalanceAvailable;

  @Field(() => PostByronWalletsResponseBalanceTotal, { description: 'Total balance (available balance plus pending change)' })
  total!: PostByronWalletsResponseBalanceTotal;
}

@ObjectType()
export class PostByronWalletsResponseBalanceAvailable {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronWalletsResponseUnit)
  unit!: PostByronWalletsResponseUnit;
}

@ObjectType()
export class PostByronWalletsResponseBalanceTotal {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronWalletsResponseUnit)
  unit!: PostByronWalletsResponseUnit;
}

@ObjectType()
export class PostByronWalletsResponsePassphrase {
  @Field()
  last_updated_at!: string;
}

@ObjectType()
export class PostByronWalletsResponseState {
  @Field(() => PostByronWalletsResponseStatus)
  status!: PostByronWalletsResponseStatus;

  @Field(() => PostByronWalletsResponseStateProgress, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == syncing\n</span><br/>\n' })
  progress?: PostByronWalletsResponseStateProgress;
}

@ObjectType()
export class PostByronWalletsResponseStateProgress {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronWalletsResponseUnit)
  unit!: PostByronWalletsResponseUnit;
}

@ObjectType()
export class PostByronWalletsResponseTip {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => PostByronWalletsResponseTipHeight)
  height!: PostByronWalletsResponseTipHeight;
}

@ObjectType()
export class PostByronWalletsResponseTipHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostByronWalletsResponseUnit)
  unit!: PostByronWalletsResponseUnit;
}

@ObjectType()
export class GetByronWalletsWalletIdStatisticsUtxosResponseTotal {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsWalletIdStatisticsUtxosResponseUnit)
  unit!: GetByronWalletsWalletIdStatisticsUtxosResponseUnit;
}

@ObjectType()
export class GetByronWalletsWalletIdResponseBalance {
  @Field(() => GetByronWalletsWalletIdResponseBalanceAvailable, { description: 'Available balance (funds that can be spent)' })
  available!: GetByronWalletsWalletIdResponseBalanceAvailable;

  @Field(() => GetByronWalletsWalletIdResponseBalanceTotal, { description: 'Total balance (available balance plus pending change)' })
  total!: GetByronWalletsWalletIdResponseBalanceTotal;
}

@ObjectType()
export class GetByronWalletsWalletIdResponseBalanceAvailable {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsWalletIdResponseUnit)
  unit!: GetByronWalletsWalletIdResponseUnit;
}

@ObjectType()
export class GetByronWalletsWalletIdResponseBalanceTotal {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsWalletIdResponseUnit)
  unit!: GetByronWalletsWalletIdResponseUnit;
}

@ObjectType()
export class GetByronWalletsWalletIdResponsePassphrase {
  @Field()
  last_updated_at!: string;
}

@ObjectType()
export class GetByronWalletsWalletIdResponseState {
  @Field(() => GetByronWalletsWalletIdResponseStatus)
  status!: GetByronWalletsWalletIdResponseStatus;

  @Field(() => GetByronWalletsWalletIdResponseStateProgress, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == syncing\n</span><br/>\n' })
  progress?: GetByronWalletsWalletIdResponseStateProgress;
}

@ObjectType()
export class GetByronWalletsWalletIdResponseStateProgress {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsWalletIdResponseUnit)
  unit!: GetByronWalletsWalletIdResponseUnit;
}

@ObjectType()
export class GetByronWalletsWalletIdResponseTip {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => GetByronWalletsWalletIdResponseTipHeight)
  height!: GetByronWalletsWalletIdResponseTipHeight;
}

@ObjectType()
export class GetByronWalletsWalletIdResponseTipHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetByronWalletsWalletIdResponseUnit)
  unit!: GetByronWalletsWalletIdResponseUnit;
}

@ObjectType()
export class PutByronWalletsWalletIdResponseBalance {
  @Field(() => PutByronWalletsWalletIdResponseBalanceAvailable, { description: 'Available UTxO balance (funds that can be spent without condition).' })
  available!: PutByronWalletsWalletIdResponseBalanceAvailable;

  @Field(() => PutByronWalletsWalletIdResponseBalanceReward, { description: 'The balance of the reward account for this wallet.' })
  reward!: PutByronWalletsWalletIdResponseBalanceReward;

  @Field(() => PutByronWalletsWalletIdResponseBalanceTotal, { description: 'Total balance (available balance plus pending change and reward balance).' })
  total!: PutByronWalletsWalletIdResponseBalanceTotal;
}

@ObjectType()
export class PutByronWalletsWalletIdResponseBalanceAvailable {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PutByronWalletsWalletIdResponseUnit)
  unit!: PutByronWalletsWalletIdResponseUnit;
}

@ObjectType()
export class PutByronWalletsWalletIdResponseBalanceReward {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PutByronWalletsWalletIdResponseUnit)
  unit!: PutByronWalletsWalletIdResponseUnit;
}

@ObjectType()
export class PutByronWalletsWalletIdResponseBalanceTotal {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PutByronWalletsWalletIdResponseUnit)
  unit!: PutByronWalletsWalletIdResponseUnit;
}

@ObjectType()
export class PutByronWalletsWalletIdResponseDelegation {
  @Field(() => PutByronWalletsWalletIdResponseDelegationActive, { description: 'Currently active delegation status.' })
  active!: PutByronWalletsWalletIdResponseDelegationActive;

  @Field(() => [PutByronWalletsWalletIdResponseDelegationNext])
  next!: PutByronWalletsWalletIdResponseDelegationNext[];
}

@ObjectType()
export class PutByronWalletsWalletIdResponseDelegationActive {
  @Field(() => PutByronWalletsWalletIdResponseStatus)
  status!: PutByronWalletsWalletIdResponseStatus;

  @Field({ description: 'A unique Stake-Pool identifier (present only if status = `delegating`)' })
  target?: string;
}

@ObjectType()
export class PutByronWalletsWalletIdResponseDelegationNext {
  @Field(() => PutByronWalletsWalletIdResponseStatus)
  status!: PutByronWalletsWalletIdResponseStatus;

  @Field({ description: 'A unique Stake-Pool identifier (present only if status = `delegating`)' })
  target?: string;

  @Field(() => PutByronWalletsWalletIdResponseDelegationNextChangesAt)
  changes_at!: PutByronWalletsWalletIdResponseDelegationNextChangesAt;
}

@ObjectType()
export class PutByronWalletsWalletIdResponseDelegationNextChangesAt {
  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  epoch_start_time!: string;
}

@ObjectType()
export class PutByronWalletsWalletIdResponsePassphrase {
  @Field()
  last_updated_at!: string;
}

@ObjectType()
export class PutByronWalletsWalletIdResponseState {
  @Field(() => PutByronWalletsWalletIdResponseStatus)
  status!: PutByronWalletsWalletIdResponseStatus;

  @Field(() => PutByronWalletsWalletIdResponseStateProgress, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == syncing\n</span><br/>\n' })
  progress?: PutByronWalletsWalletIdResponseStateProgress;
}

@ObjectType()
export class PutByronWalletsWalletIdResponseStateProgress {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PutByronWalletsWalletIdResponseUnit)
  unit!: PutByronWalletsWalletIdResponseUnit;
}

@ObjectType()
export class PutByronWalletsWalletIdResponseTip {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => PutByronWalletsWalletIdResponseTipHeight)
  height!: PutByronWalletsWalletIdResponseTipHeight;
}

@ObjectType()
export class PutByronWalletsWalletIdResponseTipHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PutByronWalletsWalletIdResponseUnit)
  unit!: PutByronWalletsWalletIdResponseUnit;
}

@ObjectType()
export class GetByronWalletsResponse {
  @Field({ description: 'A unique identifier for the wallet' })
  id!: string;

  @Field(() => GetByronWalletsResponseBalance, { description: 'Byron wallet\'s current balance(s)' })
  balance!: GetByronWalletsResponseBalance;

  @Field(() => GetByronWalletsResponseDiscovery, { description: 'Mechanism used for discovering addresses.' })
  discovery!: GetByronWalletsResponseDiscovery;

  @Field()
  name!: string;

  @Field(() => GetByronWalletsResponsePassphrase, { description: 'Information about the wallet\'s passphrase' })
  passphrase?: GetByronWalletsResponsePassphrase;

  @Field(() => GetByronWalletsResponseState, { description: 'Whether a wallet is ready to use or still syncing' })
  state!: GetByronWalletsResponseState;

  @Field(() => GetByronWalletsResponseTip, { description: 'A reference to a particular time slot, and the block height at that point.' })
  tip!: GetByronWalletsResponseTip;
}

@ObjectType()
export class PostByronWalletsResponse {
  @Field({ description: 'A unique identifier for the wallet' })
  id!: string;

  @Field(() => PostByronWalletsResponseBalance, { description: 'Byron wallet\'s current balance(s)' })
  balance!: PostByronWalletsResponseBalance;

  @Field(() => PostByronWalletsResponseDiscovery, { description: 'Mechanism used for discovering addresses.' })
  discovery!: PostByronWalletsResponseDiscovery;

  @Field()
  name!: string;

  @Field(() => PostByronWalletsResponsePassphrase, { description: 'Information about the wallet\'s passphrase' })
  passphrase?: PostByronWalletsResponsePassphrase;

  @Field(() => PostByronWalletsResponseState, { description: 'Whether a wallet is ready to use or still syncing' })
  state!: PostByronWalletsResponseState;

  @Field(() => PostByronWalletsResponseTip, { description: 'A reference to a particular time slot, and the block height at that point.' })
  tip!: PostByronWalletsResponseTip;
}

@ObjectType()
export class GetByronWalletsWalletIdStatisticsUtxosResponse {
  @Field(() => GetByronWalletsWalletIdStatisticsUtxosResponseTotal, { description: 'Coins, in Lovelace' })
  total!: GetByronWalletsWalletIdStatisticsUtxosResponseTotal;

  @Field(() => GetByronWalletsWalletIdStatisticsUtxosResponseScale)
  scale!: GetByronWalletsWalletIdStatisticsUtxosResponseScale;

  @Field(() => String)
  distribution!: string;
}

@ObjectType()
export class GetByronWalletsWalletIdResponse {
  @Field({ description: 'A unique identifier for the wallet' })
  id!: string;

  @Field(() => GetByronWalletsWalletIdResponseBalance, { description: 'Byron wallet\'s current balance(s)' })
  balance!: GetByronWalletsWalletIdResponseBalance;

  @Field(() => GetByronWalletsWalletIdResponseDiscovery, { description: 'Mechanism used for discovering addresses.' })
  discovery!: GetByronWalletsWalletIdResponseDiscovery;

  @Field()
  name!: string;

  @Field(() => GetByronWalletsWalletIdResponsePassphrase, { description: 'Information about the wallet\'s passphrase' })
  passphrase?: GetByronWalletsWalletIdResponsePassphrase;

  @Field(() => GetByronWalletsWalletIdResponseState, { description: 'Whether a wallet is ready to use or still syncing' })
  state!: GetByronWalletsWalletIdResponseState;

  @Field(() => GetByronWalletsWalletIdResponseTip, { description: 'A reference to a particular time slot, and the block height at that point.' })
  tip!: GetByronWalletsWalletIdResponseTip;
}

@ObjectType()
export class PutByronWalletsWalletIdResponse {
  @Field({ description: 'A unique identifier for the wallet' })
  id!: string;

  @Field(() => Float, { description: 'Number of consecutive unused addresses allowed.\n\n**IMPORTANT DISCLAIMER:** Using values other than `20` automatically makes your wallet invalid with regards to BIP-44 address discovery. It means that you **will not** be able to fully restore\nyour wallet in a different software which is strictly following BIP-44.\n\nBeside, using large gaps is **not recommended** as it may induce important performance degradations. Use at your own risks.\n' })
  address_pool_gap!: number;

  @Field(() => PutByronWalletsWalletIdResponseBalance, { description: 'Wallet current balance(s)' })
  balance!: PutByronWalletsWalletIdResponseBalance;

  @Field(() => PutByronWalletsWalletIdResponseDelegation, { description: 'Delegation settings' })
  delegation!: PutByronWalletsWalletIdResponseDelegation;

  @Field()
  name!: string;

  @Field(() => PutByronWalletsWalletIdResponsePassphrase, { description: 'Information about the wallet\'s passphrase' })
  passphrase?: PutByronWalletsWalletIdResponsePassphrase;

  @Field(() => PutByronWalletsWalletIdResponseState, { description: 'Whether a wallet is ready to use or still syncing' })
  state!: PutByronWalletsWalletIdResponseState;

  @Field(() => PutByronWalletsWalletIdResponseTip, { description: 'A reference to a particular time slot, and the block height at that point.' })
  tip!: PutByronWalletsWalletIdResponseTip;
}
