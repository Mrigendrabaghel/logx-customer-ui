import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { AccessDocumentModel} from '../../shared/models/document/access-document-model'

@Injectable({
  providedIn: 'root'
})
export class AccessDocumentService {

  constructor(private http: HttpClient) { }

  public GetAccessDocument(searchCriteria:string):any { 
    let apiUrl:string=environment.apiEndpoint+`/document/documents?searchCriteria=${searchCriteria}`;
      return this.http.get<AccessDocumentModel[]>(apiUrl).pipe(tap(data =>data),           
      catchError(this.handleError)
       ); 
   }

   public OpenFile(documentId:number,documentType:string): any {
    let apiUrl:string=environment.apiEndpoint+`/document/${documentId}/${documentType}`;
    return this.http.get(apiUrl, { responseType: 'blob' });      
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
