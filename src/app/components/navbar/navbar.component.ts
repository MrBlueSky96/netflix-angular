import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  platformId = inject(PLATFORM_ID);

  constructor(public authService: AuthService) {}

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  logout() {
    this.authService.logout();
    this.goLogin();
  }

  goLogin() {
    window.location.href = '/login';
  }

  isLoggedSafe(): boolean {
    if (!isPlatformBrowser(this.platformId)) return false;
    return this.authService.isLogged();
  }

}