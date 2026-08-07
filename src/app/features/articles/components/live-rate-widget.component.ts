import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, computed, inject, input, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Observable } from 'rxjs';

import { RateService } from '../../../core/services/rate.service';
import { truncateTo2Decimals } from '../../../core/utils/number.util';
import { RateResponse } from '../../../core/models/rate-response';
import { RateTypeKey } from '../models/article.model';

@Component({
  selector: 'app-live-rate-widget',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="rate-widget" role="status" aria-live="polite">
      <span class="label">{{ label() }}</span>
      @if (loading()) {
        <span class="value loading">Consultando…</span>
      } @else if (rate() !== null) {
        <span class="value">{{ formatted() }}</span>
      } @else {
        <span class="value error">No disponible</span>
      }
    </div>
  `,
  styles: [`
    .rate-widget {
      display: inline-flex;
      align-items: baseline;
      gap: 10px;
      background: var(--accent-dim);
      border: 1px solid var(--accent-border);
      border-radius: var(--radius-sm);
      padding: 10px 16px;
      margin: 16px 0;
    }
    .label {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-secondary);
    }
    .value {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--accent);
      font-variant-numeric: tabular-nums;
    }
    .value.loading {
      color: var(--text-muted);
      font-weight: 400;
    }
    .value.error {
      color: var(--text-muted);
      font-weight: 400;
    }
  `],
})
export class LiveRateWidgetComponent implements OnInit {
  readonly type = input.required<RateTypeKey>();
  readonly label = input('Tasa de referencia hoy');

  private readonly rateService = inject(RateService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly rate = signal<number | null>(null);
  protected readonly loading = signal(true);

  protected readonly formatted = computed(() => {
    const value = this.rate();
    if (value === null) return '';
    return truncateTo2Decimals(value).toLocaleString('es-VE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  });

  ngOnInit(): void {
    this.requestFor(this.type())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {
          this.rate.set(response.price);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }

  private requestFor(type: RateTypeKey): Observable<RateResponse> {
    switch (type) {
      case 'oficial':
        return this.rateService.getUsdOficial();
      case 'promedio':
        return this.rateService.getUsdPromedio();
      case 'euro':
        return this.rateService.getEuro();
      case 'p2p':
        return this.rateService.getP2p();
    }
  }
}
