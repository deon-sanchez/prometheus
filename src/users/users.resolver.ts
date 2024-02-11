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
import { BillingService } from 'src/billing/billing.service';
import { BillingModel } from 'src/models/billing.model';

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
  async user(@Args('id') _id: string): Promise<UserModel> {
    return this.userService.getUserById(_id);
  }

  @Mutation((returns) => UserModel)
  async createUser(@Args('input') input: UserInput): Promise<UserModel> {
    return this.userService.createUser(input);
  }

  @Mutation((returns) => UserModel)
  async deleteUser(@Args('id') _id: string): Promise<UserModel> {
    return this.userService.deleteUserById(_id);
  }

  @ResolveField(() => UserModel)
  async billing(@Parent() billing: BillingModel) {
    return this.billingService.findById(billing._id);
  }
}
