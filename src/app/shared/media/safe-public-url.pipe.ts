import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'safePublicUrl' })
export class SafePublicUrlPipe implements PipeTransform {
  transform(value?: string | null): string | null {
    return isSafePublicUrl(value) ? value : null;
  }
}

export function isSafePublicUrl(value?: string | null): value is string {
  return Boolean(value && (/^\//.test(value) || /^https?:\/\//i.test(value)));
}
