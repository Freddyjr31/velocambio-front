import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-bcv-disclaimer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (asModal()) {
      <div class="modal-overlay" (click)="dismissed.emit()" role="dialog" aria-modal="true" aria-label="Aviso importante">
        <div class="modal" (click)="$event.stopPropagation()">
          <img src="/assets/images/app_icon-removebg_small.PNG" alt="Velocambio" class="modal-logo" width="160" height="auto" fetchpriority="high" />
          <h2 class="modal-title">
            <svg class="warn-icon-title" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Aviso Importante
          </h2>
          <div class="modal-body">
            <p>Esta aplicación tiene un carácter puramente informativo.</p>
            <p>La tasa oficial que debe utilizarse para transacciones legales en el territorio nacional es la emitida por el <strong>Banco Central de Venezuela</strong> (<strong>BCV</strong>).</p>
            <p>Nuestra plataforma solo se encarga de mostrar las cotizaciones de diversas fuentes para su referencia y comparación.</p>
          </div>
          <button class="dismiss-btn" (click)="dismissed.emit()" type="button">ENTENDIDO</button>
        </div>
      </div>
    }

    @if (asStatic()) {
      <div class="static-note">
        <p>
          <svg class="warn-icon-static" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
          La tasa oficial que debe utilizarse para transacciones legales en el territorio nacional es la emitida por el <strong>Banco Central de Venezuela</strong> (<strong>BCV</strong>). Esta aplicación tiene un carácter puramente informativo.
        </p>
      </div>
    }
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.65);
      display: grid;
      place-items: center;
      z-index: 1000;
      padding: 16px;
      overflow-y: auto;
    }
    .modal {
      background: var(--bg-surface);
      border-radius: var(--radius-md);
      padding: 32px 24px 24px;
      width: min(360px, 100%);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      box-sizing: border-box;
      overflow: hidden;
    }
    .modal-logo {
      width: 160px;
      height: auto;
      margin-bottom: 12px;
    }
    .modal-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--text-primary);
      margin: 0 0 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .warn-icon-title {
      flex-shrink: 0;
    }
    .modal-body {
      text-align: left;
      color: var(--text-secondary);
      font-size: 0.85rem;
      line-height: 1.6;
    }
    .modal-body p {
      margin: 0 0 10px;
    }
    .modal-body p:last-child {
      margin-bottom: 0;
    }
    .dismiss-btn {
      width: 100%;
      margin-top: 24px;
      padding: 12px;
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: var(--radius-md);
      color: var(--text-primary);
      font-weight: 700;
      font-size: 0.9rem;
      cursor: pointer;
      font-family: inherit;
      transition: background 0.2s;
    }
    .dismiss-btn:hover {
      background: rgba(255,255,255,0.12);
    }
    .static-note {
      width: 100%;
      padding: 14px 16px;
      background: var(--bg-surface);
      border-radius: var(--radius-sm);
      border: 1px solid rgba(255,255,255,0.05);
      text-align: left;
      font-size: 0.75rem;
      color: var(--text-muted);
      line-height: 1.5;
    }
    .static-note p {
      margin: 0;
      display: flex;
      align-items: flex-start;
      gap: 6px;
    }
    .warn-icon-static {
      flex-shrink: 0;
      margin-top: 2px;
      color: var(--accent);
      opacity: 0.7;
    }
  `]
})
export class BcvDisclaimerComponent {
  readonly asModal = input(false);
  readonly asStatic = input(false);
  readonly dismissed = output<void>();
}
