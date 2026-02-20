/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class PutSettingsInput {
  @Field()
  settings?: string;
}
