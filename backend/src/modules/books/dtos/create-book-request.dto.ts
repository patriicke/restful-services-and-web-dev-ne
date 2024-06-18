import { IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  author: string;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  publisher: string;

  @ApiProperty()
  @IsNotEmpty()
  publicationYear: number;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(50)
  subject: string;
}
