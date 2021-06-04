import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ApproveAccessorialsComponent } from './approve-accessorials.component';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { Accessorials, accessorialGrid } from '../../../shared/models/accessorials/accessorials.model';
import { UploadAndLookupDetailService } from 'src/app/logx-services/common/upload-and-lookup-detail.service';
import { AccessorialsService } from 'src/app/logx-services/accessorials/accessorials.service'
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ApproveAccessorialsDetailsComponent } from '../approve-accessorials-details/approve-accessorials-details.component';
import { Router, RouterLink, RouterModule } from "@angular/router";
import { Location } from '@angular/common';
xdescribe('ApproveAccessorialsComponent', () => {
  let component: ApproveAccessorialsComponent;
  let fixture: ComponentFixture<ApproveAccessorialsComponent>;
  let accessorialsService: AccessorialsService;
  let router: RouterTestingModule;
  //let router: Router;
  let uploadService: UploadAndLookupDetailService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule],
      declarations: [ApproveAccessorialsComponent, RouterLink],
      providers: [DataTransferService, UploadAndLookupDetailService, 
        {provide: AccessorialsService, useValue: {
          GetAccessorials: () => of([{dateOfFiling:"04/08/20",orderNumber:"HES2S203004943605",accessorialCode:"405",accessorialName:"405-(1) Fuel Surcharge",bol:"20ASU1SP-RCL",vloscn:"03004943"}]),
          GetAccessorialGridColumns: () => of([{headingid:1,headingCategory:"accessorialGrid",headingDBColumn:"dateOfFiling",headingDisplayText:"Date of Filing",languageId:1,isDefault:true,sortorder:1,username:"admin",userId:1144}])
    }},
        {provide: Router, useValue: {navigate: () => {}}}]
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(ApproveAccessorialsComponent);
    component = fixture.componentInstance;
    accessorialsService = TestBed.inject(AccessorialsService);
    uploadService = TestBed.inject(UploadAndLookupDetailService);
    fixture.detectChanges();
     router = TestBed.inject(Router);
   // location = TestBed.get(Location);
   // router.initialNavigation();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /*old it('should call GetAccessorialGridColumns function', () => {
    const response = accessorialGrid[0] = [{ headingCategory: "accessorialGrid" }];
    spyOn(accessorialsService, 'GetAccessorialGridColumns').and.returnValue(of(response))
    fixture.detectChanges();
    expect(response).toEqual([{ headingCategory: "accessorialGrid" }]);
  });*/

  /* old : it('should call getAccessorials function', () => {
    const response = accessorialGrid[0] = [{ headingCategory: "accessorialGrid" }];
    spyOn(accessorialsService, 'GetAccessorials').and.returnValue(of(response))
    fixture.detectChanges();
    component.getAccessorials();
    expect(component.isDisplayTable).toBeTruthy();
  })*/

  it('should call GetAccessorialGridColumns function', () => {
    spyOn(accessorialsService, 'GetAccessorialGridColumns').and.callThrough();
    component.GetAccessorialGridColumns();
    fixture.detectChanges();
    expect(accessorialsService.GetAccessorialGridColumns).toHaveBeenCalled();
    expect(component.accessorialColumns).toBeDefined();
 
  });

  /*it('should call getAccessorials function', () => {
     spyOn(accessorialsService, 'GetAccessorials').and.callThrough();
    component.getAccessorials();
    fixture.detectChanges();    
    //expect(accessorialsService.GetAccessorials).toHaveBeenCalled();
    expect(component.isDisplayTable).toBeTruthy();  
  })*/

  /*it('should call function goToAccessorialDetails', () => {
   const navigateSpy = spyOn(router, 'navigate');
   fixture.detectChanges();
    component.goToAccessorialDetails('row');
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard/approveaccessorialDetails']);
    // let spy = spyOn(component, 'goToAccessorialDetails').and.callThrough()
    // expect(spy).toHaveBeenCalled();
  });*/

  it('should call GetLookupDetails', () => {
    const data = [{ "lookupDataId": 32, "lookupType": "accessdocument-pagecount", "lookupText": "10", "lookupDisplayText": "10", "languageId": 1, "isDefault": false }];
    spyOn(uploadService, 'GetLookupDetails').and.returnValue(of(data))
    
   
    fixture.detectChanges();
    expect(component.pageSize).toEqual(0);
  });

});
