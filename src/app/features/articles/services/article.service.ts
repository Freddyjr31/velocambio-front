import { Injectable } from '@angular/core';

import { ARTICLES } from '../data/articles.data';
import { Article } from '../models/article.model';

@Injectable({ providedIn: 'root' })
export class ArticleService {
  getAll(): Article[] {
    return [...ARTICLES];
  }

  getBySlug(slug: string): Article | null {
    return ARTICLES.find((article) => article.slug === slug) ?? null;
  }

  getRelated(article: Article, count = 3): Article[] {
    return ARTICLES.filter((item) => item.slug !== article.slug).slice(0, count);
  }
}
