import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { SiteNavigation } from './site-navigation';

describe('SiteNavigation', () => {
  let fixture: ComponentFixture<SiteNavigation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteNavigation],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SiteNavigation);
    fixture.componentRef.setInput('items', [
      {
        id: 'services',
        label: 'Servicios',
        url: '/servicios',
        children: [
          {
            id: 'quote',
            label: 'Cotizacion',
            url: '/servicios/cotizacion',
            children: [],
          },
        ],
      },
    ]);
    fixture.detectChanges();
  });

  it('renders nested navigation items recursively', () => {
    expect(fixture.nativeElement.textContent).toContain('Servicios');
    expect(fixture.nativeElement.textContent).toContain('Cotizacion');
  });

  it('toggles the mobile navigation panel', () => {
    const button = fixture.nativeElement.querySelector('button') as HTMLButtonElement;
    const items = fixture.nativeElement.querySelector('.items') as HTMLElement;

    button.click();
    fixture.detectChanges();

    expect(items.classList).toContain('expanded');
    expect(button.getAttribute('aria-expanded')).toBe('true');
  });
});
