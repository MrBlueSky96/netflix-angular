import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule ],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(public authService: AuthService) {}

  getUsername(): string | null {
    return localStorage.getItem('username');
  }

  logout() {
    this.authService.logout();
    window.location.href = '/login'; // o router.navigate
  }

}