/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class GetSettingsResponse {
  @Field({ description: 'Pool metadata source. This sets the metadata fetching strategy.\n\nPossible values are\n  * none -> no fetching\n  * direct -> direct fetching\n  * uri -> use SMASH server\n' })
  pool_metadata_source!: string;
}
