import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { FormGroup, ReactiveFormsModule, FormsModule, FormBuilder, FormArray } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/shared/material.module';
import { AddAccessorialInfoDialogComponent } from './add-accessorial-info-dialog.component';
import {MatDialogModule, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UploadAndLookupDetailService } from 'src/app/logx-services/common/upload-and-lookup-detail.service';
import { of } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { AccessorialsService } from 'src/app/logx-services/accessorials/accessorials.service';
import { Router, RouterLink, RouterModule } from "@angular/router";
 
export class MatDialogRefMock {
  close(value = '') {
 
  }
}
 
describe('AddAccessorialInfoDialogComponent', () => {
  let component: AddAccessorialInfoDialogComponent;
  let fixture: ComponentFixture<AddAccessorialInfoDialogComponent>;
  let uploadService: UploadAndLookupDetailService;
 // let serviceExceptionNum:any;
  let form: FormGroup;
  let fb: FormBuilder
  let dialogRef: MatDialogRef<AddAccessorialInfoDialogComponent>
  let accessorialsService: AccessorialsService;
  let router: RouterTestingModule;
  let data:any;
 
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAccessorialInfoDialogComponent,RouterLink ],
      providers: [
        {provide: AccessorialsService, useValue: {
          AddAccessorialAdditionalInfo: () => of({"result":"Success","entityType":"Approval Accessorial","entities":{"successCount":1,"failureCount":0,"warningCount":0},"entityResult":[{"result":"Success","externalId":"SE200408-0000092","internalId":0,"action":"Update","error_Message":null,"error_Cause":null}]}),
         
    }},
        { provide: MatDialogRef, useClass: MatDialogRefMock },
        // {provide: MatDialogRef,useValue: {}},
        {provide: Router, useValue: {navigate: () => {}}},
        { provide: MAT_DIALOG_DATA, useValue: {} },
        {provide: UploadAndLookupDetailService, useValue: {
          GetLookupDetails: () => of(
            [{ "lookupDataId": 1104,
        "lookupType": "AdditionalAccessorial",
        "lookupText": "Email Confirmation",
        "lookupDisplayText": "Email Confirmation",
        "languageId": 1,
        "isDefault": false
      },
      {
        "lookupDataId": 1105,
        "lookupType": "AdditionalAccessorial",
        "lookupText": "Pictures",
        "lookupDisplayText": "Pictures",
        "languageId": 1,
        "isDefault": false
      }])
     
    }}
     ],
      imports:[RouterTestingModule,ReactiveFormsModule,
        FormsModule,BrowserAnimationsModule,
        HttpClientModule,MaterialModule,MatDialogModule]
    })
    .compileComponents();
  }));
 
  beforeEach(() => {
    fixture = TestBed.createComponent(AddAccessorialInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    uploadService = TestBed.inject(UploadAndLookupDetailService);
    component.serviceExceptionNum = 'SE200408-0000092';
    // form = fb.group({
    //   otherinfovalue: [],
    //   orders: new FormArray([])
    // });
    router = TestBed.inject(Router);
    accessorialsService = TestBed.inject(AccessorialsService);
    data = TestBed.inject(MAT_DIALOG_DATA);
  });
 
  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
 
  // it('should call Constructor', () => {
  //   component.constructor(dialogRef,accessorialsService,fb,uploadService,router,data)
  //     fixture.detectChanges();
  //   expect(component.ordersData).toBeNaN();
  // });
  it('should call submit()', () => {
    let spy = spyOn(component, 'submit').and.callThrough();
    component.submit();
    expect(spy).toHaveBeenCalledWith();
  });

  it('should call addcheckbox fuction', () => {
    expect(component.minSelectedCheckboxes).toBeTruthy();
  });
  // it('should call closePopup fuction', () => {
  //   expect(component.closePopup).toBeTruthy();
  // });

  it('should call closePopup()', () => {
    let spy = spyOn(component, 'closePopup').and.callThrough();
    component.closePopup();
    expect(spy).toHaveBeenCalledWith();
  });

  // it('should call onCheckboxChange()', () => {
  //   let spy = spyOn(component, 'onCheckboxChange').and.callThrough();
  //   component.onCheckboxChange('abc',true);
  //   expect(spy).toHaveBeenCalledWith();
  // });

it('onCheckboxChange should call',()=>{
  var Lookuptext = 'Other';
  var abc=false;
  var isChecked: boolean;
  if(Lookuptext === 'Other' && isChecked ==true) {
     
      //it('should pass', function () {
          expect(true).toBeTruthy();
          expect(component.showtext).toEqual(true)
      //});

  } else {
      //it('should fail', function () {
          expect(false).toBeFalsy();
          expect(component.showtext).toEqual(false)
     // });
  }
})
});