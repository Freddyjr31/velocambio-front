import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/rates/pages/rates-page.component').then((m) => m.RatesPageComponent),
  },
  {
    path: 'calculator',
    loadComponent: () =>
      import('./features/calculator/components/calculator-page.component').then(
        (m) => m.CalculatorPageComponent,
      ),
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./features/privacy-policy/pages/privacy-policy-page.component').then(
        (m) => m.PrivacyPolicyPageComponent,
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
