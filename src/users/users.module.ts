import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from 'src/models/users.model';
import { BillingModel, BillingSchema } from 'src/models/billing.model';
import { BillingService } from 'src/billing/billing.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: BillingSchema, name: BillingModel.name },
      { schema: UserSchema, name: UserModel.name },
    ]),
  ],
  providers: [UsersResolver, UsersService, BillingService],
  exports: [UsersService],
})
export class UsersModule {}
