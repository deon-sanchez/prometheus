import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { BillingService } from './billing.service';
import { BillingModel } from 'src/models/billing.model';
import { Schema as MongooseSchema } from 'mongoose';

@Resolver()
export class BillingResolver {
  constructor(private readonly billingService: BillingService) {}

  @Mutation(() => BillingModel)
  async createCustomer(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ): Promise<BillingModel> {
    return await this.billingService.createCustomer(_id);
  }

  @Mutation(() => BillingModel)
  async deleteCustomer(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ): Promise<BillingModel> {
    return await this.billingService.deleteCustomer(_id);
  }
}
