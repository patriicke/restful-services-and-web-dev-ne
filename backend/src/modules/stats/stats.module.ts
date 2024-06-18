import { Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { UsersModule } from '../users/users.module';
import { BooksModule } from '../books/books.module';

@Module({
  imports: [UsersModule, BooksModule],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
