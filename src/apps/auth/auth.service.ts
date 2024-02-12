import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from 'src/users/users.service';
import { AuthInput } from 'src/dtos/auth.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(auth: AuthInput, response): Promise<any> {
    const { email, password } = auth;
    const user = await this.usersService.getUser({ email });

    if (!user) {
      throw new UnauthorizedException('User or password invalid!');
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      throw new UnauthorizedException('User or password invalid!');
    }

    const access_token = await this.jwtService.signAsync({
      email: user.email,
      sub: user._id,
    });

    if (!access_token) {
      throw new ForbiddenException('Token generation failed');
    }

    response.cookie('access_token', access_token);

    return { loggedIn: true };
  }

  async logout(response): Promise<any> {
    response.clearCookie('access_token');
    return { loggedOut: true };
  }
}
