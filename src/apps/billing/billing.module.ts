import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingResolver } from './billing.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BillingModel, BillingSchema } from 'src/models/billing.model';
import { UsersService } from 'src/apps/users/users.service';
import { UserModel, UserSchema } from 'src/models/users.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: UserSchema, name: UserModel.name },
      { schema: BillingSchema, name: BillingModel.name },
    ]),
  ],
  providers: [BillingService, BillingResolver, UsersService],
  exports: [BillingService],
})
export class BillingModule {}
