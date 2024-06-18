import { ApiProperty } from '@nestjs/swagger';
export class PaginationResponseDto<T> {
  @ApiProperty()
  items: Partial<T>[] | any[];

  @ApiProperty({ example: 1 })
  itemCount: number;

  @ApiProperty({ example: 1 })
  totalItems: number;

  @ApiProperty({ example: 1 })
  itemsPerPage: number;

  @ApiProperty({ example: 1 })
  totalPages: number;

  @ApiProperty({ example: 1 })
  currentPage: number;
}
