import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { PaginationCriteria } from "src/app/shared/models/accessorials/accessorials.model";
import { APIendpoints } from "src/app/configs/APIEndpoints";
import { DraftOrders, orderstepperdetails, SaveOrderAdditionalInfo, SaveOrderDestination, SaveOrderDetails, SaveOrderLineItems, SaveOriginInformation } from "src/app/shared/models/submitOrder/submitOrder.model";

@Injectable({
    providedIn: 'root'
})
export class SubmitOrderService {

    constructor(private http: HttpClient) { }

    public GetDraftOrderCount(searchCriteria: PaginationCriteria): Observable<DraftOrders[]> {
        let apiUrl: string = environment.apiEndpoint + APIendpoints.draftoderdetails;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<DraftOrders[]>(apiUrl, searchCriteria, { headers: headers }).pipe(
            catchError(this.handleError)
        );
    }

    public GetSubmitOrderDropDownValues(lookupType: string, userId): Observable<any> {
        let apiUrl: string = environment.apiEndpoint + `/submitorder/orderlookupdata?FieldName=${lookupType}&UserId=${userId}`;
        return this.http.get<any>(apiUrl).pipe(tap(data => data),
            catchError(this.handleError)
        );
    }

    public SaveOrderLineItems(orderLineItems: SaveOrderLineItems): Observable<any> {
        let apiUrl: string = environment.apiEndpoint + APIendpoints.saveorderlineitem;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(apiUrl, orderLineItems, { headers: headers }).pipe(
            catchError(this.handleError)
        );
    }

    public SaveOrderDetails(orderLineItems: SaveOrderDetails): Observable<any> {
        let apiUrl: string = environment.apiEndpoint + APIendpoints.saveorderdetails;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(apiUrl, orderLineItems, { headers: headers }).pipe(
            catchError(this.handleError)
        );
    }

    public GetLocationContactDetails(locationId: number): Observable<any> {
        if (locationId) {
            let apiUrl: string = environment.apiEndpoint + `/submitorder/locationcontact?LocId=${locationId}`;
            return this.http.get<any>(apiUrl).pipe(tap(data => data),
                catchError(this.handleError)
            );
        }
    }

    public SaveOriginDetails(orderLineItems: SaveOriginInformation): Observable<any> {
        let apiUrl: string = environment.apiEndpoint + APIendpoints.saveorderorigin;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(apiUrl, orderLineItems, { headers: headers }).pipe(
            catchError(this.handleError)
        );
    }

    public OrderDetailsData(orderId: number){
        let apiUrl: string = environment.apiEndpoint + APIendpoints.getorderdetailsdata+`${orderId}`;
        return this.http.get<any>(apiUrl).pipe((res => res),
            catchError(this.handleError)
        );
    }

    public SaveDestinationDetails(orderLineItems: SaveOrderDestination): Observable<any> {
        let apiUrl: string = environment.apiEndpoint + APIendpoints.saveorderdestination;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(apiUrl, orderLineItems, { headers: headers }).pipe(
            catchError(this.handleError)
        );
    }

    public deleteOrder(orderId: string): Observable<any> {
        let apiUrl: string = environment.apiEndpoint + "/submitorder/deleteorder?orderId=" + orderId;

        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.delete<any>(apiUrl, { headers: headers }).pipe(
            catchError(this.handleError)
        );
    }

    public validateOrderNumber(orderNumber: string): Observable<string> {
        if (orderNumber) {
            let apiUrl: string = environment.apiEndpoint + `/submitorder/validateordernumber?OrderNumber=${orderNumber}`;
            return this.http.get(apiUrl, { responseType: 'text' }).pipe(tap(data => data),
                catchError(this.handleError)
            );
        }
    }

    public GetOriginLocationDetails(orderId: Number): Observable<any> {
        if (orderId) {
            let apiUrl: string = environment.apiEndpoint + `/submitorder/orderorigindetails?orderId=${orderId}`;
            return this.http.get<any>(apiUrl).pipe(tap(data => data),
                catchError(this.handleError)
            );
        }
    }

    public GetDestinationLocationDetails(orderId: Number): Observable<any> {
        if (orderId) {
            let apiUrl: string = environment.apiEndpoint + `/submitorder/getdestinationlocationdetails?OrderId=${orderId}`;
            return this.http.get<any>(apiUrl).pipe(tap(data => data),
                catchError(this.handleError)
            );
        }
    }

    public GetAutoGeneratedNumber(entity: string): Observable<any> {
        if (entity) {
            let apiUrl: string = environment.apiEndpoint + `/preference/AutoGeneratedNumbers?entity=${entity}`;
            return this.http.get<any>(apiUrl).pipe(tap(data => data),
                catchError(this.handleError)
            );
        }
    }

    public SaveOrderAdditionalInfo(orderAddInfo: SaveOrderAdditionalInfo): Observable<any> {
        let apiUrl: string = environment.apiEndpoint + APIendpoints.saveorderadditionalifo;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(apiUrl, orderAddInfo, { headers: headers }).pipe(
            catchError(this.handleError)
        );
    }

    public stepperNavigation(orderId: number): Observable<orderstepperdetails> {
        let apiUrl: string = environment.apiEndpoint + APIendpoints.orderstepper+`${orderId}`;
        return this.http.get<orderstepperdetails>(apiUrl).pipe((res => res),
            catchError(this.handleError)
        );
    }

    public OrderLineItemsData(orderId: number){
        let apiUrl: string = environment.apiEndpoint + APIendpoints.getorderlineitems+`${orderId}`;
        return this.http.get<any>(apiUrl).pipe((res => res),
            catchError(this.handleError)
        );
    }

    public DeleteLineItemsData(OrderLineID: number){
        let apiUrl: string = environment.apiEndpoint + APIendpoints.deleteorderlineitems+`${OrderLineID}`;
        return this.http.delete<any>(apiUrl).pipe((res => res),
            catchError(this.handleError)
        );
    }

    public DeleteRefNumData(Id: number){
        let apiUrl: string = environment.apiEndpoint + APIendpoints.deleterefnum+`${Id}`;
        return this.http.delete<any>(apiUrl).pipe((res => res),
            catchError(this.handleError)
        );
    }

    public OpenFile(documentId:number): any {
        let apiUrl:string= environment.apiEndpoint + APIendpoints.opendocument+`${documentId}`;
        return this.http.get(apiUrl, { responseType: 'blob' });      
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