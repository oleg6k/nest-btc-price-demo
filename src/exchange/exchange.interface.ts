export interface ExchangeInterface {
  getTickerPrice(
    symbol: string,
  ): Promise<{ bidPrice: string; askPrice: string }>;
}
