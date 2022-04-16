import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type FileDocument = File & Document;

@Schema({ timestamps: true })
export class File {
  _id: string;

  @Prop({
    required: true,
    type: Types.ObjectId,
    ref: 'User',
  })
  userId: string;

  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  type: string;

  @Prop({
    required: true,
  })
  path: string;

  @Prop({
    required: true,
  })
  size: number;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const FileSchema = SchemaFactory.createForClass(File);
