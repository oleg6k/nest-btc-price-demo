import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/app-config.module';
import { PriceModule } from './price/price.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [AppConfigModule, PriceModule, ScheduleModule.forRoot()],
})
export class AppModule {}
