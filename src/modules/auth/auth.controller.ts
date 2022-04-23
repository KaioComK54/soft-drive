import { Controller, Post, Body, ValidationPipe, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('signin')
  async login(
    @Req() req: any,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    body: AuthDto,
  ) {
    body.ipAddress = req.ip;
    return this._authService.login(body);
  }
}
