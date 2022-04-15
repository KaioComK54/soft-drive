import { FileSchema } from './file.schema';
import { Connection } from 'mongoose';

export const fileProviders = [
  {
    provide: 'FileModel',
    useFactory: (connection: Connection) =>
      connection.model('File', FileSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
