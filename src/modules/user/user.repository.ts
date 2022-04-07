import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(@Inject('UserModel') private _userModel: Model<User>) {}

  async findOne(id: string): Promise<User> {
    return await this._userModel.findOne({ _id: id });
  }

  async create(user: User): Promise<User> {
    const newUser = new this._userModel(user);

    return newUser.save();
  }
}
