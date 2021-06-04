import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError,tap } from 'rxjs/operators';
import { OrderModel, OrderHeaderModel, OrderLinesModel, OrderCommentsModel, StatusUpdateLines, OrderAttachmentModel, OrderMilestoneModel, OrderTransitMap } from 'src/app/shared/models/order/order';

@Injectable({
  providedIn: 'root'
})
export class TrackOrderService {


  constructor(private http: HttpClient) { }

  public GetUnsecuredshipmentDetails(searchCriteria:string):Observable<OrderModel[]> { 
    let apiUrl:string=environment.apiEndpoint+`/shipment/hometracking?searchCriteria=${searchCriteria}`;
      return this.http.get<OrderModel[]>(apiUrl,{headers:{skip:"true"}}).pipe(tap(data =>data),
          catchError(this.handleError)
      );
  }

  public GetUnsecuredOrder(orderNumber:string):Observable<OrderModel> { 
    let apiUrl:string=environment.apiEndpoint+`/shipment/hometrackingdetails?orderNumber=${orderNumber}`;
      return this.http.get<OrderModel>(apiUrl,{headers:{skip:"true"}}).pipe(tap(data =>data),
          catchError(this.handleError)
      );
  }

  public GetUnsecuredMileStoneStatus(orderNumber:string):Observable<OrderMilestoneModel[]> { 
    let apiUrl:string=environment.apiEndpoint+`/order/homeordermilestonestatus?orderNumber=${orderNumber}`;
      return this.http.get<OrderMilestoneModel[]>(apiUrl,{headers:{skip:"true"}}).pipe(tap(data =>data),
          catchError(this.handleError)
      );
  }

  public GetshipmentDetails(searchCriteria:string):Observable<OrderModel[]> { 
    let apiUrl:string=environment.apiEndpoint+`/shipment/tracking?searchCriteria=${searchCriteria}`;
      return this.http.get<OrderModel[]>(apiUrl).pipe(tap(data =>data),
          catchError(this.handleError)
      );
  }

  public GetOrder(orderNumber:string):Observable<OrderModel> { 
    let apiUrl:string=environment.apiEndpoint+`/shipment/trackingdetails?orderNumber=${orderNumber}`;
      return this.http.get<OrderModel>(apiUrl).pipe(tap(data =>data),
          catchError(this.handleError)
      );
  }

  public getOrderHeaderDetails(orderNumber:string): Observable<OrderHeaderModel> {
    let apiUrl:string=environment.apiEndpoint+`/order/vieworderheaderdetailsdashboard?orderNumber=${orderNumber}`;
        return this.http.get<OrderHeaderModel>(apiUrl).pipe((res=>res),
        catchError(this.handleError));
  }
  public getOrderLineItems(orderNumber:string): Observable<OrderLinesModel[]> {
    let apiUrl:string=environment.apiEndpoint+`/order/vieworderlineitemsdashboard?orderNumber=${orderNumber}`;
        return this.http.get<OrderLinesModel[]>(apiUrl).pipe((res=>res),
        catchError(this.handleError));
  }

  public getOrderComments(orderNumber:string): Observable<OrderCommentsModel[]> {
    let apiUrl:string=environment.apiEndpoint+`/order/viewordercommentsdashboard?orderNumber=${orderNumber}`;
        return this.http.get<OrderCommentsModel[]>(apiUrl).pipe((res=>res),
        catchError(this.handleError));
  }

  public getStatusUpdateRoutingLineItems(orderNumber:string): Observable<StatusUpdateLines[]> {
    let apiUrl:string=environment.apiEndpoint+`/order/vieworderroutingdetailsdashboard?orderNumber=${orderNumber}`;
        return this.http.get<StatusUpdateLines[]>(apiUrl).pipe((res=>res),
        catchError(this.handleError));
  }

  public getOrderAttachment(orderNumber:string): Observable<OrderAttachmentModel[]> {
    let apiUrl:string=environment.apiEndpoint+`/order/vieworderattachmentdashboard?orderNumber=${orderNumber}`;
        return this.http.get<OrderAttachmentModel[]>(apiUrl).pipe((res=>res),
        catchError(this.handleError));
  }

  public GetOrderMileStoneStatus(orderNumber:string):Observable<OrderMilestoneModel[]> { 
    let apiUrl:string=environment.apiEndpoint+`/order/viewordermilestonestatus?orderNumber=${orderNumber}`;
      return this.http.get<OrderMilestoneModel[]>(apiUrl).pipe(tap(data =>data),
          catchError(this.handleError)
      );
  }

  public getOrderTransitMapItems(orderNumber:string): Observable<OrderTransitMap> {
    let apiUrl:string=environment.apiEndpoint+`/order/OrderTransitMap?orderNumber=${orderNumber}`;
        return this.http.get<OrderTransitMap>(apiUrl).pipe((res=>res),
        catchError(this.handleError));
  }

  public bulkTrackCriteria(searchCriteria) { 
    let apiUrl = environment.apiEndpoint + "/shipment/bulktrackingdetails";
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(apiUrl,searchCriteria,{headers:headers}).pipe(
        catchError(this.handleError)
    );
  } 
  
  public GetIncidentReportData(orderNumber:string): Observable<any> {
    let apiUrl:string=environment.apiEndpoint+`/incident/GetCombinedIncidentsforOrder/${orderNumber}`;
        return this.http.get<any>(apiUrl).pipe((res=>res),
        catchError(this.handleError));
  }


  public GetServiceExceptiondata(orderNumber:string): Observable<any> {
    let apiUrl:string=environment.apiEndpoint+`/order/serviceexceptiondetails/${orderNumber}`;
        return this.http.get<any>(apiUrl).pipe((res=>res),
        catchError(this.handleError));
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
