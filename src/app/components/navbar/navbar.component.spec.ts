import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../services/auth.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('NavbarComponent', () => {

  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {

    authServiceSpy = jasmine.createSpyObj('AuthService', ['logout', 'isLogged']);

    await TestBed.configureTestingModule({
      imports: [NavbarComponent, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
  });

  // TEST 1: Username desde localStorage
  it('debería devolver username desde localStorage', () => {

    spyOn(localStorage, 'getItem').and.returnValue('testUser');

    const username = component.getUsername();

    expect(username).toBe('testUser');
  });

  // TEST 2: Logout limpia sesión y redirige
  it('debería hacer logout correctamente', () => {

    authServiceSpy.logout.and.callFake(() => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    });

    spyOn(component, 'goLogin');

    component.logout();

    expect(authServiceSpy.logout).toHaveBeenCalled();
    expect(component.goLogin).toHaveBeenCalled();
  });

  // TEST 3: goLogin cambia URL
  it('goLogin debería redirigir a /login', () => {

    component.goLogin();

    expect(window.location.href).toBe('/login');
  });

  // 🧪 TEST 4: isLoggedSafe true en browser
  it('isLoggedSafe debería devolver true si está logueado', () => {

    authServiceSpy.isLogged.and.returnValue(true);

    const result = component.isLoggedSafe();

    expect(result).toBeTrue();
  });

  // 🧪 TEST 5: isLoggedSafe false sin browser (simulación SSR)
  it('isLoggedSafe debería devolver false si no es browser', () => {

    // simulamos entorno SSR
    spyOnProperty(window as any, 'navigator', 'get').and.returnValue(undefined);

    const result = component.isLoggedSafe();

    expect(result).toBeFalse();
  });

});