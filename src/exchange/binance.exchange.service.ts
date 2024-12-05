import { Injectable, Logger } from '@nestjs/common';
import { ExchangeInterface } from './exchange.interface';
import { HttpServiceFactory } from '../http/http.service.factory';
import { AxiosInstance } from 'axios';
import { PairsEnum } from './pairs.enum';

@Injectable()
export class BinanceExchangeService implements ExchangeInterface {
  private readonly logger: Logger = new Logger(BinanceExchangeService.name);
  private readonly httpService: AxiosInstance;
  private readonly baseUrl: string = 'https://api.binance.com/api/v3';

  readonly pairs = {
    [PairsEnum.BTC_USDT]: 'BTCUSDT',
  };

  constructor(httpServiceFactory: HttpServiceFactory) {
    this.httpService = httpServiceFactory.createHttpService({
      baseURL: this.baseUrl,
      timeout: 5000,
    });
  }

  async getTickerPrice(
    pair: PairsEnum,
  ): Promise<{ bidPrice: number; askPrice: number }> {
    try {
      const symbol = this.pairs[pair];
      if (!symbol) {
        throw new Error(`Pair ${pair} not supported`);
      }

      const { data } = await this.httpService.get('/ticker/bookTicker', {
        params: { symbol },
      });

      return {
        bidPrice: Number(data.bidPrice),
        askPrice: Number(data.askPrice),
      };
    } catch (error) {
      this.logger.error(`getTickerPrice: ${error.message}`);
      throw error;
    }
  }
}
