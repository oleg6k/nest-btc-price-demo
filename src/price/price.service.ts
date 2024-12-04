import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import axios from 'axios';
import { Interval } from '@nestjs/schedule';
import { ConfigService } from '../config/config.service';
import { PriceDto } from './price.dto';

@Injectable()
export class PriceService implements OnModuleInit {
  private readonly logger = new Logger(PriceService.name);
  private price: PriceDto | null = null;

  constructor(private configService: ConfigService) {}

  async fetchPrice(): Promise<void> {
    try {
      const response = await axios.get(
        'https://api.binance.com/api/v3/ticker/bookTicker',
        { params: { symbol: 'BTCUSDT' } },
      );

      const { bidPrice, askPrice } = response.data;
      const commission = this.configService.getServiceCommission() / 100;

      const bid = Number(bidPrice) * (1 - commission);
      const ask = Number(askPrice) * (1 + commission);
      const mid = (bid + ask) / 2;

      this.price = new PriceDto();
      this.logger.log(`Initial price fetched: ${JSON.stringify(this.price)}`);
    } catch (error) {
      this.logger.error('Error fetching price during initialization', error);
      throw new Error('Failed to fetch initial price');
    }
  }

  async onModuleInit(): Promise<any> {
    await this.fetchPrice();
  }

  @Interval(Number(process.env.UPDATE_FREQUENCY_SEC) * 1000)
  async handleScheduledUpdates(): Promise<void> {
    await this.fetchPrice();
  }

  getPrice(): { bid: number; ask: number; mid: number } | null {
    return this.price;
  }
}
