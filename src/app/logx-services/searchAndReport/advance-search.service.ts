import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError,tap } from 'rxjs/operators';
import { APIendpoints } from 'src/app/configs/APIEndpoints';

@Injectable({
  providedIn: 'root'
})
export class AdvanceSearchService {
  APIendpoints = APIendpoints;
  constructor(private http: HttpClient) { }

  public GetDateQuilifier(lookupType:string):Observable<any> { 
    let apiUrl:string=environment.apiEndpoint+`/advancesearch/lookupdetails?lookupType=${lookupType}`;
      return this.http.get<any>(apiUrl).pipe(tap(data =>data),
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
  
  public getOrderAdvanceSearchGridValue(order) { 
    let apiUrl = environment.apiEndpoint + "/advancesearch/order";
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(apiUrl,order,{headers:headers}).pipe(
        catchError(this.handleError)
    );
  } 

  public getDocumentAdvanceSearchGridValue(docs) { 
    let apiUrl = environment.apiEndpoint + "/advancesearch/document";
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(apiUrl,docs,{headers:headers}).pipe(
        catchError(this.handleError)
    );
  } 
}
