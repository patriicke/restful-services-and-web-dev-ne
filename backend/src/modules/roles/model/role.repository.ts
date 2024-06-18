import { DataSource, Repository } from 'typeorm';
import { RoleEntity } from './role.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoleRepository extends Repository<RoleEntity> {
  constructor(private dataSource: DataSource) {
    super(RoleEntity, dataSource.createEntityManager());
  }
}
