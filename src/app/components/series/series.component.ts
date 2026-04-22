import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SerieService } from '../../services/serie.service';
import { Serie } from '../../models/serie';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent {
  series: Serie[] = [];
  nuevaSerie: Serie = { titulo: '', descripcion: '', anio: 2023, numeroTemporadas: 1 };

  constructor(private serieService: SerieService) {
    this.cargarSeries();
  }

  cargarSeries() {
    this.serieService.getSeries().subscribe(data => this.series = data);
  }

  agregarSerie() {
    this.serieService.createSerie(this.nuevaSerie).subscribe(() => {
      this.nuevaSerie = { titulo: '', descripcion: '', anio: 2023, numeroTemporadas: 1 };
      this.cargarSeries();
    });
  }

  eliminarSerie(id?: number) {
    if (!id) return;
    this.serieService.deleteSerie(id).subscribe(() => this.cargarSeries());
  }
}