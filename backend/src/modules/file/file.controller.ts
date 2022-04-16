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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { Express } from 'express';
import { JwtAuthGuard } from '../shared/jwt/jwt.guard';
import { FileParamDto } from './dto/file.dto';
import { FileService } from './file.service';

@Controller('file')
@UseGuards(JwtAuthGuard)
export class FileController {
  constructor(private readonly _fileService: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Req() req: any, @UploadedFile() file: Express.Multer.File) {
    const fileForm = {
      userId: req.user.id,
      name: file.originalname,
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

    const streamebleFile = createReadStream(file.path);

    return new StreamableFile(streamebleFile);
  }
}
