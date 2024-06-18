import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponseDto } from '../dtos';

export const ApiUnauthorizedCustomResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(ResponseDto, model),
    ApiUnauthorizedResponse({
      description: 'UNAUTHORIZED',
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            properties: {
              payload: {
                $ref: getSchemaPath(model),
              },
            },
          },
        ],
      },
    }),
  );
};
