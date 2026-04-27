import { ChangeDetectorRef, Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { PeliculaService } from '../../services/pelicula.service';
import { Pelicula } from '../../models/pelicula';
import { EditVideoDialogComponent } from '../edit-video-dialog/edit-video-dialog.component';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent {
  
  busqueda: string = '';
  busquedaControl = new FormControl('');
  peliculaSeleccionada: Pelicula | null = null;
  peliculas: Pelicula[] = [];
  favorites: number[] = [];
  nuevaPelicula: Pelicula = { id: 0, titulo: '', descripcion: '', anio: 2026, duracion: 0, imagenUrl: '', puntuacion: 1 };

  constructor(private peliculaService: PeliculaService, private favoriteService: FavoriteService,  private dialog: MatDialog, private cd: ChangeDetectorRef) {
    this.cargarPeliculas();
  }

  ngOnInit() {
    this.loadFavorites();
  }

  get peliculasFiltradas() {
    const busqueda = this.busquedaControl.value || '';
    return this.peliculas.filter(pelicula =>
    pelicula.titulo.toLowerCase().includes(busqueda.toLowerCase()));
  }

  cargarPeliculas() {
  this.peliculaService.getPeliculas().subscribe(data => {
    this.peliculas = data;
    this.cd.detectChanges(); // fuerza render de peliculasFiltradas
  });
  }

  agregarPelicula() {
    this.peliculaService.createPelicula(this.nuevaPelicula).subscribe(() => {
      this.nuevaPelicula = { id: 0, titulo: '', descripcion: '', anio: 2026, duracion: 0, imagenUrl: '', puntuacion: 1 };
      this.cargarPeliculas();
    });
  }

  eliminarPelicula(id?: number) {
    if (!id) return;
    this.peliculaService.deletePelicula(id).subscribe(() => this.cargarPeliculas());
  }

  editarPelicula(p: any) {
  const dialogRef = this.dialog.open(EditVideoDialogComponent, {
    width: '400px',
    data: { tipo: 'pelicula', video: p }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {      
      this.peliculaService.updatePelicula(result.id, result)
        .subscribe(() => this.cargarPeliculas());
    }
  });
  }

  addToFavorites(movieId: number) {
    this.favoriteService.addFavorite(movieId).subscribe({
    next: () => {
      this.favorites = [...this.favorites, movieId];
    }});
  }

  removeFromFavorites(movieId: number) {
    this.favoriteService.removeFavorite(movieId).subscribe({
    next: () => {
      this.favorites = this.favorites.filter(id => id !== movieId);
    }});
  }

  loadFavorites() {
    this.favoriteService.getFavorites().subscribe((data) => {
      this.favorites = data;
    });
  }

  toggleFavorite(id: number) {
    this.favorites.includes(id) ?
    this.removeFromFavorites(id) :
    this.addToFavorites(id);
  }


}