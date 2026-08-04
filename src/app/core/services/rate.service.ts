import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClient } from '../http/api-client';
import { API_ENDPOINTS } from '../config/api-config';
import { RateResponse } from '../models/rate-response';

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
}
