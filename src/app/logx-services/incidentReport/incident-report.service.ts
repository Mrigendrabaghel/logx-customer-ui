import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable }                                 from '@angular/core';
import { Observable, throwError }                     from 'rxjs';
import { environment }                                from 'src/environments/environment';
import { catchError, tap }                            from 'rxjs/operators';
import { LocationInfo }                               from 'src/app/shared/models/incident/report-incident.model';
import { APIendpoints }                               from 'src/app/configs/APIEndpoints';
import { Pagination}                                  from '../../shared/models/incident/report-incident.model';

@Injectable({
    providedIn: 'root'
})

export class IncidentReportService {
    constructor(private http: HttpClient) { }

    public GetTotalIncident(paginationCreteria:Pagination):any { 
        let apiUrl:string=environment.apiEndpoint+ `/incident/GetDraftIncidents`
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(apiUrl,paginationCreteria,{headers:headers}).pipe(
            catchError(this.handleError)
        );
    }

    public GetIncidentGridColumns(gridCol: any):any { 
        let apiUrl:string=environment.apiEndpoint+APIendpoints.getIncidentGridColumns+`${gridCol}`;
          return this.http.get<any[]>(apiUrl).pipe(tap(data =>data),           
          catchError(this.handleError)
           ); 
       }

    public GetIncidentOrderDetails(ordernumber: string): Observable<any> {
        if (ordernumber) {
            let apiUrl: string = environment.apiEndpoint + `/incident/orderdetails?orderNumber=${ordernumber}`;
            return this.http.get<any>(apiUrl).pipe(tap(data => data),
                catchError(this.handleError)
            );
        }
    }
    
    public GetIncidentLocationDetails(locationName) {
        if (locationName) {
            let apiUrl = environment.apiEndpoint + "/incident/locationdetail";
            let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
            return this.http.post<LocationInfo>(apiUrl, locationName, { headers: headers }).pipe(
                catchError(this.handleError)
            );
        }
    }
    
    public GetIncidentStateCityDetails(zipCode: string): Observable<any> {
        if (zipCode) {
            let apiUrl: string = environment.apiEndpoint + `/incident/zipcodedetails?searchCriteria=${zipCode}`;
            return this.http.get<any>(apiUrl).pipe(tap(data => data),
                catchError(this.handleError)
            );
        }
    }
    public GetIncidentPriority(lookupType: string): Observable<any> {
        if (lookupType) {
            let apiUrl:string=environment.apiEndpoint+`/advancesearch/lookupdetails?lookupType=${lookupType}`;           
            return this.http.get<any>(apiUrl).pipe(tap(data => data),
                catchError(this.handleError)
            );
        }
    }
    //submit incident
    public submitIncidentDetails(incident) {
        if (incident) {
            let apiUrl = environment.apiEndpoint + "/incident/SaveDraftIncidents";
            let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
            return this.http.post<any>(apiUrl, incident, { headers: headers }).pipe(
                catchError(this.handleError)
            );
        }
    }
    //submit carrier details
    public getCarrierDetails(carrierDetailsObj) {
        if (carrierDetailsObj) {
            let apiUrl = environment.apiEndpoint + "/incident/carrierdetails";
            let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
            return this.http.post<any>(apiUrl, carrierDetailsObj, { headers: headers }).pipe(
                catchError(this.handleError)
            );
        }
    }

    public reportIncidentAdvanceSearch(incident) { 
        let apiUrl = environment.apiEndpoint + "/advancesearch/incident";
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(apiUrl,incident,{headers:headers}).pipe(
            catchError(this.handleError)
        );
    } 

    public GetIncidentDisplayRecord(IncidentNumber: string): Observable<any> {
        if (IncidentNumber) {
            let apiUrl:string=environment.apiEndpoint+`/incident/incidentreportdetails?incidentNumber=${IncidentNumber}`;           
            return this.http.get<any>(apiUrl).pipe(tap(data => data),
                catchError(this.handleError)
            );
        }
    }

    public OpenFile(documentId:number): any {
        let apiUrl:string=environment.apiEndpoint+`/incident/${documentId}`;
        return this.http.get(apiUrl, { responseType: 'blob' });      
    }

    public GetIncidentDetails(IncidentId: number): Observable<any> {
        let apiUrl:string=environment.apiEndpoint+`/incident/DraftIncidentsDetails/${IncidentId}`;  
        return this.http.get<any>(apiUrl).pipe(tap(data => data),
                catchError(this.handleError)
            );         
    }

    public DeleteAttachments(docId:number):Observable<any> { 
        let apiUrl:string=environment.apiEndpoint+APIendpoints.deleteIncidentDoc+`${docId}`;
          return this.http.delete<any>(apiUrl).pipe(tap(data =>data),
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