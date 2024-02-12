import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthInput } from 'src/dtos/auth.input';
import { Public } from 'src/decorator/public.decorator';
import { LoginResponse, LogoutResponse } from 'src/models/auth.model';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation((returns) => LoginResponse)
  async login(
    @Args('input') input: AuthInput,
    @Context() { res },
  ): Promise<LoginResponse> {
    return await this.authService.login(input, res);
  }

  @Public()
  @Mutation((returns) => LogoutResponse)
  async logout(@Context() { res }): Promise<LogoutResponse> {
    return await this.authService.logout(res);
  }
}
