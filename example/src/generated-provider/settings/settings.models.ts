/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class GetSettingsResponse {
  @Field()
  pool_metadata_source!: string;
}
