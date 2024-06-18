import { DataSource, Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BookRepository extends Repository<BookEntity> {
  constructor(private dataSource: DataSource) {
    super(BookEntity, dataSource.createEntityManager());
  }
}
