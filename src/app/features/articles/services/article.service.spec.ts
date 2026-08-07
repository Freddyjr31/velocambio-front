import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ARTICLES } from '../data/articles.data';
import { ArticleService } from './article.service';

describe('ArticleService', () => {
  let service: ArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    });
    service = TestBed.inject(ArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return at least 5 articles', () => {
    expect(service.getAll().length).toBeGreaterThanOrEqual(5);
  });

  it('should have unique slugs', () => {
    const slugs = ARTICLES.map((article) => article.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('should find an article by slug', () => {
    const article = service.getBySlug('dolar-hoy-venezuela');
    expect(article).not.toBeNull();
    expect(article?.title).toContain('Dólar hoy');
  });

  it('should return null for an unknown slug', () => {
    expect(service.getBySlug('no-existe')).toBeNull();
  });

  it('getRelated should exclude the article itself', () => {
    const article = service.getBySlug('euro-hoy-venezuela');
    expect(article).not.toBeNull();
    const related = service.getRelated(article!);
    expect(related.some((item) => item.slug === article!.slug)).toBeFalse();
  });
});
