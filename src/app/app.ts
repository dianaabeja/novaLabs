import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SiteFacade } from './features/site/services/site.facade';
import { SiteNavigation } from './features/site/navigation/site-navigation';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet, SiteNavigation],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  protected readonly site = inject(SiteFacade);

  ngOnInit(): void {
    this.site.load();
  }
}
