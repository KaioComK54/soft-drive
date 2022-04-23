import { Module, BadRequestException } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import * as path from 'path';
import { DatabaseModule } from '../shared/database/database.module';
import { fileProviders } from './file.providers';
import { FileMapper } from './dto/file.mapper';
import { FileController } from './file.controller';
import { FileRepository } from './file.repository';
import { FileService } from './file.service';

const folder = process.env.FILE_UPLOAD_FOLDER;
const fileMaxSize = parseInt(process.env.FILE_MAX_SIZE);
const validExtensions = process.env.VALID_EXTENSIONS
  ? process.env.VALID_EXTENSIONS.split(' ')
  : [];

@Module({
  imports: [
    DatabaseModule,
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: folder,
        fileFilter: function (req, file, callback) {
          const ext = path.extname(file.originalname);

          if (!validExtensions.includes(ext)) {
            callback(
              new BadRequestException(
                `Only the following extensions files are allowed: ${validExtensions}`,
              ),
              false,
            );
          }

          callback(null, true);
        },
        limits: {
          fileSize: fileMaxSize,
        },
      }),
    }),
  ],
  controllers: [FileController],
  providers: [FileService, FileRepository, FileMapper, ...fileProviders],
  exports: [FileService],
})
export class FileModule {}
