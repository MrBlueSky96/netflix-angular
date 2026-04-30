import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SerieService } from './serie.service';
import { Serie } from '../models/serie';

describe('SerieService', () => {
  let service: SerieService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:8080/api/series';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SerieService]
    });

    service = TestBed.inject(SerieService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get series', () => {
    const mockResponse: Serie[] = [
      { id: 1, titulo: 'Breaking Bad', descripcion: '', anio: 2008, numeroTemporadas: 5, imagenUrl: '', puntuacion: 5 }
    ];

    service.getSeries().subscribe(res => {
      expect(res.length).toBe(1);
      expect(res[0].titulo).toBe('Breaking Bad');
    });

    const req = httpMock.expectOne(`${apiUrl}/get`);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);
  });

  it('should create serie', () => {
    const serie: Serie = {
      id: 0,
      titulo: 'Dark',
      descripcion: '',
      anio: 2017,
      numeroTemporadas: 3,
      imagenUrl: '',
      puntuacion: 5
    };

    service.createSerie(serie).subscribe(res => {
      expect(res.titulo).toBe('Dark');
    });

    const req = httpMock.expectOne(`${apiUrl}/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(serie);

    req.flush(serie);
  });

  it('should update serie', () => {
    const serie: Serie = {
      id: 1,
      titulo: 'Updated Serie',
      descripcion: '',
      anio: 2020,
      numeroTemporadas: 4,
      imagenUrl: '',
      puntuacion: 4
    };

    service.updateSerie(1, serie).subscribe(res => {
      expect(res.titulo).toBe('Updated Serie');
    });

    const req = httpMock.expectOne(`${apiUrl}/update/1`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(serie);

    req.flush(serie);
  });

  it('should delete serie', () => {
    service.deleteSerie(1).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(`${apiUrl}/delete/1`);
    expect(req.request.method).toBe('DELETE');

    req.flush({});
  });
});