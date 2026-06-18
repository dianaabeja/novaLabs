import { DOCUMENT } from '@angular/common';
import { inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SeoPageDto } from '../../../data-access/contracts/public-site.dto';

@Injectable({ providedIn: 'root' })
export class SeoMetadataService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  apply(page?: SeoPageDto): void {
    if (!page) {
      return;
    }

    this.title.setTitle(page.title);
    this.upsert('description', page.description);
  }

  private upsert(name: string, content?: string | null): void {
    if (content) {
      this.meta.updateTag({ name, content });
    } else {
      this.document.head
        .querySelector(`meta[name="${name}"]`)
        ?.remove();
    }
  }
}
