import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { BillingService } from './billing.service';
import { BillingModel } from 'src/models/billing.model';

@Resolver()
export class BillingResolver {
  constructor(private readonly billingService: BillingService) {}

  @Mutation(() => BillingModel)
  async createCustomer(@Args('email') email: string): Promise<BillingModel> {
    return await this.billingService.createCustomer(email);
  }

  @Mutation(() => BillingModel)
  async deleteCustomer(
    @Args('stripe_id') stripe_id: string,
  ): Promise<BillingModel> {
    return await this.billingService.deleteCustomer(stripe_id);
  }
}
