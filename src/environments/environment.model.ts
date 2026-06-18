export interface AppEnvironment {
  production: boolean;
  apiBaseUrl: string;
  localTenantSlug?: string;
  traceHttp: boolean;
}
