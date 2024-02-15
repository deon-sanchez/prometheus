import { InputType, Field } from '@nestjs/graphql';

@InputType({ description: 'Billing Create Input' })
export class BillingInput {
  @Field()
  stripe_id: string;
}
