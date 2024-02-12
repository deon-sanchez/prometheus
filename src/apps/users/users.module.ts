import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModel, UserSchema } from 'src/models/users.model';
import { BillingService } from 'src/billing/billing.service';
import { BillingModel, BillingSchema } from 'src/models/billing.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { schema: UserSchema, name: UserModel.name },
      { schema: BillingSchema, name: BillingModel.name },
    ]),
  ],
  providers: [UsersResolver, UsersService, BillingService],
  exports: [UsersService],
})
export class UsersModule {}
