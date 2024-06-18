import { UnauthorizedException } from '@nestjs/common';

export class UnauthorizedCustomException extends UnauthorizedException {
  constructor(message = 'Unauthorized Error', errors?: Object) {
    super({ message, errors });
  }
}
