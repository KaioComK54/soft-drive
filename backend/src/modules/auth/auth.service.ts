import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private readonly _jwtService: JwtService,
  ) {}

  async login(payload: AuthDto): Promise<any> {
    const { email, password, ipAddress } = payload;

    const { isMatch, user } = await this._userService.verifyPassword(
      email,
      password,
    );

    if (!isMatch) throw new UnauthorizedException();

    const accessToken = this._jwtService.sign(
      { id: user.id, ipAddress },
      { expiresIn: process.env.JWT_EXPIRATION },
    );

    return { accessToken };
  }
}
