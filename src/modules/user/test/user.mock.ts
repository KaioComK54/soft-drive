import {
  UserDto,
  UserResponseDto,
  PasswordChangeDto,
  ProfileUpdateDto,
} from '../dto/user.dto';
import { User } from '../user.schema';
import { userExampleValues } from '../utils/user.constants';

export class UserMock {
  static mockUser(): User {
    const user = new User();

    user._id = userExampleValues.id;

    user.firstName = userExampleValues.firstName;
    user.lastName = userExampleValues.lastName;
    user.email = userExampleValues.email;
    user.password = userExampleValues.encryptedPassword;

    user.createdAt = new Date(userExampleValues.createdAt);
    user.updatedAt = new Date(userExampleValues.updatedAt);

    return user;
  }

  static mockUserDto(): UserDto {
    const userDto = new UserDto();

    userDto.email = userExampleValues.email;
    userDto.firstName = userExampleValues.firstName;
    userDto.lastName = userExampleValues.lastName;
    userDto.password = userExampleValues.password;

    return userDto;
  }

  static mockUserResponseDto(): UserResponseDto {
    const userResponseDto = new UserResponseDto();

    userResponseDto.id = userExampleValues.id;

    userResponseDto.firstName = userExampleValues.firstName;
    userResponseDto.lastName = userExampleValues.lastName;
    userResponseDto.email = userExampleValues.email;

    userResponseDto.createdAt = new Date(userExampleValues.createdAt);
    userResponseDto.updatedAt = new Date(userExampleValues.updatedAt);

    return userResponseDto;
  }

  static mockProfileUpdateDto(): ProfileUpdateDto {
    const profileUpdateDto = new ProfileUpdateDto();

    profileUpdateDto.firstName = userExampleValues.firstName;
    profileUpdateDto.lastName = userExampleValues.lastName;

    return profileUpdateDto;
  }

  static mockPasswordChangeDto(): PasswordChangeDto {
    const passwordChangeDto = new PasswordChangeDto();

    passwordChangeDto.email = userExampleValues.email;
    passwordChangeDto.oldPassword = userExampleValues.password;
    passwordChangeDto.newPassword = userExampleValues.password;

    return passwordChangeDto;
  }

  static mockEncryptedPassword(): string {
    return userExampleValues.encryptedPassword;
  }

  static mockId(): string {
    return userExampleValues.id;
  }

  static mockPasswordVerification(isMatch = true): Record<string, any> {
    return {
      isMatch,
      user: this.mockUser(),
    };
  }
}
