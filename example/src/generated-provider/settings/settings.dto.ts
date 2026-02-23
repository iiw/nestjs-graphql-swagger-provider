/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class PutSettingsInputSettings {
  @Field({ description: 'Select stake pool metadata fetching strategy:\n  - `none` - metadata is not fetched at all,\n  - `direct` - metadata is fetched directly URLs registered on chain,\n  - `uri` - metadata is fetched from an external Stake-Pool Metadata Aggregation Server (SMASH)\n\nAfter update existing metadata will be dropped forcing it to re-sync automatically with the new setting.\n' })
  pool_metadata_source!: string;
}

@InputType()
export class PutSettingsInput {
  @Field(() => PutSettingsInputSettings, { description: 'Settings' })
  settings?: PutSettingsInputSettings;
}
