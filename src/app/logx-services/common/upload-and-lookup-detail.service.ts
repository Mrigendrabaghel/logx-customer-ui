import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { FileUpload,FileUploadResponse,DocTypeLookUp } from 'src/app/shared/models/order/file-upload.model';


@Injectable({
  providedIn: 'root'
})
export class UploadAndLookupDetailService {

  constructor(private http: HttpClient) { }

  public GetLookupDetails(lookupType:string):Observable<DocTypeLookUp[]> { 
    let apiUrl:string=environment.apiEndpoint+`/advancesearch/lookupdetails?lookupType=${lookupType}`;
      return this.http.get<DocTypeLookUp[]>(apiUrl).pipe(tap(data =>data),
          catchError(this.handleError)
      );
  }

  public UploadFiles(fileUpload:FileUpload):Observable<FileUploadResponse> { 
    let apiUrl:string=environment.apiEndpoint+`/upload/file`;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<FileUploadResponse>(apiUrl,fileUpload,{headers:headers}).pipe(
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
