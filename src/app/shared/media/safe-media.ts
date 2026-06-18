import { Component, computed, input } from '@angular/core';
import { MediaAssetDto } from '../../data-access/contracts/public-site.dto';
import { isSafePublicUrl } from './safe-public-url.pipe';

@Component({
  selector: 'app-safe-media',
  template: `
    @if (url(); as mediaUrl) {
      @switch (asset()?.resourceType) {
        @case ('IMAGE') {
          <img [src]="mediaUrl" [alt]="asset()?.altText || ''" loading="lazy" />
        }
        @case ('VIDEO') {
          <video [src]="mediaUrl" controls preload="metadata"></video>
        }
        @case ('DOCUMENT') {
          <a [href]="mediaUrl" target="_blank" rel="noopener">Consultar documento</a>
        }
      }
    }
  `,
  styles: `
    :host {
      display: block;
    }

    img,
    video {
      display: block;
      height: 100%;
      max-width: 100%;
      object-fit: cover;
      width: 100%;
    }

    a {
      color: #38bdf8;
      font-weight: 750;
    }
  `,
})
export class SafeMedia {
  readonly asset = input<MediaAssetDto>();
  protected readonly url = computed(() => {
    const url = this.asset()?.url;
    return isSafePublicUrl(url) ? url : null;
  });
}
