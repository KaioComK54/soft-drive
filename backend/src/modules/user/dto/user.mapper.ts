import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { User } from '../user.schema';

@Injectable()
export class UserMapper {
  toEntity(entityDto: UserDto): User {
    const entity = new User();

    entity.email = entityDto.email;
    entity.password = entityDto.password;

    return entity;
  }
}
