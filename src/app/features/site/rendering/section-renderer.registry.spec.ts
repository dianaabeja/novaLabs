import { TestBed } from '@angular/core/testing';
import { SectionRendererRegistry } from './section-renderer.registry';
import { ContactSection } from './sections/contact-section';
import { HeroSection } from './sections/hero-section';
import { InfoSection } from './sections/info-section';

describe('SectionRendererRegistry', () => {
  let registry: SectionRendererRegistry;

  beforeEach(() => {
    registry = TestBed.inject(SectionRendererRegistry);
  });

  it('maps known section types to their renderer', () => {
    expect(registry.resolve('home')).toBe(HeroSection);
    expect(registry.resolve('contact')).toBe(ContactSection);
    expect(registry.resolve('quote-cta')).toBe(ContactSection);
  });

  it('uses the informational renderer for unknown types', () => {
    expect(registry.resolve('new-cms-section')).toBe(InfoSection);
  });
});
