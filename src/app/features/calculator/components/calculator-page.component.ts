import { Component, inject } from '@angular/core';

import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-calculator-page',
  imports: [],
  template: `<h1>Calculadora</h1><p>Conversión de divisas próximamente...</p>`,
  styles: [
    `
      :host {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 2rem;
        text-align: center;
      }
      h1 {
        font-size: 2rem;
        color: var(--accent);
        margin-bottom: 0.5rem;
      }
      p {
        color: var(--text-secondary);
      }
    `,
  ],
})
export class CalculatorPageComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.setPageMeta({
      title: 'Conversor de Divisas a Bolívares (VES) — Velocambio',
      description:
        'Convierte dólares (USD), euros (EUR) y USDT a bolívares (VES) con la calculadora de Velocambio, usando tasas de cambio en tiempo real.',
      canonicalPath: '/calculator',
    });
  }
}
