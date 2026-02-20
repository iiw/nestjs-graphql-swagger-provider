/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class PostCancelarPuCancelaInput {
  @Field({ nullable: true })
  solicitud?: string;

  @Field({ nullable: true })
  usuario?: string;

  @Field({ nullable: true })
  comentarios?: string;
}
