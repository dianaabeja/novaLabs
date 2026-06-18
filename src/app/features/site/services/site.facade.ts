import { inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs';
import { PublicSiteDto } from '../../../data-access/contracts/public-site.dto';
import { PublicSiteModel } from '../../../data-access/models/public-site.model';
import { PublicSiteRepository } from '../../../data-access/repositories/public-site.repository';

export interface SiteState {
  loading: boolean;
  data: PublicSiteModel | null;
  error: boolean;
}

@Injectable({ providedIn: 'root' })
export class SiteFacade {
  private readonly repository = inject(PublicSiteRepository);
  readonly state = signal<SiteState>({ loading: false, data: null, error: false });

  load(): void {
    this.state.set({ loading: true, data: null, error: false });

    this.repository
      .getBootstrap()
      .pipe(
        finalize(() => {
          this.state.update((state) => ({ ...state, loading: false }));
        }),
      )
      .subscribe({
        next: (data) => this.state.set({ loading: false, data, error: false }),
        error: () => this.state.set({ loading: false, data: null, error: true }),
      });
  }

  editableSnapshot(): PublicSiteDto {
    return this.repository.getEditableSnapshot();
  }

  save(dto: PublicSiteDto): void {
    this.state.update((state) => ({ ...state, loading: true, error: false }));

    this.repository
      .save(dto)
      .pipe(finalize(() => this.state.update((state) => ({ ...state, loading: false }))))
      .subscribe({
        next: (data) => this.state.set({ loading: false, data, error: false }),
        error: () => this.state.update((state) => ({ ...state, loading: false, error: true })),
      });
  }

  reset(): void {
    this.state.update((state) => ({ ...state, loading: true, error: false }));

    this.repository
      .reset()
      .pipe(finalize(() => this.state.update((state) => ({ ...state, loading: false }))))
      .subscribe({
        next: (data) => this.state.set({ loading: false, data, error: false }),
        error: () => this.state.update((state) => ({ ...state, loading: false, error: true })),
      });
  }
}
