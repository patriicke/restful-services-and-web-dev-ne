import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiExtraModels,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponseDto } from '../dtos';

export const ApiConflictCustomResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(ResponseDto, model),
    ApiConflictResponse({
      description: 'CONFLICT',
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
