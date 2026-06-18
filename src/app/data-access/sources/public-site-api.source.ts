import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { PublicSiteDto } from '../contracts/public-site.dto';
import { PUBLIC_SITE_MOCK } from '../mocks/public-site.mock';

const STORAGE_KEY = 'nova-biometrics.public-site.mock.v4';

@Injectable({ providedIn: 'root' })
export class PublicSiteApiSource {
  private readonly data = new BehaviorSubject<PublicSiteDto>(this.read());

  getBootstrap(): Observable<PublicSiteDto> {
    return this.data.asObservable().pipe(delay(120));
  }

  getSnapshot(): PublicSiteDto {
    return structuredClone(this.data.value);
  }

  save(dto: PublicSiteDto): Observable<PublicSiteDto> {
    const next = structuredClone(dto);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    this.data.next(next);
    return of(structuredClone(next)).pipe(delay(120));
  }

  reset(): Observable<PublicSiteDto> {
    localStorage.removeItem(STORAGE_KEY);
    const next = structuredClone(PUBLIC_SITE_MOCK);
    this.data.next(next);
    return of(structuredClone(next)).pipe(delay(120));
  }

  private read(): PublicSiteDto {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return structuredClone(PUBLIC_SITE_MOCK);
    }

    try {
      return structuredClone(JSON.parse(stored) as PublicSiteDto);
    } catch {
      localStorage.removeItem(STORAGE_KEY);
      return structuredClone(PUBLIC_SITE_MOCK);
    }
  }
}
