// src/app/user-registration-form/user-registration-form.component.ts
import { Component, OnInit, Input } from '@angular/core';

// You'll use this import to close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// This import brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() loginData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  loginUser(): void{
    this.fetchApiData.userLogin(this.loginData).subscribe((result) => {

      this.dialogRef.close() // This will close the modal on success
      localStorage.setItem("userName" ,result.userObj.userName) // Saving to local storage
      localStorage.setItem("password" ,result.userObj.password)
      localStorage.setItem("token" ,result.token)
      this.snackBar.open(result, "OK", {
        duration: 2000,
      });
    }, (result) => {
      this.snackBar.open(result, "OK", {
        duration: 2000,
      });
    });
  };
};