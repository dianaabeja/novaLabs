import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  CertificationDto,
  FaqDto,
  LandingPageDto,
  MediaAssetDto,
  PublicSiteDto,
  SectionLayoutDto,
} from '../../data-access/contracts/public-site.dto';
import { SiteFacade } from '../site/services/site.facade';

type CmsTab = 'sections' | 'pages' | 'faqs' | 'certifications' | 'media' | 'styles';

@Component({
  selector: 'app-cms-page',
  imports: [FormsModule, RouterLink],
  templateUrl: './cms-page.html',
  styleUrl: './cms-page.scss',
})
export class CmsPage {
  private readonly site = inject(SiteFacade);

  protected readonly tab = signal<CmsTab>('sections');
  protected readonly draft = signal<PublicSiteDto>(this.site.editableSnapshot());
  protected readonly status = signal('Cambios locales sin guardar');
  protected readonly tabs: { key: CmsTab; label: string }[] = [
    { key: 'sections', label: 'Secciones' },
    { key: 'pages', label: 'Paginas' },
    { key: 'faqs', label: 'FAQs' },
    { key: 'certifications', label: 'Certificaciones' },
    { key: 'media', label: 'Media' },
    { key: 'styles', label: 'Estilos' },
  ];

  protected readonly layout = computed(() => this.draft().landing?.layout ?? []);
  protected readonly pages = computed(() => this.draft().pages?.pages ?? []);
  protected readonly faqs = computed(() => this.draft().faqs?.faqs ?? []);
  protected readonly certifications = computed(
    () => this.draft().certifications?.certifications ?? [],
  );
  protected readonly media = computed(() => this.draft().media?.assets ?? []);
  protected readonly componentTypes = computed(
    () => this.draft().componentTypes?.componentTypes.filter((type) => type.isActive) ?? [],
  );
  protected readonly brand = computed(() => {
    const token = this.draft().styles?.tokens.find((item) => item.tokenKey === 'brand');
    return token?.value as { primaryColor?: string; accentColor?: string };
  });

  protected setTab(tab: CmsTab): void {
    this.tab.set(tab);
  }

  protected save(): void {
    this.normalizeSortOrders();
    this.syncNavigationWithPages();
    this.site.save(this.draft());
    this.status.set('Guardado en localStorage y publicado en el sitio');
  }

  protected reset(): void {
    this.site.reset();
    setTimeout(() => this.draft.set(this.site.editableSnapshot()));
    this.status.set('Contenido demo restaurado');
  }

  protected addSection(): void {
    const page = this.pages()[0];
    const section: SectionLayoutDto = {
      id: `layout-${crypto.randomUUID()}`,
      sortOrder: this.layout().length + 1,
      isVisible: true,
      section: {
        pageKey: page?.pageKey ?? 'home',
        instanceKey: `section-${Date.now()}`,
        sectionType: 'about',
        title: 'Nueva seccion',
        subtitle: 'Subtitulo editable',
        description: 'Describe aqui el contenido que quieres publicar.',
        badgeText: null,
        primaryButtonText: null,
        primaryButtonUrl: null,
        mediaAssetId: null,
        style: {
          backgroundColor: '#080C14',
          title: { color: '#DBEAFE' },
          subtitle: { color: '#93A4BC' },
          description: { color: '#93A4BC' },
          primaryButton: {
            color: '#F8FBFF',
            backgroundColor: '#2563EB',
            borderColor: '#2563EB',
            borderRadius: '6px',
          },
        },
      },
    };

    this.draft.update((draft) => ({
      ...draft,
      landing: { layout: [...(draft.landing?.layout ?? []), section] },
    }));
    this.status.set('Seccion agregada');
  }

  protected removeSection(id: string): void {
    this.draft.update((draft) => ({
      ...draft,
      landing: {
        layout: (draft.landing?.layout ?? []).filter((item) => item.id !== id),
      },
    }));
    this.status.set('Seccion eliminada');
  }

  protected addPage(): void {
    const key = `page-${Date.now()}`;
    const page: LandingPageDto = {
      pageKey: key,
      label: 'Nueva pagina',
      route: `/${key}`,
      isActive: true,
    };

    this.draft.update((draft) => ({
      ...draft,
      pages: { pages: [...(draft.pages?.pages ?? []), page] },
      seo: {
        pages: [
          ...(draft.seo?.pages ?? []),
          { route: page.route, title: `${page.label} | ${draft.tenant.name}`, description: '' },
        ],
      },
    }));
    this.status.set('Pagina agregada');
  }

  protected removePage(pageKey: string): void {
    this.draft.update((draft) => {
      const removed = draft.pages?.pages.find((page) => page.pageKey === pageKey);
      return {
        ...draft,
        pages: { pages: (draft.pages?.pages ?? []).filter((page) => page.pageKey !== pageKey) },
        landing: {
          layout: (draft.landing?.layout ?? []).filter((item) => item.section.pageKey !== pageKey),
        },
        seo: {
          pages: (draft.seo?.pages ?? []).filter((page) => page.route !== removed?.route),
        },
      };
    });
    this.status.set('Pagina eliminada');
  }

  protected updatePageRoute(page: LandingPageDto, route: string): void {
    const previousRoute = page.route;
    const normalizedRoute = this.normalizeRoute(route);
    page.route = normalizedRoute;

    this.draft.update((draft) => ({
      ...draft,
      seo: {
        pages: this.syncSeoRoute(draft.seo?.pages ?? [], previousRoute, normalizedRoute),
      },
    }));
    this.status.set('Ruta actualizada');
  }

  protected addFaq(): void {
    const faq: FaqDto = {
      id: `faq-${crypto.randomUUID()}`,
      question: 'Nueva pregunta',
      answer: 'Respuesta editable desde el CMS.',
      category: 'General',
      sortOrder: this.faqs().length + 1,
      isActive: true,
    };

    this.draft.update((draft) => ({
      ...draft,
      faqs: { faqs: [...(draft.faqs?.faqs ?? []), faq] },
    }));
    this.status.set('FAQ agregada');
  }

  protected removeFaq(id: string): void {
    this.draft.update((draft) => ({
      ...draft,
      faqs: { faqs: (draft.faqs?.faqs ?? []).filter((faq) => faq.id !== id) },
    }));
    this.status.set('FAQ eliminada');
  }

  protected addCertification(): void {
    const certification: CertificationDto = {
      id: `cert-${crypto.randomUUID()}`,
      name: 'Nueva certificacion',
      issuingBody: '',
      description: 'Descripcion de la certificacion.',
      certificateCode: '',
      documentUrl: '',
      mediaAssetId: null,
      sortOrder: this.certifications().length + 1,
      isActive: true,
    };

    this.draft.update((draft) => ({
      ...draft,
      certifications: {
        certifications: [...(draft.certifications?.certifications ?? []), certification],
      },
    }));
    this.status.set('Certificacion agregada');
  }

  protected removeCertification(id: string): void {
    this.draft.update((draft) => ({
      ...draft,
      certifications: {
        certifications: (draft.certifications?.certifications ?? []).filter(
          (item) => item.id !== id,
        ),
      },
    }));
    this.status.set('Certificacion eliminada');
  }

  protected addMedia(): void {
    const asset: MediaAssetDto = {
      id: `media-${crypto.randomUUID()}`,
      resourceType: 'IMAGE',
      filename: 'imagen-demo.jpg',
      url: 'https://images.unsplash.com/photo-1583912267550-d44c6332960d?auto=format&fit=crop&w=1200&q=80',
      altText: 'Imagen demo',
      mimeType: 'image/jpeg',
    };

    this.draft.update((draft) => ({
      ...draft,
      media: { assets: [...(draft.media?.assets ?? []), asset] },
    }));
    this.status.set('Media agregada');
  }

  protected removeMedia(id: string): void {
    this.draft.update((draft) => ({
      ...draft,
      media: { assets: (draft.media?.assets ?? []).filter((asset) => asset.id !== id) },
    }));
    this.status.set('Media eliminada');
  }

  protected updateBrandColor(key: 'primaryColor' | 'accentColor', value: string): void {
    this.draft.update((draft) => ({
      ...draft,
      styles: {
        tokens: (draft.styles?.tokens ?? []).map((token) =>
          token.tokenKey === 'brand'
            ? { ...token, value: { ...token.value, [key]: value } }
            : token,
        ),
      },
    }));
    this.status.set('Estilo actualizado');
  }

  protected updateSectionBackground(item: SectionLayoutDto, value: string): void {
    item.section.style = {
      ...(item.section.style ?? {}),
      backgroundColor: value,
    };
    this.status.set('Fondo actualizado');
  }

  protected updateTextColor(
    item: SectionLayoutDto,
    target: 'title' | 'subtitle' | 'description',
    color: string,
  ): void {
    item.section.style = {
      ...(item.section.style ?? {}),
      [target]: {
        ...(item.section.style?.[target] ?? {}),
        color,
      },
    };
    this.status.set('Color actualizado');
  }

  protected updateButtonColor(
    item: SectionLayoutDto,
    target: 'color' | 'backgroundColor' | 'borderColor',
    color: string,
  ): void {
    item.section.style = {
      ...(item.section.style ?? {}),
      primaryButton: {
        ...(item.section.style?.primaryButton ?? {}),
        [target]: color,
      },
    };
    this.status.set('Boton actualizado');
  }

  private normalizeSortOrders(): void {
    this.draft.update((draft) => ({
      ...draft,
      landing: {
        layout: (draft.landing?.layout ?? []).map((item, index) => ({
          ...item,
          sortOrder: Number(item.sortOrder) || index + 1,
        })),
      },
      faqs: {
        faqs: (draft.faqs?.faqs ?? []).map((item, index) => ({
          ...item,
          sortOrder: Number(item.sortOrder) || index + 1,
        })),
      },
      certifications: {
        certifications: (draft.certifications?.certifications ?? []).map((item, index) => ({
          ...item,
          sortOrder: Number(item.sortOrder) || index + 1,
        })),
      },
    }));
  }

  private syncNavigationWithPages(): void {
    this.draft.update((draft) => ({
      ...draft,
      navigation: {
        items: (draft.pages?.pages ?? [])
          .filter((page) => page.isActive)
          .map((page) => ({
            id: `nav-${page.pageKey}`,
            label: page.label,
            url: page.route,
            children: [],
          })),
      },
    }));
  }

  private normalizeRoute(route: string): string {
    const trimmed = route.trim();

    if (!trimmed || trimmed === '/') {
      return '/';
    }

    return `/${trimmed.replace(/^\/+/, '').replace(/\/+$/, '')}`;
  }

  private syncSeoRoute(
    pages: NonNullable<PublicSiteDto['seo']>['pages'],
    previousRoute: string,
    nextRoute: string,
  ): NonNullable<PublicSiteDto['seo']>['pages'] {
    const existing = pages.find((page) => page.route === previousRoute);

    if (existing) {
      return pages.map((page) =>
        page.route === previousRoute ? { ...page, route: nextRoute } : page,
      );
    }

    return [
      ...pages,
      {
        route: nextRoute,
        title: `${nextRoute} | ${this.draft().tenant.name}`,
        description: '',
      },
    ];
  }
}
