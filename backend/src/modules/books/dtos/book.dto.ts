import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '~/common/dtos/base.dto';

export class BookDto extends BaseDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  author: string;

  @ApiProperty()
  publisher: string;

  @ApiProperty()
  publicationYear: number;

  @ApiProperty()
  subject: string;
}
