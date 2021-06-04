import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/shared/material.module';
import { AdvanceSearchService } from 'src/app/logx-services/searchAndReport/advance-search.service';
import { AdvanceSearchResult, DateField, DocumentLookupDetailModel, NumberField, OrderLookupDetailModel } from 'src/app/shared/models/order/advance-search';

import { AdvanceSearchAccessDocumentComponent } from './advance-search-access-document.component';
import { of } from 'rxjs';

xdescribe('AdvanceSearchAccessDocumentComponent', () => {
  let component: AdvanceSearchAccessDocumentComponent;
  let service : AdvanceSearchService;
  let fixture: ComponentFixture<AdvanceSearchAccessDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule,MaterialModule,FormsModule, BrowserAnimationsModule],
      declarations: [ AdvanceSearchAccessDocumentComponent ],
      providers : [AdvanceSearchService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceSearchAccessDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.inject(AdvanceSearchService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getDateQuilifier function', ()=>{
    const response = DateField ['abc'] = [];
    spyOn(service,'GetDateQuilifier').and.returnValue(of(response))
    component.getDateQuilifier('abd');
    fixture.detectChanges();
    expect(component.dateQuilifierValue).toEqual(response);
  });

  it('should call getOrderStatus function' , ()=>{
    const response = OrderLookupDetailModel ['123'] = [];
    spyOn(service,'GetDateQuilifier').and.returnValue(of(response))
    component.getOrderStatus('123');
    fixture.detectChanges();
    expect(component.orderStatus).toEqual(response);
  });

  it('should call getDocQuilifier function', ()=>{
    const response = DocumentLookupDetailModel ['abc'] = [];
    spyOn(service,'GetDateQuilifier').and.returnValue(of(response))
    component.getDocQuilifier('abc');
    fixture.detectChanges();
    expect(component.docQuilifer).toEqual(response);
  });

  it('should call getDateFilter function', ()=>{
    const response = DateField ['abc'] = [];
    spyOn(service,'GetDateQuilifier').and.returnValue(of(response))
    component.getDateFilter('abd');
    fixture.detectChanges();
    expect(component.dateQuilifer).toEqual(response);
  });

  it('should call getTextQuilifier function' , ()=>{
    const response = NumberField ['abc'] = [];
    spyOn(service,'GetDateQuilifier').and.returnValue(of(response))
    component.getTextQuilifier('abd');
    fixture.detectChanges();
    expect(component.textQuilifer).toEqual(response);
  });

  it('should call getDateHour function' , ()=>{
    const response = NumberField ['abc'] = [];
    spyOn(service,'GetDateQuilifier').and.returnValue(of(response))
    component.getDateHour('abd');
    fixture.detectChanges();
    expect(component.daysHours).toEqual(response);
  });

  it('should call onDateQuiliferSelect' , ()=>{
    component.onDateQuiliferSelect(10);
    fixture.detectChanges();
    expect(component.selectedOption).toEqual(10);
  });

  it('should call onOrderCreatedQuiliferSelect' , ()=>{
    component.onOrderCreatedQuiliferSelect(10);
    fixture.detectChanges();
    expect(component.selectedOptionCreatedDate).toEqual(10);
  });
  
  it('should call onChangeDisable' , ()=>{
    component.deliveryDateField.TotalDays=10;
    component.ngOnInit();
    component.onChangeDisable();
    expect(component.currentlyDisabledDel).toEqual(component.AdvanceSearchAccessDoc.accessDocText.totalHours);

    component.deliveryDateField.TotalDays=0;
    component.deliveryDateField.TotalHours=10;
    component.ngOnInit();
    component.onChangeDisable();
    expect(component.currentlyDisabledDel).toEqual(component.AdvanceSearchAccessDoc.accessDocText.todalDays);

    component.deliveryDateField.TotalDays=0;
    component.deliveryDateField.TotalHours=0;
    component.ngOnInit();
    component.onChangeDisable();
    expect(component.currentlyDisabledDel).toEqual('');

  });

  it('should call onOChangeDisable' , ()=>{
    component.orderDateField.TotalDays=10;
    component.ngOnInit();
    component.onOChangeDisable();
    expect(component.currentlyDisabledOrd).toEqual(component.AdvanceSearchAccessDoc.orderText.totalOrderHours);

    component.orderDateField.TotalDays=0;
    component.orderDateField.TotalHours=10;
    component.ngOnInit();
    component.onOChangeDisable();
    expect(component.currentlyDisabledOrd).toEqual(component.AdvanceSearchAccessDoc.orderText.totalOrderDays);

    component.orderDateField.TotalDays=0;
    component.orderDateField.TotalHours=0;
    component.ngOnInit();
    component.onOChangeDisable();
    expect(component.currentlyDisabledOrd).toEqual('');

  });

  it('should call getSearchOrderDetails' , ()=>{
    spyOn(component.OrderAdvanceSearchObject, 'emit');
    component.formName = 'Order Lookup';
    component.getSearchOrderDetails('cancel');
    fixture.detectChanges();
    expect(component.OrderAdvanceSearchObject.emit).toHaveBeenCalled();

    spyOn(component.DocumentAdvanceSearchObject, 'emit');
    component.formName = 'Access Documents';
    component.getSearchOrderDetails('cancel');
    fixture.detectChanges();
    expect(component.DocumentAdvanceSearchObject.emit).toHaveBeenCalled();

    component.destinationNumField='';
    component.getSearchOrderDetails('search');
    fixture.detectChanges();
    expect(component.destinationNumField).toEqual('');

    component.destinationNumField='';
    component.currentlyDisabledOrd = 'TotalOHours';
    component.deliveryDateField.DateQualifier = 'relative';
    component.deliveryDateField.TotalDays = 3;
    component.getSearchOrderDetails('search');
    fixture.detectChanges();
    expect(component.deliveryDateField.TotalDays).toEqual(3);
    
    component.orderDateField.DateQualifier = 'relative';
    component.orderDateField.TotalDays = 3;
    component.getSearchOrderDetails('search');
    fixture.detectChanges();
    expect(component.orderDateField.TotalDays).toEqual(3);

    // component.destinationNumField='';
    // component.currentlyDisabledOrd = 'TotalODays';
    // component.deliveryDateField.DateQualifier = 'relative';
    // component.deliveryDateField.TotalDays = 3;
    // component.getSearchOrderDetails('search');
    // fixture.detectChanges();
    // expect(component.deliveryDateField.TotalDays).toEqual(3);

    // component.orderDateField.DateQualifier = 'relative';
    // component.orderDateField.TotalDays = 3;
    // component.getSearchOrderDetails('search');
    // fixture.detectChanges();
    // expect(component.orderDateField.TotalDays).toEqual(3);

    component.destinationNumField='';
    component.currentlyDisabledOrd = 'TotalODays';
    component.deliveryDateField.DateQualifier = 'relative';
    component.deliveryDateField.TotalHours = 3;
    component.getSearchOrderDetails('search');
    fixture.detectChanges();
    expect(component.deliveryDateField.TotalHours).toEqual(3);

    component.orderDateField.DateQualifier = 'relative';
    component.orderDateField.TotalHours = 3;
    component.getSearchOrderDetails('search');
    fixture.detectChanges();
    expect(component.orderDateField.TotalHours).toEqual(3);
    

    component.formName = 'Order Lookup';
    component.orderStatusValue = 'abc'
    component.getSearchOrderDetails('search');
    expect(component.orderStatusValue).toEqual('abc');
  });

  it('should call onChangeValue' , ()=>{
    component.daysOrHours = '';
    component.onChangeValue('abc')
    fixture.detectChanges();
    expect(component.daysOrHours).toEqual('abc');
  });

  it('should call onChangeValueCreatedDate' , ()=>{
    component.daysHoursCreatedDate = '';
    component.onChangeValueCreatedDate('abc')
    fixture.detectChanges();
    expect(component.daysHoursCreatedDate).toEqual('abc');
  });

});