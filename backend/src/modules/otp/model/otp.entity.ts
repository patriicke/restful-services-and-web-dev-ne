import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { CommonEntity } from '~/common/entity';
import { EOTPStatus } from '../enums/otp.status';
import { UserEntity } from '../../users/model/user.entity';

@Entity({ name: 'otps' })
export class OTPEntity extends CommonEntity {
  @PrimaryGeneratedColumn('uuid')
  otpId: string;

  @Column({ nullable: false, type: 'int' })
  otp: number;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.id)
  @JoinColumn({ name: 'userId' })
  user: Relation<UserEntity>;

  @Column({ nullable: true })
  reason: string;

  @Column({ nullable: true, default: 30 })
  validity: number;

  @Column({ nullable: false, enum: EOTPStatus, default: EOTPStatus.ACTIVE })
  status: EOTPStatus;

  isValid() {
    const otpExpiration = this.createdAt.getTime() + this.validity * 60 * 1000;
    const now = new Date().getTime();
    return now < otpExpiration;
  }
}
