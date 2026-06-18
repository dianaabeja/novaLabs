import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const tenantContextInterceptor: HttpInterceptorFn = (request, next) => {
  if (!environment.localTenantSlug) return next(request);

  return next(
    request.clone({
      setHeaders: { 'X-Tenant-Slug': environment.localTenantSlug },
    }),
  );
};
