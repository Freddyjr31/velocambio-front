import { bootstrapApplication } from '@angular/platform-browser';

import { inject } from '@vercel/analytics';
import { injectSpeedInsights } from '@vercel/speed-insights';

import { environment } from './environments/environment';
import { appConfig } from './app/app.config';
import { App } from './app/app';

if (environment.production) {
  inject();
  injectSpeedInsights();
}

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
