import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { EResponse } from '~/common/enums/response-type.enum';
import { ResponseService } from '~/shared/response/response.service';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = +exception.getStatus();
    const responseService = new ResponseService(request);
    const { message, errors } = exception.getResponse() as {
      message: string;
      errors: any;
    };

    const res = responseService.makeResponse({
      message: message,
      payload: errors ? errors : null,
      responseType: EResponse.ERROR,
    });

    response.status(status).json(res);
  }
}
