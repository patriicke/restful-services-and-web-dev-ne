import { Injectable } from '@nestjs/common';
import { UserRepository } from '../users/model/user.repository';
import { BookRepository } from '../books/model/book.repository';
import { ResponseDto } from '~/common/dtos';
import { StatDto } from './dto/stat.dto';
import { ResponseService } from '~/shared/response/response.service';

@Injectable()
export class StatsService {
  constructor(
    private userRepository: UserRepository,
    private bookRepository: BookRepository,
    private resposeService: ResponseService,
  ) {}

  public async getStats(): Promise<ResponseDto<StatDto>> {
    const users = await this.userRepository.count();
    const books = await this.bookRepository.count();
    return this.resposeService.makeResponse({
      message: 'Retrieved role by id',
      payload: {
        books,
        users,
      },
    });
  }
}
