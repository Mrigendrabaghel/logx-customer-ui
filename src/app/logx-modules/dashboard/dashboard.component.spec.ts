import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture,fakeAsync, TestBed,flush } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLink, RouterModule } from "@angular/router";
//import { routes } from '../auth/auth.routing';
import {Location} from '@angular/common';
import { MaterialModule } from 'src/app/shared/material.module';
import { SeachReportService } from 'src/app/logx-services/searchAndReport/seach-report.service';
import { DashboardComponent } from './dashboard.component';
import { Annouuncement } from 'src/app/shared/models/announcement/announcement-model';
import { from, of } from 'rxjs';
import { AccessorialsService } from 'src/app/logx-services/accessorials/accessorials.service';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';

xdescribe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: SeachReportService;
  let location: Location;
  let router: Router;
  let accessorialService:AccessorialsService;
  let datatransferService:DataTransferService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule,FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        BrowserAnimationsModule
      ],
      providers:[SeachReportService,DataTransferService],
      declarations: [ DashboardComponent, RouterLink ]
    })
    .compileComponents()
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service= TestBed.inject(SeachReportService);

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () =>{
    component.trackTraceForm.controls.trackNumberField.setValue('');
    expect(component.trackTraceForm.valid).toBeFalsy();
    component.accessDocForm.controls.accessDocField.setValue('');
    expect(component.accessDocForm.valid).toBeFalsy();
  });

  it('form should be valid', ()=>{
    component.trackTraceForm.controls.trackNumberField.setValue('123456');
    component.accessDocForm.controls.accessDocField.setValue('234567');
    expect(component.trackTraceForm.valid).toBeTruthy();
    expect(component.accessDocForm.valid).toBeTruthy();
  });

  it('Track Number check', () =>{
    let trackNumberField = component.trackTraceForm.controls['trackNumberField'];
    expect(trackNumberField.errors['required']).toBeTruthy();
    expect(trackNumberField.valid).toBeFalsy();
    trackNumberField.setValue('123');
    expect(trackNumberField.errors['minlength']).toBeTruthy();
  });

  it('track number minlength validation', () =>{
    let trackNumberField = component.trackTraceForm.controls['trackNumberField'];
    trackNumberField.setValue('123456');
    expect(trackNumberField.errors).toBeNull();
    expect(trackNumberField.valid).toBeTruthy();
  });

  it('track number maxlength validation', ()=>{
    let trackNumberField = component.trackTraceForm.controls['trackNumberField'];
    trackNumberField.setValue('12345678901234567');
    expect(trackNumberField.errors).toBeNull();
    expect(trackNumberField.valid).toBeTruthy();
  });

  it('Access Document field check', () =>{
    let accessDocField = component.accessDocForm.controls['accessDocField'];
    expect(accessDocField.errors['required']).toBeTruthy();
    accessDocField.setValue('123');
    expect(accessDocField.errors['minlength']).toBeTruthy();
  });

  it('Access Document field Minlength validation', () =>{
    let accessDocField = component.accessDocForm.controls['accessDocField'];
    accessDocField.setValue('123456');
    expect(accessDocField.errors).toBeNull();
    expect(accessDocField.valid).toBeTruthy();
  });

  it('Access Document field Maxlength validation', ()=>{
    let accessDocField = component.accessDocForm.controls['accessDocField'];
    accessDocField.setValue('12345678901234567');
    expect(accessDocField.errors).toBeNull();
    expect(accessDocField.valid).toBeTruthy();
  });

  it('should call focusoutfunction', () =>{
    expect(component.focusOutFunction).toBeTruthy();
  });

  it('should call getAccessorialsCount()', () => {
    let spy = spyOn(component, 'getAccessorialsCount').and.callThrough();
    component.getAccessorialsCount();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should call openDialog()', () => {
    let spy = spyOn(component, 'openDialog').and.callThrough();
    component.openDialog();
    expect(spy).toHaveBeenCalledWith();
  });

  it('Service call validity', () =>{
    expect(service).toBeTruthy();
  });

  it('GetTrackRecords should submitted to true', ()=>{
    //component.accessDocForm.invalid=true;
    component.getTrackRecords();
    expect(component.trackSubmitted).toBeTruthy();
  });

  it('getDocumentRecords should submitted to true', ()=>{
    component.getDocumentRecords();
    expect(component.accessDocSubmitted).toBeTruthy();
  });

  it('should navigate to Tracktrace widget', () => {
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');
    component.launchTrackTraceWidget();
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard/securetrackorder']);
  });

  it('should navigate to SearchRepor widget', () => {
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');
    component.launchSearchReportWidget();
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard/searchandreport']);
  });

  it('should navigate to AccessDoc widget', () => {
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');
    component.launchAccessDocWidget();
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard/accessdocument']);
  });

  it('should navigate to Report Incident', () => {
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');
    component.launchReportIncident();
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard/reportincident']);
  });

  it('should navigate to Approve-accessorials', () => {
    const component = fixture.componentInstance;
    const navigateSpy = spyOn(router, 'navigate');
    component.getAccessorials();
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard/approve-accessorials']);
  });

  // it('should navigate to Search and Report', () => {
  //   const component = fixture.componentInstance;
  //   const navigateSpy = spyOn(router, 'navigate');
  //   component.getOrderRecords();
  //   expect(navigateSpy).toHaveBeenCalledWith(['/dashboard/searchandreport']);
  // });

  // it('should navigate to AccessDocument', () => {
  //   const component = fixture.componentInstance;
  //   const navigateSpy = spyOn(router, 'navigate');
  //   component.getDocumentRecords();
  //   expect(navigateSpy).toHaveBeenCalledWith(['/dashboard/accessdocument']);
  // });

  // it('should navigate to SecureTrackOrder', () => {
  //   const component = fixture.componentInstance;
  //   const navigateSpy = spyOn(router, 'navigate');
  //   component.getTrackRecords();
  //   expect(navigateSpy).toHaveBeenCalledWith(['/dashboard/securetrackorder']);
  // });

  it("check getOrderRecords() Function call", fakeAsync( ()=> { 
    component.getOrderRecords();
    expect(component.orderSubmitted).toEqual(true);
    expect(component.getOrderRecords).toBeTruthy();
}));

  it("check GetTrackOrder Function call", fakeAsync( ()=> { 
    component.getTrackRecords();
    expect(component.trackSubmitted).toEqual(true);
    expect(component.getTrackRecords).toBeTruthy();
}));

   it('check GetDocumentRecords Function call', fakeAsync(() => {
     component.getDocumentRecords();
     expect(component.accessDocSubmitted).toEqual(true);
     expect(component.getDocumentRecords).toBeTruthy();
   }));

  //  it('check dismissAnnouncement Function call', fakeAsync(()=>{
  //    component.dismissAnnouncement();
  //    expect(component.isdismissAnnouncement).toEqual(false);
  //    expect(component.dismissAnnouncement).toBeTruthy();
  //  }));

  //  it('should call getAnnouncment and return list of announcement list',async(()=>{
  //    const response: Annouuncement[] = [];
  //    spyOn(service, 'GetAnnouncement').and.returnValue(of(response))
  //    component.ngOnInit();
  //    fixture.detectChanges();
  //    expect(component.annouuncementData).toEqual(response);
  //  }));

});
