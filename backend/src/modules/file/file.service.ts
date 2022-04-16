import { Injectable, NotFoundException } from '@nestjs/common';
import { FileDto, FileResponseDto } from './dto/file.dto';
import { FileMapper } from './dto/file.mapper';
import { FileRepository } from './file.repository';
import { File } from './file.schema';

@Injectable()
export class FileService {
  constructor(
    private readonly _fileRepository: FileRepository,
    private readonly _fileMapper: FileMapper,
  ) {}

  async createFileRecord(body: FileDto): Promise<FileResponseDto> {
    const entity = this._fileMapper.toEntity(body);

    const file = await this._fileRepository.create(entity);

    return this._fileMapper.toDto(file);
  }

  async getFilesByUserId(id: string): Promise<FileResponseDto[]> {
    const files = await this._fileRepository.findByUserId(id);

    return files.map((file) => this._fileMapper.toDto(file));
  }

  async getFileById(id: string, userId: string): Promise<File> {
    const file = await this._fileRepository.findOneById(id, userId);

    if (!file) throw new NotFoundException('File not found');

    return file;
  }
}
