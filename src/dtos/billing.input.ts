import { InputType, Field } from '@nestjs/graphql';
import { BillingModel } from 'src/models/billing.model';
import Stripe from 'stripe';

@InputType({ description: 'Billing Create Input' })
export class BillingInput {
  @Field()
  stripe_id: string;
}

@InputType({ description: 'Billing Update Input' })
export class UpdateBillingDto extends BillingInput {
  @Field()
  _id: string;

  // @Field()
  // stripe?: BillingModel;
}
