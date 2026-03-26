export interface Video {
  id?: number;
  titulo: string;
  descripcion: string;
  anio: number;
  imagenUrl?: string;
  tipo_video?: 'PELICULA' | 'SERIE';
}