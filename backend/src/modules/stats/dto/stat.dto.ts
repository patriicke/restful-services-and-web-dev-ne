import { ApiProperty } from '@nestjs/swagger';

export class Stat {
  @ApiProperty()
  users: number;

  @ApiProperty()
  books: number;
}

export class StatDto {
  @ApiProperty({ type: Stat })
  stats: Stat;
}
