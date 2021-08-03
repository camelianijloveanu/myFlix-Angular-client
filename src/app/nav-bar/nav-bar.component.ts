import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})


export class NavBarComponent implements OnInit {
  /**
   * display of messages and allows routing between components
   * @param snackBar 
   * @param router 
   */

  constructor(public snackBar: MatSnackBar, public router: Router) { }

  ngOnInit(): void {
  }
/**
 * logs user out and returns to welcome page
 */
  logOutUser(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
    this.snackBar.open('You have logged out succesfully', 'OK', {
      duration: 4000,
    });
  }

}