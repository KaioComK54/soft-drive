import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { FileDto, FileResponseDto } from './dto/file.dto';
import { FileMapper } from './dto/file.mapper';
import { FileRepository } from './file.repository';
import { File } from './file.schema';

@Injectable()
export class FileService {
  private readonly _limitStorage: number = parseInt(process.env.STORAGE_LIMIT);

  constructor(
    private readonly _fileRepository: FileRepository,
    private readonly _fileMapper: FileMapper,
  ) {}

  async createFileRecord(body: FileDto): Promise<FileResponseDto> {
    const entity = this._fileMapper.toEntity(body);

    const { size, userId, name } = body;

    const existingFiles = await this._fileRepository.findByUserId(userId);

    const isStorageFull = await this.calculateSpentStorageLimit(
      userId,
      size,
      existingFiles,
    );

    if (isStorageFull)
      throw new UnprocessableEntityException('Storage limit has been reached');

    const numOfDuplicatedFiles = await this.checkForDuplicateFiles(
      name,
      existingFiles,
    );

    if (numOfDuplicatedFiles > 0)
      entity.name = `${name} (${numOfDuplicatedFiles + 1})`;

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

  private async calculateSpentStorageLimit(
    userId: string,
    desiredStorageSpace: number,
    existingFiles: File[] = [],
  ): Promise<boolean> {
    const files = existingFiles.length
      ? existingFiles.filter((file) => file.userId.toString() == userId)
      : await this._fileRepository.findByUserId(userId);

    const spentStorage = files.reduce((acc, file) => acc + file.size, 0);

    return spentStorage + desiredStorageSpace > this._limitStorage;
  }

  private async checkForDuplicateFiles(
    tag: string,
    existingFiles: File[] = [],
  ): Promise<number> {
    const files = existingFiles.length
      ? existingFiles.filter((file) => file.tag === tag)
      : await this._fileRepository.findByTag(tag);

    return files.length;
  }
}
