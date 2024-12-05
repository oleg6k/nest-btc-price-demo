import { Controller, Get } from '@nestjs/common';
import { PriceService } from './price.service';
import { Price } from './price';

@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Get()
  getPrice(): Price {
    const price: Price = this.priceService.getPrice();
    if (!price) {
      throw new Error('Price data not yet available');
    }
    return price;
  }
}
