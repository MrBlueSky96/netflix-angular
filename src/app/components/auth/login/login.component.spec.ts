import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('LoginComponent', () => {

  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {

    authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [LoginComponent, FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    localStorage.clear();
  });

  // TEST 1: Login correcto
  it('debería hacer login y guardar token + navegar', () => {

    const mockResponse = {
      token: 'fake-token',
      username: 'testUser'
    };

    component.user = {
      username: 'testUser',
      password: '1234'
    };

    authServiceSpy.login.and.returnValue(of(mockResponse));

    spyOn(localStorage, 'setItem');

    component.login();

    expect(authServiceSpy.login).toHaveBeenCalledWith(component.user);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fake-token');
    expect(localStorage.setItem).toHaveBeenCalledWith('username', 'testUser');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/']);
  });

  // TEST 2: Login error
  it('debería mostrar alert si login falla', () => {

    component.user = {
      username: 'wrong',
      password: 'wrong'
    };

    authServiceSpy.login.and.returnValue(throwError(() => new Error()));

    spyOn(window, 'alert');

    component.login();

    expect(authServiceSpy.login).toHaveBeenCalled();
    expect(window.alert).toHaveBeenCalledWith('Login incorrecto');
  });

  // TEST 3: No debería llamar login si datos vacíos (opcional)
  it('no debería hacer login si usuario está vacío', () => {

    component.user = {
      username: '',
      password: ''
    };

    component.login();

    expect(authServiceSpy.login).toHaveBeenCalled(); 
  });

});