import { Field, InputType } from '@nestjs/graphql';

@InputType({ description: 'Auth Input' })
export class AuthInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
