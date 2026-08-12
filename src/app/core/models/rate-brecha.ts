export interface BrechaEntry {
  rate: number;
  brecha: number;
}

export interface RateBrechasResponse {
  usd_oficial_price: number;
  usd_oficial_fetched_at: string;
  brechas: {
    usd_paralelo: BrechaEntry;
    eur: BrechaEntry;
    usdt: BrechaEntry;
  };
}
