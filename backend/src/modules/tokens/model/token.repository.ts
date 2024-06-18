import { DataSource, Repository } from 'typeorm';
import { TokenEntity } from './token.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TokenRepository extends Repository<TokenEntity> {
  constructor(private dataSource: DataSource) {
    super(TokenEntity, dataSource.createEntityManager());
  }
}
