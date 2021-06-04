import { Injectable,ErrorHandler } from '@angular/core';
import { CommonConst } from 'src/app/configs/constants';
@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor() { }

  handleError(error) {
   console.error(CommonConst.globalErrorMessage.error, error.message);
 }

}
