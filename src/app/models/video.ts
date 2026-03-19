export interface Video {
  id?: number;
  titulo: string;
  descripcion: string;
  anio: number;
  tipo_video?: 'PELICULA' | 'SERIE';
}