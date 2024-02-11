import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async createCustomer(email: string): Promise<BillingModel> {
    const stripeCustomer = await this.stripe.customers.create({ email });

    if (!stripeCustomer) {
      throw new Error('Failed to create stripe customer');
    }

    const stripeId = { stripe_id: stripeCustomer.id };

    const stripeEntry = this.stripeModel.create(stripeId);

    if (!stripeEntry) {
      throw new Error(`Failed to add ${stripeId} to database`);
    }

    const updatedUser = this.stripeModel.findOneAndUpdate(
      { email },
      { $addToSet: stripeId },
      { new: true },
    );

    if (!updatedUser) {
      throw new Error(`Failed to update user with ${stripeId}`);
    }

    return stripeEntry;
  }

  async deleteCustomer(stripe_id: string): Promise<BillingModel> {
    const customer = await this.stripe.customers.del(stripe_id);

    if (!customer) {
      throw new Error('Failed to delete customer');
    }

    const stripeRemoval = this.stripeModel
      .findOneAndDelete({ stripe_id })
      .exec();

    if (!stripeRemoval) {
      throw new Error(`Failed to remove ${stripe_id} from database`);
    }

    return stripeRemoval;
  }

  async findById(id: string): Promise<BillingModel> {
    const customer = await this.stripeModel.findById(id);

    if (!customer) {
      throw new Error('Failed to find customer');
    }

    return customer;
  }
}
