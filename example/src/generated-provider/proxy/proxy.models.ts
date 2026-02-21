/* eslint-disable */
import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class PostProxyTransactionsResponse {
  @Field({ description: 'A unique identifier for this transaction' })
  id!: string;
}
