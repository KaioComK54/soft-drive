import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { getModelToken } from '@nestjs/mongoose';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { AuthMock } from './auth.mock';
import { UserRepository } from '../../user/user.repository';
import { UserMapper } from '../../user/dto/user.mapper';
import { UserService } from '../../user/user.service';
import { UserMock } from '../../user/test/user.mock';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: {
            expiresIn: Number(process.env.JWT_EXPIRATION),
          },
        }),
      ],
      providers: [
        AuthService,
        UserService,
        UserRepository,
        UserMapper,
        {
          provide: getModelToken('User'),
          useValue: {},
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('login', () => {
    it('should authenticate a user by its credentials', async () => {
      const payload = AuthMock.mockAuthDto();
      const passwordVerification = UserMock.mockPasswordVerification();
      const response = AuthMock.mockAccessToken();

      const verifyPasswordPromise = new Promise<any>((resolve) => {
        resolve(passwordVerification);
      });

      jest
        .spyOn(userService, 'verifyPassword')
        .mockImplementation(() => verifyPasswordPromise);

      jest
        .spyOn(jwtService, 'sign')
        .mockImplementation(() => response.accessToken);

      const result = await authService.login(payload);

      expect(result).toStrictEqual(response);
    });

    it('should authenticate a user by its credentials, but the password is invalid', async () => {
      const payload = AuthMock.mockAuthDto();
      const passwordVerification = UserMock.mockPasswordVerification(false);

      const verifyPasswordPromise = new Promise<any>((resolve) => {
        resolve(passwordVerification);
      });

      jest
        .spyOn(userService, 'verifyPassword')
        .mockImplementation(() => verifyPasswordPromise);

      expect(async () => {
        await authService.login(payload);
      }).rejects.toThrow(UnauthorizedException);
    });
  });
});
