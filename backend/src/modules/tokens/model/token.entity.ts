import { Column, Entity, JoinColumn, ManyToOne, Relation } from 'typeorm';
import { CommonEntity } from '~/common/entity';
import { TokenType } from '../enums';
import { UserEntity } from '../../users/model/user.entity';

@Entity({ name: 'tokens' })
export class TokenEntity extends CommonEntity {
  @Column({
    length: 500,
  })
  token: string;

  @Column({
    enum: TokenType,
  })
  type: TokenType;

  @Column({
    type: 'uuid',
    nullable: true,
  })
  parentId?: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive: boolean;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.tokens)
  @JoinColumn({ name: 'userId' })
  user: Relation<UserEntity>;
}
