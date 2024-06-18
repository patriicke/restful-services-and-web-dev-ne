import { Injectable, Scope, Inject } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ResponseDto } from '~/common/dtos';
import { EResponse } from '~/common/enums/response-type.enum';

type MakeResParams<T> = {
  message: string;
  payload: T | null;
  responseType?: EResponse;
};

@Injectable({ scope: Scope.REQUEST })
export class ResponseService {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  public makeResponse<T>(params: MakeResParams<T>): ResponseDto<T> {
    const { route, method } = this.request;
    const { message, payload, responseType = EResponse.SUCCESS } = params;
    const timestamp = new Date().getTime();

    const response: ResponseDto<T> = {
      success: responseType == EResponse.SUCCESS ? true : false,
      path: route ? route.path : `/${message.split(' /')[1]}`,
      message,
      payload,
      method,
      timestamp,
    };
    return response;
  }
}
