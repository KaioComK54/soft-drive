import { Injectable } from '@nestjs/common';
import { UserDto, UserResponseDto } from './user.dto';
import { User } from '../user.schema';

@Injectable()
export class UserMapper {
  toEntity(entityDto: UserDto): User {
    const entity = new User();

    entity.firstName = entityDto.firstName;
    entity.lastName = entityDto.lastName;

    entity.email = entityDto.email;
    entity.password = entityDto.password;

    return entity;
  }

  toDto(entity: User): UserResponseDto {
    const entityDto = new UserResponseDto();

    entityDto.id = entity._id;

    entityDto.firstName = entity.firstName;
    entityDto.lastName = entity.lastName;

    entityDto.email = entity.email;

    entityDto.createdAt = entity.createdAt;
    entityDto.updatedAt = entity.updatedAt;

    return entityDto;
  }
}
