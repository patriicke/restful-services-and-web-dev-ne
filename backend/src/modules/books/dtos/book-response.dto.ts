import { ApiProperty } from '@nestjs/swagger';
import { BookDto } from './book.dto';

export class BookResponseDto {
  @ApiProperty({ type: BookDto })
  book: BookDto;
}

export class BooksResponseDto {
  @ApiProperty({ type: [BookDto] })
  books: BookDto[];
}
