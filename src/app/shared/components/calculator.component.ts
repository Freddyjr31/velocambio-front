import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { InvertCoinButtonComponent } from './invert-coin-button.component';

@Component({
  selector: 'app-calculator',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [InvertCoinButtonComponent],
  template: `
    <div class="calculator">
      <div class="title-row">
        <span class="title">Conversión</span>
        <app-invert-coin-button
          [inputCoin]="inputCoin()"
          [outputCoin]="outputCoin()"
          (swapped)="swapCurrencies.emit()"
        />
      </div>

      <div class="total-row">
        <span class="total-label">Total:</span>
        <div class="total-right">
          <span class="total-value" [title]="displayValue()">{{ displayValue() }}</span>
          <button class="copy-btn" (click)="copyToClipboard()" type="button" aria-label="Copiar monto">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
          </button>
        </div>
      </div>

      <div class="input-row">
        <div class="input-wrapper">
          <span class="input-prefix">{{ inputCoin() }}</span>
          <input
            type="text"
            inputmode="decimal"
            class="amount-input"
            placeholder="0,000"
            [value]="displayAmount()"
            (beforeinput)="onBeforeInput($event)"
            (input)="onAmountChange($event)"
            aria-label="Monto a convertir"
          />
          @if (amountValue()) {
            <button class="clear-btn" (click)="clearAmount()" type="button" aria-label="Limpiar monto">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .calculator {
      width: 100%;
      padding: 20px 16px;
      background: var(--bg-primary);
      border-radius: var(--radius-lg);
      border: 1px solid var(--accent-border);
      min-height: 200px;
      display: flex;
      flex-direction: column;
    }
    .title-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }
    .title {
      font-weight: 700;
      font-size: 1.15rem;
      color: var(--text-primary);
    }
    .total-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 4px 12px;
      min-height: 52px;
    }
    .total-label {
      font-weight: 600;
      font-size: 1rem;
      color: var(--text-secondary);
      flex-shrink: 0;
    }
    .total-right {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
      flex: 1;
      justify-content: flex-end;
    }
    .total-value {
      font-weight: 700;
      font-size: 1rem;
      color: var(--text-primary);
      text-align: right;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .copy-btn {
      width: 34px;
      height: 34px;
      border-radius: 8px;
      border: none;
      background: rgba(255,255,255,0.06);
      color: var(--text-muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      flex-shrink: 0;
      transition: background 0.2s, color 0.2s;
    }
    .copy-btn:hover {
      background: rgba(255,255,255,0.12);
      color: var(--accent);
    }
    .input-row {
      margin-top: auto;
    }
    .input-wrapper {
      display: flex;
      align-items: center;
      background: var(--bg-surface);
      border-radius: var(--radius-sm);
      border: 1px solid rgba(255,255,255,0.15);
      padding: 0 12px;
      transition: border-color 0.2s;
    }
    .input-wrapper:focus-within {
      border-color: var(--accent);
    }
    .input-prefix {
      font-weight: 700;
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-right: 8px;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .amount-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: var(--text-primary);
      font-size: 1rem;
      font-weight: 600;
      padding: 14px 0;
      text-align: right;
      min-width: 0;
    }
    .amount-input::placeholder {
      color: var(--text-muted);
    }
    .clear-btn {
      width: 28px;
      height: 28px;
      border-radius: 6px;
      border: none;
      background: none;
      color: var(--text-muted);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
      flex-shrink: 0;
      margin-left: 4px;
      transition: background 0.2s, color 0.2s;
    }
    .clear-btn:hover {
      background: rgba(255,255,255,0.08);
      color: var(--text-primary);
    }
  `]
})
export class CalculatorComponent {
  readonly inputCoin = input.required<string>();
  readonly outputCoin = input.required<string>();
  readonly amountValue = input(0);
  readonly calculatedValue = input(0);

  readonly amountChanged = output<number>();
  readonly swapCurrencies = output<void>();

  displayAmount(): string {
    const val = this.amountValue();
    return val ? val.toLocaleString('es-VE', { minimumFractionDigits: 3, maximumFractionDigits: 3 }) : '';
  }

  displayValue(): string {
    const val = this.calculatedValue();
    if (val === 0) return '0,000';
    const formatted = val.toLocaleString('es-VE', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
    return `${formatted} ${this.outputCoin()}`;
  }

  onBeforeInput(event: Event): void {
    const inputEvent = event as InputEvent;
    if (inputEvent.inputType.startsWith('delete') || inputEvent.inputType === 'insertLineBreak') {
      return;
    }

    const target = event.target as HTMLInputElement;
    const data = inputEvent.data;
    if (data == null) return;

    const next = target.value.slice(0, target.selectionStart ?? 0) + data + target.value.slice(target.selectionEnd ?? target.value.length);
    const digits = next.replace(/\./g, '').replace(',', '.');
    const decimalCount = digits.replace(/[^.]/g, '').length;

    if (!/^[\d.,]*$/.test(next) || decimalCount > 1) {
      event.preventDefault();
    }
  }

  onAmountChange(event: Event): void {
    const raw = (event.target as HTMLInputElement).value
      .replace(/[^\d.,]/g, '')
      .replace(/\./g, '')
      .replace(',', '.');
    const value = parseFloat(raw);
    this.amountChanged.emit(isNaN(value) ? 0 : value);
  }

  clearAmount(): void {
    this.amountChanged.emit(0);
  }

  async copyToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.displayValue());
    } catch {
      // clipboard fallback handled by browser
    }
  }
}
