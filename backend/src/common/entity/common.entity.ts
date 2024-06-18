import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CommonEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ type: String })
  id: string;

  @CreateDateColumn({ name: 'createdAt' })
  @ApiProperty({ type: Date })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  @ApiProperty({ type: Date })
  updatedAt: Date;

  constructor(entity?: Partial<any>) {
    super();
    Object.assign(this, entity);
  }
}
