import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { CommonEntity } from '~/common/entity';
import { EResetPasswordStatus } from '../enums/reset-password.status';
import { UserEntity } from '~/modules/users/model/user.entity';

@Entity({ name: 'reset-passwords' })
export class ResetPasswordEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  resetPasswordId: string;

  @Column({ name: 'token_key', type: 'varchar', nullable: false })
  tokenKey: string;

  @Column({ name: 'user_id' })
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: Relation<UserEntity>;

  @Column({
    name: 'status',
    enum: EResetPasswordStatus,
    default: EResetPasswordStatus.ACTIVE,
  })
  status: EResetPasswordStatus;
}
