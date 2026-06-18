import { Injectable } from '@angular/core';
import {
  LandingSectionDto,
  TextStyleDto,
} from '../../../data-access/contracts/public-site.dto';

type CssStyles = Record<string, string>;

@Injectable({ providedIn: 'root' })
export class SectionStyleResolver {
  section(section: LandingSectionDto): CssStyles {
    return this.colorStyle('background-color', section.style?.backgroundColor);
  }

  title(section: LandingSectionDto): CssStyles {
    return this.text(section.style?.title);
  }

  subtitle(section: LandingSectionDto): CssStyles {
    return this.text(section.style?.subtitle);
  }

  description(section: LandingSectionDto): CssStyles {
    return this.text(section.style?.description);
  }

  action(section: LandingSectionDto): CssStyles {
    const action = section.style?.primaryButton;

    return {
      ...this.text(action),
      ...this.colorStyle('background-color', action?.backgroundColor),
      ...this.colorStyle('border-color', action?.borderColor),
      ...this.lengthStyle('border-radius', action?.borderRadius),
    };
  }

  brand(styles: Record<string, Record<string, unknown>>): CssStyles {
    const colors = styles['brand.colors'] ?? styles['brand'];

    return {
      ...this.colorStyle('--brand-primary', colors?.['primary'] ?? colors?.['primaryColor']),
      ...this.colorStyle('--brand-accent', colors?.['accent'] ?? colors?.['accentColor']),
    };
  }

  private text(style?: TextStyleDto): CssStyles {
    if (!style) {
      return {};
    }

    return {
      ...this.colorStyle('color', style.color),
      ...this.lengthStyle('font-size', style.fontSize),
      ...this.fontWeightStyle(style.fontWeight),
      ...this.lineHeightStyle(style.lineHeight),
      ...this.textAlignStyle(style.textAlign),
    };
  }

  private colorStyle(property: string, value: unknown): CssStyles {
    return typeof value === 'string' &&
      /^(#[\da-f]{3,8}|rgba?\([\d\s,.%]+\)|hsla?\([\d\s,.%]+\))$/i.test(value)
      ? { [property]: value }
      : {};
  }

  private lengthStyle(property: string, value: unknown): CssStyles {
    return typeof value === 'string' &&
      /^\d+(\.\d+)?(px|rem|em|%)$/.test(value)
      ? { [property]: value }
      : {};
  }

  private fontWeightStyle(value: unknown): CssStyles {
    return typeof value === 'string' && /^(normal|bold|[1-9]00)$/.test(value)
      ? { 'font-weight': value }
      : {};
  }

  private lineHeightStyle(value: unknown): CssStyles {
    return typeof value === 'string' &&
      /^\d+(\.\d+)?(px|rem|em|%)?$/.test(value)
      ? { 'line-height': value }
      : {};
  }

  private textAlignStyle(value: unknown): CssStyles {
    return typeof value === 'string' &&
      /^(left|right|center|justify|start|end)$/.test(value)
      ? { 'text-align': value }
      : {};
  }
}
