import { InputType, Field } from '@nestjs/graphql';

@InputType({ description: 'User Input' })
export class UserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
