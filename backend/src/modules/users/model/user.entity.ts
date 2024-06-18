import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { CommonEntity } from '~/common/entity';
import { HashHelper } from '~/helpers';
import { UserStatus } from '../enums/user-status.enum';
import { RoleEntity } from '~/modules/roles/model/role.entity';
import { TokenEntity } from '~/modules/tokens/model/token.entity';

@Entity({ name: 'users' })
export class UserEntity extends CommonEntity {
  @Column({ name: 'first_name', nullable: false })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ name: 'username', nullable: true, unique: true })
  username: string;

  @Column({ name: 'email', nullable: false, unique: true })
  email: string;

  @Column({ name: 'phone_number', nullable: true, unique: true })
  phoneNumber: string;

  @Column({
    name: 'password',
    nullable: false,
  })
  password: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.Active,
    nullable: false,
  })
  status: UserStatus;

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable({
    name: 'user_roles',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: Promise<RoleEntity[]>;

  @OneToMany(() => TokenEntity, (token) => token.user)
  tokens: TokenEntity[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await HashHelper.encrypt(this.password);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await HashHelper.compare(password, this.password);
  }
}
