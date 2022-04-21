import {
  Controller,
  Post,
  Get,
  Delete,
  UploadedFile,
  UseInterceptors,
  UseGuards,
  Req,
  Param,
  HttpCode,
  StreamableFile,
  ValidationPipe,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
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
    if (!file) throw new BadRequestException('No valid files were provided');

    const fileForm = {
      userId: req.user?.id,
      name: file.originalname?.split('.').slice(-2, -1).join(''),
      tag: file.originalname,
      type: file.mimetype,
      path: file.path,
      size: file.size,
    };

    return this._fileService.createFileRecord(fileForm);
  }

  @Get()
  async getFiles(@Req() req: any) {
    return this._fileService.getFilesByUserId(req.user?.id);
  }

  @Get(':id')
  async getFileById(
    @Req() req: any,
    @Res({ passthrough: true }) res: any,
    @Param(new ValidationPipe({ transform: true, whitelist: true }))
    param: FileParamDto,
  ): Promise<StreamableFile> {
    const { file, name } = await this._fileService.streamFile(
      param.id,
      req.user?.id,
    );

    res.set({ FileName: name });

    return file;
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteFileById(
    @Req() req: any,
    @Param(new ValidationPipe({ transform: true, whitelist: true }))
    param: FileParamDto,
  ) {
    return this._fileService.deleteFileById(param.id, req.user?.id);
  }
}
