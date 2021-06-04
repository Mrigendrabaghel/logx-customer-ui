import { HttpClientModule } from '@angular/common/http';
import { async, fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from 'src/app/shared/material.module';
import 'zone.js/dist/fake-async-test';
import { SearchreportComponent } from './searchreport.component';
import { SearchModel } from 'src/app/shared/models/searchandreport/search';
import { SeachReportService } from 'src/app/logx-services/searchAndReport/seach-report.service';
import { OrderModel } from 'src/app/shared/models/order/order';
import { TrackOrderService } from 'src/app/logx-services/trackAndTrace/track-order.service';
import { of } from 'rxjs';

xdescribe('SearchreportComponent', () => {
  let component: SearchreportComponent;
  let service: SeachReportService;
  let trackservice:TrackOrderService;
  let fixture: ComponentFixture<SearchreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [RouterTestingModule,FormsModule,
            ReactiveFormsModule,
            HttpClientModule,
            MaterialModule,
            BrowserAnimationsModule
          ],
          providers:[SeachReportService,TrackOrderService],
      declarations: [ SearchreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service= TestBed.inject(SeachReportService);
    trackservice= TestBed.inject(TrackOrderService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () =>{
    component.searchReportForm.controls.orderNumberField.setValue('');
    expect(component.searchReportForm.valid).toBeFalsy();
  });

  it('searchReport form  valid when search box as value', () => {
    component.searchReportForm.controls['orderNumberField'].setValue("123456");
        expect(component.searchReportForm.valid).toBeTruthy();
  });

  it('searchReport field validity, should be required .', () => {
    let errors = {};
    let searchReport = component.searchReportForm.controls['orderNumberField'];
    errors = searchReport.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('searchReport check', () =>{
    let searchReportField = component.searchReportForm.controls['orderNumberField'];
    expect(searchReportField.errors['required']).toBeTruthy();
    searchReportField.setValue('234');
    expect(searchReportField.errors['minlength']).toBeTruthy();
  });
  
  it('searchReport minlength validation',()=>{
    let searchReportField=component.searchReportForm.controls['orderNumberField'];
    searchReportField.setValue('123456');
    expect(searchReportField.errors ).toBeNull();
    expect(searchReportField.valid).toBeTruthy();
  });

  it('service call validity',() =>{
    expect(service).toBeTruthy();
  });

  it('should call focusoutFunction', ()=>{
    expect(component.focusOutFunction).toBeTruthy();
  });

  it("check Function call", fakeAsync(()=>{ 
  component.getOrderData("123456");
  expect(component.submitted).toEqual(true);
  expect(component.getOrderData).toBeTruthy();
}));

// it('should call openDialog Function', ()=>{
//   expect(component.openDialog).toBeTruthy();
// });

it('should call viewDetails Function',()=>{
  component.viewDetails("1245");
  expect(component.viewDetails).toBeTruthy();
});

// it('should call GetRecentSearch method', async(() =>{
//   const response: SearchModel [] =[];
//   spyOn(service,'GetRecentSearch').and.returnValue(of(response))
//   component.ngOnInit();
//   fixture.detectChanges();
//   expect(component.searchModel).toEqual(response);
// }));

// it('should call getOrderData Function', async(() =>{
//   const response:OrderModel [] = [];
//   spyOn(trackservice,'GetshipmentDetails').and.returnValue(of(response))
//   component.getOrderData("12345");
//   fixture.detectChanges();
//   expect(component.dataSource).toEqual(response);
// }));

// it('should call onRecentSelect Function', async(() =>{
//   const response:OrderModel[] = [];
//   spyOn(trackservice,'GetshipmentDetails').and.returnValue(of(response))
//   component.onRecentSelect();
//   fixture.detectChanges();
//   expect(component.dataSource).toEqual(response);
// }));

});
