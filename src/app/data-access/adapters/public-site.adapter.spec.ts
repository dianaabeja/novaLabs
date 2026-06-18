import { PublicSiteDto } from '../contracts/public-site.dto';
import { adaptPublicSite } from './public-site.adapter';

describe('adaptPublicSite', () => {
  it('normalizes optional modules and exposes only visible sections in display order', () => {
    const dto: PublicSiteDto = {
      tenant: { slug: 'default', name: 'Laboratorio Norte' },
      modules: ['LANDING', 'SEO'],
      landing: {
        layout: [
          {
            id: 'second',
            sortOrder: 2,
            isVisible: true,
            section: {
              pageKey: 'HOME',
              instanceKey: 'services',
              sectionType: 'SERVICES',
              title: 'Servicios',
            },
          },
          {
            id: 'hidden',
            sortOrder: 1,
            isVisible: false,
            section: {
              pageKey: 'HOME',
              instanceKey: 'internal',
              sectionType: 'TEXT',
              title: 'Contenido interno',
            },
          },
          {
            id: 'first',
            sortOrder: 0,
            isVisible: true,
            section: {
              pageKey: 'HOME',
              instanceKey: 'hero',
              sectionType: 'HERO',
              title: 'Laboratorio Norte',
            },
          },
        ],
      },
      seo: {
        pages: [{ route: '/', title: 'Laboratorio Norte' }],
      },
    };

    const site = adaptPublicSite(dto);

    expect(site.enabledModules.has('LANDING')).toBeTrue();
    expect(site.sections.map((section) => section.instanceKey)).toEqual([
      'hero',
      'services',
    ]);
    expect(site.certifications).toEqual([]);
    expect(site.faqs).toEqual([]);
    expect(site.navigation).toEqual([]);
    expect(site.seoByRoute.get('/')?.title).toBe('Laboratorio Norte');
    expect(site.mediaById.size).toBe(0);
  });
});
