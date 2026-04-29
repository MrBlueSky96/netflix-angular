import { inject, Injectable, PLATFORM_ID } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { isPlatformBrowser } from "@angular/common";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  private auth = inject(AuthService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  canActivate(): boolean {

    if (!isPlatformBrowser(this.platformId)) {
      return true;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }


}