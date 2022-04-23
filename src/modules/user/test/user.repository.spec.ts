import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserRepository } from '../user.repository';
import { User, UserDocument } from '../user.schema';
import { UserMock } from './user.mock';

describe('User Repository', () => {
  let userRepository: UserRepository;
  let userModel: Model<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],
      providers: [
        UserRepository,
        {
          provide: getModelToken(User.name),
          useValue: Model,
        },
      ],
    }).compile();

    userRepository = module.get<UserRepository>(UserRepository);
    userModel = module.get<Model<UserDocument>>(getModelToken(User.name));
  });

  describe('findOneById', () => {
    it('should get a user by its id', async () => {
      const id = UserMock.mockId();
      const response = UserMock.mockUser();

      jest.spyOn(userModel, 'findById').mockResolvedValue(response);

      const result = await userRepository.findOneById(id);

      expect(result).toStrictEqual(response);
    });

    it('should get a user by its id, but none was found', async () => {
      const id = UserMock.mockId();
      const response = null;

      jest.spyOn(userModel, 'findById').mockResolvedValue(response);

      const result = await userRepository.findOneById(id);

      expect(result).toStrictEqual(response);
    });
  });

  describe('findOneByEmail', () => {
    it('should get a user by its email', async () => {
      const { email } = UserMock.mockUserDto();
      const response = UserMock.mockUser();

      jest.spyOn(userModel, 'findOne').mockResolvedValue(response);

      const result = await userRepository.findOneByEmail(email);

      expect(result).toStrictEqual(response);
    });

    it('should get a user by its email, but none was found', async () => {
      const { email } = UserMock.mockUserDto();
      const response = null;

      jest.spyOn(userModel, 'findOne').mockResolvedValue(response);

      const result = await userRepository.findOneByEmail(email);

      expect(result).toStrictEqual(response);
    });
  });

  describe('create', () => {
    it('should create a user', async () => {
      const response = UserMock.mockUser();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, createdAt, updatedAt, ...body } = response;

      jest.spyOn(userModel, 'create').mockImplementation(() => response);

      const result = await userRepository.create(body as User);

      expect(result).toStrictEqual(response);
    });
  });

  describe('updateById', () => {
    it('should update a user by its id', async () => {
      const id = UserMock.mockId();
      const response = UserMock.mockUser();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, createdAt, updatedAt, ...body } = response;

      jest.spyOn(userModel, 'findOneAndUpdate').mockResolvedValue(response);

      const result = await userRepository.updateById(id, body);

      expect(result).toStrictEqual(response);
    });

    it('should update a user by its id, but none was found', async () => {
      const id = UserMock.mockId();
      const response = null;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, createdAt, updatedAt, ...body } = UserMock.mockUser();

      jest.spyOn(userModel, 'findOneAndUpdate').mockResolvedValue(response);

      const result = await userRepository.updateById(id, body);

      expect(result).toStrictEqual(response);
    });
  });

  describe('updateByEmail', () => {
    it('should update a user by its email', async () => {
      const { email } = UserMock.mockUserDto();
      const response = UserMock.mockUser();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, createdAt, updatedAt, ...body } = response;

      jest.spyOn(userModel, 'findOneAndUpdate').mockResolvedValue(response);

      const result = await userRepository.updateByEmail(email, body);

      expect(result).toStrictEqual(response);
    });

    it('should update a user by its email, but none was found', async () => {
      const { email } = UserMock.mockUserDto();
      const response = null;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, createdAt, updatedAt, ...body } = UserMock.mockUser();

      jest.spyOn(userModel, 'findOneAndUpdate').mockResolvedValue(response);

      const result = await userRepository.updateByEmail(email, body);

      expect(result).toStrictEqual(response);
    });
  });
});
