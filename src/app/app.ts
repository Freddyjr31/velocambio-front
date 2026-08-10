import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SocialBannerComponent } from './shared/components/social-banner.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SocialBannerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
