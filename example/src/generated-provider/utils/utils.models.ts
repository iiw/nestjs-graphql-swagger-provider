/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { GetSmashHealthResponseHealth } from '../enums';

@ObjectType()
export class GetSmashHealthResponse {
  @Field(() => GetSmashHealthResponseHealth)
  health!: GetSmashHealthResponseHealth;
}
