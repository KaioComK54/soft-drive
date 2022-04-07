import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
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
}
