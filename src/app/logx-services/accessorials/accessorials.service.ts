import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import {Accessorials ,accessorialGrid,accessorialAttachment, PaginationCriteria} from '../../shared/models/accessorials/accessorials.model';
import {APIendpoints} from 'src/app/configs/APIEndpoints'
import {CommonConst} from 'src/app/configs/constants'


@Injectable({
  providedIn: 'root'
})
export class AccessorialsService {

  constructor(private http: HttpClient) { }

 
  public AddAccessorialAdditionalInfo(additionalInfoRequest:any) { 
    let apiUrl = environment.apiEndpoint + APIendpoints.addAccessorialComments;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(apiUrl,additionalInfoRequest,{headers:headers}).pipe(
        catchError(this.handleError)
    );
  } 

  public GetAccessorials(paginationCreteria:PaginationCriteria):any { 
    let apiUrl:string=environment.apiEndpoint+APIendpoints.getAccessoeials;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(apiUrl,paginationCreteria,{headers:headers}).pipe(
        catchError(this.handleError)
    );

   }


   public GetAccessorialGridColumns(gridCol: any):any { 
    let apiUrl:string=environment.apiEndpoint+APIendpoints.getAccessorialsGridColumns+`${gridCol}`;
      return this.http.get<accessorialGrid[]>(apiUrl).pipe(tap(data =>data),           
      catchError(this.handleError)
       ); 
   }

   public getOrderAttachments(orderNumber:string): Observable<accessorialAttachment[]> {
    let apiUrl:string=environment.apiEndpoint+ APIendpoints.accessorialAttachments +`${orderNumber}`;
    return this.http.get<accessorialAttachment[]>(apiUrl).pipe((res=>res),
        catchError(this.handleError));
  }
    
 
  public OpenFile(serviceExpDocId:number): any {
    let apiUrl:string=environment.apiEndpoint+ APIendpoints.accessorialOpenFile +`${serviceExpDocId}`;
    return this.http.get(apiUrl, { responseType: 'blob' });      
  }

  public approveRejectAccssorial(approvalRequest: any) {
    if (approvalRequest) {
        let apiUrl = environment.apiEndpoint + "/accessorial/accessorialapporvereject";
        return this.http.put<any>(apiUrl, approvalRequest).pipe(
            catchError(this.handleError)
        );
    }
  }

  public GetAccessorialDetails(serviceExceptionId: string): any {
    if(serviceExceptionId){
      let apiUrl: string = environment.apiEndpoint + APIendpoints.accessorialDetails + `${serviceExceptionId}`;      
      return this.http.get<any>(apiUrl).pipe(tap(data=>data),
      catchError(this.handleError))     
    }
    
  }

  public GetAccessorialComments(serviceExceptionId:string):any{
    if(serviceExceptionId){
      let apiUrl:string=environment.apiEndpoint + APIendpoints.accessorialComments + `${serviceExceptionId}`;
      return this.http.get<any>(apiUrl).pipe(tap(data=>data),
      catchError(this.handleError))      
    }
    
  }

   private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error(CommonConst.ErrorOccurred, error.error.message);
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(CommonConst.SomethingWrong);
}
}
