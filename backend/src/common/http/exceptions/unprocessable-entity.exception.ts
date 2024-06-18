import { UnprocessableEntityException } from '@nestjs/common';

export class UnprocessableEntityCustomException extends UnprocessableEntityException {
  constructor(message = 'Unprocessable Entity Error', errors?: Object) {
    super({ message, errors });
  }
}
