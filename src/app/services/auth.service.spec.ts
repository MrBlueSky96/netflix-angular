import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  const setItemMock = vi.fn();
  const removeItemMock = vi.fn();
  const getItemMock = vi.fn((key: string) => {
    if (key === 'token') return 'fake-token';
    if (key === 'username') return 'test-user';
    return null;
  });

  const apiUrl = 'http://localhost:8080/api/auth';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);

    Object.defineProperty(window, 'localStorage', {
      value: {
        setItem: setItemMock,
        removeItem: removeItemMock,
        getItem: getItemMock
      }
    });

    vi.clearAllMocks();
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and store token', () => {
    const credentials = { username: 'test', password: '1234' };

    service.login(credentials).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/login`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(credentials);

    req.flush({
      token: 'fake-token',
      username: 'test-user'
    });

    expect(setItemMock).toHaveBeenCalledWith('token', 'fake-token');
    expect(setItemMock).toHaveBeenCalledWith('username', 'test-user');
  });

  it('should register user', () => {
    const user = { username: 'test', email: 'test@test.com', password: '1234' };

    service.register(user).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/register`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(user);

    req.flush({});
  });

  it('should logout user', () => {
    service.logout();

    expect(removeItemMock).toHaveBeenCalledWith('token');
    expect(removeItemMock).toHaveBeenCalledWith('username');
  });

  it('should return token from localStorage', () => {
    const token = service.getToken();
    expect(token).toBe('fake-token');
    expect(getItemMock).toHaveBeenCalledWith('token');
  });

  it('should detect user as logged in', () => {
    expect(service.isLogged()).toBeTruthy();
  });
});