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
import { CreateUserInput, FindUserInput } from 'src/dtos/user.input';
import { BillingService } from 'src/apps/billing/billing.service';
import { Public } from 'src/decorator/public.decorator';

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
  async user(@Args('input') input: FindUserInput): Promise<UserModel> {
    return this.userService.getUser(input);
  }

  @Public()
  @Mutation((returns) => UserModel)
  async createUser(@Args('input') input: CreateUserInput): Promise<UserModel> {
    return this.userService.createUser(input);
  }

  @Mutation((returns) => UserModel)
  async deleteUser(
    @Args('_id', { type: () => String }) _id: string,
  ): Promise<UserModel> {
    return this.userService.deleteUserById(_id);
  }

  @ResolveField()
  async billing(@Parent() user: UserDocument) {
    return await this.billingService.findById(user._id);
  }
}
