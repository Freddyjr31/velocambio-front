import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../http/api-client';
import { API_ENDPOINTS } from '../config/api-config';
import { RateResponse } from '../models/rate-response';
import { RateVariationResponse } from '../models/rate-variation';
import { RateBrechasResponse } from '../models/rate-brecha';
import { HistoricRatesResponse } from '../models/historic-rate';

@Injectable({ providedIn: 'root' })
export class RateService {
  private readonly api = inject(ApiClient);

  getUsdOficial(): Observable<RateResponse> {
    return this.api.get<RateResponse>(API_ENDPOINTS.usdOficial);
  }

  getUsdPromedio(): Observable<RateResponse> {
    return this.api.get<RateResponse>(API_ENDPOINTS.usdPromedio);
  }

  getEuro(): Observable<RateResponse> {
    return this.api.get<RateResponse>(API_ENDPOINTS.euro);
  }

  getP2p(): Observable<RateResponse> {
    return this.api.get<RateResponse>(API_ENDPOINTS.p2p);
  }

  getVariaciones(): Observable<RateVariationResponse> {
    return this.api.get<RateVariationResponse>(API_ENDPOINTS.variaciones);
  }

  getBrechas(): Observable<RateBrechasResponse> {
    return this.api.get<RateBrechasResponse>(API_ENDPOINTS.brechas);
  }

  getHistoricoBcv(page: number, pageSize: number): Observable<HistoricRatesResponse> {
    //? Pendiente backend (velocambio-back): pedir parámetro sort=desc en
    //? /rates/historico/bcv para evitar el mapeo inverso en la UI.
    return this.api.get<HistoricRatesResponse>(
      `${API_ENDPOINTS.historicoBcv}?page=${page}&page_size=${pageSize}`,
    );
  }
}
