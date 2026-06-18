import { Injectable, Type } from '@angular/core';
import { ContactSection } from './sections/contact-section';
import { HeroSection } from './sections/hero-section';
import { InfoSection } from './sections/info-section';

@Injectable({ providedIn: 'root' })
export class SectionRendererRegistry {
  private readonly renderers = new Map<string, Type<unknown>>([
    ['home', HeroSection],
    ['about', InfoSection],
    ['contact', ContactSection],
    ['quote-cta', ContactSection],
  ]);

  resolve(sectionType: string): Type<unknown> {
    return this.renderers.get(sectionType) ?? InfoSection;
  }
}
