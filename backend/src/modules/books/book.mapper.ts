import { BookDto } from './dtos/book.dto';
import { CreateBookRequestDto } from './dtos/create-book-request.dto';
import { UpdateBookRequestDto } from './dtos/update-book.dto';
import { BookEntity } from './model/book.entity';

export class BookMapper {
  public static async toDto(entity: BookEntity): Promise<BookDto> {
    const dto = new BookDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.author = entity.author;
    dto.publisher = entity.publisher;
    dto.publicationYear = entity.publicationYear;
    dto.subject = entity.subject;
    dto.createdAt = entity.createdAt;
    dto.updatedAt = entity.updatedAt;
    return dto;
  }

  public static toCreateEntity(dto: CreateBookRequestDto): BookEntity {
    const entity = new BookEntity();
    entity.name = dto.name;
    entity.author = dto.author;
    entity.publisher = dto.publisher;
    entity.publicationYear = dto.publicationYear;
    entity.subject = dto.subject;
    return entity;
  }

  public static toUpdateEntity(
    entity: BookEntity,
    dto: UpdateBookRequestDto,
  ): BookEntity {
    entity.name = dto.name;
    entity.author = dto.author;
    entity.publisher = dto.publisher;
    entity.publicationYear = dto.publicationYear;
    entity.subject = dto.subject;
    return entity;
  }
}
