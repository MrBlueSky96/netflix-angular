import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('RegisterComponent', () => {

  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {

    authServiceSpy = jasmine.createSpyObj('AuthService', ['register']);
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [RegisterComponent, FormsModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
  });

  // TEST 1: Registro correcto
  it('debería registrar usuario y redirigir a login', () => {

    authServiceSpy.register.and.returnValue(of({}));

    spyOn(component, 'goLogin');

    component.username = 'test';
    component.email = 'test@test.com';
    component.password = '1234';

    component.register();

    expect(authServiceSpy.register).toHaveBeenCalledWith({
      username: 'test',
      email: 'test@test.com',
      password: '1234'
    });

    expect(component.goLogin).toHaveBeenCalled();
  });

  // TEST 2: Error en registro
  it('debería mostrar alert si hay error', () => {

    authServiceSpy.register.and.returnValue(
      throwError(() => ({ error: 'Error de registro' }))
    );

    spyOn(window, 'alert');

    component.username = 'test';
    component.email = 'test@test.com';
    component.password = '1234';

    component.register();

    expect(window.alert).toHaveBeenCalledWith('Error de registro');
  });

  // TEST 3: goLogin redirige
  it('goLogin debería cambiar a /login', () => {

    spyOn(window.location, 'assign');

    component.goLogin();

    expect(window.location.href).toBe('/login');
  });

});