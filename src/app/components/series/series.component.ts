import { ChangeDetectorRef, Component, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SerieService } from '../../services/serie.service';
import { Serie } from '../../models/serie';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { FavoriteService } from '../../services/favorite.service';
import { EditVideoDialogComponent } from '../edit-video-dialog/edit-video-dialog.component';

@Component({
  selector: 'app-series',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css']
})
export class SeriesComponent {

  busquedaControl = new FormControl('');
  series: Serie[] = [];
  favorites: number[] = [];

  nuevaSerie: Serie = {
    id: 0,
    titulo: '',
    descripcion: '',
    anio: 2026,
    numeroTemporadas: 1,
    imagenUrl: '',
    puntuacion: 1
  };

  platformId = inject(PLATFORM_ID);
  private destroy$ = new Subject<void>();

  constructor(
    private serieService: SerieService,
    private favoriteService: FavoriteService,
    private dialog: MatDialog,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.cargarSeries();
      this.loadFavorites();
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get seriesFiltradas() {
    const busqueda = this.busquedaControl.value || '';
    return this.series.filter(s =>
      s.titulo.toLowerCase().includes(busqueda.toLowerCase())
    );
  }

  cargarSeries() {
    this.serieService.getSeries().subscribe(data => {
      this.series = data;
      this.cd.detectChanges();
    });
  }

  agregarSerie() {
    this.serieService.createSerie(this.nuevaSerie).subscribe(() => {
      this.nuevaSerie = {
        id: 0,
        titulo: '',
        descripcion: '',
        anio: 2026,
        numeroTemporadas: 1,
        imagenUrl: '',
        puntuacion: 1
      };
      this.cargarSeries();
    });
  }

  eliminarSerie(id?: number) {
    if (!id) return;
    this.serieService.deleteSerie(id).subscribe(() => this.cargarSeries());
  }

  editarSerie(s: Serie) {
    const dialogRef = this.dialog.open(EditVideoDialogComponent, {
      width: '400px',
      data: { tipo: 'serie', video: s }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.serieService.updateSerie(result.id, result)
          .subscribe(() => this.cargarSeries());
      }
    });
  }

  addToFavorites(id: number) {
    const optimistic = [...this.favorites, id];
    this.favoriteService.setFavorites(optimistic);

    this.favoriteService.addFavorite(id).subscribe(() => {
      this.favoriteService.loadFavorites();
    });
  }

  removeFromFavorites(id: number) {
    const optimistic = this.favorites.filter(f => f !== id);
    this.favoriteService.setFavorites(optimistic);

    this.favoriteService.removeFavorite(id).subscribe(() => {
      this.favoriteService.loadFavorites();
    });
  }

  loadFavorites() {
    this.favoriteService.favorites$
      .pipe(takeUntil(this.destroy$))
      .subscribe(favs => {
        this.favorites = favs;
        this.cd.detectChanges();
      });

    this.favoriteService.loadFavorites();
  }

  toggleFavorite(id: number) {
    this.favorites.includes(id)
      ? this.removeFromFavorites(id)
      : this.addToFavorites(id);
  }
}