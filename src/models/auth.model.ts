import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Auth Response' })
export class LoginResponse {
  @Field()
  loggedIn: boolean;
}

@ObjectType({ description: 'Logout Response' })
export class LogoutResponse {
  @Field()
  loggedOut: boolean;
}
