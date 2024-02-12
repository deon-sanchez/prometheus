import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserDocument, UserModel } from 'src/models/users.model';
import { UserInput } from 'src/dtos/user.input';
import { Schema as MongooseSchema } from 'mongoose';
import { BillingService } from 'src/billing/billing.service';

@Resolver((of) => UserModel)
export class UsersResolver {
  constructor(
    private readonly userService: UsersService,
    private readonly billingService: BillingService,
  ) {}

  @Query((returns) => [UserModel])
  users(): Promise<UserModel[]> {
    return this.userService.getAllUsers();
  }

  @Query((returns) => UserModel)
  async user(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ): Promise<UserModel> {
    return this.userService.getUserById(_id);
  }

  @Mutation((returns) => UserModel)
  async createUser(@Args('input') input: UserInput): Promise<UserModel> {
    return this.userService.createUser(input);
  }

  @Mutation((returns) => UserModel)
  async deleteUser(
    @Args('_id', { type: () => String }) _id: MongooseSchema.Types.ObjectId,
  ): Promise<UserModel> {
    return this.userService.deleteUserById(_id);
  }

  @ResolveField()
  async billing(@Parent() user: UserDocument) {
    return await this.billingService.findById(user._id);
  }
}
