import { Inject, Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { File } from './file.schema';

@Injectable()
export class FileRepository {
  constructor(@Inject('FileModel') private _fileModel: Model<File>) {}

  async findOneById(id: string, userId: string): Promise<File> {
    return await this._fileModel.findOne({
      _id: new Types.ObjectId(id),
      userId: new Types.ObjectId(userId),
    });
  }

  async findByUserId(id: string): Promise<File[]> {
    return await this._fileModel.find({ userId: new Types.ObjectId(id) });
  }

  async findByTag(tag: string): Promise<File[]> {
    return await this._fileModel.find({ tag });
  }

  async create(file: File): Promise<File> {
    const newFile = new this._fileModel(file);

    return newFile.save();
  }

  async deleteById(id: string, userId: string): Promise<File> {
    return this._fileModel.findOneAndDelete(
      {
        _id: new Types.ObjectId(id),
        userId: new Types.ObjectId(userId),
      },
      {
        new: true,
      },
    );
  }
}
