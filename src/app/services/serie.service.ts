import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Serie } from '../models/serie';

@Injectable({
  providedIn: 'root'
})
export class SerieService {
  private apiUrl = 'http://localhost:8080/api/series';

  constructor(private http: HttpClient) {}

  getSeries(): Observable<Serie[]> {
    return this.http.get<Serie[]>(`${this.apiUrl}/get`);
  }

  createSerie(serie: Serie): Observable<Serie> {
    return this.http.post<Serie>(`${this.apiUrl}/create`, serie);
  }

  updateSerie(id: number, serie: Serie) {
    return this.http.put<Serie>(`${this.apiUrl}/update/${id}`, serie);
  }

  deleteSerie(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}