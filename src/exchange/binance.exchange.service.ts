// src/exchange/binance.exchange.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ExchangeInterface } from './exchange.interface';
import { ConfigService } from '../config/config.service';
import { HttpServiceFactory } from '../http/http.service.factory';

@Injectable()
export class BinanceExchangeService implements ExchangeInterface {
  private readonly logger = new Logger(BinanceExchangeService.name);
  private readonly httpService;

  constructor(
    private readonly configService: ConfigService,
    httpServiceFactory: HttpServiceFactory,
  ) {
    // Создаём настроенный экземпляр HttpService для Binance
    this.httpService = httpServiceFactory.createHttpService({
      baseURL: this.configService.getBinanceApiUrl(),
      timeout: 5000, // Можно настроить специфичный таймаут
    });
  }

  async getTickerPrice(
    symbol: string,
  ): Promise<{ bidPrice: string; askPrice: string }> {
    try {
      const response = await this.httpService.get('/ticker/bookTicker', {
        params: { symbol },
      });
      return {
        bidPrice: response.data.bidPrice,
        askPrice: response.data.askPrice,
      };
    } catch (error) {
      this.logger.error(
        `Ошибка при получении данных от Binance API: ${error.message}`,
      );
      throw error;
    }
  }
}
