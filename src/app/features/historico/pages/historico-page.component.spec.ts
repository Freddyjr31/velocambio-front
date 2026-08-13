import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';

import { HistoricRatesResponse } from '../../../core/models/historic-rate';
import { RateService } from '../../../core/services/rate.service';
import { SeoService } from '../../../core/services/seo.service';

import { HistoricoPageComponent } from './historico-page.component';

const PAGE_SIZE = 50;

const PROBE: HistoricRatesResponse = {
  currency: 'USD',
  rate_type: 'oficial',
  source: 'bcv',
  page: 1,
  page_size: 1,
  total: 6,
  total_pages: 3,
  history: [{ fecha: '2024-01-01', price: 36.5, rate_buy: null, rate_sell: null }],
};

const PAGES: Record<number, HistoricRatesResponse> = {
  1: {
    currency: 'USD',
    rate_type: 'oficial',
    source: 'bcv',
    page: 1,
    page_size: 2,
    total: 6,
    total_pages: 3,
    history: [
      { fecha: '2024-01-01', price: 36.5, rate_buy: null, rate_sell: null },
      { fecha: '2024-01-02', price: 36.6, rate_buy: null, rate_sell: null },
    ],
  },
  2: {
    currency: 'USD',
    rate_type: 'oficial',
    source: 'bcv',
    page: 2,
    page_size: 2,
    total: 6,
    total_pages: 3,
    history: [
      { fecha: '2024-01-03', price: 36.7, rate_buy: null, rate_sell: null },
      { fecha: '2024-01-04', price: 36.8, rate_buy: null, rate_sell: null },
    ],
  },
  3: {
    currency: 'USD',
    rate_type: 'oficial',
    source: 'bcv',
    page: 3,
    page_size: 2,
    total: 6,
    total_pages: 3,
    history: [
      { fecha: '2024-01-05', price: 36.9, rate_buy: null, rate_sell: null },
      { fecha: '2024-01-06', price: 37.0, rate_buy: null, rate_sell: null },
    ],
  },
};

function componentData(
  fixture: ComponentFixture<HistoricoPageComponent>,
): HistoricRatesResponse | null {
  return (fixture.componentInstance as unknown as { data: () => HistoricRatesResponse | null })
    .data();
}

function nextButton(fixture: ComponentFixture<HistoricoPageComponent>): HTMLButtonElement {
  const buttons = fixture.debugElement.queryAll(By.css('.page-btn'));
  return buttons[1].nativeElement as HTMLButtonElement;
}

describe('HistoricoPageComponent', () => {
  let getHistoricoBcv: jasmine.Spy;

  beforeEach(() => {
    getHistoricoBcv = jasmine.createSpy('getHistoricoBcv');

    TestBed.configureTestingModule({
      imports: [HistoricoPageComponent],
      providers: [
        provideZonelessChangeDetection(),
        provideRouter([]),
        { provide: RateService, useValue: { getHistoricoBcv } },
        { provide: SeoService, useValue: { setPageMeta: jasmine.createSpy() } },
      ],
    });
  });

  function createFixture(): ComponentFixture<HistoricoPageComponent> {
    getHistoricoBcv.and.callFake((page: number, pageSize: number) =>
      of(pageSize === 1 ? PROBE : PAGES[page]),
    );
    const fixture = TestBed.createComponent(HistoricoPageComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('debe crearse', () => {
    const fixture = createFixture();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('en la primera carga pide la última página del backend (más reciente)', () => {
    const fixture = createFixture();

    const calls = getHistoricoBcv.calls.allArgs();
    expect(calls[0]).toEqual([1, 1]); //* probe: solo metadata
    expect(calls[1]).toEqual([3, PAGE_SIZE]); //* última página del backend

    const data = componentData(fixture)!;
    expect(data.page).toBe(1);
    expect(data.history.map((entry) => entry.fecha)).toEqual(['2024-01-06', '2024-01-05']);
  });

  it('muestra la fecha más reciente como primera fila', () => {
    const fixture = createFixture();

    const dates = fixture.debugElement
      .queryAll(By.css('.row .date'))
      .map((el) => (el.nativeElement as HTMLElement).textContent?.trim());

    expect(dates.length).toBe(2);
    expect(componentData(fixture)!.history[0].fecha).toBe('2024-01-06');
  });

  it('Siguiente navega hacia fechas más antiguas (mapeo inverso)', () => {
    const fixture = createFixture();

    expect(componentData(fixture)!.page).toBe(1);
    expect(nextButton(fixture).disabled).toBe(false);

    nextButton(fixture).click();
    fixture.detectChanges();
    expect(getHistoricoBcv.calls.mostRecent().args).toEqual([2, PAGE_SIZE]);
    expect(componentData(fixture)!.page).toBe(2);
    expect(componentData(fixture)!.history.map((entry) => entry.fecha)).toEqual([
      '2024-01-04',
      '2024-01-03',
    ]);

    nextButton(fixture).click();
    fixture.detectChanges();
    expect(getHistoricoBcv.calls.mostRecent().args).toEqual([1, PAGE_SIZE]);
    expect(componentData(fixture)!.page).toBe(3);
    expect(componentData(fixture)!.history.map((entry) => entry.fecha)).toEqual([
      '2024-01-02',
      '2024-01-01',
    ]);
    expect(nextButton(fixture).disabled).toBe(true);
  });
});
