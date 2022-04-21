import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
  StreamableFile,
} from '@nestjs/common';
import { createReadStream, readFile, unlink } from 'fs';
import { promisify } from 'util';
import { FileDto, FileResponseDto } from './dto/file.dto';
import { FileMapper } from './dto/file.mapper';
import { FileRepository } from './file.repository';
import { File } from './file.schema';

const readFileAsync = promisify(readFile);
const unlinkAsync = promisify(unlink);

@Injectable()
export class FileService {
  private readonly _limitStorage: number = parseInt(process.env.STORAGE_LIMIT);

  constructor(
    private readonly _fileRepository: FileRepository,
    private readonly _fileMapper: FileMapper,
  ) {}

  async createFileRecord(body: FileDto): Promise<FileResponseDto> {
    const entity = this._fileMapper.toEntity(body);

    const { size, userId, name, tag, path } = body;

    const existingFiles = await this._fileRepository.findByUserId(userId);

    const isStorageFull = await this.calculateSpentStorageLimit(
      userId,
      size,
      existingFiles,
    );

    if (isStorageFull) {
      await this.removeFileFromStorage(path);
      throw new UnprocessableEntityException('Storage limit has been reached');
    }

    const numOfDuplicatedFiles = await this.checkForDuplicateFiles(
      tag,
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

  async streamFile(id: string, userId: string) {
    const file = await this.getFileById(id, userId);

    await this.checkIfFileIsStored(file.path);

    const streamebleFile = createReadStream(file.path);

    return {
      name: file.tag,
      file: new StreamableFile(streamebleFile),
    };
  }

  async deleteFileById(id: string, userId: string): Promise<void> {
    const deletedFile = await this._fileRepository.deleteById(id, userId);

    if (!deletedFile) throw new NotFoundException('File not found');

    await this.removeFileFromStorage(deletedFile.path);
  }

  /* ----- Private Methods ----- */

  private async checkIfFileIsStored(filePath: string) {
    const fileExists = await readFileAsync(filePath).catch(() => null);

    if (!fileExists) {
      throw new UnprocessableEntityException(
        'Unable to make the file available',
      );
    }
  }

  private async removeFileFromStorage(filePath: string) {
    try {
      await unlinkAsync(filePath);
    } catch (error) {
      throw new UnprocessableEntityException(
        'Unable to delete the file from storage',
      );
    }
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
