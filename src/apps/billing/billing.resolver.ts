import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { BillingService } from './billing.service';
import { BillingModel } from 'src/models/billing.model';

@Resolver()
export class BillingResolver {
  constructor(private readonly billingService: BillingService) {}

  @Mutation(() => BillingModel)
  async createCustomer(@Args('_id') _id: string): Promise<BillingModel> {
    return await this.billingService.createCustomer(_id);
  }

  @Mutation(() => BillingModel)
  async deleteCustomer(@Args('_id') _id: string): Promise<BillingModel> {
    return await this.billingService.deleteCustomer(_id);
  }
}
