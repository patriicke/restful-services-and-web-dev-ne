import { ApiProperty } from '@nestjs/swagger';

export class BaseDto extends Object {
  @ApiProperty({
    type: 'string',
    format: 'uuid',
    example: 'a12b3c4d-5678-90ef-ghij-klmnopqrstuv',
  })
  id: string;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    example: '2022-01-01T00:00:00Z',
  })
  createdAt: Date;

  @ApiProperty({
    type: 'string',
    format: 'date-time',
    example: '2022-01-01T00:00:00Z',
  })
  updatedAt: Date;

  constructor(entity?: Partial<any>) {
    super();
    Object.assign(this, entity);
  }
}
