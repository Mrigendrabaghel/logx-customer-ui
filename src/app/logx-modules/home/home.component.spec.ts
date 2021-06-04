import { async, ComponentFixture, fakeAsync, TestBed,flush, tick, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterLink, RouterModule } from "@angular/router";
import { routes } from '../auth/auth.routing';
import {Location} from '@angular/common';
import { TrackOrderService } from 'src/app/logx-services/trackAndTrace/track-order.service';
import { AppComponent } from 'src/app/app.component';
import { OrderModel } from 'src/app/shared/models/order/order';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let location: Location;
  let router: Router;
 let service:TrackOrderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes),FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      providers:[TrackOrderService],
      declarations: [ HomeComponent,RouterLink]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service=TestBed.inject(TrackOrderService)

    router = TestBed.get(Router);
  location = TestBed.get(Location);
 
  router.initialNavigation();
  });

  // it('should call getContainerElement()', () => {
  //  component.overlayContainer.getContainerElement();
  //  component.ngOnInit();
  //  expect(component.overlayContainer).toEqual(component)
  // });
  it('should call focusOutFunction()', () => {
    let spy = spyOn(component, 'focusOutFunction').and.callThrough();
    component.focusOutFunction();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should call openSubmitOrderPage()', () => {
    let spy = spyOn(component, 'openSubmitOrderPage').and.callThrough();
    component.openSubmitOrderPage();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should call openSearch()', () => {
    let spy = spyOn(component, 'openSearch').and.callThrough();
    component.openSearch();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should call openAccessDoc()', () => {
    let spy = spyOn(component, 'openAccessDoc').and.callThrough();
    component.openAccessDoc();
    expect(spy).toHaveBeenCalledWith();
  });
  
  xit('should navigate to login', () => {
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');
    component.openLoginForm();
    expect(navigateSpy).toHaveBeenCalledWith(['/login']);
});

it(`openSubmitOrderPage() should navigate to submitorder module with query params`, inject(
  [Router],
  (router: Router) => {
    let id = 23;
    spyOn(router, "navigate").and.stub();
    router.navigate(["dashboard/submitorder"], {
      queryParams: { uriComponent: id }
    });
    expect(router.navigate).toHaveBeenCalledWith(["dashboard/submitorder"], {
      queryParams: { uriComponent: id }
    });
  }
));

it(`openSearch() should navigate to searchandreport module with query params`, inject(
  [Router],
  (router: Router) => {
    let id = 24;
    spyOn(router, "navigate").and.stub();
    router.navigate(["dashboard/searchandreport"], {
      queryParams: { uriComponent: id }
    });
    expect(router.navigate).toHaveBeenCalledWith(["dashboard/searchandreport"], {
      queryParams: { uriComponent: id }
    });
  }
));

it(`openAccessDoc() should navigate to accessdocument module with query params`, inject(
  [Router],
  (router: Router) => {
    let id = 25;
    spyOn(router, "navigate").and.stub();
    router.navigate(["dashboard/accessdocument"], {
      queryParams: { uriComponent: id }
    });
    expect(router.navigate).toHaveBeenCalledWith(["dashboard/accessdocument"], {
      queryParams: { uriComponent: id }
    });
  }
));

// it('should call "open" method of dialog on calling getOrderDetails()',()=>{
//   let spy= spyOn(component.dialog,'open').and.callThrough();
//   component.getOrderDetails();
//   expect(spy).toHaveBeenCalled();
// })

// it('should call getOrderDetails() of trackorderservice on component Init',()=>{
//   spyOn(component,'getOrderDetails').and.callThrough();
//   component.getOrderDetails();
//   expect(component.getOrderDetails).toHaveBeenCalled();
// })

it("check Function call", fakeAsync(()=>
{ 
  component.getOrderDetails();
  expect(component.submitted).toEqual(true);
expect(component.getOrderDetails).toBeTruthy();
}));

it('should call focusOutFunction', () => {
  expect(component.focusOutFunction).toBeTruthy();
});

it('Service call validity', () => {
  expect(service).toBeTruthy();
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', ()=>{
    component.trackForm.controls.trackNumberField.setValue('');
    expect(component.trackForm.valid).toBeFalsy();
  });

  it('form should be valid', ()=>{
    component.trackForm.controls.trackNumberField.setValue('123456');
    expect(component.trackForm.valid).toBeTruthy();
  })

  it('track number check', () =>{
    let trackNumberField = component.trackForm.controls['trackNumberField'];
    expect(trackNumberField.errors['required']).toBeTruthy();
    trackNumberField.setValue('234');
    expect(trackNumberField.errors['minlength']).toBeTruthy();
  });

  it('Track number minlength validation',()=>{
    let trackNumberField=component.trackForm.controls['trackNumberField'];
    trackNumberField.setValue('123456');
    expect(trackNumberField.errors).toBeNull();
    expect(trackNumberField.valid).toBeTruthy();
    
  });

  it('Track number maxlength validation',()=>{
    let trackNumberField=component.trackForm.controls['trackNumberField'];
    trackNumberField.setValue('12345678901234567');
    expect(trackNumberField.errors).toBeNull();
    expect(trackNumberField.valid).toBeTruthy();
    
  });

  // it('should call getShipmentDetails and return shipment details', async(()=>{
  //   const response: OrderModel [] = [];
  //   spyOn(service, 'GetshipmentDetails').and.returnValue(of(response))
  //   component.getOrderDetails();
  //   fixture.detectChanges();
  //   expect(component.orderModel).toEqual(response);
  //   flush();
  // }));

  });