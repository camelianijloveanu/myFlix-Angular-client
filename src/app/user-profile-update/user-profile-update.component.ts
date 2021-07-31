  
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile-update',
  templateUrl: './user-profile-update.component.html',
  styleUrls: ['./user-profile-update.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserProfileUpdateComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchUserData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserProfileUpdateComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }
  editUser(): void {
    this.fetchUserData.editUser(this.userData).subscribe(
      (resp) => {
        this.dialogRef.close();
        localStorage.setItem('Username', resp.Username);
        localStorage.setItem('Password', resp.Password);
        localStorage.setItem('Email', resp.Email);
        localStorage.setItem('Birthday', resp.Birthday);
        this.snackBar.open('Profile updated successfully!', 'OK', {
          duration: 2000,
        });
      },
      (res) => {
        console.log(res);
        this.snackBar.open(res, 'OK', {
          duration: 2000,
        });
      }
    );
    setTimeout(function () {
      window.location.reload();
    }, 1000);
  }
}