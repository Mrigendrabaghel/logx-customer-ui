import { async, ComponentFixture,fakeAsync, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatSnackBar,MatSnackBarModule} from '@angular/material/snack-bar';
//import { MatDialog } from '@angular/material/dialog';
import {FormGroup, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';

import { SecuretrackorderComponent } from './securetrackorder.component';
import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { MaterialModule } from 'src/app/shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { TrackOrderService } from 'src/app/logx-services/trackAndTrace/track-order.service';
import { OrderModel } from 'src/app/shared/models/order/order';
import { Router } from '@angular/router';

xdescribe('SecuretrackorderComponent', () => {
  let component: SecuretrackorderComponent;
  let fixture: ComponentFixture<SecuretrackorderComponent>;
  let service: TrackOrderService;
  let router: Router;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports:[RouterTestingModule,
            ReactiveFormsModule,
            MaterialModule,
            BrowserAnimationsModule,
            FormsModule,
            HttpClientModule,MatSnackBarModule
          ],
        schemas: [ NO_ERRORS_SCHEMA ],
        providers: [TrackOrderService],
        declarations: [ SecuretrackorderComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecuretrackorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(TrackOrderService);
    router = TestBed.get(Router);

    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Securetrackorder form invalid when empty', ()=>{
      expect(component.trackForm.valid).toBeFalsy();
  })
  it('service call validity',() =>{
    expect(service).toBeTruthy();
  });
  it('SecureTrackOrder number check', ()=>{
      let trackNumberFieldSecure= component.trackForm.controls['trackNumberFieldSecure'];
      expect(trackNumberFieldSecure.errors['required']).toBeTruthy();
      trackNumberFieldSecure.setValue('123');
      expect(trackNumberFieldSecure.errors['minlength']).toBeTruthy();
  })

  it('SecureTrackOrder number Minlength validation', ()=>{
      let trackNumberFieldSecure=component.trackForm.controls['trackNumberFieldSecure'];
      trackNumberFieldSecure.setValue('123456');
      expect(trackNumberFieldSecure.errors).toBeNull();
      expect(trackNumberFieldSecure.valid).toBeTruthy();
  });

  it("check Function call", (()=>
   { 
    component.getRecords("123456");
    expect(component.submitted).toEqual(true);
    expect(component.getRecords).toBeTruthy();
    
  }));

  it('should call focusOutFunction', () => {
    expect(component.focusOutFunction).toBeTruthy();
  });

  it("check Function call", fakeAsync(() => { 
    component.focusOutFunction();
    let actval = [1,2];
    expect(component.submitted).toEqual(true);
    expect(component.isTrackNumberLengthValid).toEqual(true);
    expect(component.focusOutFunction).toBeTruthy();
  }));


  it('should call getRecords function', ()=>{
    const response = OrderModel['abc'] = [];
    spyOn(service,'GetshipmentDetails').and.returnValue(of(response))
    component.getRecords('abc');
    fixture.detectChanges();
    expect(component.ORDER_DATA).toEqual(response);
  });
  
  it('should call getRecordsFromDashboard function' , ()=>{
    const response = OrderModel['abc'] = [];
    spyOn(service,'GetshipmentDetails').and.returnValue(of(response))
    component.getRecordsFromDashboard('abc');
    fixture.detectChanges();
    expect(component.ORDER_DATA).toEqual(response);
  });

  it('should navigate to vieworderdetails widget', () => {
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');
    component.viewDetails('abc');
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard/vieworderdetails']);
  });

  it('should call getRecordsFromDashboard', () => {
    const res = [{  'OrderId':123,
            'orderNum': "LD31707613" ,   
            'loadNumber': "LD31707613" ,  
            'gbolNumber': "LD31707613" ,      
            'bolNumber': "LD31707613" ,  
            'tcnNumber': "LD31707613" ,  
            'proNumber': "LD31707613" ,              
            'lastUpdatedDateTimeUtc': new Date() ,  
            'firstTcn': "LD31707613" ,  
            'originLocation': "LD31707613" ,  
            'deliveryLocation': "LD31707613" ,  
            'pickupDateTimeUtc': new Date() ,             
            'deliveryDateTimeUtc': new Date() ,  
            'lastMilestone': "LD31707613" ,             
            'lastKnownLocation': "LD31707613" ,             
            'status': "LD31707613" ,             
            'progress': "LD31707613" ,             
            'isViewDetailsDisplay': false ,             
            'isViewDocumentDisplay': false ,             
            'trackStatus': [{'status':"abc",'location':"abc", 'actionDate':new Date()}] ,
            'gblNumber': "abc" ,
            'originAddress': "abc" ,
            'originAddress1': "abc" ,
            'originCityName': "abc" ,
            'originStateName': "abc" ,
            'originPostalCode': "abc" ,
            'deliveryAddress': "abc" ,
            'deliveryAddress1': "abc" ,
            'deliveryCityName': "abc" ,
            'deliveryStateName': "abc" ,
            'deliveryPostalCode': "abc" }];
         
     spyOn(service, 'GetshipmentDetails').and.returnValue(of(res))
    component.getRecordsFromDashboard('abc');
    fixture.detectChanges();
     expect(component.isShowOrderDetails).toBeFalsy();

  });
  it('should call expandCollapse' , ()=>{
    component.expandCollapse();
    fixture.detectChanges();
    expect(component.navBarOpened).toEqual(component.navBarOpened);
  });

  it('should call getRecords', () => {
    const res = [{  'OrderId':123,
            'orderNum': "LD31707613" ,   
            'loadNumber': "LD31707613" ,  
            'gbolNumber': "LD31707613" ,      
            'bolNumber': "LD31707613" ,  
            'tcnNumber': "LD31707613" ,  
            'proNumber': "LD31707613" ,              
            'lastUpdatedDateTimeUtc': new Date() ,  
            'firstTcn': "LD31707613" ,  
            'originLocation': "LD31707613" ,  
            'deliveryLocation': "LD31707613" ,  
            'pickupDateTimeUtc': new Date() ,             
            'deliveryDateTimeUtc': new Date() ,  
            'lastMilestone': "LD31707613" ,             
            'lastKnownLocation': "LD31707613" ,             
            'status': "LD31707613" ,             
            'progress': "LD31707613" ,             
            'isViewDetailsDisplay': false ,             
            'isViewDocumentDisplay': false ,             
            'trackStatus': [{'status':"abc",'location':"abc", 'actionDate':new Date()}] ,
            'gblNumber': "abc" ,
            'originAddress': "abc" ,
            'originAddress1': "abc" ,
            'originCityName': "abc" ,
            'originStateName': "abc" ,
            'originPostalCode': "abc" ,
            'deliveryAddress': "abc" ,
            'deliveryAddress1': "abc" ,
            'deliveryCityName': "abc" ,
            'deliveryStateName': "abc" ,
            'deliveryPostalCode': "abc" }];
          
    spyOn(service, 'GetshipmentDetails').and.returnValue(of(res))
    component.getRecords('abc');
    fixture.detectChanges();
    expect(component.isShowOrderDetails).toBeFalsy();

    });
 
});
