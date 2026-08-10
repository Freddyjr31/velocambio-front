import { ChangeDetectionStrategy, Component, afterNextRender } from '@angular/core';

import { SOCIAL_BAR_SCRIPT } from '../../core/config/ads.config';

@Component({
  selector: 'app-social-banner',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<!-- Social banner Adsterra (esquina inferior izquierda) -->`,
})
export class SocialBannerComponent {
  constructor() {
    afterNextRender(() => {
      if (document.querySelector(`script[src="${SOCIAL_BAR_SCRIPT}"]`)) return;

      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = SOCIAL_BAR_SCRIPT;
      document.body.appendChild(script);
    });
  }
}
