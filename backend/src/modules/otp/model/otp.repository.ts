import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { OTPEntity } from './otp.entity';

@Injectable()
export class OTPRepository extends Repository<OTPEntity> {
  constructor(private dataSource: DataSource) {
    super(OTPEntity, dataSource.createEntityManager());
  }
}
