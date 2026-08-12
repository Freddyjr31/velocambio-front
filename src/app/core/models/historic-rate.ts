export interface HistoricRateEntry {
  fecha: string;
  price: number;
  rate_buy: number | null;
  rate_sell: number | null;
}

export interface HistoricRatesResponse {
  currency: string;
  rate_type: string;
  source: string;
  page: number;
  page_size: number;
  total: number;
  total_pages: number;
  history: HistoricRateEntry[];
}
