import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>('APP_PORT', 3000);
  }

  get priceUpdateFrequency(): number {
    return this.configService.get<number>('PRICE_UPDATE_FREQUENCY_SEC', 10);
  }

  get priceCommissionPercent(): number {
    return this.configService.get<number>('PRICE_COMMISSION_PERCENT', 1);
  }

  get pricePrecision(): number {
    return this.configService.get<number>('PRICE_PRECISION', 6);
  }
}
