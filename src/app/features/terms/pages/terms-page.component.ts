import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SeoService } from '../../../core/services/seo.service';
import { NavComponent } from '../../../shared/components/nav.component';
import { FooterComponent } from '../../../shared/components/footer.component';

@Component({
  selector: 'app-terms-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavComponent, FooterComponent],
  template: `
    <div class="page">
      <app-nav />

      <article class="container">

        <header class="page-header">
          <img src="/assets/images/app_icon-removebg_small.PNG" alt="Velocambio" class="logo-img" />
          <div class="logo-text">Velocambio</div>
          <p class="subtitle">Conversor de divisas para Venezuela</p>
        </header>

        <h1>Términos y Condiciones</h1>
        <p><strong>Fecha de vigencia:</strong> 30 de julio de 2026</p>

        <div class="highlight">
          <strong>Resumen:</strong> Velocambio es una herramienta informativa de consulta de tasas de cambio. Al utilizar esta aplicación, aceptas los términos y condiciones descritos a continuación. Si no estás de acuerdo con alguno de estos términos, no utilices la aplicación.
        </div>

        <section>
          <h2>1. Aceptación de los términos</h2>
          <p>Al acceder y utilizar Velocambio, aceptas cumplir con estos Términos y Condiciones. Si no estás de acuerdo con alguna parte de estos términos, no podrás acceder ni utilizar la aplicación. Estos términos se aplican a todos los visitantes, usuarios y demás personas que accedan o utilicen la aplicación.</p>
        </section>

        <section>
          <h2>2. Descripción del servicio</h2>
          <p>Velocambio es una aplicación web con fines <strong>exclusivamente informativos</strong> que permite consultar tasas de cambio de divisas (USD, EUR, USDT) frente al Bolívar Venezolano (VES). La aplicación proporciona:</p>
          <ul>
            <li>Visualización de tasas de cambio obtenidas de fuentes públicas.</li>
            <li>Calculadora de conversión entre divisas para fines de referencia.</li>
          </ul>
          <div class="highlight">
            <strong>Importante:</strong> Velocambio <strong>no</strong> es una plataforma de intercambio de divisas, no es una pasarela de pago, no procesa transacciones financieras, no custodia fondos, no empareja compradores con vendedores, ni fija precios de compra o venta. Las tasas mostradas son de referencia y no constituyen una oferta de transacción.
          </div>
        </section>

        <section>
          <h2>3. Carácter informativo de las tasas</h2>
          <p>Las tasas de cambio mostradas en Velocambio tienen carácter <strong>estrictamente informativo</strong> y de referencia. La única tasa oficial para transacciones legales en el territorio nacional es la emitida por el Banco Central de Venezuela (BCV). Velocambio no garantiza que:</p>
          <ul>
            <li>Las tasas mostradas reflejen el valor exacto en el momento de una transacción real.</li>
            <li>Las tasas estén libres de errores, omisiones o retrasos en la actualización.</li>
            <li>Las tasas de mercado o P2P correspondan a valores disponibles en plataformas específicas.</li>
          </ul>
          <p>El usuario es responsable de verificar las tasas vigentes antes de realizar cualquier operación financiera. Velocambio no se hace responsable por pérdidas, daños o perjuicios derivados del uso de la información mostrada en la aplicación.</p>
        </section>

        <section>
          <h2>4. Fuentes de datos</h2>
          <p>Velocambio obtiene las tasas de cambio de las siguientes fuentes públicas:</p>
          <ul>
            <li><strong>BCV (via dolarapi.com):</strong> Tasa oficial USD/VES.</li>
            <li><strong>dolarapi.com:</strong> Tasa promedio de mercado USD/VES y EUR/VES.</li>
            <li><strong>Binance P2P:</strong> Precio USDT/VES en el mercado Peer-to-Peer.</li>
          </ul>
          <p>No estamos afiliados, patrocinados ni respaldados por ninguna de estas fuentes. Las consultas a estas APIs se realizan de forma anónima desde el dispositivo del usuario. Las tasas pueden experimentar retrasos inherentes a la frecuencia de actualización de cada fuente.</p>
        </section>

        <section>
          <h2>5. Precisión de la información</h2>
          <p>Velocambio se esfuerza por mantener la precisión de las tasas mostradas, pero no garantiza que la información esté libre de errores, sea completa o esté actualizada en todo momento. Las tasas de cambio son inherentemente volátiles y pueden variar entre el momento de consulta y cualquier acción que el usuario pueda tomar. El uso de la información proporcionada es bajo la exclusiva responsabilidad del usuario.</p>
        </section>

        <section>
          <h2>6. Limitación de responsabilidad</h2>
          <p>En ningún caso Velocambio, sus desarrolladores o colaboradores serán responsables por daños directos, indirectos, incidentales, consecuentes o especiales que surjan del uso o la imposibilidad de uso de la aplicación, incluyendo pero no limitado a:</p>
          <ul>
            <li>Pérdidas financieras derivadas de decisiones basadas en las tasas mostradas.</li>
            <li>Errores, omisiones o interrupciones del servicio.</li>
            <li>Daños por virus o malware transmitidos a través de la aplicación.</li>
            <li>Contenido de sitios web de terceros enlazados desde la aplicación.</li>
          </ul>
        </section>

        <section>
          <h2>7. Usos prohibidos</h2>
          <p>El usuario se compromete a no utilizar Velocambio para:</p>
          <ul>
            <li>Realizar actividades ilegales o no autorizadas.</li>
            <li>Extraer, reproducir o distribuir masivamente los datos mostrados (scraping).</li>
            <li>Interferir con el funcionamiento técnico de la aplicación.</li>
            <li>Suplantar la identidad de la aplicación o crear versiones que puedan confundir a otros usuarios.</li>
          </ul>
        </section>

        <section>
          <h2>8. Propiedad intelectual</h2>
          <p>Todos los derechos de propiedad intelectual sobre Velocambio, incluyendo pero no limitado al diseño, código, logotipos y contenido original, son propiedad de sus desarrolladores. El nombre "Velocambio" y su logotipo son marcas no registradas. El usuario no adquiere ningún derecho de propiedad sobre el software o contenido de la aplicación.</p>
        </section>

        <section>
          <h2>9. Enlaces a terceros</h2>
          <p>Velocambio puede contener enlaces a sitios web de terceros (fuentes de datos, plataformas publicitarias, etc.). No tenemos control sobre el contenido, políticas de privacidad o prácticas de estos sitios. El acceso a sitios externos se realiza bajo la exclusiva decisión y responsabilidad del usuario.</p>
        </section>

        <section>
          <h2>10. Modificaciones</h2>
          <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán publicados en esta página con una nueva fecha de vigencia. El uso continuado de la aplicación tras la publicación de cambios constituye la aceptación de los nuevos términos.</p>
        </section>

        <section>
          <h2>11. Ley aplicable</h2>
          <p>Estos términos se rigen por las leyes de la República Bolivariana de Venezuela. Cualquier disputa relacionada con estos términos será sometida a la jurisdicción de los tribunales competentes de Venezuela.</p>
        </section>

        <app-footer />

      </article>
    </div>
  `,
  styles: [`
    .page {
      background: var(--bg-primary);
      color: var(--text-secondary);
      line-height: 1.7;
      font-size: 16px;
      min-height: 100vh;
      overflow-x: clip;
    }
    .container {
      max-width: 720px;
      margin: 0 auto;
      padding: 40px 24px 60px;
    }
    .page-header {
      text-align: center;
      margin-bottom: 40px;
      padding-bottom: 28px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    .logo-img {
      width: 72px;
      height: 72px;
      border-radius: 18px;
      margin-bottom: 12px;
      object-fit: contain;
    }
    .logo-text {
      font-size: 28px;
      font-weight: 700;
      color: var(--accent);
      margin-bottom: 8px;
    }
    .subtitle {
      color: var(--text-muted);
      font-size: 14px;
    }

    h1 {
      font-size: 24px;
      font-weight: 700;
      color: var(--text-primary);
      margin-bottom: 8px;
    }
    h2 {
      font-size: 18px;
      font-weight: 600;
      color: var(--accent);
      margin-top: 36px;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
    }
    h3 {
      font-size: 16px;
      font-weight: 600;
      color: var(--text-primary);
      margin-top: 20px;
      margin-bottom: 8px;
    }

    p {
      margin-bottom: 12px;
    }

    ul {
      padding-left: 20px;
      margin-bottom: 16px;
    }
    li {
      margin-bottom: 8px;
    }

    a {
      color: var(--accent);
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }

    .highlight {
      background: var(--accent-dim);
      border-left: 3px solid var(--accent);
      padding: 16px 20px;
      border-radius: 0 8px 8px 0;
      margin: 20px 0;
      font-size: 14px;
    }
    .highlight strong {
      color: var(--text-primary);
    }

    .card {
      background: var(--bg-surface);
      border-radius: 12px;
      padding: 20px;
      margin: 16px 0;
      border: 1px solid rgba(255,255,255,0.08);
    }

    @media (max-width: 600px) {
      .container {
        padding: 24px 16px 40px;
      }
      h1 { font-size: 20px; }
      h2 { font-size: 16px; }
    }
  `]
})
export class TermsPageComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.setPageMeta({
      title: 'Términos y Condiciones — Velocambio',
      description:
        'Términos y condiciones de uso de Velocambio: carácter informativo de las tasas, fuentes de datos y limitación de responsabilidad.',
      canonicalPath: '/terms',
    });
  }
}
