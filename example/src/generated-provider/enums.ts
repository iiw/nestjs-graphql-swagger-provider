/* eslint-disable */
import { registerEnumType } from '@nestjs/graphql';

export enum SignMetadataRole {
  UtxoExternal = 'utxo_external',
  UtxoInternal = 'utxo_internal',
  MutableAccount = 'mutable_account',
  MultisigScript = 'multisig_script'
}
registerEnumType(SignMetadataRole, { name: 'SignMetadataRole' });

export enum GetWalletsResponseUnit {
  Lovelace = 'lovelace'
}
registerEnumType(GetWalletsResponseUnit, { name: 'GetWalletsResponseUnit' });

export enum GetWalletsResponseStatus {
  NotDelegating = 'not_delegating',
  Delegating = 'delegating'
}
registerEnumType(GetWalletsResponseStatus, { name: 'GetWalletsResponseStatus' });

export enum PostWalletsResponseUnit {
  Lovelace = 'lovelace'
}
registerEnumType(PostWalletsResponseUnit, { name: 'PostWalletsResponseUnit' });

export enum PostWalletsResponseStatus {
  NotDelegating = 'not_delegating',
  Delegating = 'delegating'
}
registerEnumType(PostWalletsResponseStatus, { name: 'PostWalletsResponseStatus' });

export enum GetWalletsWalletIdStatisticsUtxosResponseUnit {
  Lovelace = 'lovelace'
}
registerEnumType(GetWalletsWalletIdStatisticsUtxosResponseUnit, { name: 'GetWalletsWalletIdStatisticsUtxosResponseUnit' });

export enum GetWalletsWalletIdStatisticsUtxosResponseScale {
  Log10 = 'log10'
}
registerEnumType(GetWalletsWalletIdStatisticsUtxosResponseScale, { name: 'GetWalletsWalletIdStatisticsUtxosResponseScale' });

export enum GetWalletsWalletIdResponseUnit {
  Lovelace = 'lovelace'
}
registerEnumType(GetWalletsWalletIdResponseUnit, { name: 'GetWalletsWalletIdResponseUnit' });

export enum GetWalletsWalletIdResponseStatus {
  NotDelegating = 'not_delegating',
  Delegating = 'delegating'
}
registerEnumType(GetWalletsWalletIdResponseStatus, { name: 'GetWalletsWalletIdResponseStatus' });

export enum PutWalletsWalletIdResponseUnit {
  Lovelace = 'lovelace'
}
registerEnumType(PutWalletsWalletIdResponseUnit, { name: 'PutWalletsWalletIdResponseUnit' });

export enum PutWalletsWalletIdResponseStatus {
  NotDelegating = 'not_delegating',
  Delegating = 'delegating'
}
registerEnumType(PutWalletsWalletIdResponseStatus, { name: 'PutWalletsWalletIdResponseStatus' });

export enum PostWalletsWalletIdPaymentFeesInputUnit {
  Second = 'second'
}
registerEnumType(PostWalletsWalletIdPaymentFeesInputUnit, { name: 'PostWalletsWalletIdPaymentFeesInputUnit' });

export enum GetWalletsWalletIdTransactionsResponseUnit {
  Lovelace = 'lovelace'
}
registerEnumType(GetWalletsWalletIdTransactionsResponseUnit, { name: 'GetWalletsWalletIdTransactionsResponseUnit' });

export enum GetWalletsWalletIdTransactionsResponseDirection {
  Outgoing = 'outgoing',
  Incoming = 'incoming'
}
registerEnumType(GetWalletsWalletIdTransactionsResponseDirection, { name: 'GetWalletsWalletIdTransactionsResponseDirection' });

export enum GetWalletsWalletIdTransactionsResponseStatus {
  Pending = 'pending',
  InLedger = 'in_ledger',
  Expired = 'expired'
}
registerEnumType(GetWalletsWalletIdTransactionsResponseStatus, { name: 'GetWalletsWalletIdTransactionsResponseStatus' });

export enum ListTransactionsOrder {
  Ascending = 'ascending',
  Descending = 'descending'
}
registerEnumType(ListTransactionsOrder, { name: 'ListTransactionsOrder' });

export enum PostWalletsWalletIdTransactionsInputUnit {
  Second = 'second'
}
registerEnumType(PostWalletsWalletIdTransactionsInputUnit, { name: 'PostWalletsWalletIdTransactionsInputUnit' });

export enum GetWalletsWalletIdTransactionsTransactionIdResponseUnit {
  Lovelace = 'lovelace'
}
registerEnumType(GetWalletsWalletIdTransactionsTransactionIdResponseUnit, { name: 'GetWalletsWalletIdTransactionsTransactionIdResponseUnit' });

export enum GetWalletsWalletIdTransactionsTransactionIdResponseDirection {
  Outgoing = 'outgoing',
  Incoming = 'incoming'
}
registerEnumType(GetWalletsWalletIdTransactionsTransactionIdResponseDirection, { name: 'GetWalletsWalletIdTransactionsTransactionIdResponseDirection' });

export enum GetWalletsWalletIdTransactionsTransactionIdResponseStatus {
  Pending = 'pending',
  InLedger = 'in_ledger',
  Expired = 'expired'
}
registerEnumType(GetWalletsWalletIdTransactionsTransactionIdResponseStatus, { name: 'GetWalletsWalletIdTransactionsTransactionIdResponseStatus' });

export enum GetWalletsWalletIdAddressesResponseState {
  Used = 'used',
  Unused = 'unused'
}
registerEnumType(GetWalletsWalletIdAddressesResponseState, { name: 'GetWalletsWalletIdAddressesResponseState' });

export enum ListAddressesState {
  Used = 'used',
  Unused = 'unused'
}
registerEnumType(ListAddressesState, { name: 'ListAddressesState' });

export enum GetAddressesAddressIdResponseAddressStyle {
  Shelley = 'Shelley',
  Icarus = 'Icarus',
  Byron = 'Byron'
}
registerEnumType(GetAddressesAddressIdResponseAddressStyle, { name: 'GetAddressesAddressIdResponseAddressStyle' });

export enum GetAddressesAddressIdResponseStakeReference {
  None = 'none',
  ByValue = 'by value',
  ByPointer = 'by pointer'
}
registerEnumType(GetAddressesAddressIdResponseStakeReference, { name: 'GetAddressesAddressIdResponseStakeReference' });

export enum GetWalletKeyRole {
  UtxoExternal = 'utxo_external',
  UtxoInternal = 'utxo_internal',
  MutableAccount = 'mutable_account',
  MultisigScript = 'multisig_script'
}
registerEnumType(GetWalletKeyRole, { name: 'GetWalletKeyRole' });

export enum GetStakePoolsResponseUnit {
  Lovelace = 'lovelace'
}
registerEnumType(GetStakePoolsResponseUnit, { name: 'GetStakePoolsResponseUnit' });

export enum GetStakePoolsResponseFlags {
  Delisted = 'delisted'
}
registerEnumType(GetStakePoolsResponseFlags, { name: 'GetStakePoolsResponseFlags' });

export enum GetStakePoolsMaintenanceActionsResponseStatus {
  NotApplicable = 'not_applicable',
  NotStarted = 'not_started',
  Restarting = 'restarting',
  HasRun = 'has_run'
}
registerEnumType(GetStakePoolsMaintenanceActionsResponseStatus, { name: 'GetStakePoolsMaintenanceActionsResponseStatus' });

export enum PostStakePoolsMaintenanceActionsInputMaintenanceAction {
  GcStakePools = 'gc_stake_pools'
}
registerEnumType(PostStakePoolsMaintenanceActionsInputMaintenanceAction, { name: 'PostStakePoolsMaintenanceActionsInputMaintenanceAction' });

export enum GetWalletsWalletIdDelegationFeesResponseUnit {
  Lovelace = 'lovelace'
}
registerEnumType(GetWalletsWalletIdDelegationFeesResponseUnit, { name: 'GetWalletsWalletIdDelegationFeesResponseUnit' });

export enum PostWalletsWalletIdCoinSelectionsRandomInputAction {
  Quit = 'quit',
  Join = 'join'
}
registerEnumType(PostWalletsWalletIdCoinSelectionsRandomInputAction, { name: 'PostWalletsWalletIdCoinSelectionsRandomInputAction' });

export enum GetWalletsWalletIdMigrationsResponseUnit {
  Lovelace = 'lovelace'
}
registerEnumType(GetWalletsWalletIdMigrationsResponseUnit, { name: 'GetWalletsWalletIdMigrationsResponseUnit' });

export enum PostWalletsWalletIdMigrationsResponseUnit {
  Lovelace = 'lovelace'
}
registerEnumType(PostWalletsWalletIdMigrationsResponseUnit, { name: 'PostWalletsWalletIdMigrationsResponseUnit' });

export enum PostWalletsWalletIdMigrationsResponseDirection {
  Outgoing = 'outgoing',
  Incoming = 'incoming'
}
registerEnumType(PostWalletsWalletIdMigrationsResponseDirection, { name: 'PostWalletsWalletIdMigrationsResponseDirection' });

export enum PostWalletsWalletIdMigrationsResponseStatus {
  Pending = 'pending',
  InLedger = 'in_ledger',
  Expired = 'expired'
}
registerEnumType(PostWalletsWalletIdMigrationsResponseStatus, { name: 'PostWalletsWalletIdMigrationsResponseStatus' });

export enum GetByronWalletsResponseUnit {
  Lovelace = 'lovelace'
}
registerEnumType(GetByronWalletsResponseUnit, { name: 'GetByronWalletsResponseUnit' });

export enum GetByronWalletsResponseDiscovery {
  Random = 'random',
  Sequential = 'sequential'
}
registerEnumType(GetByronWalletsResponseDiscovery, { name: 'GetByronWalletsResponseDiscovery' });

export enum GetByronWalletsResponseStatus {
  Ready = 'ready',
  Syncing = 'syncing',
  NotResponding = 'not_responding'
}
registerEnumType(GetByronWalletsResponseStatus, { name: 'GetByronWalletsResponseStatus' });

export enum PostByronWalletsResponseUnit {
  Lovelace = 'lovelace'
}
registerEnumType(PostByronWalletsResponseUnit, { name: 'PostByronWalletsResponseUnit' });

export enum PostByronWalletsResponseDiscovery {
  Random = 'random',
  Sequential = 'sequential'
}
registerEnumType(PostByronWalletsResponseDiscovery, { name: 'PostByronWalletsResponseDiscovery' });

export enum PostByronWalletsResponseStatus {
  Ready = 'ready',
  Syncing = 'syncing',
  NotResponding = 'not_responding'
}
registerEnumType(PostByronWalletsResponseStatus, { name: 'PostByronWalletsResponseStatus' });

export enum PostByronWalletsInputStyle {
  Random = 'random'
}
registerEnumType(PostByronWalletsInputStyle, { name: 'PostByronWalletsInputStyle' });

export enum GetByronWalletsWalletIdStatisticsUtxosResponseUnit {
  Lovelace = 'lovelace'
}
registerEnumType(GetByronWalletsWalletIdStatisticsUtxosResponseUnit, { name: 'GetByronWalletsWalletIdStatisticsUtxosResponseUnit' });

export enum GetByronWalletsWalletIdStatisticsUtxosResponseScale {
  Log10 = 'log10'
}
registerEnumType(GetByronWalletsWalletIdStatisticsUtxosResponseScale, { name: 'GetByronWalletsWalletIdStatisticsUtxosResponseScale' });

export enum GetByronWalletsWalletIdResponseUnit {
  Lovelace = 'lovelace'
}
registerEnumType(GetByronWalletsWalletIdResponseUnit, { name: 'GetByronWalletsWalletIdResponseUnit' });

export enum GetByronWalletsWalletIdResponseDiscovery {
  Random = 'random',
  Sequential = 'sequential'
}
registerEnumType(GetByronWalletsWalletIdResponseDiscovery, { name: 'GetByronWalletsWalletIdResponseDiscovery' });

export enum GetByronWalletsWalletIdResponseStatus {
  Ready = 'ready',
  Syncing = 'syncing',
  NotResponding = 'not_responding'
}
registerEnumType(GetByronWalletsWalletIdResponseStatus, { name: 'GetByronWalletsWalletIdResponseStatus' });

export enum PutByronWalletsWalletIdResponseUnit {
  Lovelace = 'lovelace'
}
registerEnumType(PutByronWalletsWalletIdResponseUnit, { name: 'PutByronWalletsWalletIdResponseUnit' });

export enum PutByronWalletsWalletIdResponseStatus {
  NotDelegating = 'not_delegating',
  Delegating = 'delegating'
}
registerEnumType(PutByronWalletsWalletIdResponseStatus, { name: 'PutByronWalletsWalletIdResponseStatus' });

export enum GetByronWalletsWalletIdAddressesResponseState {
  Used = 'used',
  Unused = 'unused'
}
registerEnumType(GetByronWalletsWalletIdAddressesResponseState, { name: 'GetByronWalletsWalletIdAddressesResponseState' });

export enum ListByronAddressesState {
  Used = 'used',
  Unused = 'unused'
}
registerEnumType(ListByronAddressesState, { name: 'ListByronAddressesState' });

export enum PostByronWalletsWalletIdAddressesResponseState {
  Used = 'used',
  Unused = 'unused'
}
registerEnumType(PostByronWalletsWalletIdAddressesResponseState, { name: 'PostByronWalletsWalletIdAddressesResponseState' });

export enum GetByronWalletsWalletIdTransactionsResponseUnit {
  Lovelace = 'lovelace'
}
registerEnumType(GetByronWalletsWalletIdTransactionsResponseUnit, { name: 'GetByronWalletsWalletIdTransactionsResponseUnit' });

export enum GetByronWalletsWalletIdTransactionsResponseDirection {
  Outgoing = 'outgoing',
  Incoming = 'incoming'
}
registerEnumType(GetByronWalletsWalletIdTransactionsResponseDirection, { name: 'GetByronWalletsWalletIdTransactionsResponseDirection' });

export enum GetByronWalletsWalletIdTransactionsResponseStatus {
  Pending = 'pending',
  InLedger = 'in_ledger',
  Expired = 'expired'
}
registerEnumType(GetByronWalletsWalletIdTransactionsResponseStatus, { name: 'GetByronWalletsWalletIdTransactionsResponseStatus' });

export enum ListByronTransactionsOrder {
  Ascending = 'ascending',
  Descending = 'descending'
}
registerEnumType(ListByronTransactionsOrder, { name: 'ListByronTransactionsOrder' });

export enum GetByronWalletsWalletIdTransactionsTransactionIdResponseUnit {
  Lovelace = 'lovelace'
}
registerEnumType(GetByronWalletsWalletIdTransactionsTransactionIdResponseUnit, { name: 'GetByronWalletsWalletIdTransactionsTransactionIdResponseUnit' });

export enum GetByronWalletsWalletIdTransactionsTransactionIdResponseDirection {
  Outgoing = 'outgoing',
  Incoming = 'incoming'
}
registerEnumType(GetByronWalletsWalletIdTransactionsTransactionIdResponseDirection, { name: 'GetByronWalletsWalletIdTransactionsTransactionIdResponseDirection' });

export enum GetByronWalletsWalletIdTransactionsTransactionIdResponseStatus {
  Pending = 'pending',
  InLedger = 'in_ledger',
  Expired = 'expired'
}
registerEnumType(GetByronWalletsWalletIdTransactionsTransactionIdResponseStatus, { name: 'GetByronWalletsWalletIdTransactionsTransactionIdResponseStatus' });

export enum GetByronWalletsWalletIdMigrationsResponseUnit {
  Lovelace = 'lovelace'
}
registerEnumType(GetByronWalletsWalletIdMigrationsResponseUnit, { name: 'GetByronWalletsWalletIdMigrationsResponseUnit' });

export enum PostByronWalletsWalletIdMigrationsResponseUnit {
  Lovelace = 'lovelace'
}
registerEnumType(PostByronWalletsWalletIdMigrationsResponseUnit, { name: 'PostByronWalletsWalletIdMigrationsResponseUnit' });

export enum PostByronWalletsWalletIdMigrationsResponseDirection {
  Outgoing = 'outgoing',
  Incoming = 'incoming'
}
registerEnumType(PostByronWalletsWalletIdMigrationsResponseDirection, { name: 'PostByronWalletsWalletIdMigrationsResponseDirection' });

export enum PostByronWalletsWalletIdMigrationsResponseStatus {
  Pending = 'pending',
  InLedger = 'in_ledger',
  Expired = 'expired'
}
registerEnumType(PostByronWalletsWalletIdMigrationsResponseStatus, { name: 'PostByronWalletsWalletIdMigrationsResponseStatus' });

export enum GetNetworkInformationResponseStatus {
  Ready = 'ready',
  Syncing = 'syncing',
  NotResponding = 'not_responding'
}
registerEnumType(GetNetworkInformationResponseStatus, { name: 'GetNetworkInformationResponseStatus' });

export enum GetNetworkInformationResponseUnit {
  Percent = 'percent'
}
registerEnumType(GetNetworkInformationResponseUnit, { name: 'GetNetworkInformationResponseUnit' });

export enum GetNetworkClockResponseStatus {
  Available = 'available',
  Unavailable = 'unavailable',
  Pending = 'pending'
}
registerEnumType(GetNetworkClockResponseStatus, { name: 'GetNetworkClockResponseStatus' });

export enum GetNetworkClockResponseUnit {
  Microsecond = 'microsecond'
}
registerEnumType(GetNetworkClockResponseUnit, { name: 'GetNetworkClockResponseUnit' });

export enum GetNetworkParametersResponseUnit {
  Second = 'second'
}
registerEnumType(GetNetworkParametersResponseUnit, { name: 'GetNetworkParametersResponseUnit' });

export enum GetSmashHealthResponseHealth {
  Available = 'available',
  Unavailable = 'unavailable',
  Unreachable = 'unreachable',
  NoSmashConfigured = 'no_smash_configured'
}
registerEnumType(GetSmashHealthResponseHealth, { name: 'GetSmashHealthResponseHealth' });

export enum ApiAddressState {
  Used = 'used',
  Unused = 'unused'
}
registerEnumType(ApiAddressState, { name: 'ApiAddressState' });

export enum ApiAddressInspectAddressStyle {
  Shelley = 'Shelley',
  Icarus = 'Icarus',
  Byron = 'Byron'
}
registerEnumType(ApiAddressInspectAddressStyle, { name: 'ApiAddressInspectAddressStyle' });

export enum ApiAddressInspectStakeReference {
  None = 'none',
  ByValue = 'by value',
  ByPointer = 'by pointer'
}
registerEnumType(ApiAddressInspectStakeReference, { name: 'ApiAddressInspectStakeReference' });

export enum ApiNetworkInformationStatus {
  Ready = 'ready',
  Syncing = 'syncing',
  NotResponding = 'not_responding'
}
registerEnumType(ApiNetworkInformationStatus, { name: 'ApiNetworkInformationStatus' });

export enum ApiNetworkInformationUnit {
  Percent = 'percent'
}
registerEnumType(ApiNetworkInformationUnit, { name: 'ApiNetworkInformationUnit' });

export enum ApiNetworkClockStatus {
  Available = 'available',
  Unavailable = 'unavailable',
  Pending = 'pending'
}
registerEnumType(ApiNetworkClockStatus, { name: 'ApiNetworkClockStatus' });

export enum ApiNetworkClockUnit {
  Microsecond = 'microsecond'
}
registerEnumType(ApiNetworkClockUnit, { name: 'ApiNetworkClockUnit' });

export enum ApiNetworkParametersUnit {
  Second = 'second'
}
registerEnumType(ApiNetworkParametersUnit, { name: 'ApiNetworkParametersUnit' });

export enum ApiSelectCoinsActionAction {
  Quit = 'quit',
  Join = 'join'
}
registerEnumType(ApiSelectCoinsActionAction, { name: 'ApiSelectCoinsActionAction' });

export enum ApiSelectCoinsDataAction {
  Quit = 'quit',
  Join = 'join'
}
registerEnumType(ApiSelectCoinsDataAction, { name: 'ApiSelectCoinsDataAction' });

export enum ApiGCStatusStatus {
  NotApplicable = 'not_applicable',
  NotStarted = 'not_started',
  Restarting = 'restarting',
  HasRun = 'has_run'
}
registerEnumType(ApiGCStatusStatus, { name: 'ApiGCStatusStatus' });

export enum ApiMaintenanceActionPostDataMaintenanceAction {
  GcStakePools = 'gc_stake_pools'
}
registerEnumType(ApiMaintenanceActionPostDataMaintenanceAction, { name: 'ApiMaintenanceActionPostDataMaintenanceAction' });

export enum ApiMaintenanceActionStatus {
  NotApplicable = 'not_applicable',
  NotStarted = 'not_started',
  Restarting = 'restarting',
  HasRun = 'has_run'
}
registerEnumType(ApiMaintenanceActionStatus, { name: 'ApiMaintenanceActionStatus' });

export enum ApiStakePoolUnit {
  Lovelace = 'lovelace'
}
registerEnumType(ApiStakePoolUnit, { name: 'ApiStakePoolUnit' });

export enum ApiStakePoolFlags {
  Delisted = 'delisted'
}
registerEnumType(ApiStakePoolFlags, { name: 'ApiStakePoolFlags' });

export enum ApiFeeUnit {
  Lovelace = 'lovelace'
}
registerEnumType(ApiFeeUnit, { name: 'ApiFeeUnit' });

export enum ApiTransactionUnit {
  Lovelace = 'lovelace'
}
registerEnumType(ApiTransactionUnit, { name: 'ApiTransactionUnit' });

export enum ApiTransactionDirection {
  Outgoing = 'outgoing',
  Incoming = 'incoming'
}
registerEnumType(ApiTransactionDirection, { name: 'ApiTransactionDirection' });

export enum ApiTransactionStatus {
  Pending = 'pending',
  InLedger = 'in_ledger',
  Expired = 'expired'
}
registerEnumType(ApiTransactionStatus, { name: 'ApiTransactionStatus' });

export enum ApiWalletDelegationNextStatus {
  NotDelegating = 'not_delegating',
  Delegating = 'delegating'
}
registerEnumType(ApiWalletDelegationNextStatus, { name: 'ApiWalletDelegationNextStatus' });

export enum ApiWalletDelegationStatus {
  NotDelegating = 'not_delegating',
  Delegating = 'delegating'
}
registerEnumType(ApiWalletDelegationStatus, { name: 'ApiWalletDelegationStatus' });

export enum ApiWalletUnit {
  Lovelace = 'lovelace'
}
registerEnumType(ApiWalletUnit, { name: 'ApiWalletUnit' });

export enum ApiWalletStatus {
  NotDelegating = 'not_delegating',
  Delegating = 'delegating'
}
registerEnumType(ApiWalletStatus, { name: 'ApiWalletStatus' });

export enum ApiByronWalletUnit {
  Lovelace = 'lovelace'
}
registerEnumType(ApiByronWalletUnit, { name: 'ApiByronWalletUnit' });

export enum ApiByronWalletDiscovery {
  Random = 'random',
  Sequential = 'sequential'
}
registerEnumType(ApiByronWalletDiscovery, { name: 'ApiByronWalletDiscovery' });

export enum ApiByronWalletStatus {
  Ready = 'ready',
  Syncing = 'syncing',
  NotResponding = 'not_responding'
}
registerEnumType(ApiByronWalletStatus, { name: 'ApiByronWalletStatus' });

export enum ApiWalletMigrationInfoUnit {
  Lovelace = 'lovelace'
}
registerEnumType(ApiWalletMigrationInfoUnit, { name: 'ApiWalletMigrationInfoUnit' });

export enum ApiWalletUTxOsStatisticsUnit {
  Lovelace = 'lovelace'
}
registerEnumType(ApiWalletUTxOsStatisticsUnit, { name: 'ApiWalletUTxOsStatisticsUnit' });

export enum ApiWalletUTxOsStatisticsScale {
  Log10 = 'log10'
}
registerEnumType(ApiWalletUTxOsStatisticsScale, { name: 'ApiWalletUTxOsStatisticsScale' });

export enum ApiByronWalletRandomPostDataStyle {
  Random = 'random'
}
registerEnumType(ApiByronWalletRandomPostDataStyle, { name: 'ApiByronWalletRandomPostDataStyle' });

export enum ApiByronWalletRandomXPrvPostDataStyle {
  Random = 'random'
}
registerEnumType(ApiByronWalletRandomXPrvPostDataStyle, { name: 'ApiByronWalletRandomXPrvPostDataStyle' });

export enum ApiByronWalletIcarusPostDataStyle {
  Icarus = 'icarus'
}
registerEnumType(ApiByronWalletIcarusPostDataStyle, { name: 'ApiByronWalletIcarusPostDataStyle' });

export enum ApiByronWalletTrezorPostDataStyle {
  Trezor = 'trezor'
}
registerEnumType(ApiByronWalletTrezorPostDataStyle, { name: 'ApiByronWalletTrezorPostDataStyle' });

export enum ApiByronWalletLedgerPostDataStyle {
  Ledger = 'ledger'
}
registerEnumType(ApiByronWalletLedgerPostDataStyle, { name: 'ApiByronWalletLedgerPostDataStyle' });

export enum ApiHealthCheckHealth {
  Available = 'available',
  Unavailable = 'unavailable',
  Unreachable = 'unreachable',
  NoSmashConfigured = 'no_smash_configured'
}
registerEnumType(ApiHealthCheckHealth, { name: 'ApiHealthCheckHealth' });

export enum ApiPostTransactionDataWithdrawal {
  Self = 'self'
}
registerEnumType(ApiPostTransactionDataWithdrawal, { name: 'ApiPostTransactionDataWithdrawal' });

export enum ApiPostTransactionDataUnit {
  Second = 'second'
}
registerEnumType(ApiPostTransactionDataUnit, { name: 'ApiPostTransactionDataUnit' });

export enum ApiPostTransactionFeeDataWithdrawal {
  Self = 'self'
}
registerEnumType(ApiPostTransactionFeeDataWithdrawal, { name: 'ApiPostTransactionFeeDataWithdrawal' });

export enum ApiPostTransactionFeeDataUnit {
  Second = 'second'
}
registerEnumType(ApiPostTransactionFeeDataUnit, { name: 'ApiPostTransactionFeeDataUnit' });

export enum SomeByronWalletPostDataStyle {
  Random = 'random'
}
registerEnumType(SomeByronWalletPostDataStyle, { name: 'SomeByronWalletPostDataStyle' });
