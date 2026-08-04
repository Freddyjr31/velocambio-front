import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-invert-coin-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="invert-row">
      <span class="coin-label">{{ inputCoin() }}</span>
      <button class="swap-btn" (click)="swapped.emit()" type="button" aria-label="Cambiar monedas">
        <svg class="swap-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M7 16l-4-4 4-4"/>
          <path d="M17 8l4 4-4 4"/>
          <path d="M3 12h18"/>
        </svg>
      </button>
      <span class="coin-label">{{ outputCoin() }}</span>
    </div>
  `,
  styles: [`
    .invert-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .coin-label {
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--text-primary);
      min-width: 36px;
      text-align: center;
    }
    .swap-btn {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      border: none;
      background: rgba(255,255,255,0.06);
      color: var(--text-primary);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      transition: background 0.2s, transform 0.2s;
    }
    .swap-btn:hover {
      background: rgba(255,255,255,0.14);
    }
    .swap-btn:active .swap-icon {
      transform: rotate(180deg);
    }
    .swap-icon {
      transition: transform 0.25s ease;
    }
  `]
})
export class InvertCoinButtonComponent {
  readonly inputCoin = input.required<string>();
  readonly outputCoin = input.required<string>();
  readonly swapped = output<void>();
}
