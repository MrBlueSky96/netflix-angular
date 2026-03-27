export interface Video {
  id?: number;
  titulo: string;
  descripcion: string;
  anio: number;
  imagenUrl?: string;
  puntuacion?: number;
  tipo_video?: 'PELICULA' | 'SERIE';
}