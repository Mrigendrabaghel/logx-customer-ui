import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable } from "rxjs";
import { LoaderService } from 'src/app/logx-services/common/loader.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private loader: LoaderService) {
  }
  //function which will be called for all http calls
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {


    this.loader.show()

    if (request.headers.get('skip') == 'true') {
      const newHeaders = request.headers.delete('skip')
      const newRequest = request.clone({ headers: newHeaders });
      return next.handle(newRequest).pipe(
        tap(
          event => {
            //logging the http response to browser's console in case of a success
            if (event instanceof HttpResponse) {
              this.loader.hide()
              //console.log("api call success :", event);
            }
          },
          error => {
            //logging the http response to browser's console in case of a failuer
            if (error instanceof HttpErrorResponse) {
              this.loader.hide()
              //console.log("api call error :", event);
            }
          }
        )
      );
    }
    else {
      let token = JSON.parse(localStorage.getItem('okta-token-storage')).accessToken.value;
      let updatedRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
      return next.handle(updatedRequest).pipe(
        tap(
          event => {
            //logging the http response to browser's console in case of a success
            if (event instanceof HttpResponse) {
              this.loader.hide()
              //console.log("api call success :", event);
            }
          },
          error => {
            //logging the http response to browser's console in case of a failuer
            if (error instanceof HttpErrorResponse) {
              this.loader.hide()
              //console.log("api call error :", event);
            }
          }
        )
      );
    }
  }
}