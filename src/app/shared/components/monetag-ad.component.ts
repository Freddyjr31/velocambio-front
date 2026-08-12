import { ChangeDetectionStrategy, Component, afterNextRender, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

//! MONETAG TAG - Integración experimental. Para revertir: eliminar este archivo y
//! remover <app-monetag-ad /> de las páginas blog/articles/historico + el dominio
//! https://quge5.com del CSP (src/index.html y vercel.json).
//* Script: <script src="https://quge5.com/88/tag.min.js" data-zone="269338" async data-cfasync="false"></script>
const MONETAG_SRC = 'https://quge5.com/88/tag.min.js';
const MONETAG_ZONE = '269338';
const MONETAG_SCRIPT_ID = 'monetag-ad-script';

@Component({
  selector: 'app-monetag-ad',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
})
export class MonetagAdComponent {
  private readonly document = inject(DOCUMENT);

  constructor() {
    afterNextRender(() => {
      // Guard anti-duplicado: si ya se inyectó el script (navegación SPA entre vistas),
      // no se vuelve a cargar.
      if (this.document.getElementById(MONETAG_SCRIPT_ID)) return;

      const script = this.document.createElement('script');
      script.id = MONETAG_SCRIPT_ID;
      script.src = MONETAG_SRC;
      script.async = true;
      script.dataset['zone'] = MONETAG_ZONE;
      script.dataset['cfasync'] = 'false';
      this.document.head.appendChild(script);
    });
  }
}
