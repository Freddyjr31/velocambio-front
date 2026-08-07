import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  afterNextRender,
  computed,
  input,
  signal,
} from '@angular/core';

import { ADS_ZONES, AdZone } from '../../core/config/ads.config';

@Component({
  selector: 'app-ad-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ad-banner" [class.top]="position() === 'top'">
      <iframe
        [srcdoc]="adHtml()"
        [attr.width]="zone().width"
        [attr.height]="zone().height"
        style="border: 0; max-width: 100%"
        scrolling="no"
        title="Publicidad"
        loading="lazy"
      ></iframe>
    </div>
  `,
  styles: [`
    .ad-banner {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 50px;
      margin: 12px auto;
      overflow: hidden;
      max-width: 100%;
    }

    @media (min-width: 768px) {
      .ad-banner {
        min-height: 90px;
      }
    }
  `],
})
export class AdBannerComponent implements OnDestroy {
  readonly position = input<'top' | 'bottom'>('bottom');

  protected readonly zone = signal<AdZone>(ADS_ZONES.mobile);
  protected readonly adHtml = computed(() => buildAdSrcdoc(this.zone()));

  private mediaQuery: MediaQueryList | null = null;

  constructor() {
    afterNextRender(() => {
      this.mediaQuery = window.matchMedia(`(min-width: ${ADS_ZONES.breakpoint}px)`);
      this.zone.set(this.mediaQuery.matches ? ADS_ZONES.desktop : ADS_ZONES.mobile);
      this.mediaQuery.addEventListener('change', this.onMediaChange);
    });
  }

  ngOnDestroy(): void {
    this.mediaQuery?.removeEventListener('change', this.onMediaChange);
  }

  private readonly onMediaChange = (event: MediaQueryListEvent): void => {
    this.zone.set(event.matches ? ADS_ZONES.desktop : ADS_ZONES.mobile);
  };
}

function buildAdSrcdoc(zone: AdZone): string {
  return [
    '<!DOCTYPE html>',
    '<html><head>',
    '<meta charset="utf-8">',
    '<style>html,body{margin:0;padding:0;overflow:hidden}body{display:flex;align-items:center;justify-content:center}</style>',
    '</head><body>',
    `<script>atOptions={key:${JSON.stringify(zone.key)},format:'iframe',width:${zone.width},height:${zone.height},params:{}};<\/script>`,
    `<script src="https://www.highperformanceformat.com/${zone.key}/invoke.js" type="text/javascript"><\/script>`,
    '</body></html>',
  ].join('');
}
