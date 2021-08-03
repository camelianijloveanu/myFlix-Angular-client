import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://cnjlv.herokuapp.com/';


@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  /**
   * 
   * @param http 
   */
  constructor(private http: HttpClient) {
  }

/**
 * API call to users endpoint to register new user
 * @param userDetails 
 * @returns 
 */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
    catchError(this.handleError)
    );
  }

/**
 * API call to login endpoint to login as existing user
 * @param userDetails 
 * @returns 
 */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

/**
 * API call to get a list of all movies
 * @returns list of all movies
 */

  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(catchError(this.handleError));
  }


/**
 * API call to get info about one movie by title
 * @returns info about one movie
 */

  public getOneMovie(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/:Title', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(catchError(this.handleError));
  }

/**
 * API call to get info about director by name
 * @returns info about director by name
 */

  public getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/directors/:Name', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(catchError(this.handleError));
  }


/**
 * API call to get info about genre by name
 * @returns info about genre by name
 */

  public getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/genres/:Genre', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(catchError(this.handleError));
  }


/**
 * API call to get info about a user by name
 * @param user 
 * @returns info about user by name
 */

  public   getUser(user: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + `users/${user}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

// 8. Get favourite movies for a user N/A


/**
 * API call to add a movie to favorite's list by ID
 * @param MovieID 
 * @returns updated list of favorites
 */

  public addToFav(MovieID: string): Observable<any> {
      const token = localStorage.getItem('token');
      const Username = localStorage.getItem('Username');
      return this.http.post(apiUrl + `users/${Username}/Movies/${MovieID}`, MovieID, {
        headers: new HttpHeaders(
          {
            Authorization: 'Bearer ' + token,
          })
      }).pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    }



    
/**
 * API call to update user's personal detials
 * @param userDetails 
 * @returns updated info 
 */

  public editUser(userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return this.http
      .put(apiUrl + `users/${user}`, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe(catchError(this.handleError));
  }

/**
 * API call to access a user's profile and permanently delete it
 * @returns 
 */


 public deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http.delete(apiUrl + `users/${Username}`, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })

    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
 

 /**
  * API call to remove a movie from a user's list
  * @param id 
  * @returns updated list of favorite movies
  */

  public deleteFromFav(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('Username');
    return this.http
      .delete(`${apiUrl}users/${Username}/favorites/${id}`, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || {};
  }

/**
 * handles errors for all calls
 * @param error 
 * @returns 
 */
private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
}

