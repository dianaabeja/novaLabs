import { TestBed } from '@angular/core/testing';
import { LandingSectionDto } from '../../../data-access/contracts/public-site.dto';
import { SectionStyleResolver } from './section-style.resolver';

describe('SectionStyleResolver', () => {
  let resolver: SectionStyleResolver;

  beforeEach(() => {
    resolver = TestBed.inject(SectionStyleResolver);
  });

  it('exposes supported styles from the CMS', () => {
    const section: LandingSectionDto = {
      pageKey: 'home',
      instanceKey: 'hero',
      sectionType: 'home',
      title: 'Laboratorio Norte',
      style: {
        backgroundColor: '#ffffff',
        title: { color: '#123456', fontSize: '48px', fontWeight: '700' },
        primaryButton: { backgroundColor: '#0ea5e9', borderRadius: '6px' },
      },
    };

    expect(resolver.section(section)).toEqual({ 'background-color': '#ffffff' });
    expect(resolver.title(section)).toEqual({
      color: '#123456',
      'font-size': '48px',
      'font-weight': '700',
    });
    expect(resolver.action(section)).toEqual({
      'background-color': '#0ea5e9',
      'border-radius': '6px',
    });
  });

  it('rejects unsupported CSS values', () => {
    const section: LandingSectionDto = {
      pageKey: 'home',
      instanceKey: 'hero',
      sectionType: 'home',
      title: 'Laboratorio Norte',
      style: {
        backgroundColor: 'url(https://example.com/tracker)',
        title: { fontSize: 'calc(100vw)', textAlign: 'absolute' },
      },
    };

    expect(resolver.section(section)).toEqual({});
    expect(resolver.title(section)).toEqual({});
  });
});
