import { Module } from '@nestjs/common';
import { AppConfigModule } from '../config/app-config.module';
import { ExchangeModule } from '../exchange/exchange.module';
import { PriceController } from './price.controller';
import { PriceService } from './price.service';

@Module({
  imports: [AppConfigModule, ExchangeModule],
  providers: [PriceService],
  controllers: [PriceController],
})
export class PriceModule {}
