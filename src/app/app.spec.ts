import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { SiteFacade } from './features/site/services/site.facade';

describe('App', () => {
  const siteFacade = {
    state: () => ({ loading: true, data: null, error: false }),
    load: jasmine.createSpy('load'),
  };

  beforeEach(async () => {
    siteFacade.load.calls.reset();
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: SiteFacade, useValue: siteFacade }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should load and render the initial state', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(siteFacade.load).toHaveBeenCalled();
    expect(compiled.textContent).toContain('Cargando sitio...');
  });
});
