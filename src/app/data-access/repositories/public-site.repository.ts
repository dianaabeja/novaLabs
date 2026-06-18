import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { adaptPublicSite } from '../adapters/public-site.adapter';
import { PublicSiteDto } from '../contracts/public-site.dto';
import { PublicSiteApiSource } from '../sources/public-site-api.source';

@Injectable({ providedIn: 'root' })
export class PublicSiteRepository {
  private readonly source = inject(PublicSiteApiSource);

  getBootstrap() {
    return this.source.getBootstrap().pipe(map(adaptPublicSite));
  }

  getEditableSnapshot(): PublicSiteDto {
    return this.source.getSnapshot();
  }

  save(dto: PublicSiteDto) {
    return this.source.save(dto).pipe(map(adaptPublicSite));
  }

  reset() {
    return this.source.reset().pipe(map(adaptPublicSite));
  }
}
