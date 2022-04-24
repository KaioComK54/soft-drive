import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    });
  }

  async validate(req: any, payload: any) {
    const { id, ipAddress } = payload;
    const { ip } = req;

    console.log(`IP recebido: ${ip}, Jwt: ${ipAddress}`);

    // if (ip != ipAddress) throw new UnauthorizedException();

    const user = await this._userService.getUserById(id).catch(() => null);

    return user;
  }
}
