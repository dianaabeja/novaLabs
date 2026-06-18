import { PublicSiteModel } from '../../../data-access/models/public-site.model';

export function normalizeSiteRoute(url: string): string {
  const route = url.split(/[?#]/, 1)[0].replace(/\/+$/, '');
  return route || '/';
}

export function resolveSitePage(model: PublicSiteModel, url: string) {
  const route = normalizeSiteRoute(url);
  const page = model.pages.find((candidate) => candidate.route === route);

  if (!page) {
    return null;
  }

  return {
    route,
    page,
    sections: model.sections.filter((section) => section.pageKey === page.pageKey),
    seo: model.seoByRoute.get(route),
    showHomeModules: route === '/',
  };
}
