import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema as MongooseSchema } from 'mongoose';
import { BillingDocument, BillingModel } from 'src/models/billing.model';
import Stripe from 'stripe';

@Injectable()
export class BillingService {
  private readonly stripe: Stripe;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @InjectModel(BillingModel.name)
    private stripeModel: Model<BillingDocument>,
  ) {
    this.stripe = new Stripe(configService.get('STRIPE_API_KEY'), {
      apiVersion: '2023-10-16',
    });
  }

  async createCustomer(
    _id: MongooseSchema.Types.ObjectId,
  ): Promise<BillingModel> {
    // const stripeCustomer = await this.stripe.customers.create({ email });
    const stripeId = { _id, stripe_id: 'cus-test-123' };
    const createdBilling = new this.stripeModel(stripeId);

    if (!createdBilling) {
      throw new Error(`Failed to add ${stripeId} to database`);
    }

    return createdBilling.save();
  }

  async deleteCustomer(
    _id: MongooseSchema.Types.ObjectId,
  ): Promise<BillingModel> {
    // const customer = await this.stripe.customers.del(_id.toString());

    // if (!customer) {
    //   throw new Error('Failed to delete customer');
    // }

    return await this.stripeModel.findByIdAndDelete(_id).exec();
  }

  async findById(id: string): Promise<BillingModel> {
    const stripe_id = await this.stripeModel.findById(id).exec();
    return stripe_id;
  }
}
