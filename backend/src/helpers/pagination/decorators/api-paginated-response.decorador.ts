import { ResponseDto } from '../../../common/dtos';
import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiOkResponse,
  getSchemaPath,
  ApiExtraModels,
  ApiQuery,
} from '@nestjs/swagger';
import { PaginationResponseDto } from '../pagination-response.dto';

export const ApiOkPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiQuery({ name: 'orderBy', type: 'String', required: false }),
    ApiQuery({
      name: 'orderDirection',
      enum: ['ASC', 'DESC'],
      required: false,
    }),
    ApiQuery({
      name: 'page',
      type: 'number',
      required: false,
      example: '1',
      description: 'Default: 1',
    }),
    ApiQuery({
      name: 'limit',
      type: 'number',
      required: false,
      example: '10',
      description: 'Default: 10 and Maximum 100',
    }),
    ApiExtraModels(PaginationResponseDto, model),
    ApiOkResponse({
      description: 'OK',
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            properties: {
              payload: {
                allOf: [
                  { $ref: getSchemaPath(PaginationResponseDto) },
                  {
                    properties: {
                      items: {
                        type: 'array',
                        items: { $ref: getSchemaPath(model) },
                      },
                    },
                  },
                ],
              },
            },
          },
        ],
      },
    }),
  );
};
