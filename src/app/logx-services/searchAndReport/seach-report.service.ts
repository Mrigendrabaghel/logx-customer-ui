import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { AccessorialCodeDetails, OrderModel } from 'src/app/shared/models/order/order';
import { Annouuncement } from 'src/app/shared/models/announcement/announcement-model';
import { OrderLookupDetailModel } from 'src/app/shared/models/order/advance-search';
import { PaginationCriteria } from 'src/app/shared/models/accessorials/accessorials.model';

@Injectable({
  providedIn: 'root'
})
export class SeachReportService {
  
  constructor(private http: HttpClient) { }

  public GetOrderList(searchCriteria:string):Observable<OrderModel[]> { 
    let apiUrl:string=environment.apiEndpoint+`/order/viewreportingdashboard?searchCriteria=${searchCriteria}`;
      return this.http.get<OrderModel[]>(apiUrl).pipe(tap(data =>data),
          catchError(this.handleError)
      );
  }

  public GetCustomizeOrderList(searchCriteria:PaginationCriteria):Observable<any> { 
    let apiUrl:string=environment.apiEndpoint+`/order/viewreportingdashboard`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(apiUrl,searchCriteria,{headers:headers}).pipe(
        catchError(this.handleError)
    );
  }

  public GetSearchOrder(orderNumber:string):Observable<OrderModel> { 
    let apiUrl:string=environment.apiEndpoint+`/order/order?orderNumber=${orderNumber}`;
      return this.http.get<OrderModel>(apiUrl).pipe(tap(data =>data),
          catchError(this.handleError)
      );
  }

  public GetAnnouncement(userGroupId):Observable<Annouuncement[]> { 
    let apiUrl:string=environment.apiEndpoint+`/announcement/announcementdetails?userGroupId=${userGroupId}`;
      return this.http.get<Annouuncement[]>(apiUrl).pipe(tap(data => data),
          catchError(this.handleError)
      );
  }

  public GetSearchResult(AdvanceSearchRequestObject:OrderLookupDetailModel):Observable<any> { 
    let apiUrl:string=environment.apiEndpoint+`/advancesearch/lookupdetails`;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(apiUrl,AdvanceSearchRequestObject,{headers:headers}).pipe(
        catchError(this.handleError)
    );
  }

  public GetOrderAccessorialDetails(orderNumber):Observable<AccessorialCodeDetails[]> { 
    let apiUrl:string=environment.apiEndpoint+`/order/orderaccessorialdetails?OrderNumber=${orderNumber}`;
      return this.http.get<AccessorialCodeDetails[]>(apiUrl).pipe(tap(data => data),
          catchError(this.handleError)
      );
  }
  
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        console.error('An error occurred:', error.error.message);
    } else {
        console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
}

}
