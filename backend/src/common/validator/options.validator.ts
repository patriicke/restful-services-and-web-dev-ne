import {
  HttpException,
  HttpStatus,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common';
import { UnprocessableEntityCustomException } from '../http/exceptions/unprocessable-entity.exception';

const validationOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory: (errors: ValidationError[]) =>
    new UnprocessableEntityCustomException(
      'Unprocessable Entity Error',
      errors.reduce(
        (accumulator, currentValue) => ({
          ...accumulator,
          [currentValue.property]: Object.values(currentValue.constraints).join(
            ', ',
          ),
        }),
        {},
      ),
    ),
};

export default validationOptions;
