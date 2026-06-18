import { Routes } from '@angular/router';
import { CmsPage } from './features/cms/cms-page';
import { SitePage } from './features/site/pages/site-page';

export const routes: Routes = [
  { path: 'cms', component: CmsPage },
  { path: '**', component: SitePage },
];
