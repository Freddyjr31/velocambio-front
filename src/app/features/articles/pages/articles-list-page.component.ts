import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../../core/services/seo.service';
import { AdBannerComponent } from '../../../shared/components/ad-banner.component';
import { FooterComponent } from '../../../shared/components/footer.component';
import { MonetagAdComponent } from '../../../shared/components/monetag-ad.component';
import { NavComponent } from '../../../shared/components/nav.component';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-articles-list-page',
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

      <header class="page-header">
        <p class="eyebrow">Blog y guías</p>
        <h1>Tasas de cambio en Venezuela</h1>
        <p class="subtitle">
          Aprende cómo funciona el dólar BCV, el dólar paralelo, el euro y el USDT P2P en
          Venezuela, con guías actualizadas a las tasas de hoy.
        </p>
      </header>

      <div class="articles-grid">
        @for (article of articles; track article.slug) {
          <a class="article-card" [routerLink]="['/blog', article.slug]">
            <span class="category">{{ article.category }}</span>
            <h2>{{ article.title }}</h2>
            <p class="description">{{ article.description }}</p>
            <div class="meta">
              <span>{{ article.readingTimeMinutes }} min de lectura</span>
              <span class="read-more">Leer artículo →</span>
            </div>
          </a>
        }
      </div>

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
      gap: 20px;
      min-height: calc(100vh - 52px);
      overflow-x: clip;
    }
    .page-header {
      text-align: center;
      padding: 8px 0 4px;
    }
    .eyebrow {
      font-size: 0.78rem;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--accent);
      margin: 0 0 8px;
    }
    h1 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 8px;
    }
    .subtitle {
      font-size: 0.95rem;
      line-height: 1.6;
      color: var(--text-muted);
      max-width: 560px;
      margin: 0 auto;
    }
    .articles-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
    }
    .article-card {
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: var(--bg-surface);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: var(--radius-md);
      padding: 18px;
      text-decoration: none;
      transition: border-color 0.2s, transform 0.2s;
    }
    .article-card:hover {
      border-color: var(--accent-border);
      transform: translateY(-2px);
    }
    .category {
      align-self: flex-start;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: var(--accent);
      background: var(--accent-dim);
      border: 1px solid var(--accent-border);
      border-radius: 999px;
      padding: 3px 10px;
    }
    .article-card h2 {
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0;
      line-height: 1.35;
    }
    .description {
      font-size: 0.9rem;
      line-height: 1.55;
      color: var(--text-secondary);
      margin: 0;
    }
    .meta {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      margin-top: 4px;
      font-size: 0.78rem;
      color: var(--text-muted);
    }
    .read-more {
      color: var(--accent);
      font-weight: 600;
      white-space: nowrap;
    }

    @media (min-width: 768px) {
      .page {
        padding: 32px 24px 40px;
        gap: 24px;
      }
      .articles-grid {
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
      h1 {
        font-size: 1.75rem;
      }
    }
  `],
})
export class ArticlesListPageComponent {
  private readonly articleService = inject(ArticleService);
  private readonly seo = inject(SeoService);

  readonly articles = this.articleService.getAll();

  constructor() {
    this.seo.setPageMeta({
      title: 'Blog de tasas de cambio en Venezuela — Velocambio',
      description:
        'Guías sobre el dólar en Venezuela: tasa BCV, dólar paralelo, euro y USDT P2P. Aprende cómo funcionan las tasas de cambio y conviértelas a bolívares.',
      canonicalPath: '/blog',
    });
  }
}
