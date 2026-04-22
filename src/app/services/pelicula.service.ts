import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pelicula } from '../models/pelicula';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  private apiUrl = 'http://localhost:8080/api/peliculas';

  constructor(private http: HttpClient) {}

  getPeliculas(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(`${this.apiUrl}/get`);
  }

  createPelicula(pelicula: Pelicula): Observable<Pelicula> {
    return this.http.post<Pelicula>(`${this.apiUrl}/create`, pelicula);
  }

  updatePelicula(id: number, pelicula: Pelicula) {
    return this.http.put<Pelicula>(`${this.apiUrl}/update/${id}`, pelicula);
  }

  deletePelicula(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}