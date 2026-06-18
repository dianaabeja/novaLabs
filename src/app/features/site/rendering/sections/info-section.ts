import { NgStyle } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import {
  LandingSectionDto,
  MediaAssetDto,
} from '../../../../data-access/contracts/public-site.dto';
import { SectionStyleResolver } from '../section-style.resolver';
import { SafeMedia } from '../../../../shared/media/safe-media';

@Component({
  selector: 'app-info-section',
  imports: [NgStyle, SafeMedia],
  template: `
    <section class="info" [ngStyle]="resolver.section(section())">
      <div class="inner" [ngStyle]="resolver.brand(styles())">
        @if (media()) {
          <app-safe-media class="section-media" [asset]="media()" />
        }
        <div class="copy">
          <p class="eyebrow">{{ section().sectionType }}</p>
          <h2 [ngStyle]="resolver.title(section())">{{ section().title }}</h2>
          @if (section().subtitle) {
            <p class="subtitle" [ngStyle]="resolver.subtitle(section())">
              {{ section().subtitle }}
            </p>
          }
          @if (section().description) {
            <p class="description" [ngStyle]="resolver.description(section())">
              {{ section().description }}
            </p>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './section-renderers.scss',
})
export class InfoSection {
  protected readonly resolver = inject(SectionStyleResolver);
  readonly section = input.required<LandingSectionDto>();
  readonly styles = input.required<Record<string, Record<string, unknown>>>();
  readonly media = input<MediaAssetDto>();
}
