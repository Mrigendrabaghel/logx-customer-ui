import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, flush, TestBed } from '@angular/core/testing';
import { MaterialModule } from 'src/app/shared/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLink, RouterModule } from "@angular/router";
import { ReportincidentComponent } from './reportincident.component';
import { NotificationService } from 'src/app/logx-services/common/notification.service';
import { AdvanceSearchService } from 'src/app/logx-services/searchAndReport/advance-search.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncidentReportService } from 'src/app/logx-services/incidentReport/incident-report.service'; //vinith
import { IncidentLocationDetails, IncidentOrderDetails, IncidentPostalDetails } from 'src/app/shared/models/incident/report-incident.model'; //vinith
import { AdvanceSearchResult, DateField, DocumentLookupDetailModel, NumberField, OrderLookupDetailModel } from 'src/app/shared/models/order/advance-search'; //vinith
import { of } from 'rxjs';


xdescribe('ReportincidentComponent', () => {
  let component: ReportincidentComponent;
  let fixture: ComponentFixture<ReportincidentComponent>;
  let advSearchService: AdvanceSearchService;
  let incidentRepService: IncidentReportService;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MaterialModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        FormsModule, ReactiveFormsModule,
      ],
      declarations: [ReportincidentComponent, RouterLink],
      providers: [HttpClient, AdvanceSearchService, IncidentReportService, NotificationService]
    })
      .compileComponents();
    advSearchService = TestBed.inject(AdvanceSearchService);
    incidentRepService = TestBed.inject(IncidentReportService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportincidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('closeUploadSection', () => {
    component.closeUploadSection(true);
    expect(component.isOpenUploadFiles).toBeFalse();
  });

  it('should call uploadfiles', () => {
    let fileList = [{ name: 'test1', size: 20971520, type: "application/vnd.ms-excel" }];
    spyOn(component, 'UploadFiles');
    component.UploadFiles(fileList);
    expect(component.UploadFiles).toHaveBeenCalledWith(fileList);
    expect(component.isUploadFileList).toBeFalse();
  });

  it('should call getIncidentType function', () => {
    let response: [
      {
        isDefault: true
        languageId: 1
        lookupDataId: 1044
        lookupDisplayText: "Appointment Issue"
        lookupText: "Appointment Issue"
        lookupType: "incidenttype"
      }
    ]
    spyOn(advSearchService, 'GetDateQuilifier').and.returnValue(of(response))
    component.getIncidentType('abc');
    fixture.detectChanges();
    expect(component.incidentType).toEqual(response);
  });

  xit('should call getIncidentOrderDetails function', () => {
    let response: [
      {
        carrier: "CR TRANSPORT DBA"
        createdBy: "dod_fureyma"
        loadNumber: "LD31707613"
        ordHeaderId: 726484
        orderContactPersonName: "Renee Glavas"
        orderContactPersonNumber: "5864461301"
        status: "Closed"
      }
    ]
    spyOn(incidentRepService, 'GetIncidentOrderDetails').and.returnValue(of(response))
    component.getIncidentOrderDetails('S879725029_01');
    fixture.detectChanges();
    expect(component.incidentOrderDetails).toEqual(response);
  });

  xit('should call GetcarrierData function', () => {
    let response: [
      {
        carrierName: "NEW PENN"
        mccNum: "70832"
        scac: "NPME"
      }
    ]
    spyOn(incidentRepService, 'getCarrierDetails').and.returnValue(of(response))
    component.applyFilter('New ');
    fixture.detectChanges();
    expect(component.CarrierdataList).toEqual(response);
  });

  it('should call getIncidentStateCityRepLoc function', () => {
    let response: [
      {
        //cityCode: null
        cityName: "Saline"
        countryCode: "MX"
        countryName: "Mexico"
        //postalCode: null
        stateCode: "MI"
        stateName: "Michoacán"
      }
    ]
    spyOn(incidentRepService, 'GetIncidentStateCityDetails').and.returnValue(of(response))
    component.getIncidentStateCityRepLoc('New');
    fixture.detectChanges();
    expect(component.incidentStateReploc).toEqual(response);
  });

  // it('should call applyReportingLocationFilter function', () => {
  //   let response: [
  //     {
  //       cityName: "Chicago"
  //       countryFipsCode: "US"
  //       countryName: "United States"
  //       //locationAddr: null
  //       locationAddr1: "24801 NETWORK PLACE"
  //       locationAddr2: ""
  //       locationAddr3: ""
  //       locationName: "NEW PENN MOTOR EXPRESS, INC"
  //       locationNumber: "New Penn Remit To"
  //       postalCode: "60673"
  //       stateCode: "IL"
  //       stateName: "Illinois"
  //     }
  //   ]
  //   spyOn(incidentRepService, 'GetIncidentLocationDetails').and.returnValue(of(response))
  //   component.applyReportingLocationFilter('New');
  //   fixture.detectChanges();
  //   expect(component.incidentRepLocationDetails).toEqual(response);
  // });

});
