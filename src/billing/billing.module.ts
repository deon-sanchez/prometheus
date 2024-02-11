import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingResolver } from './billing.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BillingModel, BillingSchema } from 'src/models/billing.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: BillingSchema, name: BillingModel.name },
    ]),
  ],
  providers: [BillingService, BillingResolver],
  exports: [BillingService],
})
export class BillingModule {}
