/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class PostAddressesInput {
  @Field()
  payment?: string;

  @Field()
  stake?: string;
}
