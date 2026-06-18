import { NgComponentOutlet } from '@angular/common';
import { Component, computed, inject, input } from '@angular/core';
import {
  LandingSectionDto,
  MediaAssetDto,
} from '../../../data-access/contracts/public-site.dto';
import { SectionRendererRegistry } from './section-renderer.registry';

@Component({
  selector: 'app-section-renderer',
  imports: [NgComponentOutlet],
  template: `
    <ng-container
      *ngComponentOutlet="
        renderer();
        inputs: { section: section(), styles: styles(), media: media() }
      "
    />
  `,
})
export class SectionRenderer {
  private readonly registry = inject(SectionRendererRegistry);

  readonly section = input.required<LandingSectionDto>();
  readonly styles = input.required<Record<string, Record<string, unknown>>>();
  readonly mediaById = input.required<Map<string, MediaAssetDto>>();
  protected readonly media = computed(() => {
    const assetId = this.section().mediaAssetId;
    return assetId ? this.mediaById().get(assetId) : undefined;
  });
  protected readonly renderer = computed(() =>
    this.registry.resolve(this.section().sectionType),
  );
}
