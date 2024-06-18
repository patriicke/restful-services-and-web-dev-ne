import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class FirebaseLoginRequestDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  readonly firebaseToken: string;
}
