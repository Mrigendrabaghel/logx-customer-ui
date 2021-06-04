import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from 'src/app/shared/material.module';
import { ApproveAccessorialsDetailsComponent } from './approve-accessorials-details.component';
import { TrackOrderService } from 'src/app/logx-services/trackAndTrace/track-order.service';
import { AccessorialsService } from 'src/app/logx-services/accessorials/accessorials.service';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { BehaviorSubject, of } from 'rxjs';
import { ConfirmationDialog } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
xdescribe('ApproveAccessorialsDetailsComponent', () => {
  let component: ApproveAccessorialsDetailsComponent;
  let fixture: ComponentFixture<ApproveAccessorialsDetailsComponent>;
  let accessorialsService: AccessorialsService;
  let dataTransfer:DataTransferService;
  // let uploadService: UploadAndLookupDetailService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MaterialModule       
      ],  
      providers: [TrackOrderService,{provide: DataTransferService, useValue: {serviceExceptionDocId:31940}},
        {provide: AccessorialsService, useValue: {
          getOrderAttachments: () => of([{orderHeaderId:801240,serviceExceptionDocId:31940,documentDate:"04/08/20",serviceExceptionId:409034,documentType:"Service Exception Documents",docDescription:"Service Exception Documents-0019310",fileType:"Pdf"}])
     
    }}],
      declarations: [ ApproveAccessorialsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveAccessorialsDetailsComponent);
    component = fixture.componentInstance;
    accessorialsService = TestBed.inject(AccessorialsService);
    dataTransfer = TestBed.inject(DataTransferService);
    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getOrderAttachment function', () => {
    component.serviceExceptionId =31940;
    spyOn(accessorialsService, 'getOrderAttachments').and.callThrough();
   component.getOrderAttachment();
   fixture.detectChanges();    
   //expect(accessorialsService.GetAccessorials).toHaveBeenCalled();
   expect(component.isExpandedAttachments).toBeTruthy();  
 })

 it('should call ngOnInit', () => {
  //const data = [{ "lookupDataId": 32, "lookupType": "accessdocument-pagecount", "lookupText": "10", "lookupDisplayText": "10", "languageId": 1, "isDefault": false }];
  //spyOn(uploadService, 'GetLookupDetails').and.returnValue(of(data))

  dataTransfer.obj = new BehaviorSubject(null);
  //spyOn(dataTransfer, 'subscribe').and.callThrough();
  spyOn(accessorialsService, 'getOrderAttachments').and.callThrough();
  
  component.ngOnInit();
  fixture.detectChanges();
  expect(component.isExpandedAttachments).toBeTruthy();
});

it('should call showAccessorialDetails function', () => {
  let response: [
    {    
      dateOfFiling: "12/01/20"
      trackingNumber: "LD31918423"
      bOL: "20A9YYHU"
      carrierName: "Crowley"
      driverPOCName: "Test Driver"
      driverPOCPhone: "123456789"
      vLOSCN: "HWO2O200229517"
      occurrenceDate: "10/15/20"
      approvalStatus: ""
      accessorialCode: "DEP"
      accessorialName: "Detention: Vehicle with Power Unit"
      requiredDocumentation: "Arrive Date/Time: 7/29/20 1000\r\nDepart Time:7/29/20 1700\r\nDEP Hours:5\r\nDEP Location:San Pedro, CA 90045"
    }
  ]
  spyOn(accessorialsService, 'GetAccessorialDetails').and.returnValue(of(response))
  component.showAccessorialDetails('409034');
  fixture.detectChanges();
  expect(component.accessorialDetails).toEqual(response); 
});

it('should call goToaccessorialInfoDialog()', () => {
  expect(component.goToaccessorialInfoDialog).toBeTruthy();
});

it('should call goToaccessorialInfoDialog method dialog', () => {
  spyOn(accessorialsService, 'approveRejectAccssorial').and.callThrough();
  component.goToaccessorialInfoDialog();
  expect(component.dialog).toBeDefined();
  expect(component.dialog.open).toHaveBeenCalled();
  expect(component.accessorialService.approveRejectAccssorial).toHaveBeenCalled();
});

it('Return from ConfirmationDialog with hasAccepted equals true should call acceptLead endpoint', () => {
  let matDiaglogref =component.dialog.open(ConfirmationDialog, {
     data: {
      ok:true,

     }
  });
   //spyOn(matDiaglogref, 'afterClosed').and.callThrough().and.returnValue({});
  spyOn(matDiaglogref, 'afterClosed').and.callThrough();
  spyOn(accessorialsService, 'approveRejectAccssorial').and.callThrough();
  component.goToaccessorialInfoDialog();
  fixture.detectChanges();
  matDiaglogref.close();
  fixture.detectChanges();

  expect(accessorialsService.approveRejectAccssorial).toHaveBeenCalled();
});

});
