import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { Movie } from 'src/app/models/movie';
import { Favorite } from 'src/app/models/favorite';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit {
  movies!: Movie[];
  favorite!: Favorite[];
  userId!: number;

  constructor(private movieSrv: MoviesService) {}

  ngOnInit(): void {
    this.getUser();
    this.getMovie();
    this.getFavorite();
  }

  getUser() {
    const userString: any = localStorage.getItem('user');
    const user = JSON.parse(userString).user;
    this.userId = user.id;
  }

  getMovie() {
    this.movieSrv.getMovies().subscribe((movies: Movie[]) => {
      this.movies = movies;
      // console.log(this.movies);
    });
  }

  getFavorite() {
    this.movieSrv.getFavorite(this.userId).subscribe((favorite: Favorite[]) => {
      this.favorite = favorite;
      // console.log(this.favorite);
    });
  }

  favoriteAction(movieId: number) {
    let bool = this.isFavorite(movieId);

    if (bool) {
      const favoriteObjId: any = this.favorite.filter(
        (movie) => movie.movieId === movieId
      );
      this.removeFavorite(favoriteObjId[0].id);
    } else {
      this.addFavorite(movieId);
    }
  }

  isFavorite(movieId: number) {
    return (
      Array.isArray(this.favorite) &&
      this.favorite.some((movie: Favorite) => movie.movieId === movieId)
    );
  }

  addFavorite(movieId: number) {
    const favorite: Favorite = {
      movieId: movieId,
      userId: this.userId,
    };

    this.movieSrv.addFavorite(favorite).subscribe(() => {
      console.log('Film aggiunto ai preferiti:');
      this.getFavorite();
    });
  }

  removeFavorite(idFavorite: number) {
    this.movieSrv.removeFavorite(idFavorite).subscribe(() => {
      console.log('Film rimosso dai preferiti');
      this.getFavorite();
    });
  }
}
