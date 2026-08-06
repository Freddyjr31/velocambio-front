import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';

import { truncateTo2Decimals } from '../../core/utils/number.util';
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
            placeholder="0,00"
            [value]="rawInput()"
            (beforeinput)="onBeforeInput($event)"
            (input)="onAmountChange($event)"
            (focus)="onFocus($event)"
            (blur)="onBlur()"
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

    @if (copied()) {
      <div class="copy-toast" role="status">Monto copiado</div>
    }
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
    .copy-toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1000;
      background: var(--bg-surface);
      color: var(--text-primary);
      border: 1px solid var(--accent-border);
      border-radius: 10px;
      padding: 10px 18px;
      font-size: 0.9rem;
      font-weight: 600;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
      animation: toast-in 0.25s ease;
    }
    @keyframes toast-in {
      from { opacity: 0; transform: translateX(-50%) translateY(10px); }
      to { opacity: 1; transform: translateX(-50%) translateY(0); }
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

  protected readonly rawInput = signal('');
  protected readonly copied = signal(false);
  private copyTimer: ReturnType<typeof setTimeout> | undefined;

  protected displayValue(): string {
    const val = this.calculatedValue();
    if (val === 0) return '0,00';
    const formatted = truncateTo2Decimals(val).toLocaleString('es-VE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `${formatted} ${this.outputCoin()}`;
  }

  protected onBeforeInput(event: Event): void {
    const inputEvent = event as InputEvent;
    if (inputEvent.inputType.startsWith('delete') || inputEvent.inputType === 'insertLineBreak') {
      return;
    }

    const target = event.target as HTMLInputElement;
    const data = inputEvent.data;
    if (data == null) return;

    const next = target.value.slice(0, target.selectionStart ?? 0) + data + target.value.slice(target.selectionEnd ?? target.value.length);
    const commaCount = next.split(',').length - 1;

    if (!/^[\d.,]*$/.test(next) || commaCount > 1) {
      event.preventDefault();
    }
  }

  protected onFocus(event: FocusEvent): void {
    (event.target as HTMLInputElement).select();
  }

  protected onBlur(): void {
    if (!this.rawInput()) return;
    const value = this.amountValue();
    this.rawInput.set(
      truncateTo2Decimals(value).toLocaleString('es-VE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }),
    );
  }

  protected onAmountChange(event: Event): void {
    const cleaned = this.sanitize((event.target as HTMLInputElement).value);
    this.rawInput.set(cleaned);
    const value = parseFloat(cleaned.replace(',', '.'));
    this.amountChanged.emit(isNaN(value) ? 0 : value);
  }

  protected clearAmount(): void {
    this.rawInput.set('');
    this.amountChanged.emit(0);
  }

  protected async copyToClipboard(): Promise<void> {
    const text = truncateTo2Decimals(this.calculatedValue()).toLocaleString('es-VE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    try {
      await navigator.clipboard.writeText(text);
      this.showCopied();
    } catch {
      // clipboard fallback handled by browser
    }
  }

  private sanitize(raw: string): string {
    const cleaned = raw.replace(/[^\d.,]/g, '').replace(/\./g, ',');
    const firstComma = cleaned.indexOf(',');
    if (firstComma === -1) return cleaned;
    const intPart = cleaned.slice(0, firstComma);
    const decPart = cleaned.slice(firstComma + 1).replace(/,/g, '');
    return `${intPart},${decPart}`;
  }

  private showCopied(): void {
    if (this.copyTimer) {
      clearTimeout(this.copyTimer);
    }
    this.copied.set(true);
    this.copyTimer = setTimeout(() => this.copied.set(false), 1800);
  }
}
