import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { LoginModel } from 'src/app/shared/models/auth/loginModel';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  public validateLoginUser(loginmodel: LoginModel)
  {
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.get<any>("./assets/data.json")
          .pipe(tap(data =>
          {
              //console.log(data);

              if (data.userData[0].Token != null)
              {
                  if (data.userData[0].Usertype == "2") {
                      // store username and jwt token in local storage to keep user logged in between page refreshes
                      localStorage.setItem('normalUser', JSON.stringify({ username: loginmodel.Username, token: data.userData[0].Token }));
                  }
                  else if (data.userData[0].Usertype == "1") {
                      // store username and jwt token in local storage to keep user logged in between page refreshes
                      localStorage.setItem('AdminUser', JSON.stringify({ username: loginmodel.Username, token: data.userData[0].Token }));
                  }
                  // return true to indicate successful login
                  return data;
              } else {
                  // return false to indicate failed login
                  return null;
              }
          }),
              catchError(this.handleError)
          );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
};
}
