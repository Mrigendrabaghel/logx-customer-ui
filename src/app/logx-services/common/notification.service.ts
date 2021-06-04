import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from "rxjs";
import { INotificationRequest, Notification, Notifications, NotificationType } from "src/app/shared/models/notification";
import { environment } from 'src/environments/environment';
import { APIendpoints } from 'src/app/configs/APIEndpoints';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private _subject = new Subject<Notification>();
  private _idx = 0;
  private _notificationCount: number = 0;
  private _notificationCountBehSub = new BehaviorSubject<number>(0);
  
  public get notificationCount() : number {
    return this._notificationCount;
  }
  
  public set notificationCount(v : number) {
    this._notificationCount = v;
    this._notificationCountBehSub.next(this._notificationCount);
  }

  constructor(private http: HttpClient) { }

  public getNotificationCount(): BehaviorSubject<number> {
    return this._notificationCountBehSub;
  }

  public getNotifications(notificationsRequest: INotificationRequest):Observable<Notifications> {
      let apiUrl = environment.apiEndpoint + APIendpoints.getUserNotifications;
      let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      return this.http.post<any>(apiUrl,notificationsRequest,{headers:headers}).pipe(
          catchError(this.handleError)
      );
  }
  public GetDaysLookUp():Observable<any> { 
    let apiUrl:string=environment.apiEndpoint+APIendpoints.daylookup;
      return this.http.get<any>(apiUrl).pipe(tap(data =>data),
          catchError(this.handleError)
      );
  }
  public updateNotification(notificationId: number, operation: string):Observable<Notifications> {
    let apiUrl = environment.apiEndpoint + APIendpoints.updateUserNotification + notificationId + "/" + operation ;
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(apiUrl,{headers:headers}).pipe(
        catchError(this.handleError)
    );
}

  getObservable(): Observable<Notification> {
    return this._subject.asObservable();
  }

  info(title: string, message: string, timeout = 3000) {
    this._subject.next(new Notification(this._idx++, NotificationType.info, title, message, timeout));
  }

  success(title: string, message: string, timeout = 3000) {
    this._subject.next(new Notification(this._idx++, NotificationType.success, title, message, timeout));
  }

  warning(title: string, message: string, timeout = 3000) {
    this._subject.next(new Notification(this._idx++, NotificationType.warning, title, message, timeout));
  }

  error(title: string, message: string, timeout = 3000) {
    this._subject.next(new Notification(this._idx++, NotificationType.error, title, message, timeout));
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