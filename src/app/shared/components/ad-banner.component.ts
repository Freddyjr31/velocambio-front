import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-ad-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ad-placeholder" role="banner" aria-label="Espacio publicitario">
      <span class="ad-text">Espacio publicitario</span>
    </div>
  `,
  styles: [`
    .ad-placeholder {
      width: 100%;
      min-height: 70px;
      margin: 16px auto;
      border-radius: var(--radius-sm, 4px);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 1px dashed rgba(255, 255, 255, 0.08);
    }
    .ad-text {
      color: var(--text-muted);
      font-size: 0.78rem;
      letter-spacing: 0.5px;
    }
  `]
})
export class AdBannerComponent {
  readonly position = input<'top' | 'bottom'>('top');
}
