import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ResetPasswordEntity } from './reset-password.entity';

@Injectable()
export class ResetPasswordRepository extends Repository<ResetPasswordEntity> {
  constructor(private dataSource: DataSource) {
    super(ResetPasswordEntity, dataSource.createEntityManager());
  }
}
