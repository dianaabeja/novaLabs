import { PublicSiteModel } from '../../../data-access/models/public-site.model';
import { normalizeSiteRoute, resolveSitePage } from './site-page.resolver';

describe('resolveSitePage', () => {
  const site: PublicSiteModel = {
    tenant: { slug: 'default', name: 'Laboratorio Norte' },
    enabledModules: new Set(['LANDING']),
    sections: [
      {
        pageKey: 'home',
        instanceKey: 'hero',
        sectionType: 'home',
        title: 'Laboratorio Norte',
      },
      {
        pageKey: 'servicios',
        instanceKey: 'services',
        sectionType: 'about',
        title: 'Servicios',
      },
    ],
    certifications: [],
    faqs: [],
    seoByRoute: new Map([
      ['/', { route: '/', title: 'Inicio' }],
      ['/servicios', { route: '/servicios', title: 'Servicios' }],
    ]),
    styles: {},
    componentTypes: [],
    navigation: [],
    pages: [
      { pageKey: 'home', label: 'Inicio', route: '/', isActive: true },
      {
        pageKey: 'servicios',
        label: 'Servicios',
        route: '/servicios',
        isActive: true,
      },
    ],
    mediaById: new Map(),
  };

  it('normalizes query params and trailing slashes', () => {
    expect(normalizeSiteRoute('/servicios/?utm_source=test')).toBe('/servicios');
  });

  it('returns sections and seo for the requested page', () => {
    const page = resolveSitePage(site, '/servicios');

    expect(page?.page.pageKey).toBe('servicios');
    expect(page?.sections.map((section) => section.instanceKey)).toEqual([
      'services',
    ]);
    expect(page?.seo?.title).toBe('Servicios');
  });

  it('returns null for routes that are not configured', () => {
    expect(resolveSitePage(site, '/privado')).toBeNull();
  });
});
