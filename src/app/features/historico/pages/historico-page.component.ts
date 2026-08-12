import { isPlatformServer } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, PLATFORM_ID, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

import { HistoricRatesResponse } from '../../../core/models/historic-rate';
import { RateService } from '../../../core/services/rate.service';
import { SeoService } from '../../../core/services/seo.service';

import { AdBannerComponent } from '../../../shared/components/ad-banner.component';
import { FooterComponent } from '../../../shared/components/footer.component';
import { MonetagAdComponent } from '../../../shared/components/monetag-ad.component';
import { NavComponent } from '../../../shared/components/nav.component';

const PAGE_SIZE = 50;

@Component({
  selector: 'app-historico-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavComponent, FooterComponent, AdBannerComponent, MonetagAdComponent, RouterLink],
  template: `
    <app-nav />

    <!--! MONETAG TAG (experimental) - quitar <app-monetag-ad /> y su import al revertir -->
    <app-monetag-ad />

    <main class="page">
      @defer (on viewport) {
        <app-ad-banner position="top" />
      } @placeholder {
        <div style="height: 50px"></div>
      }

      <div class="page-hero">
        <a class="back-link" routerLink="/">← Volver a la calculadora</a>
        <h1 class="page-title">Histórico del dólar BCV en Venezuela</h1>
        <p class="page-subtitle">
          Evolución del tipo de cambio oficial del dólar (USD/VES) según el Banco Central de
          Venezuela, registrado desde 2023.
        </p>
      </div>

      <section class="table-card">
        <div class="table-header">
          <h2 class="table-title">Evolución del dólar por fecha</h2>
          @if (data(); as data) {
            <span class="table-total">{{ data.total }} registros</span>
          }
        </div>

        @if (loading()) {
          <div class="rows">
            @for (row of skeletonRows; track row) {
              <div class="row"><span class="skeleton date-skeleton"></span><span class="skeleton price-skeleton"></span></div>
            }
          </div>
        } @else if (error()) {
          <div class="state">
            <p class="state-text">No pudimos cargar el histórico. Intenta de nuevo.</p>
            <button class="retry-btn" type="button" (click)="loadPage(currentPage())">Reintentar</button>
          </div>
        } @else if (data(); as data) {
          <div class="rows">
            @for (entry of data.history; track entry.fecha) {
              <div class="row">
                <span class="date">{{ formatDate(entry.fecha) }}</span>
                <span class="price">{{ formatPrice(entry.price) }} VES</span>
              </div>
            }
          </div>

          <div class="pagination">
            <button
              class="page-btn"
              type="button"
              [disabled]="!hasPrevPage() || loading()"
              (click)="goToPage(currentPage() - 1)"
            >← Anterior</button>
            <span class="page-indicator">Página {{ currentPage() }} de {{ data.total_pages }}</span>
            <button
              class="page-btn"
              type="button"
              [disabled]="!hasNextPage() || loading()"
              (click)="goToPage(currentPage() + 1)"
            >Siguiente →</button>
          </div>
        }
      </section>

      @defer (on viewport) {
        <app-ad-banner position="bottom" />
      } @placeholder {
        <div style="height: 90px"></div>
      }

      <section class="seo-content">
        <h2>¿Para qué sirve el histórico del dólar BCV?</h2>
        <p>
          Consultar el histórico del dólar en Venezuela te permite analizar la evolución del
          tipo de cambio oficial del Banco Central de Venezuela (BCV) mes a mes. Así puedes
          identificar tendencias de apreciación o depreciación del bolívar frente al dólar
          desde 2023, útil para planificar ahorros, compras o presupuestos en bolívares.
        </p>
      </section>

      <app-footer />
    </main>
  `,
  styles: [`
    .page {
      max-width: var(--max-content-lg);
      margin: 0 auto;
      padding: 24px 16px 32px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      min-height: calc(100vh - 52px);
      overflow-x: clip;
    }
    .page-hero {
      text-align: center;
      padding: 4px 6px 0;
    }
    .back-link {
      display: inline-block;
      font-size: 0.85rem;
      color: var(--text-muted);
      text-decoration: none;
      margin-bottom: 14px;
    }
    .back-link:hover {
      color: var(--accent);
    }
    .page-title {
      font-size: 1.5rem;
      font-weight: 800;
      color: var(--text-primary);
      margin: 0 0 6px;
    }
    .page-subtitle {
      font-size: 0.9rem;
      line-height: 1.6;
      color: var(--text-muted);
      max-width: 620px;
      margin: 0 auto;
    }
    .table-card {
      background: var(--bg-surface);
      border: 1px solid var(--accent-border);
      border-radius: var(--radius-md);
      padding: 16px;
    }
    .table-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-bottom: 12px;
    }
    .table-title {
      font-size: 1rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0;
    }
    .table-total {
      font-size: 0.78rem;
      color: var(--text-muted);
      white-space: nowrap;
    }
    .rows {
      display: flex;
      flex-direction: column;
      max-height: 520px;
      overflow-y: auto;
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: var(--radius-sm);
    }
    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      padding: 10px 14px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.04);
    }
    .row:last-child {
      border-bottom: none;
    }
    .date {
      font-size: 0.88rem;
      color: var(--text-secondary);
    }
    .price {
      font-size: 0.88rem;
      font-weight: 700;
      color: var(--text-primary);
      white-space: nowrap;
    }
    .skeleton {
      border-radius: 4px;
      background: var(--bg-elevated);
      height: 14px;
    }
    .date-skeleton {
      width: 110px;
    }
    .price-skeleton {
      width: 90px;
    }
    .state {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 24px 8px;
    }
    .state-text {
      font-size: 0.9rem;
      color: var(--text-secondary);
      margin: 0;
    }
    .retry-btn {
      background: var(--accent);
      color: #fff;
      border: none;
      border-radius: var(--radius-sm);
      padding: 8px 18px;
      font-family: inherit;
      font-size: 0.85rem;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    .retry-btn:hover {
      opacity: 0.9;
    }
    .pagination {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-top: 14px;
    }
    .page-btn {
      background: var(--bg-primary);
      color: var(--text-secondary);
      border: 1px solid var(--accent-border);
      border-radius: var(--radius-sm);
      padding: 8px 14px;
      font-family: inherit;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
    }
    .page-btn:hover:not(:disabled) {
      background: var(--accent-dim);
      color: var(--accent);
    }
    .page-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .page-indicator {
      font-size: 0.8rem;
      color: var(--text-muted);
      white-space: nowrap;
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
    .seo-content p {
      font-size: 0.9rem;
      line-height: 1.6;
      color: var(--text-muted);
      margin: 0;
    }

    @media (min-width: 768px) {
      .page {
        padding: 32px 24px 40px;
        gap: 22px;
      }
      .page-title {
        font-size: 1.7rem;
      }
    }
  `],
})
export class HistoricoPageComponent {
  protected readonly data = signal<HistoricRatesResponse | null>(null);
  protected readonly currentPage = signal(1);
  protected readonly loading = signal(false);
  protected readonly error = signal(false);

  protected readonly skeletonRows = Array.from({ length: 8 }, (_, i) => i);

  protected readonly hasPrevPage = () => this.currentPage() > 1;
  protected readonly hasNextPage = () =>
    this.data() !== null && this.currentPage() < this.data()!.total_pages;

  private readonly rateService = inject(RateService);
  private readonly seo = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly platformId = inject(PLATFORM_ID);

  constructor() {
    this.seo.setPageMeta({
      title: 'Histórico del dólar BCV en Venezuela',
      description:
        'Evolución del tipo de cambio oficial del dólar (USD/VES) según el BCV desde 2023. Consulta el histórico del dólar por fecha en Velocambio.',
      canonicalPath: '/historico',
    });

    if (!isPlatformServer(this.platformId)) {
      this.loadPage(1);
    }
  }

  protected goToPage(page: number): void {
    if (page < 1 || this.loading()) return;
    const totalPages = this.data()?.total_pages ?? 1;
    if (page > totalPages) return;
    this.loadPage(page);
  }

  protected loadPage(page: number): void {
    this.loading.set(true);
    this.error.set(false);

    this.rateService
      .getHistoricoBcv(page, PAGE_SIZE)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (res) => {
          this.data.set(res);
          this.currentPage.set(res.page);
          this.loading.set(false);
        },
        error: () => {
          this.error.set(true);
          this.loading.set(false);
        },
      });
  }

  protected formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('es-VE', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  protected formatPrice(price: number): string {
    return price.toLocaleString('es-VE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
}
