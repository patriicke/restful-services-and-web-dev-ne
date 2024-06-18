import { ApiProperty } from '@nestjs/swagger';

export class StatDto {
  @ApiProperty()
  users: number;

  @ApiProperty()
  books: number;
}
