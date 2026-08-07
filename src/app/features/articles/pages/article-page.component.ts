import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { SeoService } from '../../../core/services/seo.service';
import { AdBannerComponent } from '../../../shared/components/ad-banner.component';
import { FooterComponent } from '../../../shared/components/footer.component';
import { NavComponent } from '../../../shared/components/nav.component';
import { LiveRateWidgetComponent } from '../components/live-rate-widget.component';
import { Article } from '../models/article.model';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavComponent,
    FooterComponent,
    AdBannerComponent,
    LiveRateWidgetComponent,
    RouterLink,
  ],
  template: `
    @if (article(); as article) {
      <app-nav />

      <main class="page">
        <article class="article">
          <header class="article-header">
            <a class="back-link" routerLink="/blog">← Volver al blog</a>
            <span class="category">{{ article.category }}</span>
            <h1>{{ article.title }}</h1>
            <p class="description">{{ article.description }}</p>
            <div class="meta">
              <span>{{ formatDate(article.datePublished) }}</span>
              <span aria-hidden="true">·</span>
              <span>{{ article.readingTimeMinutes }} min de lectura</span>
            </div>
          </header>

          @if (article.liveRateType; as rateType) {
            <app-live-rate-widget
              [type]="rateType"
              label="Tasa de referencia hoy"
            />
          }

          @for (section of article.sections; track section.heading) {
            <section>
              <h2>{{ section.heading }}</h2>
              @for (paragraph of section.paragraphs; track paragraph) {
                <p>{{ paragraph }}</p>
              }
            </section>
          }

          <div class="cta">
            <h2>Convierte al instante con Velocambio</h2>
            <p>
              Consulta las tasas de cambio en tiempo real y convierte dólares, euros o USDT
              a bolívares con la calculadora.
            </p>
            <a class="cta-link" routerLink="/">Abrir la calculadora →</a>
          </div>
        </article>

        @defer (on viewport) {
          <app-ad-banner position="bottom" />
        } @placeholder {
          <div style="height: 50px"></div>
        }

        <section class="related">
          <h2>Sigue leyendo</h2>
          <div class="related-grid">
            @for (related of related(); track related.slug) {
              <a class="related-card" [routerLink]="['/blog', related.slug]">
                <h3>{{ related.title }}</h3>
                <p>{{ related.description }}</p>
              </a>
            }
          </div>
        </section>

        <app-footer />
      </main>
    }
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
    .article {
      max-width: 680px;
      margin: 0 auto;
      width: 100%;
    }
    .article-header {
      padding-bottom: 16px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
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
    .category {
      display: inline-block;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.5px;
      text-transform: uppercase;
      color: var(--accent);
      background: var(--accent-dim);
      border: 1px solid var(--accent-border);
      border-radius: 999px;
      padding: 3px 10px;
      margin-bottom: 10px;
    }
    h1 {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--text-primary);
      line-height: 1.3;
      margin: 0 0 10px;
    }
    .description {
      font-size: 1rem;
      line-height: 1.6;
      color: var(--text-secondary);
      margin: 0 0 12px;
    }
    .meta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.8rem;
      color: var(--text-muted);
    }
    section {
      margin-top: 24px;
    }
    h2 {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--accent);
      margin: 0 0 10px;
    }
    p {
      font-size: 0.95rem;
      line-height: 1.7;
      color: var(--text-secondary);
      margin: 0 0 12px;
    }
    .cta {
      margin-top: 28px;
      background: var(--bg-surface);
      border: 1px solid var(--accent-border);
      border-radius: var(--radius-md);
      padding: 20px;
    }
    .cta h2 {
      color: var(--text-primary);
    }
    .cta-link {
      display: inline-block;
      margin-top: 4px;
      font-weight: 600;
      color: var(--accent);
      text-decoration: none;
    }
    .cta-link:hover {
      text-decoration: underline;
    }
    .related {
      max-width: 680px;
      margin: 0 auto;
      width: 100%;
      padding-top: 8px;
    }
    .related h2 {
      color: var(--text-primary);
    }
    .related-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 12px;
    }
    .related-card {
      display: block;
      background: var(--bg-surface);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: var(--radius-md);
      padding: 16px;
      text-decoration: none;
      transition: border-color 0.2s;
    }
    .related-card:hover {
      border-color: var(--accent-border);
    }
    .related-card h3 {
      font-size: 0.95rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 6px;
      line-height: 1.35;
    }
    .related-card p {
      font-size: 0.85rem;
      color: var(--text-muted);
      margin: 0;
      line-height: 1.5;
    }

    @media (min-width: 768px) {
      .page {
        padding: 32px 24px 40px;
        gap: 24px;
      }
      h1 {
        font-size: 1.75rem;
      }
      .related-grid {
        grid-template-columns: 1fr 1fr;
        gap: 14px;
      }
    }
  `],
})
export class ArticlePageComponent {
  protected readonly article = signal<Article | null>(null);
  protected readonly related = signal<Article[]>([]);

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly articleService = inject(ArticleService);
  private readonly seo = inject(SeoService);

  constructor() {
    const slug = this.route.snapshot.paramMap.get('slug');
    const article = slug ? this.articleService.getBySlug(slug) : null;

    if (!article) {
      this.router.navigate(['/blog'], { replaceUrl: true });
      return;
    }

    this.article.set(article);
    this.related.set(this.articleService.getRelated(article));

    this.seo.setPageMeta({
      title: `${article.title} — Velocambio`,
      description: article.description,
      canonicalPath: `/blog/${article.slug}`,
    });
    this.seo.setArticleSchema(article);
  }

  protected formatDate(iso: string): string {
    const date = new Date(iso);
    return date.toLocaleDateString('es-VE', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }
}
