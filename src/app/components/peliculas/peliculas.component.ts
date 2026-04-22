import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { PeliculaService } from '../../services/pelicula.service';
import { Pelicula } from '../../models/pelicula';
import { EditVideoDialogComponent } from '../edit-video-dialog/edit-video-dialog.component';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent {
  
  busqueda: string = '';
  busquedaControl = new FormControl('');
  peliculaSeleccionada: Pelicula | null = null;
  peliculas: Pelicula[] = [];
  nuevaPelicula: Pelicula = { titulo: '', descripcion: '', anio: 2026, duracion: 0, imagenUrl: '', puntuacion: 1 };

  constructor(private peliculaService: PeliculaService, private dialog: MatDialog, private cd: ChangeDetectorRef) {
    this.cargarPeliculas();
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
      this.nuevaPelicula = { titulo: '', descripcion: '', anio: 2026, duracion: 0, imagenUrl: '', puntuacion: 1 };
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
}