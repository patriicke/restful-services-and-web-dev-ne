import { Entity, Column, ManyToMany } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';
import { UserEntity } from '../../users/model/user.entity';

@Entity({ name: 'roles' })
export class RoleEntity extends CommonEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    unique: true,
    nullable: false,
    length: 50,
  })
  name: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: true,
  })
  active: boolean;

  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];
}
