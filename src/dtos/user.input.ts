import { InputType, Field } from '@nestjs/graphql';

@InputType({ description: 'Create User Input' })
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType({ description: 'Find User Input' })
export class FindUserInput {
  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  _id?: string;
}

export class UpdateUserDto extends CreateUserInput {}
