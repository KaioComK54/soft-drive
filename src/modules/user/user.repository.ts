import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(@Inject('UserModel') private _userModel: Model<User>) {}

  async findOneById(id: string): Promise<User> {
    return await this._userModel.findById(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this._userModel.findOne({ email });
  }

  async create(user: User): Promise<User> {
    return this._userModel.create(user);
  }

  async updateById(id: string, body: Record<string, any>): Promise<User> {
    return this._userModel.findOneAndUpdate({ _id: id }, body, { new: true });
  }

  async updateByEmail(email: string, body: Record<string, any>): Promise<User> {
    return this._userModel.findOneAndUpdate({ email }, body, { new: true });
  }
}
