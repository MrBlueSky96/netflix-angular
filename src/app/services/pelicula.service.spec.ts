import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { PeliculaService } from './pelicula.service';
import { Pelicula } from '../models/pelicula';

describe('PeliculaService', () => {
  let service: PeliculaService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:8080/api/peliculas';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PeliculaService]
    });

    service = TestBed.inject(PeliculaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get peliculas', () => {
    const mockResponse: Pelicula[] = [
      { id: 1, titulo: 'Matrix', descripcion: '', anio: 1999, duracion: 120, imagenUrl: '', puntuacion: 5 }
    ];

    service.getPeliculas().subscribe(res => {
      expect(res.length).toBe(1);
      expect(res[0].titulo).toBe('Matrix');
    });

    const req = httpMock.expectOne(`${apiUrl}/get`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should create pelicula', () => {
    const pelicula: Pelicula = {
      id: 0,
      titulo: 'Inception',
      descripcion: '',
      anio: 2010,
      duracion: 148,
      imagenUrl: '',
      puntuacion: 5
    };

    service.createPelicula(pelicula).subscribe(res => {
      expect(res.titulo).toBe('Inception');
    });

    const req = httpMock.expectOne(`${apiUrl}/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(pelicula);

    req.flush(pelicula);
  });

  it('should update pelicula', () => {
    const pelicula: Pelicula = {
      id: 1,
      titulo: 'Updated',
      descripcion: '',
      anio: 2020,
      duracion: 100,
      imagenUrl: '',
      puntuacion: 4
    };

    service.updatePelicula(1, pelicula).subscribe(res => {
      expect(res.titulo).toBe('Updated');
    });

    const req = httpMock.expectOne(`${apiUrl}/update/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(pelicula);

    req.flush(pelicula);
  });

  it('should delete pelicula', () => {
    service.deletePelicula(1).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(`${apiUrl}/delete/1`);
    expect(req.request.method).toBe('DELETE');

    req.flush({});
  });
});