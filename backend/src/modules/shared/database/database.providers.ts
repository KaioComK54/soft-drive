// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.DATABASE_MONGO),
  },
];
