import {
  Controller,
  Post,
  Get,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
  Param,
  StreamableFile,
  ValidationPipe,
  UnprocessableEntityException,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream, readFile } from 'fs';
import { Express } from 'express';
import { promisify } from 'util';
import { JwtAuthGuard } from '../shared/jwt/jwt.guard';
import { FileParamDto } from './dto/file.dto';
import { FileService } from './file.service';

const readFileAsync = promisify(readFile);
@Controller('file')
@UseGuards(JwtAuthGuard)
export class FileController {
  constructor(private readonly _fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No valid files were provided');

    const fileName = file.originalname.split('.').slice(-2, -1).join('');

    const fileForm = {
      userId: req.user.id,
      name: fileName,
      tag: fileName,
      type: file.mimetype,
      path: file.path,
      size: file.size,
    };

    return this._fileService.createFileRecord(fileForm);
  }

  @Get()
  async getFiles(@Req() req: any) {
    const { id } = req.user;
    return this._fileService.getFilesByUserId(id);
  }

  @Get(':id')
  async getFileById(
    @Req() req: any,
    @Param(new ValidationPipe({ transform: true, whitelist: true }))
    param: FileParamDto,
  ): Promise<StreamableFile> {
    const file = await this._fileService.getFileById(param.id, req.user.id);

    const fileExists = await readFileAsync(file.path).catch(() => null);

    if (!fileExists) {
      throw new UnprocessableEntityException(
        'Unable to make the file available',
      );
    }

    const streamebleFile = createReadStream(file.path);

    return new StreamableFile(streamebleFile);
  }
}
