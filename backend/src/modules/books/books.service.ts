import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { BookRepository } from './model/book.repository';
import { ResponseService } from '~/shared/response/response.service';
import { CreateBookRequestDto } from './dtos/create-book-request.dto';
import { ResponseDto } from '~/common/dtos';
import { BookResponseDto } from './dtos/book-response.dto';
import { BookMapper } from './book.mapper';
import { DBErrorCode } from '~/common/enums';
import {
  BadRequestCustomException,
  ConflictCustomException,
} from '~/common/http';
import { TimeoutError } from 'rxjs';
import { PaginationRequest } from '~/helpers/pagination';
import { PaginationResponseDto } from '~/helpers/pagination/pagination-response.dto';
import { BookDto } from './dtos/book.dto';
import { handlePaginate } from '~/helpers/pagination/pagination.helper';
import { ILike } from 'typeorm';
import { BookEntity } from './model/book.entity';
import { UpdateBookRequestDto } from './dtos/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    private bookRepository: BookRepository,
    private responseService: ResponseService,
  ) {}

  /**
   * List of books
   * @param pagination
   * @returns {ResponseDto<PaginationResponseDto<BookResponseDto>>}
   */
  public async getBooks(
    pagination: PaginationRequest,
  ): Promise<ResponseDto<PaginationResponseDto<BookDto>>> {
    try {
      const search = pagination.params?.search ?? '';

      const books = await handlePaginate(this.bookRepository, pagination, {
        order: pagination.order,
        where: [
          {
            name: ILike(`%${search}%`),
          },
        ],
      });

      books.items = await Promise.all(
        books.items.map((book: BookEntity) => BookMapper.toDto(book)),
      );

      return this.responseService.makeResponse({
        message: 'Book retrieved successfully',
        payload: books,
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException();
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * Create new book
   * @param booDto {CreateBookRequestDto}
   * @returns {Promise<BookResponseDto>}
   */
  public async createBook(
    bookDto: CreateBookRequestDto,
  ): Promise<ResponseDto<BookResponseDto>> {
    try {
      let bookEntity = BookMapper.toCreateEntity(bookDto);
      bookEntity = await this.bookRepository.save(bookEntity);
      const book = await BookMapper.toDto(bookEntity);
      return this.responseService.makeResponse({
        message: 'Book created successfully',
        payload: {
          book,
        },
      });
    } catch (error) {
      console.log(error);
      if (error.code == DBErrorCode.PgUniqueConstraintViolation) {
        throw new ConflictCustomException('Book Already Exist');
      }
      if (error.code == DBErrorCode.PgForeignKeyConstraintViolation) {
        throw new BadRequestCustomException('Foreign Key Constraint');
      }
      if (error.code == DBErrorCode.PgNotNullConstraintViolation) {
        throw new BadRequestCustomException('Query Failed');
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  /**
   * Get book by id
   * @param id {string}
   * @returns {Promise<ResponseDto<BookResponseDto>>}
   */
  public async getBookById(id: string): Promise<ResponseDto<BookResponseDto>> {
    const bookEntity = await this.bookRepository.findOneBy({ id });
    if (!bookEntity) {
      throw new NotFoundException();
    }
    const book = await BookMapper.toDto(bookEntity);
    return this.responseService.makeResponse({
      message: 'Retrieved book by id sucessfully',
      payload: { book },
    });
  }

  /**
   * Update book by id
   * @param id {string}
   * @param bookDto {UpdateBookRequestDto}
   * @returns {Promise<BookResponseDto>}
   */
  public async updateBook(
    id: string,
    bookDto: UpdateBookRequestDto,
  ): Promise<ResponseDto<BookResponseDto>> {
    let bookEntity = await this.bookRepository.findOneBy({ id });
    if (!bookEntity) {
      throw new NotFoundException();
    }
    try {
      bookEntity = BookMapper.toUpdateEntity(bookEntity, bookDto);
      await this.bookRepository.save(bookEntity);
      const updatedBookEntity = await this.bookRepository.findOneBy({ id });
      const book = await BookMapper.toDto(updatedBookEntity);
      return this.responseService.makeResponse({
        message: 'Book updated successfully',
        payload: { book },
      });
    } catch (error) {
      if (error.code == DBErrorCode.PgUniqueConstraintViolation) {
        throw new ConflictCustomException('Book Already Exist');
      }
      if (
        error.code == DBErrorCode.PgForeignKeyConstraintViolation ||
        error.code == DBErrorCode.PgNotNullConstraintViolation
      ) {
        throw new BadRequestCustomException('Foreign Key Constraint');
      }
      if (error instanceof TimeoutError) {
        throw new RequestTimeoutException();
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
