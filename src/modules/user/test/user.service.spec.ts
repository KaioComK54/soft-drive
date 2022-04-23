import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { UserRepository } from '../user.repository';
import { UserMapper } from '../dto/user.mapper';
import { UserService } from '../user.service';
import { UserMock } from './user.mock';
import { User } from '../user.schema';

describe('UserService', () => {
  let userService: UserService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        UserRepository,
        UserMapper,
        {
          provide: getModelToken('User'),
          useValue: {},
        },
      ],
    }).compile();

    userService = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const body = UserMock.mockUserDto();
      const response = UserMock.mockUserResponseDto();

      const user = UserMock.mockUser();
      const encryptedPassword = UserMock.mockEncryptedPassword();

      const createUserPromise = new Promise<User>((resolve) => {
        resolve(user);
      });

      jest
        .spyOn(userRepository, 'create')
        .mockImplementation(() => createUserPromise);

      jest.spyOn(bcrypt, 'hash').mockImplementation(() => encryptedPassword);

      const result = await userService.createUser(body);

      expect(result).toStrictEqual(response);
    });
  });

  describe('getUserById', () => {
    it('should get a user by its id', async () => {
      const id = UserMock.mockId();
      const response = UserMock.mockUserResponseDto();

      const user = UserMock.mockUser();

      const getUserPromise = new Promise<User>((resolve) => {
        resolve(user);
      });

      jest
        .spyOn(userRepository, 'findOneById')
        .mockImplementation(() => getUserPromise);

      const result = await userService.getUserById(id);

      expect(result).toStrictEqual(response);
    });

    it('should get a user by its id, but none was found', async () => {
      const id = UserMock.mockId();

      const getUserPromise = new Promise<User>((resolve) => {
        resolve(null);
      });

      jest
        .spyOn(userRepository, 'findOneById')
        .mockImplementation(() => getUserPromise);

      expect(async () => {
        await userService.getUserById(id);
      }).rejects.toThrow(NotFoundException);
    });
  });

  describe('updateProfile', () => {
    it('should update a user by its id', async () => {
      const id = UserMock.mockId();
      const body = UserMock.mockProfileUpdateDto();
      const response = UserMock.mockUserResponseDto();

      const user = UserMock.mockUser();

      const updateUserPromise = new Promise<User>((resolve) => {
        resolve(user);
      });

      jest
        .spyOn(userRepository, 'updateById')
        .mockImplementation(() => updateUserPromise);

      const result = await userService.updateProfile(id, body);

      expect(result).toStrictEqual(response);
    });

    it('should update a user by its id, but none was found', async () => {
      const id = UserMock.mockId();
      const body = UserMock.mockProfileUpdateDto();

      const updateUserPromise = new Promise<User>((resolve) => {
        resolve(null);
      });

      jest
        .spyOn(userRepository, 'updateById')
        .mockImplementation(() => updateUserPromise);

      expect(async () => {
        await userService.updateProfile(id, body);
      }).rejects.toThrow(NotFoundException);
    });
  });

  describe('changePassword', () => {
    it('should update user password', async () => {
      const body = UserMock.mockPasswordChangeDto();
      const user = UserMock.mockUser();

      const encryptedPassword = UserMock.mockEncryptedPassword();

      const verifyPasswordPromise = new Promise<any>((resolve) => {
        resolve({ isMatch: true, user });
      });

      const updateUserPromise = new Promise<User>((resolve) => {
        resolve(user);
      });

      jest
        .spyOn(userService, 'verifyPassword')
        .mockImplementation(() => verifyPasswordPromise);

      jest.spyOn(bcrypt, 'hash').mockImplementation(() => encryptedPassword);

      jest
        .spyOn(userRepository, 'updateByEmail')
        .mockImplementation(() => updateUserPromise);

      const result = await userService.changePassword(body);

      expect(result).toStrictEqual(undefined);
    });
  });
});
