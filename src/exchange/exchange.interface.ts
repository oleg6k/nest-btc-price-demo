import { PairsEnum } from './pairs.enum';

export const EXCHANGE_INTERFACE_TOKEN = Symbol('ExchangeInterface');

export interface ExchangeInterface {
  readonly pairs: { [key in PairsEnum]: string };

  getTickerPrice(
    pair: PairsEnum,
  ): Promise<{ bidPrice: number; askPrice: number }>;
}
