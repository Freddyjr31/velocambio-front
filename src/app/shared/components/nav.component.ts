import { ChangeDetectionStrategy, Component, signal, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="topbar">
      <nav class="nav-inner">
        <div class="nav-left">
          <img src="/assets/images/app_icon-removebg_small.PNG" alt="Velocambio" class="logo" />
          <div class="desktop-links">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" class="nav-link">Calculadora</a>
            <a routerLink="/blog" routerLinkActive="active" class="nav-link">Blog</a>
            <a routerLink="/privacy-policy" routerLinkActive="active" class="nav-link">Privacidad</a>
            <a routerLink="/terms" routerLinkActive="active" class="nav-link">Términos</a>
          </div>
        </div>
        <div class="nav-right">
          @if (showRefresh()) {
            <button
              class="refresh-btn"
              [class.spinning]="refreshing()"
              [disabled]="disabled()"
              (click)="refresh.emit()"
              type="button"
              aria-label="Actualizar tasas"
              [attr.aria-busy]="refreshing() || null"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M1 4v6h6"/>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
              </svg>
            </button>
          }
          <button
            class="hamburger"
            [class.open]="mobileOpen()"
            (click)="toggleMobile()"
            type="button"
            aria-label="Menú de navegación"
            aria-expanded="false"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </nav>

      @if (mobileOpen()) {
        <div class="mobile-menu" role="navigation" aria-label="Menú móvil">
          <a
            routerLink="/"
            routerLinkActive="active"
            [routerLinkActiveOptions]="{exact:true}"
            class="mobile-link"
            (click)="mobileOpen.set(false)"
          >Calculadora</a>
          <a
            routerLink="/blog"
            routerLinkActive="active"
            class="mobile-link"
            (click)="mobileOpen.set(false)"
          >Blog</a>
          <a
            routerLink="/privacy-policy"
            routerLinkActive="active"
            class="mobile-link"
            (click)="mobileOpen.set(false)"
          >Privacidad</a>
          <a
            routerLink="/terms"
            routerLinkActive="active"
            class="mobile-link"
            (click)="mobileOpen.set(false)"
          >Términos</a>
        </div>
      }
    </header>
  `,
  styles: [`
    .topbar {
      background: var(--bg-surface);
      border-bottom: 1px solid rgba(255,255,255,0.06);
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .nav-inner {
      max-width: var(--max-content-lg);
      margin: 0 auto;
      padding: 0 16px;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .nav-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .nav-right {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .logo {
      height: 26px;
      width: auto;
    }
    .nav-link {
      color: var(--text-muted);
      font-size: 0.85rem;
      font-weight: 600;
      padding: 6px 10px;
      border-radius: var(--radius-sm);
      transition: color 0.2s, background 0.2s;
      text-decoration: none;
    }
    .nav-link:hover {
      color: var(--text-primary);
      background: var(--accent-dim);
    }
    .nav-link.active {
      color: var(--accent);
    }
    .desktop-links {
      display: flex;
      align-items: center;
      gap: 2px;
    }
    .refresh-btn {
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      padding: 6px;
      display: flex;
      border-radius: 50%;
      margin-left: 4px;
      transition: background 0.2s, color 0.2s;
    }
    .refresh-btn:hover {
      background: rgba(255,255,255,0.08);
      color: var(--text-primary);
    }
    .refresh-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .refresh-btn.spinning svg {
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    .hamburger {
      display: none;
      background: none;
      border: none;
      cursor: pointer;
      padding: 8px;
      flex-direction: column;
      gap: 5px;
    }
    .hamburger span {
      display: block;
      width: 22px;
      height: 2px;
      background: var(--text-muted);
      border-radius: 2px;
      transition: transform 0.25s, opacity 0.25s;
    }
    .hamburger.open span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    .hamburger.open span:nth-child(2) {
      opacity: 0;
    }
    .hamburger.open span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }
    .mobile-menu {
      max-width: var(--max-content-lg);
      margin: 0 auto;
      padding: 4px 16px 12px;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .mobile-link {
      display: block;
      padding: 12px;
      color: var(--text-secondary);
      font-size: 0.95rem;
      font-weight: 600;
      border-radius: var(--radius-sm);
      text-decoration: none;
      transition: color 0.2s, background 0.2s;
    }
    .mobile-link:hover {
      color: var(--text-primary);
      background: var(--accent-dim);
    }
    .mobile-link.active {
      color: var(--accent);
      background: var(--accent-dim);
    }

    @media (min-width: 768px) {
      .nav-inner {
        padding: 0 24px;
      }
    }

    @media (max-width: 767px) {
      .hamburger {
        display: flex;
      }
      .desktop-links {
        display: none;
      }
    }
  `]
})
export class NavComponent {
  readonly showRefresh = input(false);
  readonly refreshing = input(false);
  readonly disabled = input(false);
  readonly refresh = output<void>();
  protected readonly mobileOpen = signal(false);

  protected toggleMobile(): void {
    this.mobileOpen.update(v => !v);
  }
}
