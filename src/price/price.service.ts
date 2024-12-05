import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { AppConfigService } from '../config/app-config.service';
import {
  EXCHANGE_INTERFACE_TOKEN,
  ExchangeInterface,
} from '../exchange/exchange.interface';
import { Price } from './price';
import { PairsEnum } from '../exchange/pairs.enum';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class PriceService implements OnModuleInit {
  private readonly logger: Logger = new Logger(PriceService.name);
  private price: Price | null = null;

  constructor(
    private readonly configService: AppConfigService,
    @Inject(EXCHANGE_INTERFACE_TOKEN)
    private readonly exchangeService: ExchangeInterface,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  async onModuleInit(): Promise<void> {
    this.logger.log('PriceService Init...');
    await this.fetchPrice();

    const interval = setInterval(() => {
      this.fetchPrice();
    }, this.configService.priceUpdateFrequency * 1000);

    this.schedulerRegistry.addInterval('priceUpdate', interval);
  }

  //TODO: пары в аргументы метода
  async fetchPrice(): Promise<void> {
    try {
      const { bidPrice, askPrice } = await this.exchangeService.getTickerPrice(
        PairsEnum.BTC_USDT,
      );

      this.price = new Price(
        bidPrice,
        askPrice,
        this.configService.priceCommissionPercent,
        this.configService.pricePrecision,
      );

      this.logger.log(`Цена обновлена: ${JSON.stringify(this.price)}`);
    } catch (error) {
      this.logger.error('Ошибка при обновлении цены', error);
    }
  }

  //TODO: пары в аргументы метода
  getPrice(): Price | null {
    return this.price;
  }
}
