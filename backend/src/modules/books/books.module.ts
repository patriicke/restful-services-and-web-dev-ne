import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './model/book.entity';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BookRepository } from './model/book.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity])],
  controllers: [BooksController],
  providers: [BooksService, BookRepository],
  exports: [BooksService, BookRepository],
})
export class BooksModule {}
