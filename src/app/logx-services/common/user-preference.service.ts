import { Injectable } from '@angular/core';
//import { LanguagePreference } from 'src/app/shared/models/user-preference.model';
import { Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { APIendpoints } from 'src/app/configs/APIEndpoints';
@Injectable({
  providedIn: 'root'
})
export class UserPreferenceService {

  constructor(private http: HttpClient) { }
  
  public GetUserPreference(PreferenceType:string):Observable<any> { 
    let apiUrl:string=environment.apiEndpoint+APIendpoints.getUserPreference+`${PreferenceType}`;
      return this.http.get<any>(apiUrl).pipe(tap(data =>data),
          catchError(this.handleError)
      );
  }

  public GetMenuLists(​​​​​​​​userName:string):Observable<any> { 
    let apiUrl:string=environment.apiEndpoint+`/preference/GetMenuLists/${userName}`;    
    //let apiUrl:string=environment.apiEndpoint+APIendpoints.getMenuLists+`${​​​​​​​​userName}​​​​​​​​`;
      return this.http.get<any>(apiUrl).pipe(tap(data =>data),
          catchError(this.handleError)
      );
  }

  public GetPreference(PreferenceType:string):Observable<any> { 
    let apiUrl:string=environment.apiEndpoint+APIendpoints.getPreference+`${PreferenceType}`;
      return this.http.get<any>(apiUrl).pipe(tap(data =>data),
          catchError(this.handleError)
      );
  }

  public SavePreference(UserPreference) {
    if (UserPreference) {
        let apiUrl = environment.apiEndpoint + APIendpoints.savePreferences;        
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(apiUrl,UserPreference, { headers: headers }).pipe(
            catchError(this.handleError)
        );
    }
  }
  public SaveUserPreferenceLocation(SaveUserPreferenceLocation) {
    if (SaveUserPreferenceLocation) {
        let apiUrl = environment.apiEndpoint + APIendpoints.SaveUserPreferenceLocation;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(apiUrl,SaveUserPreferenceLocation, { headers: headers }).pipe(
            catchError(this.handleError)
        );
    }
  }



  public DeleteLocationPreference(UserLocId){
    if(UserLocId){
      let apiUrl = environment.apiEndpoint +APIendpoints.deleteLocation+`${UserLocId}`;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.delete<any>(apiUrl, { headers: headers }).pipe(
          catchError(this.handleError)
      );
  }
  

  
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
