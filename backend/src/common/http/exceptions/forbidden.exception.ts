import { ForbiddenException } from '@nestjs/common';

export class ForbiddenCustomException extends ForbiddenException {
  constructor(message = 'Forbidden Error', errors?: Object) {
    super({ message, errors });
  }
}
