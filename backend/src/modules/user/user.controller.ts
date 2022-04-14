import {
  Req,
  Controller,
  Post,
  Get,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../shared/jwt/jwt.guard';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

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
  async getPersonalData(@Req() req: any): Promise<any> {
    return this._userService.getUserById(req.user.id);
  }
}
