// src/price/price.controller.ts
import { Controller, Get } from '@nestjs/common';
import { PriceService } from './price.service';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  getPrice() {
    const price = this.priceService.getPrice();
    if (!price) {
      throw new Error('Price data not yet available');
    }
    return price;
  }
}
