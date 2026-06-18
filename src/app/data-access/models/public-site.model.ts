import {
  CertificationDto,
  ComponentTypeDto,
  FaqDto,
  LandingPageDto,
  LandingSectionDto,
  MediaAssetDto,
  NavigationItemDto,
  SeoPageDto,
  TenantModule,
} from '../contracts/public-site.dto';

export interface PublicSiteModel {
  tenant: { slug: string; name: string };
  enabledModules: Set<TenantModule>;
  sections: LandingSectionDto[];
  certifications: CertificationDto[];
  faqs: FaqDto[];
  seoByRoute: Map<string, SeoPageDto>;
  styles: Record<string, Record<string, unknown>>;
  componentTypes: ComponentTypeDto[];
  navigation: NavigationItemDto[];
  pages: LandingPageDto[];
  mediaById: Map<string, MediaAssetDto>;
}
