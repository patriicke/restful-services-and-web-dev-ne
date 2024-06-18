import {  Module } from '@nestjs/common';
import { ResponseService } from './response.service';

@Module({})
export class ResponseModule {
  static forRoot() {
    return {
      global: true,
      module: ResponseModule,
      providers: [ResponseService],
      exports: [ResponseService],
    };
  }
}
