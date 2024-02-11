import { InputType, Field } from '@nestjs/graphql';

@InputType({ description: 'Billing Input' })
export class BillingInput {
  @Field()
  stripe_id: string;
}
