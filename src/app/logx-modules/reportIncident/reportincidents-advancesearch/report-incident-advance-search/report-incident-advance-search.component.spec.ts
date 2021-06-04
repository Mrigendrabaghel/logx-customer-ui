import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterLink } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { IncidentReportService } from 'src/app/logx-services/incidentReport/incident-report.service';
import { AdvanceSearchService } from 'src/app/logx-services/searchAndReport/advance-search.service';
import { MaterialModule } from 'src/app/shared/material.module';

import { ReportIncidentAdvanceSearchComponent } from './report-incident-advance-search.component';

xdescribe('ReportIncidentAdvanceSearchComponent', () => {
  let component: ReportIncidentAdvanceSearchComponent;
  let fixture: ComponentFixture<ReportIncidentAdvanceSearchComponent>;
  let service: DataTransferService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportIncidentAdvanceSearchComponent, RouterLink ],
      imports: [RouterTestingModule,
        FormsModule,ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      providers: [ HttpClient, AdvanceSearchService, IncidentReportService, DataTransferService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportIncidentAdvanceSearchComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(DataTransferService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call goToReportIncident', () => {
    let spy = spyOn(component, 'goToReportIncident').and.callThrough();
    component.goToReportIncident();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should call getIncidentType', () => {
    let spy = spyOn(component, 'getIncidentType').and.callThrough();
    component.getIncidentType('incidentType');
    expect(spy).toHaveBeenCalledWith('incidentType');
  });

  it('should call getTextQuilifier', () => {
    let spy = spyOn(component, 'getTextQuilifier').and.callThrough();
    component.getTextQuilifier('TextSearch');
    expect(spy).toHaveBeenCalledWith('TextSearch');
  });

  it('should call getDateQuilifier', () => {
    let spy = spyOn(component, 'getDateQuilifier').and.callThrough();
    component.getDateQuilifier('DateSearch');
    expect(spy).toHaveBeenCalledWith('DateSearch');
  });

  it('should call getDateFilter', () => {
    let spy = spyOn(component, 'getDateFilter').and.callThrough();
    component.getDateFilter('DateFilter');
    expect(spy).toHaveBeenCalledWith('DateFilter');
  });

  it('should call getDateHour', () => {
    let spy = spyOn(component, 'getDateHour').and.callThrough();
    component.getDateHour('datehour');
    expect(spy).toHaveBeenCalledWith('datehour');
  });

  it('should call getIncidentStatus', () => {
    let spy = spyOn(component, 'getIncidentStatus').and.callThrough();
    component.getIncidentStatus('IncidentStatus');
    expect(spy).toHaveBeenCalledWith('IncidentStatus');
  });

  it('should call getResolution', () => {
    let spy = spyOn(component, 'getResolution').and.callThrough();
    component.getResolution('Resolution');
    expect(spy).toHaveBeenCalledWith('Resolution');
  });

  it('should call getPriority', () => {
    let spy = spyOn(component, 'getPriority').and.callThrough();
    component.getPriority('Priority');
    expect(spy).toHaveBeenCalledWith('Priority');
  });

  it('should call onIncidentDateQuiliferSelect', () => {
    let spy = spyOn(component, 'onIncidentDateQuiliferSelect').and.callThrough();
    component.onIncidentDateQuiliferSelect('fixed');
    expect(spy).toHaveBeenCalledWith('fixed');

    component.incidentDateField.DateQualifier = 'blank';
    component.onIncidentDateQuiliferSelect('');
    expect(component.disabledIncidentDate).toBeTruthy();

    component.incidentDateField.DateQualifier = 'between';
    component.onIncidentDateQuiliferSelect('');
    expect(component.disabledIncidentDate).toBeFalsy();

  });

  it('should call onIncidentCreatedDateQuiliferSelect', () => {
    let spy = spyOn(component, 'onIncidentCreatedDateQuiliferSelect').and.callThrough();
    component.onIncidentCreatedDateQuiliferSelect('fixed');
    expect(spy).toHaveBeenCalledWith('fixed');

    component.incidentCreatedDate.DateQualifier = 'between';
    component.onIncidentCreatedDateQuiliferSelect('');
    expect(component.disabledIncidentCreateDate).toBeFalsy();

    component.incidentCreatedDate.DateQualifier = 'blank';
    component.onIncidentCreatedDateQuiliferSelect('');
    expect(component.disabledIncidentCreateDate).toBeTruthy();

  });

  it('should call onResolutionDateQuiliferSelect', () => {
    let spy = spyOn(component, 'onResolutionDateQuiliferSelect').and.callThrough();
    component.onResolutionDateQuiliferSelect('fixed');
    expect(spy).toHaveBeenCalledWith('fixed');

    component.resolutionDateField.DateQualifier = 'blank';
    component.onResolutionDateQuiliferSelect('');
    expect(component.disabled).toBeTruthy();

     component.resolutionDateField.DateQualifier = 'between';
    component.onResolutionDateQuiliferSelect('');
    expect(component.disabled).toBeFalsy();


  });

  // it('should call onChangeDisable', () => {
  //   let spy = spyOn(component, 'onChangeDisable').and.callThrough();
  //   component.onChangeDisable();
  //   expect(spy).toHaveBeenCalledWith();
  // });

  // it('should call onChangeResDisable', () => {
  //   let spy = spyOn(component, 'onChangeResDisable').and.callThrough();
  //   component.onChangeResDisable();
  //   expect(spy).toHaveBeenCalledWith();
  // });

  // it('should call onChangeCreateDisable', () => {
  //   let spy = spyOn(component, 'onChangeCreateDisable').and.callThrough();
  //   component.onChangeCreateDisable();
  //   expect(spy).toHaveBeenCalledWith();
  // });

  it('should call onChangeValue', () => {
    let spy = spyOn(component, 'onChangeValue').and.callThrough();
    component.onChangeValue('Days +/- from Today');
    expect(spy).toHaveBeenCalledWith('Days +/- from Today');
  });

  it('should call onChangeResValue', () => {
    let spy = spyOn(component, 'onChangeResValue').and.callThrough();
    component.onChangeResValue('Days +/- from Today');
    expect(spy).toHaveBeenCalledWith('Days +/- from Today');
  });

  it('should call onChangeCreateValue', () => {
    let spy = spyOn(component, 'onChangeCreateValue').and.callThrough();
    component.onChangeCreateValue('Days +/- from Today');
    expect(spy).toHaveBeenCalledWith('Days +/- from Today');
  });

  it('should call goToAdvanceSearch', () => {
    let spy = spyOn(component, 'goToAdvanceSearch').and.callThrough();
    component.goToAdvanceSearch();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should call getSearchIncidentDetails', () => {
    let spy = spyOn(component, 'getSearchIncidentDetails').and.callThrough();
    component.getSearchIncidentDetails();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should call getRepLocationDetails', () => {
    let spy = spyOn(component, 'getRepLocationDetails').and.callThrough();
    component.getRepLocationDetails("SW3114-18466-DLA DISTRIBUTION TOBYHANNA, TOBYHANNA, PA 18466");
    expect(spy).toHaveBeenCalledWith("SW3114-18466-DLA DISTRIBUTION TOBYHANNA, TOBYHANNA, PA 18466");
  });

  it('should call getIncLocationDetails', () => {
    let spy = spyOn(component, 'getIncLocationDetails').and.callThrough();
    component.getIncLocationDetails("SW3114-18466-DLA DISTRIBUTION TOBYHANNA, TOBYHANNA, PA 18466");
    expect(spy).toHaveBeenCalledWith("SW3114-18466-DLA DISTRIBUTION TOBYHANNA, TOBYHANNA, PA 18466");
  });
  
  it('should call onChangeResDisable' , ()=>{
    component.resolutionDateField.TotalDays=10;
    component.ngOnInit();
    component.onChangeResDisable();
    expect(component.currentlyResDisabledDel).toEqual(component.AdvanceSearchAccessDoc.accessDocText.totalHours);

    component.resolutionDateField.TotalDays=0;
    component.resolutionDateField.TotalHours=10;
    component.ngOnInit();
    component.onChangeResDisable();
    expect(component.currentlyResDisabledDel).toEqual(component.AdvanceSearchAccessDoc.accessDocText.todalDays);

    component.resolutionDateField.TotalDays=0;
    component.resolutionDateField.TotalHours=0;
    component.ngOnInit();
    component.onChangeResDisable();
    expect(component.currentlyResDisabledDel).toEqual('');

  })

  it('should call onChangeDisable' , ()=>{
    component.incidentDateField.TotalDays=10;
    component.ngOnInit();
    component.onChangeDisable();
    expect(component.currentlyDisabledDel).toEqual(component.AdvanceSearchAccessDoc.accessDocText.totalHours);

    component.incidentDateField.TotalDays=0;
    component.incidentDateField.TotalHours=10;
    component.ngOnInit();
    component.onChangeDisable();
    expect(component.currentlyDisabledDel).toEqual(component.AdvanceSearchAccessDoc.accessDocText.todalDays);

    component.incidentDateField.TotalDays=0;
    component.incidentDateField.TotalHours=0;
    component.ngOnInit();
    component.onChangeDisable();
    expect(component.currentlyDisabledDel).toEqual('');

  })

  it('should call onChangeCreateDisable' , ()=>{
    component.incidentCreatedDate.TotalDays=10;
    component.ngOnInit();
    component.onChangeCreateDisable();
    expect(component.currentlyCreateDisabledDel).toEqual(component.AdvanceSearchAccessDoc.accessDocText.totalHours);

    component.incidentCreatedDate.TotalDays=0;
    component.incidentCreatedDate.TotalHours=10;
    component.ngOnInit();
    component.onChangeCreateDisable();
    expect(component.currentlyCreateDisabledDel).toEqual(component.AdvanceSearchAccessDoc.accessDocText.todalDays);

    component.incidentCreatedDate.TotalDays=0;
    component.incidentCreatedDate.TotalHours=0;
    component.ngOnInit();
    component.onChangeCreateDisable();
    expect(component.currentlyCreateDisabledDel).toEqual('');

  })

  it('should call goToDisplayResults' , ()=>{
    let loadDataSpy = spyOn(service,"loadData");
    component.goToDisplayResults('asdf');
    expect(loadDataSpy).toHaveBeenCalled();
  })

  it('should call onChangeValue' , ()=>{
    component.daysOrHours = '';
    component.onChangeValue('abc')
    fixture.detectChanges();
    expect(component.daysOrHours).toEqual('abc');
  })

  
  it('should call onChangeResValue' , ()=>{
    component.resdaysOrHours = '';
    component.onChangeResValue('abc')
    fixture.detectChanges();
    expect(component.resdaysOrHours).toEqual('abc');
  });

  it('should call onChangeCreateValue' , ()=>{
    component.daysOrHoursCreate = '';
    component.onChangeCreateValue('abc')
    fixture.detectChanges();
    expect(component.daysOrHoursCreate).toEqual('abc');
  });
});
