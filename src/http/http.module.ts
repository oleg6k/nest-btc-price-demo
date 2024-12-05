import { Module } from '@nestjs/common';
import { HttpServiceFactory } from './http.service.factory';

@Module({
  providers: [HttpServiceFactory],
  exports: [HttpServiceFactory],
})
export class HttpModule {}
