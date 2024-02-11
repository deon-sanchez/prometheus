import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingResolver } from './billing.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BillingModel, BillingSchema } from 'src/models/billing.model';
import { UserModel, UserSchema } from 'src/models/users.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: BillingSchema, name: BillingModel.name },
      { schema: UserSchema, name: UserModel.name },
    ]),
  ],
  providers: [BillingService, BillingResolver],
  exports: [BillingService],
})
export class BillingModule {}
