import { Component, OnInit } from '@angular/core';
import { Favorite } from 'src/app/models/favorite';
import { Movie } from 'src/app/models/movie';
import { User } from 'src/app/models/user';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  favoriteMovie: Favorite[] = [];
  filteredMovie: Movie[] = [];
  movie: Movie[] = [];
  userInfo!: User;
  constructor(private movieSrv: MoviesService) {}

  ngOnInit(): void {
    this.getUserInfo();
    this.getFavoriteMovies();
  }

  getUserInfo() {
    const userString: any = localStorage.getItem('user');
    const user = JSON.parse(userString).user;
    this.userInfo = user;
  }

  getMovie() {
    this.movieSrv.getMovies().subscribe((response) => {
      this.movie = response;
      console.log(this.movie);
      this.filteredMovie = this.movie.filter((movie) =>
        this.favoriteMovie.some((favorite) => favorite.movieId === movie.id)
      );
      console.log(this.filteredMovie);
    });
  }

  getFavoriteMovies() {
    this.movieSrv
      .getFavorite(parseInt(this.userInfo.id))
      .subscribe((response) => {
        console.log(response);
        this.favoriteMovie = response;
        this.getMovie();
      });
  }

  removeFavorite(movieIdValue: number) {
    const favoriteToRemoveObj: any = this.favoriteMovie.filter(
      (movie) => movie.movieId === movieIdValue
    );
    const favoriteToRemove: number = favoriteToRemoveObj[0].id;
    console.log(favoriteToRemoveObj, favoriteToRemove);
    this.movieSrv.removeFavorite(favoriteToRemove).subscribe(() => {
      console.log('Film rimosso dai preferiti');
      this.getFavoriteMovies();
    });
  }
}
