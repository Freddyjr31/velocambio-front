export interface RateVariation {
  price: number;
  variacion_24h: number;
  variacion_7d: number;
  fetched_at: string;
}

export interface RateVariationResponse {
  rates: {
    usd_oficial: RateVariation;
    usd_paralelo: RateVariation;
    eur: RateVariation;
    usdt: RateVariation;
  };
}
