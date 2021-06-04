import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { APIendpoints } from 'src/app/configs/APIEndpoints';
@Injectable({
  providedIn: 'root'
})
export class AdditionalInfoService {

  constructor(private http: HttpClient) { }
  
  public GetAdditionalInfo(OrderId:number):Observable<any> { 
    let apiUrl:string=environment.apiEndpoint+APIendpoints.getaddinfo+`?orderid=${OrderId}`;
      return this.http.get<any>(apiUrl).pipe(tap(data =>data),
          catchError(this.handleError)
      );
  }
  
  public SaveAdditionalInfo(data):Observable<any> { 
    let apiUrl:string=environment.apiEndpoint+APIendpoints.saveaddinfo
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<any>(apiUrl, data, {headers}).pipe(tap(data =>data),
          catchError(this.handleError)
      );
  }

  public DeleteComments(CommentId:number):Observable<any> { 
    let apiUrl:string=environment.apiEndpoint+APIendpoints.deleteComments+`${CommentId}`;
      return this.http.delete<any>(apiUrl).pipe(tap(data =>data),
          catchError(this.handleError)
      );
  }

  public DeleteAttachments(docId:number):Observable<any> { 
    let apiUrl:string=environment.apiEndpoint+APIendpoints.deleteAttachments+`${docId}`;
      return this.http.delete<any>(apiUrl).pipe(tap(data =>data),
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
