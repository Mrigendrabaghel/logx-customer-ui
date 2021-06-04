import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  obj = new BehaviorSubject(null);

  constructor() {
  }
  
  loadData(selectedObj: any): void {
    this.obj.next(selectedObj);
  }

}
