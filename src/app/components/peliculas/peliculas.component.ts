import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { PeliculaService } from '../../services/pelicula.service';
import { Pelicula } from '../../models/pelicula';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent {
  peliculas: Pelicula[] = [];
  nuevaPelicula: Pelicula = { titulo: '', descripcion: '', anio: 2023, duracion: 0 };

  constructor(private peliculaService: PeliculaService) {
    this.cargarPeliculas();
  }

  cargarPeliculas() {
    this.peliculaService.getPeliculas().subscribe(data => this.peliculas = data);
  }

  agregarPelicula() {
    this.peliculaService.createPelicula(this.nuevaPelicula).subscribe(() => {
      this.nuevaPelicula = { titulo: '', descripcion: '', anio: 2023, duracion: 0 };
      this.cargarPeliculas();
    });
  }

  eliminarPelicula(id?: number) {
    if (!id) return;
    this.peliculaService.deletePelicula(id).subscribe(() => this.cargarPeliculas());
  }
}