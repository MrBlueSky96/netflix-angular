import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { SeriesComponent } from './components/series/series.component';
import { AuthGuard } from './interceptors/auth-guard';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'peliculas', component: PeliculasComponent, canActivate: [AuthGuard] },
  { path: 'series', component: SeriesComponent, canActivate: [AuthGuard] },
  { path: 'register', loadComponent: () =>
    import('./components/auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'login', loadComponent: () =>
    import('./components/auth/login/login.component').then(m => m.LoginComponent) },
];