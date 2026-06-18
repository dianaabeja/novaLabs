export type TenantModule =
  | 'LANDING'
  | 'CERTIFICATIONS'
  | 'FAQS'
  | 'MEDIA'
  | 'STYLES'
  | 'SEO';

export interface PublicSiteDto {
  tenant: { slug: string; name: string };
  modules: TenantModule[];
  landing?: { layout: SectionLayoutDto[] };
  certifications?: { certifications: CertificationDto[] };
  faqs?: { faqs: FaqDto[] };
  seo?: { pages: SeoPageDto[] };
  styles?: { tokens: StyleTokenDto[] };
  componentTypes?: { componentTypes: ComponentTypeDto[] };
  navigation?: { items: NavigationItemDto[] };
  pages?: { pages: LandingPageDto[] };
  media?: { assets: MediaAssetDto[] };
}

export interface SectionLayoutDto {
  id: string;
  sortOrder: number;
  isVisible: boolean;
  section: LandingSectionDto;
}

export interface LandingSectionDto {
  pageKey: string;
  instanceKey: string;
  sectionType: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  badgeText?: string | null;
  primaryButtonText?: string | null;
  primaryButtonUrl?: string | null;
  mediaAssetId?: string | null;
  style?: SectionStyleDto | null;
}

export interface TextStyleDto {
  color?: string;
  fontSize?: string;
  fontWeight?: string;
  lineHeight?: string;
  textAlign?: string;
}

export interface SectionStyleDto {
  backgroundColor?: string;
  title?: TextStyleDto;
  subtitle?: TextStyleDto;
  description?: TextStyleDto;
  primaryButton?: TextStyleDto & {
    backgroundColor?: string;
    borderColor?: string;
    borderRadius?: string;
  };
}

export interface CertificationDto {
  id: string;
  name: string;
  issuingBody?: string | null;
  description?: string | null;
  certificateCode?: string | null;
  documentUrl?: string | null;
  mediaAssetId?: string | null;
  sortOrder: number;
  isActive: boolean;
}

export type MediaResourceType = 'IMAGE' | 'DOCUMENT' | 'VIDEO' | 'OTHER';

export interface MediaAssetDto {
  id: string;
  resourceType: MediaResourceType;
  filename: string;
  url: string;
  altText?: string | null;
  mimeType?: string | null;
}

export interface FaqDto {
  id: string;
  question: string;
  answer: string;
  category?: string | null;
  sortOrder: number;
  isActive: boolean;
}

export interface SeoPageDto {
  route: string;
  title: string;
  description?: string | null;
}

export interface StyleTokenDto {
  tokenKey: string;
  value: Record<string, unknown>;
}

export interface ComponentTypeDto {
  typeKey: string;
  label: string;
  isActive: boolean;
}

export interface LandingPageDto {
  pageKey: string;
  label: string;
  route: string;
  isActive: boolean;
}

export interface NavigationItemDto {
  id: string;
  label: string;
  url: string;
  children: NavigationItemDto[];
}
