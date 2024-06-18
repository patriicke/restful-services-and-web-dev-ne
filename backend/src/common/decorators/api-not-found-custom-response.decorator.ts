import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiNotFoundResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponseDto } from '../dtos';

export const ApiNotFoundCustomResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiExtraModels(ResponseDto, model),
    ApiNotFoundResponse({
      description: 'NOT FOUND',
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
