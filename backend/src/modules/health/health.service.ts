import { Injectable } from '@nestjs/common';
import { ResponseDto } from '~/common/dtos';
import { EResponse } from '~/common/enums/response-type.enum';
import { InternalServerErrorCustomException } from '~/common/http';
import { ResponseService } from '~/shared/response/response.service';

@Injectable()
export class HealthService {
  constructor(private responseService: ResponseService) {}
  getHealth(): ResponseDto<null> {
    try {
      return this.responseService.makeResponse({
        payload: null,
        message: 'Server is up and running!',
        responseType: EResponse.SUCCESS,
      });
    } catch (error) {
      throw new InternalServerErrorCustomException();
    }
  }
}
