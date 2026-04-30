import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { SeriesComponent } from './series.component';
import { SerieService } from '../../services/serie.service';
import { FavoriteService } from '../../services/favorite.service';

describe('SeriesComponent', () => {
  let component: SeriesComponent;
  let fixture: ComponentFixture<SeriesComponent>;

  const serieServiceMock = {
    getSeries: vi.fn(() =>
      of([
        { id: 1, titulo: 'Breaking Bad', descripcion: '', anio: 2008, numeroTemporadas: 5, imagenUrl: '', puntuacion: 5 }
      ])
    ),
    createSerie: vi.fn(() => of({})),
    deleteSerie: vi.fn(() => of({})),
    updateSerie: vi.fn(() => of({}))
  };

  const favoriteServiceMock: any = {
    favorites$: of([1]),
    loadFavorites: vi.fn(),
    setFavorites: vi.fn(),
    addFavorite: vi.fn(() => of({})),
    removeFavorite: vi.fn(() => of({}))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeriesComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: SerieService, useValue: serieServiceMock },
        { provide: FavoriteService, useValue: favoriteServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SeriesComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should load series on init', () => {
    component.ngOnInit();
    expect(serieServiceMock.getSeries).toHaveBeenCalled();
  });

  it('should filter series by title', () => {
    component.series = [
      { id: 1, titulo: 'Breaking Bad', descripcion: '', anio: 2008, numeroTemporadas: 5, imagenUrl: '', puntuacion: 5 },
      { id: 2, titulo: 'Dark', descripcion: '', anio: 2017, numeroTemporadas: 3, imagenUrl: '', puntuacion: 5 }
    ];

    component.busquedaControl.setValue('bre');

    const result = component.seriesFiltradas;

    expect(result.length).toBe(1);
    expect(result[0].titulo).toBe('Breaking Bad');
  });

  it('should add favorite optimistically', () => {
    component.favorites = [];

    component.addToFavorites(1);

    expect(favoriteServiceMock.setFavorites).toHaveBeenCalledWith([1]);
    expect(favoriteServiceMock.addFavorite).toHaveBeenCalledWith(1);
  });

  it('should remove favorite optimistically', () => {
    component.favorites = [1];

    component.removeFromFavorites(1);

    expect(favoriteServiceMock.setFavorites).toHaveBeenCalledWith([]);
    expect(favoriteServiceMock.removeFavorite).toHaveBeenCalledWith(1);
  });

  it('should toggle favorite (add)', () => {
    component.favorites = [];

    component.toggleFavorite(1);

    expect(favoriteServiceMock.addFavorite).toHaveBeenCalledWith(1);
  });

  it('should toggle favorite (remove)', () => {
    component.favorites = [1];

    component.toggleFavorite(1);

    expect(favoriteServiceMock.removeFavorite).toHaveBeenCalledWith(1);
  });
});