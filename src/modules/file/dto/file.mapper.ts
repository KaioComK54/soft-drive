import { Injectable } from '@nestjs/common';
import { FileDto, FileResponseDto } from './file.dto';
import { File } from '../file.schema';

@Injectable()
export class FileMapper {
  public toEntity(entityDto: FileDto): File {
    const entity = new File();

    entity.name = entityDto.name;
    entity.tag = entityDto.tag;
    entity.userId = entityDto.userId;
    entity.type = entityDto.type;
    entity.path = entityDto.path;
    entity.size = entityDto.size;

    return entity;
  }

  public toDto(entity: File): FileResponseDto {
    const entityDto = new FileResponseDto();

    entityDto.id = entity._id;

    entityDto.userId = entity.userId;
    entityDto.name = entity.name;
    entityDto.type = entity.type;

    entityDto.createdAt = entity.createdAt;
    entityDto.updatedAt = entity.updatedAt;

    return entityDto;
  }
}
