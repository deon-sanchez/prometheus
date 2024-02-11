import {
  Resolver,
  Query,
  Args,
  Mutation,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { UserModel } from 'src/models/users.model';
import { UserInput } from 'src/dtos/user.input';
import { Schema as MongooseSchema } from 'mongoose';
import { BillingDocument, BillingModel } from 'src/models/billing.model';

@Resolver((of) => UserModel)
export class UsersResolver {
  constructor(private readonly userService: UsersService) {}

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
  async billing(@Parent() billing: BillingDocument) {
    await billing.populate({ path: 'billing', model: BillingModel.name });

    return { ...billing };
  }
}
