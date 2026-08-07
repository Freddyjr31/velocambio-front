import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { finalize } from 'rxjs';

import { CURRENCIES } from '../../../core/models/currency';
import { ExchangeType } from '../../../core/models/exchange-type';
import { RateService } from '../../../core/services/rate.service';
import { SeoService } from '../../../core/services/seo.service';
import { truncateTo2Decimals } from '../../../core/utils/number.util';

import { AdBannerComponent } from '../../../shared/components/ad-banner.component';
import { BcvDisclaimerComponent } from '../../../shared/components/bcv-disclaimer.component';
import { CalculatorComponent } from '../../../shared/components/calculator.component';
import { ExchangeRateCardComponent } from '../../../shared/components/exchange-rate-card.component';
import { FooterComponent } from '../../../shared/components/footer.component';
import { NavComponent } from '../../../shared/components/nav.component';

interface RateEntry {
  value: number | null;
  loading: boolean;
}

function mockRates() {
  return {
    oficial: { value: null, loading: false } as RateEntry,
    promedio: { value: null, loading: false } as RateEntry,
    euro: { value: null, loading: false } as RateEntry,
    p2p: { value: null, loading: false } as RateEntry,
  };
}

const REFRESH_COOLDOWN_MS = 30_000;
const AUTO_REFRESH_INTERVAL_MS = 60_000;
const STALENESS_MS = 300_000;

@Component({
  selector: 'app-rates-page',
  imports: [
    NavComponent,
    AdBannerComponent,
    ExchangeRateCardComponent,
    CalculatorComponent,
    BcvDisclaimerComponent,
    FooterComponent,
  ],
  template: `
    <app-bcv-disclaimer
      [asModal]="showDisclaimer()"
      (dismissed)="showDisclaimer.set(false)"
    />

    <app-nav
      [showRefresh]="true"
      [refreshing]="refreshing()"
      [disabled]="refreshDisabled()"
      (refresh)="onRefresh()"
    />

    @defer (on viewport) {
      <app-ad-banner position="top" />
    } @placeholder {
      <div style="height: 50px"></div>
    }

    <main class="page">
      <h1 class="sr-only">Velocambio — Tasas de cambio en Venezuela</h1>

      <div class="content-grid">
        <section class="left-col">
          <div class="section-header">
            <h2 class="section-title">Tasas disponibles</h2>
            @if (lastUpdated()) {
              <span class="last-updated">Actualizado: {{ formattedLastUpdated() }}</span>
            }
          </div>

          <div class="rates-list">
            @for (item of rateCards; track item.type) {
              <app-exchange-rate-card
                [imagePath]="item.imagePath"
                [nameType]="item.nameType"
                [value]="item.value()"
                [isSelected]="selectedType() === item.type"
                [loading]="item.loading()"
                (selected)="selectRate(item.type, item.rate(), item.coinCode)"
              />
            }
          </div>
        </section>

        <section class="right-col">
          <div class="divider-mobile"></div>

          <app-calculator
            [inputCoin]="inputCoin()"
            [outputCoin]="outputCoin()"
            [amountValue]="amountInput()"
            [calculatedValue]="calculatedTotal()"
            (amountChanged)="onAmountChanged($event)"
            (swapCurrencies)="onSwapCurrencies()"
          />

          @defer (on viewport) {
            <app-bcv-disclaimer [asStatic]="true" />
          } @placeholder {
            <div style="height: 80px"></div>
          }

          @defer (on viewport) {
            <app-ad-banner position="bottom" />
          } @placeholder {
            <div style="height: 50px"></div>
          }

          <app-footer />
        </section>
      </div>

      <section class="seo-content">
        <h2>Dólar hoy en Venezuela: tasas de cambio en tiempo real</h2>
        <p>
          Velocambio te muestra en tiempo real el precio del dólar en Venezuela, la tasa
          oficial del BCV, el dólar paralelo (promedio del mercado), el euro y el USDT P2P,
          todos convertidos a bolívares (VES). También puedes usar el conversor para calcular
          cuántos bolívares equivalen a dólares, euros o USDT al instante.
        </p>
        <h3>Dólar oficial (BCV)</h3>
        <p>
          El tipo de cambio oficial del Banco Central de Venezuela es la referencia para
          transacciones legales en el país. Consulta aquí el valor del dólar BCV hoy,
          actualizado automáticamente cuando el BCV publica una nueva tasa.
        </p>
        <h3>Dólar paralelo (promedio)</h3>
        <p>
          El dólar paralelo o promedio refleja la cotización de referencia del mercado no
          oficial en Venezuela, calculada como promedio de distintas plataformas de
          intercambio.
        </p>
        <h3>Euro oficial</h3>
        <p>
          Consulta cuánto está el euro hoy en bolívares (EUR/VES) según las fuentes públicas
          de referencia del mercado venezolano.
        </p>
        <h3>USDT P2P (Binance)</h3>
        <p>
          El USDT es una criptomoneda estable respaldada por el dólar. Velocambio muestra el
          precio promedio del USDT/VES según los anuncios activos del mercado P2P de Binance.
        </p>
      </section>
    </main>
  `,
  styles: [`
    .page {
      max-width: var(--max-content-lg);
      margin: 0 auto;
      padding: 12px 16px 24px;
      display: flex;
      flex-direction: column;
      gap: 14px;
      min-height: calc(100vh - 52px);
      overflow-x: clip;
    }
    .content-grid {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .left-col {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .right-col {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .section-title {
      width: 100%;
      text-align: center;
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0;
    }
    .section-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 2px;
    }
    .last-updated {
      font-size: 0.75rem;
      color: var(--text-muted);
      letter-spacing: 0.2px;
    }
    .rates-list {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .divider-mobile {
      width: 100%;
      height: 1px;
      background: var(--accent-border);
    }
    .seo-content {
      max-width: 680px;
      margin: 0 auto;
      padding: 4px 6px 0;
    }
    .seo-content h2 {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 10px;
      text-align: center;
    }
    .seo-content h3 {
      font-size: 0.95rem;
      font-weight: 600;
      color: var(--accent);
      margin: 18px 0 6px;
    }
    .seo-content p {
      font-size: 0.9rem;
      line-height: 1.6;
      color: var(--text-muted);
      margin: 0 0 8px;
    }

    @media (min-width: 768px) {
      .page {
        padding: 16px 24px 32px;
        gap: 16px;
      }
      .content-grid {
        flex-direction: row;
        gap: 24px;
        align-items: flex-start;
      }
      .left-col {
        flex: 1;
        min-width: 0;
        gap: 12px;
      }
      .right-col {
        flex: 1;
        min-width: 0;
        gap: 18px;
      }
      .rates-list {
        gap: 12px;
      }
      .divider-mobile {
        display: none;
      }
    }
  `]
})
export class RatesPageComponent {
  protected readonly ExchangeType = ExchangeType;
  protected readonly CURRENCIES = CURRENCIES;

  private readonly rateService = inject(RateService);
  private readonly seo = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly isLoading = signal(false);
  protected readonly refreshing = signal(false);
  protected readonly refreshDisabled = signal(false);
  protected readonly lastUpdated = signal<Date | null>(null);

  private pendingCount = 0;
  private gotData = false;
  private cooldownTimer: ReturnType<typeof setTimeout> | undefined;

  protected readonly rates = signal(mockRates());

  protected readonly selectedType = signal<ExchangeType>(ExchangeType.oficialUsd);
  protected readonly selectedRate = signal<number>(93.456);

  protected readonly inputCoin = signal('USD');
  protected readonly outputCoin = signal('VES');
  protected readonly isDestinationVes = signal(true);

  protected readonly amountInput = signal(0);
  protected readonly calculatedTotal = signal(0);

  protected readonly showDisclaimer = signal(true);

  protected readonly rateCards = [
    {
      type: ExchangeType.oficialUsd,
      imagePath: CURRENCIES.usd.flagPath,
      nameType: 'BCV Oficial',
      coinCode: CURRENCIES.usd.code,
      rate: () => this.rates().oficial.value,
      value: () => this.rates().oficial.value,
      loading: () => this.rates().oficial.loading,
    },
    {
      type: ExchangeType.averageUsd,
      imagePath: CURRENCIES.usd.flagPath,
      nameType: 'Promedio',
      coinCode: CURRENCIES.usd.code,
      rate: () => this.rates().promedio.value,
      value: () => this.rates().promedio.value,
      loading: () => this.rates().promedio.loading,
    },
    {
      type: ExchangeType.oficialEur,
      imagePath: CURRENCIES.eur.flagPath,
      nameType: 'Euro',
      coinCode: CURRENCIES.eur.code,
      rate: () => this.rates().euro.value,
      value: () => this.rates().euro.value,
      loading: () => this.rates().euro.loading,
    },
    {
      type: ExchangeType.p2pUsdt,
      imagePath: CURRENCIES.usdt.flagPath,
      nameType: 'USDT P2P',
      coinCode: CURRENCIES.usdt.code,
      rate: () => this.rates().p2p.value,
      value: () => this.rates().p2p.value,
      loading: () => this.rates().p2p.loading,
    },
  ];

  constructor() {
    this.seo.setPageMeta({
      title: 'Velocambio — Dólar hoy en Venezuela: BCV, paralelo, euro y USDT',
      description:
        'Consulta la tasa del dólar hoy en Venezuela: dólar BCV oficial, dólar paralelo, euro y USDT P2P en bolívares (VES). Conversor de divisas en tiempo real.',
      canonicalPath: '/',
    });

    this.refreshData();

    effect(() => {
      const rate = this.selectedRate();
      const amount = this.amountInput();
      const toVes = this.isDestinationVes();

      const total = toVes ? amount * rate : rate > 0 ? amount / rate : 0;
      this.calculatedTotal.set(truncateTo2Decimals(total));
    });

    const interval = setInterval(() => this.checkAutoRefresh(), AUTO_REFRESH_INTERVAL_MS);
    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        this.checkAutoRefresh();
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    this.destroyRef.onDestroy(() => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (this.cooldownTimer) {
        clearTimeout(this.cooldownTimer);
      }
    });
  }

  protected onRefresh(): void {
    if (this.refreshDisabled()) return;
    this.refreshData();
  }

  private refreshData(): void {
    if (this.isLoading()) return;

    this.isLoading.set(true);
    this.refreshing.set(true);
    this.refreshDisabled.set(true);
    this.pendingCount = 4;
    this.gotData = false;

    const subs = [
      { key: 'oficial' as const, call: this.rateService.getUsdOficial() },
      { key: 'promedio' as const, call: this.rateService.getUsdPromedio() },
      { key: 'euro' as const, call: this.rateService.getEuro() },
      { key: 'p2p' as const, call: this.rateService.getP2p() },
    ] as const;

    subs.forEach(({ key, call }) => {
      call
        .pipe(
          takeUntilDestroyed(this.destroyRef),
          finalize(() => {
            this.pendingCount -= 1;
            if (this.pendingCount === 0) {
              this.isLoading.set(false);
              this.refreshing.set(false);
              if (this.gotData) {
                this.lastUpdated.set(new Date());
              }
              this.cooldownTimer = setTimeout(
                () => this.refreshDisabled.set(false),
                REFRESH_COOLDOWN_MS,
              );
            }
          }),
        )
        .subscribe({
          next: (res) => {
            this.gotData = true;
            this.rates.update((r) => ({ ...r, [key]: { value: res.price, loading: false } }));
          },
          error: () => {
            this.rates.update((r) => ({ ...r, [key]: { value: r[key].value, loading: false } }));
          },
        });
    });
  }

  private checkAutoRefresh(): void {
    if (this.isLoading()) return;
    const last = this.lastUpdated();
    if (last === null || Date.now() - last.getTime() >= STALENESS_MS) {
      this.refreshData();
    }
  }

  protected formattedLastUpdated(): string {
    const last = this.lastUpdated();
    if (last === null) return '';
    return last.toLocaleTimeString('es-VE', { hour: '2-digit', minute: '2-digit' });
  }

  selectRate(type: ExchangeType, rate: number | null, coinCode: string): void {
    if (rate === null) return;

    this.selectedType.set(type);
    this.selectedRate.set(rate);
    this.isDestinationVes.set(true);
    this.inputCoin.set(coinCode);
    this.outputCoin.set('VES');
  }

  onAmountChanged(value: number): void {
    this.amountInput.set(value);
  }

  onSwapCurrencies(): void {
    const from = this.inputCoin();
    const to = this.outputCoin();

    this.inputCoin.set(to);
    this.outputCoin.set(from);
    this.isDestinationVes.set(!this.isDestinationVes());

    const currentRate = this.getCurrentRate();
    if (currentRate !== null) {
      this.selectedRate.set(currentRate);
    }
  }

  private getCurrentRate(): number | null {
    const type = this.selectedType();
    const r = this.rates();
    switch (type) {
      case ExchangeType.oficialUsd: return r.oficial.value;
      case ExchangeType.averageUsd: return r.promedio.value;
      case ExchangeType.oficialEur: return r.euro.value;
      case ExchangeType.p2pUsdt: return r.p2p.value;
      default: return null;
    }
  }
}
