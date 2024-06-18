import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { BooksService } from './books.service';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { TOKEN_NAME } from '~/constants';
import { ApiInternalServerErrorCustomResponse } from '~/common/decorators/api-ise-custom-response.decorator';
import { NullDto } from '~/common/dtos/null.dto';
import { ApiBadRequestCustomResponse } from '~/common/decorators/api-bad-request-custom-response.decorator';
import { ApiUnauthorizedCustomResponse } from '~/common/decorators/api-unauthorized-custom-response.decorator';
import { ApiForbiddenCustomResponse } from '~/common/decorators/api-forbidden-custom-response.decorator';
import {
  ApiCreatedCustomResponse,
  ApiOkCustomResponse,
} from '~/common/decorators';
import { BookResponseDto } from './dtos/book-response.dto';
import { CreateBookRequestDto } from './dtos/create-book-request.dto';
import { ResponseDto } from '~/common/dtos';
import { Roles } from '../auth/decorators';
import {
  ApiOkPaginatedResponse,
  PaginationParams,
  PaginationRequest,
} from '~/helpers/pagination';
import { BookDto } from './dtos/book.dto';
import { PaginationResponseDto } from '~/helpers/pagination/pagination-response.dto';
import { UpdateBookRequestDto } from './dtos/update-book.dto';

@ApiTags('Books')
@Controller({
  path: 'books',
  version: '1',
})
@ApiBearerAuth(TOKEN_NAME)
@ApiInternalServerErrorCustomResponse(NullDto)
@ApiBadRequestCustomResponse(NullDto)
@ApiUnauthorizedCustomResponse(NullDto)
@ApiForbiddenCustomResponse(NullDto)
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @ApiOperation({ description: 'Get a paginated books list' })
  @ApiOkPaginatedResponse(BookDto)
  @ApiQuery({
    name: 'search',
    type: 'string',
    required: false,
  })
  @Get()
  public getRoles(
    @PaginationParams() pagination: PaginationRequest,
  ): Promise<ResponseDto<PaginationResponseDto<BookDto>>> {
    return this.booksService.getBooks(pagination);
  }

  @ApiOperation({ description: 'Get book by id' })
  @ApiOkCustomResponse(BookResponseDto)
  @Get('/:id')
  public getRoleById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseDto<BookResponseDto>> {
    return this.booksService.getBookById(id);
  }

  @ApiOperation({ description: 'Create new book' })
  @ApiCreatedCustomResponse(BookResponseDto)
  @ApiConflictResponse({ description: 'Book already exists' })
  @Roles('admin')
  @Post()
  public createBook(
    @Body(ValidationPipe) bookDto: CreateBookRequestDto,
  ): Promise<ResponseDto<BookResponseDto>> {
    return this.booksService.createBook(bookDto);
  }

  @ApiOperation({ description: 'Update role by id' })
  @ApiOkCustomResponse(BookResponseDto)
  @Roles('admin')
  @Put('/:id')
  public updateBook(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) roleDto: UpdateBookRequestDto,
  ): Promise<ResponseDto<BookResponseDto>> {
    return this.booksService.updateBook(id, roleDto);
  }

  @ApiOperation({ description: 'Delete book by id' })
  @ApiOkCustomResponse(NullDto)
  @Roles('admin')
  @Delete('/:id')
  public deleteBook(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResponseDto<NullDto>> {
    return this.booksService.deleteBookById(id);
  }
}
