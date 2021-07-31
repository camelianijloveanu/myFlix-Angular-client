import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { UserProfileUpdateComponent } from '../user-profile-update/user-profile-update.component'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  favMovies: any = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser(): void {
    const user = localStorage.getItem('user');
    this.fetchApiData.getUser(user).subscribe((res: any) => {
      this.user = res;
      this.getMovies();
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((res: any) => {
      this.movies = res;
      this.filterFavorites();
    });
  }


  filterFavorites(): void {
    this.favMovies = this.movies.filter((movie: any) =>
      this.user.FavouriteMovies.includes(movie._id)
    );
    return this.favMovies;
  }


  removeFavorites(id: string, title: string): void {
    this.fetchApiData.deleteFromFav(id).subscribe((resp) => {
      let favMovies = resp.FavoriteMovies;
      localStorage.setItem('FavoriteMovies', favMovies);
      this.snackBar.open(`${title} has been removed from your favorites!`, 'OK', {
        duration: 2000
      });
      setTimeout(function () {
        window.location.reload();
      }, 2000);
    });
  }

  editUser(): void {
    this.dialog.open(UserProfileUpdateComponent, {
      width: '350px'
    });
  }

  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe(
      (resp: any) => {
        this.snackBar.open(
          'Your account has been deleted!',
          'Ok',
          { 
            duration: 2000,
          }
        );
        localStorage.clear();
      },
      (result) => {
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
        this.router.navigate(['/welcome']).then(() => {
          window.location.reload();
        });
      }
    );
  }

}


