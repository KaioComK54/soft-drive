import { Module, BadRequestException } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import * as path from 'path';
import { DatabaseModule } from '../shared/database/database.module';
import { fileProviders } from './file.providers';
import { FileMapper } from './dto/file.mapper';
import { FileController } from './file.controller';
import { FileRepository } from './file.repository';
import { FileService } from './file.service';

@Module({
  imports: [
    DatabaseModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: process.env.FILE_UPLOAD_FOLDER,
        fileFilter: function (req, file, callback) {
          const ext = path.extname(file.originalname);

          if (ext !== '.txt' && ext !== '.pdf') {
            callback(
              new BadRequestException('Only Text or PDF Files are allowed'),
              false,
            );
          }

          callback(null, true);
        },
        limits: {
          fileSize: parseInt(process.env.FILE_MAX_SIZE),
        },
      }),
    }),
  ],
  controllers: [FileController],
  providers: [FileService, FileRepository, FileMapper, ...fileProviders],
  exports: [FileService],
})
export class FileModule {}
