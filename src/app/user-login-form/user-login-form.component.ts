import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {
  isLoading = false;
  @Input() loginData ={ Username: '', Password: ''};
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) { }
  ngOnInit(): void { 

  }
  
  
  loginUser(): void {
    this.isLoading = true;

    this.fetchApiData.userLogin(this.loginData).subscribe((result) => {

    console.log(result)
      this.isLoading = true;
      this.dialogRef.close();
      localStorage.setItem("Username" ,result.userObj.Username);
      localStorage.setItem("Password" ,result.userObj.Password);
      localStorage.setItem("FavoriteMovies" ,result.userObj.FavoriteMovies);
      localStorage.setItem("token" ,result.token);

    console.log(localStorage.getItem("Username"))
      this.snackBar.open("Login successful!", "OK", {
        duration: 2000,
      });
      this.router.navigate(['movies']);
    }, (result) => {
      this.isLoading = true;
      console.log(Response);
      this.snackBar.open(result, "OK", {
        duration: 2000,
      });
    });
  }
}