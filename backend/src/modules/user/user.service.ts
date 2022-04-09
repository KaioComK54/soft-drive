import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { UserMapper } from './dto/user.mapper';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private _userRepository: UserRepository,
    private _userMapper: UserMapper,
  ) {}

  async createUser(body: UserDto): Promise<any> {
    const entity = this._userMapper.toEntity(body);

    const user = await this._userRepository.create(entity);

    return user;
  }
}
