import { InputType, Field } from '@nestjs/graphql';
import { BillingInput } from './billing.input';

@InputType({ description: 'User Input' })
export class UserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}
