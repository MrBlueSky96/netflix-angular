import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {

  private apiUrl = 'http://localhost:8080/api/favorites';

  private favoritesSubject = new BehaviorSubject<number[]>([]);
  favorites$ = this.favoritesSubject.asObservable();

  constructor(private http: HttpClient) {}

  addFavorite(movieId: number) {
    return this.http.post(`${this.apiUrl}/${movieId}`, {});
  }

  loadFavorites() {
    this.http.get<number[]>(this.apiUrl)
      .subscribe(data => this.favoritesSubject.next(data));
  }

  setFavorites(favs: number[]) {
    this.favoritesSubject.next(favs);
  }

  removeFavorite(movieId: number) {
    return this.http.delete(`${this.apiUrl}/${movieId}`);
  }
  
}
