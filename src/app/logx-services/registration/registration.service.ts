import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { RegistrationDropdownModal, RegistrationSaveModal, ValidateUserModel } from 'src/app/shared/models/auth/loginModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  getRegistrationData(param: string) {
    const apiUrl: string = environment.apiEndpoint + `/advancesearch/lookupdetails?lookupType=${param}`;
    return this.http.get<RegistrationDropdownModal[]>(apiUrl).pipe(tap(data => data),
      catchError(this.handleError)
    );
  }

  async getUserInfo(userName: string) {
    const apiUrl: string = environment.apiEndpoint + `/preference/GetUserAccess/${userName}`;
    let response = await this.http.get<any>(apiUrl).toPromise();
    return response;
  }

  saveReg(saveData: RegistrationSaveModal) {
    const apiUrl = environment.apiEndpoint + `/preference/SaveUserDetails`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(apiUrl, saveData, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  validateUser(validateUser: ValidateUserModel) {
    const apiUrl = environment.apiEndpoint + `/preference/validateuserinfo`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(apiUrl, validateUser, { headers, responseType: 'text' as 'json' }).pipe(
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
  }
}
