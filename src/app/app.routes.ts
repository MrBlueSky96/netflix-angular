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
  { path: 'series', component: SeriesComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];