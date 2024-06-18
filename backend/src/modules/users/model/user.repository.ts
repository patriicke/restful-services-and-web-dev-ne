import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  async findUserByUsernameOrEmail(identifier: string): Promise<UserEntity> {
    return this.createQueryBuilder('u')
      .leftJoinAndSelect('u.roles', 'r', 'r.active = true')
      .where('u.username = :identifier OR u.email = :identifier', {
        identifier,
      })
      .getOne();
  }
}
