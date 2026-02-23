/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { GetWalletsResponseStatus, GetWalletsResponseUnit, GetWalletsWalletIdResponseStatus, GetWalletsWalletIdResponseUnit, GetWalletsWalletIdStatisticsUtxosResponseScale, GetWalletsWalletIdStatisticsUtxosResponseUnit, PostWalletsResponseStatus, PostWalletsResponseUnit, PutWalletsWalletIdResponseStatus, PutWalletsWalletIdResponseUnit } from '../enums';

@ObjectType()
export class GetWalletsResponseBalance {
  @Field(() => GetWalletsResponseBalanceAvailable, { description: 'Available UTxO balance (funds that can be spent without condition).' })
  available!: GetWalletsResponseBalanceAvailable;

  @Field(() => GetWalletsResponseBalanceReward, { description: 'The balance of the reward account for this wallet.' })
  reward!: GetWalletsResponseBalanceReward;

  @Field(() => GetWalletsResponseBalanceTotal, { description: 'Total balance (available balance plus pending change and reward balance).' })
  total!: GetWalletsResponseBalanceTotal;
}

@ObjectType()
export class GetWalletsResponseBalanceAvailable {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsResponseUnit)
  unit!: GetWalletsResponseUnit;
}

@ObjectType()
export class GetWalletsResponseBalanceReward {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsResponseUnit)
  unit!: GetWalletsResponseUnit;
}

@ObjectType()
export class GetWalletsResponseBalanceTotal {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsResponseUnit)
  unit!: GetWalletsResponseUnit;
}

@ObjectType()
export class GetWalletsResponseDelegation {
  @Field(() => GetWalletsResponseDelegationActive, { description: 'Currently active delegation status.' })
  active!: GetWalletsResponseDelegationActive;

  @Field(() => [GetWalletsResponseDelegationNext])
  next!: GetWalletsResponseDelegationNext[];
}

@ObjectType()
export class GetWalletsResponseDelegationActive {
  @Field(() => GetWalletsResponseStatus)
  status!: GetWalletsResponseStatus;

  @Field({ description: 'A unique Stake-Pool identifier (present only if status = `delegating`)' })
  target?: string;
}

@ObjectType()
export class GetWalletsResponseDelegationNext {
  @Field(() => GetWalletsResponseStatus)
  status!: GetWalletsResponseStatus;

  @Field({ description: 'A unique Stake-Pool identifier (present only if status = `delegating`)' })
  target?: string;

  @Field(() => GetWalletsResponseDelegationNextChangesAt)
  changes_at!: GetWalletsResponseDelegationNextChangesAt;
}

@ObjectType()
export class GetWalletsResponseDelegationNextChangesAt {
  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  epoch_start_time!: string;
}

@ObjectType()
export class GetWalletsResponsePassphrase {
  @Field()
  last_updated_at!: string;
}

@ObjectType()
export class GetWalletsResponseState {
  @Field(() => GetWalletsResponseStatus)
  status!: GetWalletsResponseStatus;

  @Field(() => GetWalletsResponseStateProgress, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == syncing\n</span><br/>\n' })
  progress?: GetWalletsResponseStateProgress;
}

@ObjectType()
export class GetWalletsResponseStateProgress {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsResponseUnit)
  unit!: GetWalletsResponseUnit;
}

@ObjectType()
export class GetWalletsResponseTip {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => GetWalletsResponseTipHeight)
  height!: GetWalletsResponseTipHeight;
}

@ObjectType()
export class GetWalletsResponseTipHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsResponseUnit)
  unit!: GetWalletsResponseUnit;
}

@ObjectType()
export class PostWalletsResponseBalance {
  @Field(() => PostWalletsResponseBalanceAvailable, { description: 'Available UTxO balance (funds that can be spent without condition).' })
  available!: PostWalletsResponseBalanceAvailable;

  @Field(() => PostWalletsResponseBalanceReward, { description: 'The balance of the reward account for this wallet.' })
  reward!: PostWalletsResponseBalanceReward;

  @Field(() => PostWalletsResponseBalanceTotal, { description: 'Total balance (available balance plus pending change and reward balance).' })
  total!: PostWalletsResponseBalanceTotal;
}

@ObjectType()
export class PostWalletsResponseBalanceAvailable {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsResponseUnit)
  unit!: PostWalletsResponseUnit;
}

@ObjectType()
export class PostWalletsResponseBalanceReward {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsResponseUnit)
  unit!: PostWalletsResponseUnit;
}

@ObjectType()
export class PostWalletsResponseBalanceTotal {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsResponseUnit)
  unit!: PostWalletsResponseUnit;
}

@ObjectType()
export class PostWalletsResponseDelegation {
  @Field(() => PostWalletsResponseDelegationActive, { description: 'Currently active delegation status.' })
  active!: PostWalletsResponseDelegationActive;

  @Field(() => [PostWalletsResponseDelegationNext])
  next!: PostWalletsResponseDelegationNext[];
}

@ObjectType()
export class PostWalletsResponseDelegationActive {
  @Field(() => PostWalletsResponseStatus)
  status!: PostWalletsResponseStatus;

  @Field({ description: 'A unique Stake-Pool identifier (present only if status = `delegating`)' })
  target?: string;
}

@ObjectType()
export class PostWalletsResponseDelegationNext {
  @Field(() => PostWalletsResponseStatus)
  status!: PostWalletsResponseStatus;

  @Field({ description: 'A unique Stake-Pool identifier (present only if status = `delegating`)' })
  target?: string;

  @Field(() => PostWalletsResponseDelegationNextChangesAt)
  changes_at!: PostWalletsResponseDelegationNextChangesAt;
}

@ObjectType()
export class PostWalletsResponseDelegationNextChangesAt {
  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  epoch_start_time!: string;
}

@ObjectType()
export class PostWalletsResponsePassphrase {
  @Field()
  last_updated_at!: string;
}

@ObjectType()
export class PostWalletsResponseState {
  @Field(() => PostWalletsResponseStatus)
  status!: PostWalletsResponseStatus;

  @Field(() => PostWalletsResponseStateProgress, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == syncing\n</span><br/>\n' })
  progress?: PostWalletsResponseStateProgress;
}

@ObjectType()
export class PostWalletsResponseStateProgress {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsResponseUnit)
  unit!: PostWalletsResponseUnit;
}

@ObjectType()
export class PostWalletsResponseTip {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => PostWalletsResponseTipHeight)
  height!: PostWalletsResponseTipHeight;
}

@ObjectType()
export class PostWalletsResponseTipHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PostWalletsResponseUnit)
  unit!: PostWalletsResponseUnit;
}

@ObjectType()
export class GetWalletsWalletIdStatisticsUtxosResponseTotal {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsWalletIdStatisticsUtxosResponseUnit)
  unit!: GetWalletsWalletIdStatisticsUtxosResponseUnit;
}

@ObjectType()
export class GetWalletsWalletIdResponseBalance {
  @Field(() => GetWalletsWalletIdResponseBalanceAvailable, { description: 'Available UTxO balance (funds that can be spent without condition).' })
  available!: GetWalletsWalletIdResponseBalanceAvailable;

  @Field(() => GetWalletsWalletIdResponseBalanceReward, { description: 'The balance of the reward account for this wallet.' })
  reward!: GetWalletsWalletIdResponseBalanceReward;

  @Field(() => GetWalletsWalletIdResponseBalanceTotal, { description: 'Total balance (available balance plus pending change and reward balance).' })
  total!: GetWalletsWalletIdResponseBalanceTotal;
}

@ObjectType()
export class GetWalletsWalletIdResponseBalanceAvailable {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsWalletIdResponseUnit)
  unit!: GetWalletsWalletIdResponseUnit;
}

@ObjectType()
export class GetWalletsWalletIdResponseBalanceReward {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsWalletIdResponseUnit)
  unit!: GetWalletsWalletIdResponseUnit;
}

@ObjectType()
export class GetWalletsWalletIdResponseBalanceTotal {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsWalletIdResponseUnit)
  unit!: GetWalletsWalletIdResponseUnit;
}

@ObjectType()
export class GetWalletsWalletIdResponseDelegation {
  @Field(() => GetWalletsWalletIdResponseDelegationActive, { description: 'Currently active delegation status.' })
  active!: GetWalletsWalletIdResponseDelegationActive;

  @Field(() => [GetWalletsWalletIdResponseDelegationNext])
  next!: GetWalletsWalletIdResponseDelegationNext[];
}

@ObjectType()
export class GetWalletsWalletIdResponseDelegationActive {
  @Field(() => GetWalletsWalletIdResponseStatus)
  status!: GetWalletsWalletIdResponseStatus;

  @Field({ description: 'A unique Stake-Pool identifier (present only if status = `delegating`)' })
  target?: string;
}

@ObjectType()
export class GetWalletsWalletIdResponseDelegationNext {
  @Field(() => GetWalletsWalletIdResponseStatus)
  status!: GetWalletsWalletIdResponseStatus;

  @Field({ description: 'A unique Stake-Pool identifier (present only if status = `delegating`)' })
  target?: string;

  @Field(() => GetWalletsWalletIdResponseDelegationNextChangesAt)
  changes_at!: GetWalletsWalletIdResponseDelegationNextChangesAt;
}

@ObjectType()
export class GetWalletsWalletIdResponseDelegationNextChangesAt {
  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  epoch_start_time!: string;
}

@ObjectType()
export class GetWalletsWalletIdResponsePassphrase {
  @Field()
  last_updated_at!: string;
}

@ObjectType()
export class GetWalletsWalletIdResponseState {
  @Field(() => GetWalletsWalletIdResponseStatus)
  status!: GetWalletsWalletIdResponseStatus;

  @Field(() => GetWalletsWalletIdResponseStateProgress, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == syncing\n</span><br/>\n' })
  progress?: GetWalletsWalletIdResponseStateProgress;
}

@ObjectType()
export class GetWalletsWalletIdResponseStateProgress {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsWalletIdResponseUnit)
  unit!: GetWalletsWalletIdResponseUnit;
}

@ObjectType()
export class GetWalletsWalletIdResponseTip {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => GetWalletsWalletIdResponseTipHeight)
  height!: GetWalletsWalletIdResponseTipHeight;
}

@ObjectType()
export class GetWalletsWalletIdResponseTipHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => GetWalletsWalletIdResponseUnit)
  unit!: GetWalletsWalletIdResponseUnit;
}

@ObjectType()
export class PutWalletsWalletIdResponseBalance {
  @Field(() => PutWalletsWalletIdResponseBalanceAvailable, { description: 'Available UTxO balance (funds that can be spent without condition).' })
  available!: PutWalletsWalletIdResponseBalanceAvailable;

  @Field(() => PutWalletsWalletIdResponseBalanceReward, { description: 'The balance of the reward account for this wallet.' })
  reward!: PutWalletsWalletIdResponseBalanceReward;

  @Field(() => PutWalletsWalletIdResponseBalanceTotal, { description: 'Total balance (available balance plus pending change and reward balance).' })
  total!: PutWalletsWalletIdResponseBalanceTotal;
}

@ObjectType()
export class PutWalletsWalletIdResponseBalanceAvailable {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PutWalletsWalletIdResponseUnit)
  unit!: PutWalletsWalletIdResponseUnit;
}

@ObjectType()
export class PutWalletsWalletIdResponseBalanceReward {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PutWalletsWalletIdResponseUnit)
  unit!: PutWalletsWalletIdResponseUnit;
}

@ObjectType()
export class PutWalletsWalletIdResponseBalanceTotal {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PutWalletsWalletIdResponseUnit)
  unit!: PutWalletsWalletIdResponseUnit;
}

@ObjectType()
export class PutWalletsWalletIdResponseDelegation {
  @Field(() => PutWalletsWalletIdResponseDelegationActive, { description: 'Currently active delegation status.' })
  active!: PutWalletsWalletIdResponseDelegationActive;

  @Field(() => [PutWalletsWalletIdResponseDelegationNext])
  next!: PutWalletsWalletIdResponseDelegationNext[];
}

@ObjectType()
export class PutWalletsWalletIdResponseDelegationActive {
  @Field(() => PutWalletsWalletIdResponseStatus)
  status!: PutWalletsWalletIdResponseStatus;

  @Field({ description: 'A unique Stake-Pool identifier (present only if status = `delegating`)' })
  target?: string;
}

@ObjectType()
export class PutWalletsWalletIdResponseDelegationNext {
  @Field(() => PutWalletsWalletIdResponseStatus)
  status!: PutWalletsWalletIdResponseStatus;

  @Field({ description: 'A unique Stake-Pool identifier (present only if status = `delegating`)' })
  target?: string;

  @Field(() => PutWalletsWalletIdResponseDelegationNextChangesAt)
  changes_at!: PutWalletsWalletIdResponseDelegationNextChangesAt;
}

@ObjectType()
export class PutWalletsWalletIdResponseDelegationNextChangesAt {
  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  epoch_start_time!: string;
}

@ObjectType()
export class PutWalletsWalletIdResponsePassphrase {
  @Field()
  last_updated_at!: string;
}

@ObjectType()
export class PutWalletsWalletIdResponseState {
  @Field(() => PutWalletsWalletIdResponseStatus)
  status!: PutWalletsWalletIdResponseStatus;

  @Field(() => PutWalletsWalletIdResponseStateProgress, { description: '<span style="position: relative; left: 35px; top: -21px; vertical-align: middle; background-color: rgba(142, 142, 220, 0.05); color: rgba(50, 50, 159, 0.9); margin: 0 5px; padding: 0 5px; border: 1px solid rgba(50, 50, 159, 0.1); line-height: 20px; font-size: 13px; border-radius: 2px;">\n<strong>if:</strong> status == syncing\n</span><br/>\n' })
  progress?: PutWalletsWalletIdResponseStateProgress;
}

@ObjectType()
export class PutWalletsWalletIdResponseStateProgress {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PutWalletsWalletIdResponseUnit)
  unit!: PutWalletsWalletIdResponseUnit;
}

@ObjectType()
export class PutWalletsWalletIdResponseTip {
  @Field(() => Float, { description: 'The 0-based slot index starting from genesis of the blockchain.' })
  absolute_slot_number!: number;

  @Field(() => Float, { description: 'The zero-based slot index within an epoch.' })
  slot_number!: number;

  @Field(() => Float, { description: 'An epoch is a time period which is divided into slots.' })
  epoch_number!: number;

  @Field()
  time!: string;

  @Field(() => PutWalletsWalletIdResponseTipHeight)
  height!: PutWalletsWalletIdResponseTipHeight;
}

@ObjectType()
export class PutWalletsWalletIdResponseTipHeight {
  @Field(() => Float)
  quantity!: number;

  @Field(() => PutWalletsWalletIdResponseUnit)
  unit!: PutWalletsWalletIdResponseUnit;
}

@ObjectType()
export class GetWalletsResponse {
  @Field({ description: 'A unique identifier for the wallet' })
  id!: string;

  @Field(() => Float, { description: 'Number of consecutive unused addresses allowed.\n\n**IMPORTANT DISCLAIMER:** Using values other than `20` automatically makes your wallet invalid with regards to BIP-44 address discovery. It means that you **will not** be able to fully restore\nyour wallet in a different software which is strictly following BIP-44.\n\nBeside, using large gaps is **not recommended** as it may induce important performance degradations. Use at your own risks.\n' })
  address_pool_gap!: number;

  @Field(() => GetWalletsResponseBalance, { description: 'Wallet current balance(s)' })
  balance!: GetWalletsResponseBalance;

  @Field(() => GetWalletsResponseDelegation, { description: 'Delegation settings' })
  delegation!: GetWalletsResponseDelegation;

  @Field()
  name!: string;

  @Field(() => GetWalletsResponsePassphrase, { description: 'Information about the wallet\'s passphrase' })
  passphrase?: GetWalletsResponsePassphrase;

  @Field(() => GetWalletsResponseState, { description: 'Whether a wallet is ready to use or still syncing' })
  state!: GetWalletsResponseState;

  @Field(() => GetWalletsResponseTip, { description: 'A reference to a particular time slot, and the block height at that point.' })
  tip!: GetWalletsResponseTip;
}

@ObjectType()
export class PostWalletsResponse {
  @Field({ description: 'A unique identifier for the wallet' })
  id!: string;

  @Field(() => Float, { description: 'Number of consecutive unused addresses allowed.\n\n**IMPORTANT DISCLAIMER:** Using values other than `20` automatically makes your wallet invalid with regards to BIP-44 address discovery. It means that you **will not** be able to fully restore\nyour wallet in a different software which is strictly following BIP-44.\n\nBeside, using large gaps is **not recommended** as it may induce important performance degradations. Use at your own risks.\n' })
  address_pool_gap!: number;

  @Field(() => PostWalletsResponseBalance, { description: 'Wallet current balance(s)' })
  balance!: PostWalletsResponseBalance;

  @Field(() => PostWalletsResponseDelegation, { description: 'Delegation settings' })
  delegation!: PostWalletsResponseDelegation;

  @Field()
  name!: string;

  @Field(() => PostWalletsResponsePassphrase, { description: 'Information about the wallet\'s passphrase' })
  passphrase?: PostWalletsResponsePassphrase;

  @Field(() => PostWalletsResponseState, { description: 'Whether a wallet is ready to use or still syncing' })
  state!: PostWalletsResponseState;

  @Field(() => PostWalletsResponseTip, { description: 'A reference to a particular time slot, and the block height at that point.' })
  tip!: PostWalletsResponseTip;
}

@ObjectType()
export class GetWalletsWalletIdStatisticsUtxosResponse {
  @Field(() => GetWalletsWalletIdStatisticsUtxosResponseTotal, { description: 'Coins, in Lovelace' })
  total!: GetWalletsWalletIdStatisticsUtxosResponseTotal;

  @Field(() => GetWalletsWalletIdStatisticsUtxosResponseScale)
  scale!: GetWalletsWalletIdStatisticsUtxosResponseScale;

  @Field(() => String)
  distribution!: string;
}

@ObjectType()
export class GetWalletsWalletIdResponse {
  @Field({ description: 'A unique identifier for the wallet' })
  id!: string;

  @Field(() => Float, { description: 'Number of consecutive unused addresses allowed.\n\n**IMPORTANT DISCLAIMER:** Using values other than `20` automatically makes your wallet invalid with regards to BIP-44 address discovery. It means that you **will not** be able to fully restore\nyour wallet in a different software which is strictly following BIP-44.\n\nBeside, using large gaps is **not recommended** as it may induce important performance degradations. Use at your own risks.\n' })
  address_pool_gap!: number;

  @Field(() => GetWalletsWalletIdResponseBalance, { description: 'Wallet current balance(s)' })
  balance!: GetWalletsWalletIdResponseBalance;

  @Field(() => GetWalletsWalletIdResponseDelegation, { description: 'Delegation settings' })
  delegation!: GetWalletsWalletIdResponseDelegation;

  @Field()
  name!: string;

  @Field(() => GetWalletsWalletIdResponsePassphrase, { description: 'Information about the wallet\'s passphrase' })
  passphrase?: GetWalletsWalletIdResponsePassphrase;

  @Field(() => GetWalletsWalletIdResponseState, { description: 'Whether a wallet is ready to use or still syncing' })
  state!: GetWalletsWalletIdResponseState;

  @Field(() => GetWalletsWalletIdResponseTip, { description: 'A reference to a particular time slot, and the block height at that point.' })
  tip!: GetWalletsWalletIdResponseTip;
}

@ObjectType()
export class PutWalletsWalletIdResponse {
  @Field({ description: 'A unique identifier for the wallet' })
  id!: string;

  @Field(() => Float, { description: 'Number of consecutive unused addresses allowed.\n\n**IMPORTANT DISCLAIMER:** Using values other than `20` automatically makes your wallet invalid with regards to BIP-44 address discovery. It means that you **will not** be able to fully restore\nyour wallet in a different software which is strictly following BIP-44.\n\nBeside, using large gaps is **not recommended** as it may induce important performance degradations. Use at your own risks.\n' })
  address_pool_gap!: number;

  @Field(() => PutWalletsWalletIdResponseBalance, { description: 'Wallet current balance(s)' })
  balance!: PutWalletsWalletIdResponseBalance;

  @Field(() => PutWalletsWalletIdResponseDelegation, { description: 'Delegation settings' })
  delegation!: PutWalletsWalletIdResponseDelegation;

  @Field()
  name!: string;

  @Field(() => PutWalletsWalletIdResponsePassphrase, { description: 'Information about the wallet\'s passphrase' })
  passphrase?: PutWalletsWalletIdResponsePassphrase;

  @Field(() => PutWalletsWalletIdResponseState, { description: 'Whether a wallet is ready to use or still syncing' })
  state!: PutWalletsWalletIdResponseState;

  @Field(() => PutWalletsWalletIdResponseTip, { description: 'A reference to a particular time slot, and the block height at that point.' })
  tip!: PutWalletsWalletIdResponseTip;
}
