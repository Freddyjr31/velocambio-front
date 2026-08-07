import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  afterNextRender,
  input,
  viewChild,
} from '@angular/core';

import { ADS_ZONES, AdZone } from '../../core/config/ads.config';

interface AtOptions {
  key: string;
  format: 'iframe';
  width: number;
  height: number;
  params: Record<string, never>;
}

type WindowWithAtOptions = Window & typeof globalThis & { atOptions?: AtOptions };

@Component({
  selector: 'app-ad-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="ad-banner" [class.top]="position() === 'top'">
      <div #slot class="ad-slot"></div>
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
    }
    .ad-slot {
      display: flex;
      align-items: center;
      justify-content: center;
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

  private readonly slot = viewChild.required<ElementRef<HTMLDivElement>>('slot');
  private mediaQuery: MediaQueryList | null = null;

  constructor() {
    afterNextRender(() => {
      this.mediaQuery = window.matchMedia(`(min-width: ${ADS_ZONES.breakpoint}px)`);
      this.renderZone(this.mediaQuery.matches ? ADS_ZONES.desktop : ADS_ZONES.mobile);
      this.mediaQuery.addEventListener('change', this.onMediaChange);
    });
  }

  ngOnDestroy(): void {
    this.mediaQuery?.removeEventListener('change', this.onMediaChange);
  }

  private readonly onMediaChange = (event: MediaQueryListEvent): void => {
    this.renderZone(event.matches ? ADS_ZONES.desktop : ADS_ZONES.mobile);
  };

  private renderZone(zone: AdZone): void {
    const container = this.slot().nativeElement;
    if (!container) return;

    container.replaceChildren();
    this.setAtOptions(zone);
    this.injectScript(container, zone.key);
  }

  private setAtOptions(zone: AdZone): void {
    (window as WindowWithAtOptions).atOptions = {
      key: zone.key,
      format: 'iframe',
      width: zone.width,
      height: zone.height,
      params: {},
    };
  }

  private injectScript(container: HTMLDivElement, key: string): void {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = `https://www.highperformanceformat.com/${key}/invoke.js`;
    container.appendChild(script);
  }
}
