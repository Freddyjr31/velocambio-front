import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/rates/pages/rates-page.component').then((m) => m.RatesPageComponent),
  },
  {
    path: 'calculator',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./features/privacy-policy/pages/privacy-policy-page.component').then(
        (m) => m.PrivacyPolicyPageComponent,
      ),
  },
  {
    path: 'blog',
    loadComponent: () =>
      import('./features/articles/pages/articles-list-page.component').then(
        (m) => m.ArticlesListPageComponent,
      ),
  },
  {
    path: 'blog/:slug',
    loadComponent: () =>
      import('./features/articles/pages/article-page.component').then(
        (m) => m.ArticlePageComponent,
      ),
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./features/terms/pages/terms-page.component').then(
        (m) => m.TermsPageComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
