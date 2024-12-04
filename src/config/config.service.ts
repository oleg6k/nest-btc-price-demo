import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {}

  get<T = any>(key: string): T {
    return this.nestConfigService.get<T>(key);
  }

  get port(): number {
    return this.get<number>('PORT') || 3000;
  }

  getUpdateFrequency(): number {
    return this.get<number>('UPDATE_FREQUENCY_SEC') || 10;
  }

  getServiceCommission(): number {
    return this.get<number>('SERVICE_COMMISSION_PERCENT') || 0.01;
  }
}
