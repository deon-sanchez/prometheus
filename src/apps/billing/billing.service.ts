import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BillingDocument, BillingModel } from 'src/models/billing.model';
import { UsersService } from 'src/apps/users/users.service';
import Stripe from 'stripe';

@Injectable()
export class BillingService {
  private readonly stripe: Stripe;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
    @InjectModel(BillingModel.name)
    private stripeModel: Model<BillingDocument>,
    private userService: UsersService,
  ) {
    this.stripe = new Stripe(configService.get('STRIPE_API_KEY'), {
      apiVersion: '2023-10-16',
    });
  }

  async createCustomer(_id: string): Promise<BillingModel> {
    const user = await this.userService.getUser({ _id });

    if (!user) {
      throw new Error('User not found');
    }

    const stripe_id = await this.stripe.customers.create({ email: user.email });

    const payload = { _id, stripe_id };
    const createdBilling = new this.stripeModel(payload);

    if (!createdBilling) {
      throw new Error(`Failed to add ${stripe_id} to database`);
    }

    return createdBilling.save();
  }

  async deleteCustomer(_id: string): Promise<BillingModel> {
    const billing = await this.stripeModel.findById(_id).exec();

    if (!billing) {
      throw new Error('User not found');
    }

    const customer = await this.stripe.customers.del(billing.stripe_id);

    if (!customer) {
      throw new Error('Failed to delete customer');
    }

    return await this.stripeModel.findByIdAndDelete(_id).exec();
  }

  async findById(_id: string): Promise<BillingModel> {
    const stripe_id = await this.stripeModel.findById(_id).exec();
    return stripe_id;
  }
}
