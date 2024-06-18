import { BadRequestException } from '@nestjs/common';

export class BadRequestCustomException extends BadRequestException {
  constructor(message = 'Bad Request Error', errors?: Object) {
    super({ message, errors });
  }
}
