import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-exchange-rate-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="card"
      [class.selected]="isSelected()"
      [class.loading]="loading()"
      (click)="selected.emit()"
      type="button"
    >
      <div class="left">
        @if (loading()) {
          <span class="skeleton flag-skeleton"></span>
          <span class="skeleton name-skeleton"></span>
        } @else {
          <img
            [src]="imagePath()"
            [alt]="nameType()"
            class="flag"
            width="28"
            height="18"
            loading="lazy"
          />
          <span class="name">{{ nameType() }}</span>
        }
      </div>
      <div class="right">
        @if (loading()) {
          <span class="skeleton value-skeleton"></span>
        } @else if (value() !== null) {
          <span class="value">{{ value()!.toLocaleString('es-VE', { minimumFractionDigits: 3, maximumFractionDigits: 3 }) }} VES</span>
          @if (brecha() !== null) {
            <span class="brecha" aria-hidden="true">▲ {{ formatPercent(brecha()!) }} vs BCV</span>
          }
          @if (variacion24h() !== null || variacion7d() !== null) {
            <span class="variaciones">
              @if (variacion24h() !== null) {
                <span class="variacion" [class.up]="variacionClass(variacion24h()!) === 'up'" [class.down]="variacionClass(variacion24h()!) === 'down'">{{ variacionText(variacion24h()!) }} 24h</span>
              }
              @if (variacion7d() !== null) {
                <span class="variacion" [class.up]="variacionClass(variacion7d()!) === 'up'" [class.down]="variacionClass(variacion7d()!) === 'down'">{{ variacionText(variacion7d()!) }} 7d</span>
              }
            </span>
          }
        }
      </div>
    </button>
  `,
  styles: [`
    .card {
      width: 100%;
      min-height: 60px;
      padding: 10px 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--bg-primary);
      border-radius: var(--radius-md);
      border: 1px solid var(--accent-border);
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
      font-family: inherit;
      font-size: inherit;
      color: inherit;
      text-align: left;
      overflow: hidden;
    }
    .card:hover:not(.loading) {
      background: var(--accent-dim);
    }
    .card:focus-visible {
      outline: 2px solid var(--accent);
      outline-offset: 2px;
    }
    .card.selected {
      background: var(--accent-dim);
      border-color: var(--accent);
      box-shadow: 0 0 20px 3px rgba(16, 185, 129, 0.12);
    }
    .card.selected:hover {
      background: var(--accent-hover);
    }
    .left {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }
    .flag {
      width: 28px;
      height: 18px;
      border-radius: 3px;
      object-fit: cover;
      flex-shrink: 0;
      background: var(--bg-elevated);
    }
    .name {
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--text-primary);
      white-space: nowrap;
    }
    .card.selected .name {
      color: var(--accent);
    }
    .right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 2px;
      min-width: 0;
    }
    .value {
      font-weight: 700;
      font-size: 0.95rem;
      color: var(--text-primary);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .card.selected .value {
      color: var(--accent);
    }
    .brecha {
      font-weight: 600;
      font-size: 0.72rem;
      color: var(--text-secondary);
      white-space: nowrap;
    }
    .variaciones {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .variacion {
      font-size: 0.68rem;
      font-weight: 600;
      color: var(--text-muted);
      white-space: nowrap;
    }
    .variacion.up {
      color: var(--accent);
    }
    .variacion.down {
      color: var(--error);
    }
    .flag-skeleton {
      width: 28px;
      height: 18px;
      border-radius: 3px;
      flex-shrink: 0;
    }
    .name-skeleton {
      width: 80px;
      height: 14px;
      border-radius: 4px;
    }
    .value-skeleton {
      width: 90px;
      height: 14px;
      border-radius: 4px;
    }
  `]
})
export class ExchangeRateCardComponent {
  readonly imagePath = input.required<string>();
  readonly nameType = input.required<string>();
  readonly value = input.required<number | null>();
  readonly isSelected = input(false);
  readonly loading = input(false);
  readonly brecha = input<number | null>(null);
  readonly variacion24h = input<number | null>(null);
  readonly variacion7d = input<number | null>(null);

  readonly selected = output<void>();

  protected formatPercent(value: number): string {
    return `${value.toFixed(2)}%`;
  }

  protected variacionClass(value: number): 'up' | 'down' | 'flat' {
    if (value > 0) return 'up';
    if (value < 0) return 'down';
    return 'flat';
  }

  protected variacionText(value: number): string {
    const arrow = value > 0 ? '▲' : value < 0 ? '▼' : '•';
    const sign = value > 0 ? '+' : '';
    return `${arrow} ${sign}${value.toFixed(2)}%`;
  }
}
