import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  setPageMeta(options: { title: string; description: string; canonicalPath?: string }): void {
    const canonicalPath = options.canonicalPath ?? '/';
    const canonicalUrl = `${environment.siteUrl}${canonicalPath}`;

    this.title.setTitle(options.title);
    this.meta.updateTag({ name: 'description', content: options.description });
    this.meta.updateTag({ property: 'og:title', content: options.title });
    this.meta.updateTag({ property: 'og:description', content: options.description });
    this.meta.updateTag({ property: 'og:url', content: canonicalUrl });

    const link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (link) {
      link.href = canonicalUrl;
    }
  }

  setArticleSchema(article: {
    slug: string;
    title: string;
    description: string;
    datePublished: string;
    dateModified: string;
  }): void {
    const existing = document.getElementById('article-jsonld');
    existing?.remove();

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'article-jsonld';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: article.title,
      description: article.description,
      url: `${environment.siteUrl}/blog/${article.slug}`,
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      inLanguage: 'es',
    });
    document.head.appendChild(script);
  }
}
