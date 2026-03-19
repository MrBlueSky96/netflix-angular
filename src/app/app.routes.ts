import { Routes } from '@angular/router';
import { PeliculasComponent } from './components/peliculas/peliculas.component';
import { SeriesComponent } from './components/series/series.component';

export const routes: Routes = [
  { path: 'peliculas', component: PeliculasComponent },
  { path: 'series', component: SeriesComponent },
  { path: '', redirectTo: 'peliculas', pathMatch: 'full' }
];