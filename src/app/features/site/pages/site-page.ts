import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter, startWith } from 'rxjs';
import { SectionRenderer } from '../rendering/section-renderer';
import { SafeMedia } from '../../../shared/media/safe-media';
import { SafePublicUrlPipe } from '../../../shared/media/safe-public-url.pipe';
import { SeoMetadataService } from '../services/seo-metadata.service';
import { SiteFacade } from '../services/site.facade';
import { resolveSitePage } from './site-page.resolver';

@Component({
  selector: 'app-site-page',
  imports: [RouterLink, SectionRenderer, SafeMedia, SafePublicUrlPipe],
  templateUrl: './site-page.html',
  styleUrl: './site-page.scss',
})
export class SitePage {
  private readonly router = inject(Router);
  private readonly seo = inject(SeoMetadataService);
  protected readonly site = inject(SiteFacade);
  private readonly navigation = toSignal(
    this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      startWith(null),
    ),
  );

  protected readonly view = computed(() => {
    this.navigation();
    const data = this.site.state().data;
    return data ? resolveSitePage(data, this.router.url) : null;
  });

  constructor() {
    effect(() => this.seo.apply(this.view()?.seo));
  }
}
