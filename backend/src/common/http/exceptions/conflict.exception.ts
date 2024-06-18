import { ConflictException } from '@nestjs/common';

export class ConflictCustomException extends ConflictException {
  constructor(message = 'Conflict Error', errors?: Object) {
    super({ message, errors });
  }
}
