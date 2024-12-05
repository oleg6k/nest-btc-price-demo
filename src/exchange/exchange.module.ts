import { HttpModule } from '../http/http.module';
import { Module } from '@nestjs/common';
import { BinanceExchangeService } from './binance.exchange.service';
import { EXCHANGE_INTERFACE_TOKEN } from './exchange.interface';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: EXCHANGE_INTERFACE_TOKEN,
      useClass: BinanceExchangeService,
    },
  ],
  exports: [EXCHANGE_INTERFACE_TOKEN],
})
export class ExchangeModule {}
