import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DetailsDialogComponent } from '../details-dialog/details-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { identifierModuleUrl } from '@angular/compiler';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  /**
   * 
   * @param fetchApiData fetch data from API.
   * @param dialog dialog components with details.
   * @param snackBar to display messages to user.
   */
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }
/**
 * get all movies
 */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }
/**
 * opens dialog with genre's description
 * @param name 
 * @param description 
 */
   showGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreDialogComponent, {
      data: { name, description },
    });
  }

  /**
   * opens dialog with info about director
   * @param name 
   * @param bio 
   * @param birth 
   * @param death 
   */
  showDirectorDialog(
    name: string,
    bio: string,
    birth: string,
    death: string
  ): void {
    this.dialog.open(DirectorDialogComponent, {
      data: { name, bio, birth, death },
    });
  }
/**
 * opens dialog with info about the movie
 * @param title 
 * @param imagePath 
 * @param description 
 * @param director 
 * @param genre 
 */
   showDetailsDialog(
    title: string,
    imagePath: string,
    description: string,
    director: string,
    genre: string
  ): void {
    this.dialog.open(DetailsDialogComponent, {
      data: { title, imagePath, description, director, genre }
    });
  }
/**
 * adds movie to user's list of favorites
 * @param id 
 * @param title 
 */
  addFavorite(id: string, title: string): void {
    this.fetchApiData.addToFav(id).subscribe((resp: any) => {
      console.log(resp);
      let favMovies = resp.FavoriteMovies;
      localStorage.setItem('FavoriteMovies', favMovies);
      this.snackBar.open(`${title} has been added to your favorite movies list`, 'OK', {
        duration: 2000,
      });
    });
  }
}