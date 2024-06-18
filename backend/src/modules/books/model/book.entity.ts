import { Entity, Column } from 'typeorm';
import { CommonEntity } from '~/common/entity/common.entity';

@Entity({ name: 'books' })
export class BookEntity extends CommonEntity {
  @Column({
    name: 'name',
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  name: string;

  @Column({
    name: 'author',
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  author: string;

  @Column({
    name: 'publisher',
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  publisher: string;

  @Column({
    name: 'publicationYear',
    type: 'int',
    nullable: false,
  })
  publicationYear: number;

  @Column({
    name: 'subject',
    type: 'varchar',
    nullable: false,
    length: 50,
  })
  subject: string;
}
