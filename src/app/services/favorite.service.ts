import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {

  private apiUrl = 'http://localhost:8080/api/favorites';

  constructor(private http: HttpClient) {}

  addFavorite(movieId: number) {
    return this.http.post(`${this.apiUrl}/${movieId}`, {});
  }

  getFavorites() {
    return this.http.get<number[]>(this.apiUrl);
  }
  
}
