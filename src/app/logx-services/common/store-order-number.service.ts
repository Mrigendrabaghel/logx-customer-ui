import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreOrderNumberService {
  
  constructor() {
  }
  
  public storeExistingOrderNumber: number = 0;

}