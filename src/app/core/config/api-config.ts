import { environment } from '../../../environments/environment';

export const API_BASE_URL = environment.apiBaseUrl;

export const API_ENDPOINTS = {
  usdOficial: '/rates/usd_oficial',
  usdPromedio: '/rates/usd_promedio',
  euro: '/rates/eur',
  p2p: '/rates/usdt',
  variaciones: '/rates/variaciones',
  brechas: '/rates/brecha',
  historicoBcv: '/rates/historico/bcv',
} as const;
