import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';
import { UserMapper } from './dto/user.mapper';
import { UserDto, UserResponseDto, PasswordChangeDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    private _userRepository: UserRepository,
    private _userMapper: UserMapper,
  ) {}

  async createUser(body: UserDto): Promise<UserResponseDto> {
    const entity = this._userMapper.toEntity(body);

    entity.password = await this.encryptPassword(entity.password);

    const user = await this._userRepository.create(entity);

    return this._userMapper.toDto(user);
  }

  async getUserById(id: string): Promise<UserResponseDto> {
    const user = await this._userRepository.findOneById(id);

    if (!user) throw new NotFoundException('User not found');

    return this._userMapper.toDto(user);
  }

  async changePassword(body: PasswordChangeDto): Promise<void> {
    const { email, oldPassword, newPassword } = body;

    const { isMatch: isOldPasswordValid } = await this.verifyPassword(
      email,
      oldPassword,
    );

    if (!isOldPasswordValid)
      throw new BadRequestException('Invalid credentials');

    const password = await this.encryptPassword(newPassword);

    await this._userRepository.updateByEmail(email, { password });
  }

  async verifyPassword(
    email: string,
    providedPassword: string,
  ): Promise<Record<string, any>> {
    const user = await this._userRepository.findOneByEmail(email);

    if (!user) throw new NotFoundException('User not found');

    const isMatch: boolean = await bcrypt.compare(
      providedPassword,
      user.password,
    );

    return { isMatch, user };
  }

  /* ----- Auxiliary Methods ----- */

  private async encryptPassword(password: string): Promise<string> {
    const encryptedPassword: string = await bcrypt.hash(
      password,
      parseInt(process.env.SALT_ROUNDS),
    );

    return encryptedPassword;
  }
}
