export class Price {
  bid: string;
  ask: string;
  mid: string;

  constructor(
    sourceBid: number,
    sourceAsk: number,
    commissionPercent: number,
    precision: number = 6,
  ) {
    const commissionRate = commissionPercent / 100;

    const bid = sourceBid * (1 - commissionRate);
    const ask = sourceAsk * (1 + commissionRate);
    const mid = (bid + ask) / 2;

    this.bid = bid.toFixed(precision);
    this.ask = ask.toFixed(precision);
    this.mid = mid.toFixed(precision);
  }
}
