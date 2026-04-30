import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FavoriteService } from './favorite.service';

describe('FavoriteService', () => {
  let service: FavoriteService;
  let httpMock: HttpTestingController;

  const apiUrl = 'http://localhost:8080/api/favorites';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FavoriteService]
    });

    service = TestBed.inject(FavoriteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add favorite (POST)', () => {
    service.addFavorite(1).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});

    req.flush({});
  });

  it('should remove favorite (DELETE)', () => {
    service.removeFavorite(1).subscribe(res => {
      expect(res).toBeTruthy();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');

    req.flush({});
  });

  it('should load favorites and update BehaviorSubject', () => {
    const mockResponse = [1, 2, 3];

    service.loadFavorites();

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');

    req.flush(mockResponse);

    service.favorites$.subscribe(favs => {
      expect(favs).toEqual(mockResponse);
    });
  });

  it('should set favorites manually', (done) => {
    const favs = [10, 20];

    service.setFavorites(favs);

    service.favorites$.subscribe(value => {
      expect(value).toEqual(favs);
      done();
    });
  });
});