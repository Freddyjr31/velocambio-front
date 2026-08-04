import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
  template: `
    <footer class="footer">
      <div class="footer-links">
        <a routerLink="/privacy-policy">Política de Privacidad</a>
        <span class="separator">•</span>
        <a routerLink="/terms">Términos y Condiciones</a>
        <span class="separator">•</span>
        <span>Aplicación informativa de tasas de cambio</span>
      </div>
      <p class="copyright">&copy; 2026 Velocambio. Todos los derechos reservados.</p>
    </footer>
  `,
  styles: [`
    .footer {
      width: 100%;
      padding: 20px 0 8px;
      margin-top: 8px;
      border-top: 1px solid rgba(255,255,255,0.06);
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .footer-links {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 6px;
      font-size: 0.78rem;
      color: var(--text-muted);
    }
    .footer-links a {
      color: var(--text-muted);
      text-decoration: none;
      transition: color 0.2s;
    }
    .footer-links a:hover {
      color: var(--accent);
      text-decoration: underline;
    }
    .separator {
      color: rgba(255,255,255,0.15);
    }
    .copyright {
      font-size: 0.72rem;
      color: var(--text-muted);
      opacity: 0.6;
      margin: 0;
    }
  `]
})
export class FooterComponent {}
