import { PublicSiteDto } from '../contracts/public-site.dto';
import { PublicSiteModel } from '../models/public-site.model';

export function adaptPublicSite(dto: PublicSiteDto): PublicSiteModel {
  return {
    tenant: dto.tenant,
    enabledModules: new Set(dto.modules),
    sections: (dto.landing?.layout ?? [])
      .filter((item) => item.isVisible)
      .sort((left, right) => left.sortOrder - right.sortOrder)
      .map((item) => item.section),
    certifications:
      dto.certifications?.certifications
        .filter((certification) => certification.isActive)
        .sort((left, right) => left.sortOrder - right.sortOrder) ?? [],
    faqs:
      dto.faqs?.faqs
        .filter((faq) => faq.isActive)
        .sort((left, right) => left.sortOrder - right.sortOrder) ?? [],
    seoByRoute: new Map((dto.seo?.pages ?? []).map((page) => [page.route, page])),
    styles: Object.fromEntries(
      (dto.styles?.tokens ?? []).map((token) => [token.tokenKey, token.value]),
    ),
    componentTypes: dto.componentTypes?.componentTypes ?? [],
    navigation: dto.navigation?.items ?? [],
    pages: dto.pages?.pages.filter((page) => page.isActive) ?? [],
    mediaById: new Map((dto.media?.assets ?? []).map((asset) => [asset.id, asset])),
  };
}
