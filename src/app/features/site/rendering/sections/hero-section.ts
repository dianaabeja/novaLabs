import { NgStyle } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import {
  LandingSectionDto,
  MediaAssetDto,
} from '../../../../data-access/contracts/public-site.dto';
import { SectionStyleResolver } from '../section-style.resolver';
import { SafeMedia } from '../../../../shared/media/safe-media';

@Component({
  selector: 'app-hero-section',
  imports: [NgStyle, SafeMedia],
  template: `
    <section class="hero" [ngStyle]="resolver.section(section())">
      <div class="inner" [ngStyle]="resolver.brand(styles())">
        <div class="copy">
          <p class="eyebrow">{{ section().sectionType }}</p>
          <h1 [ngStyle]="resolver.title(section())">{{ section().title }}</h1>
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
          <div class="hero-actions">
            @if (section().primaryButtonText && section().primaryButtonUrl) {
              <a
                class="action"
                [href]="section().primaryButtonUrl"
                [ngStyle]="resolver.action(section())"
              >
                {{ section().primaryButtonText }}
              </a>
            }
            @if (section().badgeText) {
              <span class="delivery-badge">{{ section().badgeText }}</span>
            }
          </div>
        </div>
        @if (media()) {
          <app-safe-media class="section-media hero-media" [asset]="media()" />
        }
      </div>
    </section>
  `,
  styleUrl: './section-renderers.scss',
})
export class HeroSection {
  protected readonly resolver = inject(SectionStyleResolver);
  readonly section = input.required<LandingSectionDto>();
  readonly styles = input.required<Record<string, Record<string, unknown>>>();
  readonly media = input<MediaAssetDto>();
}
