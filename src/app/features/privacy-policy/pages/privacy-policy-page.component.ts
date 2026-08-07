import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { SeoService } from '../../../core/services/seo.service';
import { AdBannerComponent } from '../../../shared/components/ad-banner.component';
import { NavComponent } from '../../../shared/components/nav.component';
import { FooterComponent } from '../../../shared/components/footer.component';

@Component({
  selector: 'app-privacy-policy-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NavComponent, FooterComponent, AdBannerComponent],
  template: `
    <div class="page">
      <app-nav />

      <article class="container">

        <header class="page-header">
          <img src="/assets/images/app_icon-removebg_small.PNG" alt="Velocambio" class="logo-img" />
          <div class="logo-text">Velocambio</div>
          <p class="subtitle">Conversor de divisas para Venezuela</p>
        </header>

        @defer (on viewport) {
          <app-ad-banner position="top" />
        } @placeholder {
          <div style="height: 50px"></div>
        }

        <h1>Política de Privacidad</h1>
        <p><strong>Fecha de vigencia:</strong> 30 de julio de 2026</p>
        <p><strong>Última actualización:</strong> 30 de julio de 2026</p>

        <div class="highlight">
          <strong>Resumen:</strong> Velocambio es una aplicación con fines exclusivamente informativos. No representamos ni estamos afiliados a ninguna institución gubernamental, autoridad monetaria ni financiera. No recopilamos datos personales. La aplicación solo muestra información pública sobre tasas de cambio. Los únicos datos que pueden recopilarse provienen de Adsterra (anuncios) y están sujetos a la política de privacidad de Adsterra.
        </div>

        <section>
          <h2>1. Origen y actualización de los datos</h2>
          <p>Velocambio es una aplicación con fines <strong>exclusivamente informativos</strong>. No representamos ni estamos afiliados a ninguna institución gubernamental, autoridad monetaria ni financiera. La aplicación no establece tasas de cambio, sino que refleja valores de referencia obtenidos de fuentes públicas verificables.</p>

          <h3>1.1 Tasa oficial del BCV (USD/VES)</h3>
          <p>La tasa oficial del Banco Central de Venezuela se obtiene a través de fuentes públicas que reflejan el valor publicado por el BCV. La aplicación no modifica, ajusta ni redondea los valores oficiales. La tasa se actualiza automáticamente tan pronto como el BCV publica un nuevo valor, sin intervención manual ni filtro adicional.</p>
          <p>El BCV es la única entidad con autoridad para establecer la tasa de cambio oficial de la República Bolivariana de Venezuela. Ninguna otra tasa mostrada en esta aplicación tiene carácter oficial.</p>

          <h3>1.2 Tasa de mercado / promedio (USD/VES)</h3>
          <p>La tasa de mercado o promedio se obtiene de fuentes públicas que agregan datos de diversas plataformas de intercambio. Este valor es un promedio de referencia del mercado paralelo y no constituye una tasa oficial.</p>

          <h3>1.3 Tasa Euro (EUR/VES)</h3>
          <p>La tasa del Euro se obtiene de fuentes públicas y refleja el tipo de cambio del Euro frente al Bolívar Venezolano a modo de referencia informativa.</p>

          <h3>1.4 Tasa USDT P2P (USDT/VES)</h3>
          <p>La tasa USDT P2P se obtiene del mercado Peer-to-Peer de Binance y refleja un promedio estadístico basado en los anuncios activos de la plataforma. Este valor no es un precio garantizado, ya que en el mercado P2P existen múltiples precios simultáneos según la oferta y la demanda. Pueden producirse diferencias debido a la volatilidad del mercado, la variación de anuncios disponibles o la latencia de actualización.</p>

          <div class="highlight">
            <strong>Aviso importante:</strong> Las tasas de cambio mostradas tienen carácter <strong>estrictamente informativo</strong>. Velocambio no intermedia operaciones, no procesa pagos, no ofrece servicios de cambio de divisas, no custodia fondos, no empareja contrapartes ni fija precios. Ninguna de las tasas mostradas debe interpretarse como una oferta de compra o venta.
          </div>
        </section>

        <section>
          <h2>2. Información que mostramos</h2>

          <p>La aplicación obtiene y muestra la siguiente información pública:</p>
          <ul>
            <li><strong>Tasa oficial del BCV:</strong> Tipo de cambio oficial del Banco Central de Venezuela.</li>
            <li><strong>Tasa de mercado/promedio:</strong> Tipo de cambio promedio del mercado paralelo.</li>
            <li><strong>Tasa Euro:</strong> Tipo de cambio del Euro frente al Bolívar Venezolano.</li>
            <li><strong>Tasa USDT P2P:</strong> Precio de Tether (USDT) en el mercado Peer-to-Peer de Binance.</li>
          </ul>

          <h3>2.1 Fuentes de datos</h3>
          <table>
            <thead>
              <tr>
                <th>Fuente</th>
                <th>Qué obtiene</th>
                <th>Sitio web</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>BCV (via dolarapi.com)</td>
                <td>Tasa oficial USD/VES</td>
                <td><a href="https://ve.dolarapi.com/" target="_blank" rel="noopener">dolarapi.com</a></td>
              </tr>
              <tr>
                <td>dolarapi.com</td>
                <td>Tasa promedio de mercado USD/VES y EUR/VES</td>
                <td><a href="https://ve.dolarapi.com/" target="_blank" rel="noopener">dolarapi.com</a></td>
              </tr>
              <tr>
                <td>Binance P2P</td>
                <td>Precio USDT/VES en anuncios P2P</td>
                <td><a href="https://p2p.binance.com/" target="_blank" rel="noopener">p2p.binance.com</a></td>
              </tr>
            </tbody>
          </table>
          <p>Ninguna de estas fuentes recibe datos personales del usuario. Las consultas se realizan de forma anónima desde el dispositivo del usuario. El acceso a sitios externos se realiza bajo la exclusiva decisión del usuario. La aplicación no controla, gestiona ni garantiza el contenido, la disponibilidad, las políticas de privacidad o las prácticas de seguridad de dichos portales. La inclusión de estos enlaces no implica afiliación, asociación, patrocinio ni respaldo alguno.</p>
        </section>

        <section>
          <h2>3. Información que recopilamos</h2>

          <h3>3.1 Datos que NO recopilamos</h3>
          <p>Velocambio <strong>no recopila, almacena ni comparte</strong> ningún dato personal identificable:</p>
          <ul>
            <li>No se crean cuentas de usuario</li>
            <li>No se solicitan nombres, correos electrónicos ni números de teléfono</li>
            <li>No se accede a la ubicación del dispositivo</li>
            <li>No se almacenan datos de navegación o historial de conversiones en servidores externos</li>
            <li>No se utilizan cookies de rastreo propias</li>
            <li>No se recopila información financiera, como números de cuentas, tarjetas o billeteras digitales</li>
          </ul>

          <h3>3.2 Datos que Adsterra puede recopilar</h3>
          <p>Esta aplicación utiliza <strong>Adsterra</strong> para mostrar anuncios. A través de Adsterra, el proveedor puede recopilar automáticamente:</p>
          <table>
            <thead>
              <tr>
                <th>Tipo de dato</th>
                <th>Uso</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Identificador pseudónimo único (UID)</td>
                <td>Mostrar anuncios relevantes, medir rendimiento</td>
              </tr>
              <tr>
                <td>Dirección IP y datos del dispositivo/navegador (user agent)</td>
                <td>Detección de fraude, geolocalización aproximada</td>
              </tr>
              <tr>
                <td>Interacciones con anuncios (impresiones, clics)</td>
                <td>Medir efectividad de campañas publicitarias</td>
              </tr>
              <tr>
                <td>Cookies de publicidad</td>
                <td>Segmentación y medición de anuncios</td>
              </tr>
            </tbody>
          </table>
          <p>Para más información sobre cómo Adsterra recopila y utiliza estos datos, consulta la <a href="https://adsterra.com/privacy-policy-managed/" target="_blank" rel="noopener">Política de Privacidad de Adsterra</a>.</p>
        </section>

        <section>
          <h2>4. Permisos de la aplicación</h2>
          <p>Velocambio solo requiere conexión a internet para funcionar:</p>
          <table>
            <thead>
              <tr>
                <th>Permiso</th>
                <th>Justificación</th>
                <th>Datos accedidos</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>Conexión de red</code></td>
                <td>Obtener tasas de cambio en tiempo real desde APIs públicas</td>
                <td>Ninguno (solo conexión de red)</td>
              </tr>
            </tbody>
          </table>
          <p>No se solicitan permisos de ubicación, cámara, almacenamiento, contactos, ni ningún otro permiso sensible.</p>
        </section>

        <section>
          <h2>5. Uso de la información</h2>
          <p>La información recopilada a través de Adsterra se utiliza exclusivamente para:</p>
          <ul>
            <li><strong>Mostrar anuncios:</strong> Presentar anuncios relevantes al usuario dentro de la aplicación.</li>
            <li><strong>Medir rendimiento:</strong> Analizar la efectividad de los anuncios mostrados.</li>
            <li><strong>Prevenir fraude:</strong> Detectar actividad fraudulenta o no autorizada.</li>
            <li><strong>Mejorar la experiencia:</strong> Optimizar la presentación de anuncios según el dispositivo.</li>
          </ul>
        </section>

        <section>
          <h2>6. Compartición de datos con terceros</h2>
          <p>Velocambio <strong>no vende, alquila ni comparte</strong> datos personales con terceros, con las siguientes excepciones:</p>
          <ul>
            <li><strong>Adsterra:</strong> Los datos de uso y dispositivos se comparten con Adsterra según su <a href="https://adsterra.com/privacy-policy-managed/" target="_blank" rel="noopener">Política de Privacidad</a>.</li>
            <li><strong>Requisitos legales:</strong> Podríamos divulgar datos si lo requiere la ley, una orden judicial o una solicitud gubernamental válida.</li>
          </ul>
        </section>

        <section>
          <h2>7. Almacenamiento y seguridad</h2>
          <ul>
            <li>Los datos de conversión y tasas se almacenan <strong>localmente</strong> en el dispositivo del usuario.</li>
            <li>No se transmiten datos a servidores propios.</li>
            <li>Todas las conexiones de red se realizan mediante <strong>HTTPS</strong>.</li>
            <li>La aplicación utiliza minificación y ofuscación de código para proteger la integridad del código.</li>
          </ul>
        </section>

        <section>
          <h2>8. Derechos del usuario</h2>
          <p>Según las leyes de protección de datos aplicables (GDPR, CCPA, LGPD), los usuarios tienen derecho a:</p>
          <ul>
            <li><strong>Opt-out:</strong> Desactivar la personalización de anuncios desde la configuración del dispositivo.</li>
            <li><strong>Eliminación de datos:</strong> Los usuarios pueden eliminar todos los datos locales borrando los datos del sitio desde la configuración del navegador.</li>
            <li><strong>Acceso a información:</strong> Dado que no recopilamos datos personales en servidores propios, no hay datos externos que solicitar.</li>
          </ul>
        </section>

        <section>
          <h2>9. Menores de edad</h2>
          <p>Velocambio no está dirigida a menores de 13 años. No recopilamos intencionalmente datos de menores. Si se descubre que un menor ha utilizado la aplicación, recomendamos a los padres o tutores dejar de usarla inmediatamente.</p>
        </section>

        <section>
          <h2>10. Publicidad</h2>
          <p>Velocambio se ofrece de forma gratuita y puede mostrar anuncios gestionados por plataformas externas, como Adsterra. Estos anuncios pueden emplear identificadores técnicos del dispositivo, cookies y datos de navegación con fines estadísticos y de segmentación. La aplicación no accede ni almacena directamente la información utilizada por dichas plataformas. Toda la publicidad cumple con las políticas de Adsterra y con la normativa aplicable en materia de privacidad.</p>
        </section>

        <section>
          <h2>11. Cambios en esta política</h2>
          <p>Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Los cambios se publicarán en esta página con una nueva fecha de vigencia. Se recomienda revisar periódicamente esta política. Los cambios significativos se comunicarán a través de la aplicación.</p>
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

    table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
      display: block;
      overflow-x: auto;
    }
    th, td {
      text-align: left;
      padding: 12px 16px;
      border-bottom: 1px solid rgba(255,255,255,0.08);
      font-size: 14px;
      word-break: break-word;
      overflow-wrap: break-word;
    }
    th {
      color: var(--text-primary);
      font-weight: 600;
      background: var(--bg-surface);
    }
    td {
      color: var(--text-secondary);
    }

    @media (max-width: 600px) {
      .container {
        padding: 24px 16px 40px;
      }
      h1 { font-size: 20px; }
      h2 { font-size: 16px; }
      table, th, td {
        font-size: 13px;
        padding: 10px 12px;
      }
    }
  `]
})
export class PrivacyPolicyPageComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.setPageMeta({
      title: 'Política de Privacidad — Velocambio',
      description:
        'Política de privacidad de Velocambio: datos recopilados, uso de anuncios de Google y derechos del usuario.',
      canonicalPath: '/privacy-policy',
    });
  }
}
