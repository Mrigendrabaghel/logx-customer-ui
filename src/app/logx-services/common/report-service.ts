import { Injectable } from '@angular/core';
//import { LanguagePreference } from 'src/app/shared/models/user-preference.model';
import { Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { APIendpoints } from 'src/app/configs/APIEndpoints';
import { ReportModel } from "src/app/shared/models/reportmodel";

@Injectable({
  providedIn: 'root'
})
export class reportService {

  constructor(private http: HttpClient) { }
  
  public getReport(ReportModel: ReportModel):Observable<any> {
    let apiUrl = environment.apiEndpoint + APIendpoints.getReport
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(apiUrl,ReportModel,{headers:headers}).pipe(
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
