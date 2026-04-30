import { TestBed, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';

import { PeliculasComponent } from './peliculas.component';
import { PeliculaService } from '../../services/pelicula.service';
import { FavoriteService } from '../../services/favorite.service';

describe('PeliculasComponent', () => {
  let component: PeliculasComponent;
  let fixture: ComponentFixture<PeliculasComponent>;

  const peliculaServiceMock = {
    getPeliculas: vi.fn(() =>
      of([
        { id: 1, titulo: 'Matrix', descripcion: '', anio: 1999, duracion: 120, imagenUrl: '', puntuacion: 5 }
      ])
    ),
    createPelicula: vi.fn(() => of({})),
    deletePelicula: vi.fn(() => of({})),
    updatePelicula: vi.fn(() => of({}))
  };

  const favoriteServiceMock = {
    favorites$: of([1]),
    loadFavorites: vi.fn(),
    setFavorites: vi.fn(),
    addFavorite: vi.fn().mockReturnValue(of({})),
    removeFavorite: vi.fn().mockReturnValue(of({})),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeliculasComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: PeliculaService, useValue: peliculaServiceMock },
        { provide: FavoriteService, useValue: favoriteServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PeliculasComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should load movies on init', () => {
    component.ngOnInit();
    expect(peliculaServiceMock.getPeliculas).toHaveBeenCalled();
  });

  it('should filter movies by title', () => {
    component.peliculas = [
      { id: 1, titulo: 'Matrix', descripcion: '', anio: 1999, duracion: 120, imagenUrl: '', puntuacion: 5 },
      { id: 2, titulo: 'Avatar', descripcion: '', anio: 2009, duracion: 150, imagenUrl: '', puntuacion: 4 }
    ];

    component.busquedaControl.setValue('mat');

    const result = component.peliculasFiltradas;

    expect(result.length).toBe(1);
    expect(result[0].titulo).toBe('Matrix');
  });

  it('should add favorite when not exists', () => {
    component.favorites = [];

    component.addToFavorites(1);

    expect(favoriteServiceMock.setFavorites).toHaveBeenCalledWith([1]);
    expect(favoriteServiceMock.addFavorite).toHaveBeenCalledWith(1);
  });

  it('should remove favorite when exists', () => {
    component.favorites = [1];

    component.removeFromFavorites(1);

    expect(favoriteServiceMock.setFavorites).toHaveBeenCalledWith([]);
    expect(favoriteServiceMock.removeFavorite).toHaveBeenCalledWith(1);
  });

  it('should toggle favorite (add case)', () => {
    component.favorites = [];

    component.toggleFavorite(1);

    expect(favoriteServiceMock.addFavorite).toHaveBeenCalledWith(1);
  });

  it('should toggle favorite (remove case)', () => {
    component.favorites = [1];

    component.toggleFavorite(1);

    expect(favoriteServiceMock.removeFavorite).toHaveBeenCalledWith(1);
  });
});