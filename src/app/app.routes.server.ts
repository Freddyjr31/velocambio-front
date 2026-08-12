import { RenderMode, ServerRoute } from '@angular/ssr';

import { ARTICLES } from './features/articles/data/articles.data';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'blog',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'blog/:slug',
    renderMode: RenderMode.Prerender,
    async getPrerenderParams() {
      return ARTICLES.map((article) => ({ slug: article.slug }));
    },
  },
  {
    path: 'privacy-policy',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'terms',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'calculator',
    renderMode: RenderMode.Client,
  },
  {
    path: 'historico',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Client,
  },
];
