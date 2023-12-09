import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../models/movie';
import { environment } from 'src/environments/environment';
import { Favorite } from '../models/favorite';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  apiUrl = environment.apiURL;
  // favorite: Favorite[] = [];
  constructor(private http: HttpClient) {}

  getMovies() {
    return this.http.get<Movie[]>(`${this.apiUrl}/movies-popular`);
  }

  getFavorite(userId: number) {
    return this.http.get<Favorite[]>(
      `${this.apiUrl}/favorites?userId=${userId}`
    );
  }

  addFavorite(favorite: Favorite) {
    return this.http.post<Favorite>(`${this.apiUrl}/favorites`, favorite);
  }

  removeFavorite(idFavorite: number) {
    return this.http.delete<Favorite>(`${this.apiUrl}/favorites/${idFavorite}`);
  }
}
