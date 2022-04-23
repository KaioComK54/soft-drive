import {
  Req,
  Controller,
  Post,
  Patch,
  Get,
  Body,
  ValidationPipe,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { JwtAuthGuard } from '../shared/jwt/jwt.guard';
import { UserService } from './user.service';
import {
  UserDto,
  UserResponseDto,
  PasswordChangeDto,
  ProfileUpdateDto,
} from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private _userService: UserService) {}

  @Post()
  async createUser(
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    body: UserDto,
  ): Promise<any> {
    return this._userService.createUser(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getPersonalData(@Req() req: any): Promise<UserResponseDto> {
    return this._userService.getUserById(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('change-password')
  @HttpCode(204)
  async changePassword(
    @Req() req: any,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    body: PasswordChangeDto,
  ): Promise<void> {
    body.email = req.user?.email;
    await this._userService.changePassword(body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('profile')
  async updateProfile(
    @Req() req: any,
    @Body(new ValidationPipe({ transform: true, whitelist: true }))
    body: ProfileUpdateDto,
  ): Promise<UserResponseDto> {
    return this._userService.updateProfile(req.user?.id, body);
  }
}
