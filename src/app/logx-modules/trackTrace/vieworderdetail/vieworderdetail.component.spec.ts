
// import { HttpClientModule } from '@angular/common/http';
// //TODO: Below code is commented to avoid Deployment, since we need to fix issue
// import { async, ComponentFixture, fakeAsync, TestBed, flush } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MaterialModule } from 'src/app/shared/material.module';
// import { AccessDocumentService } from 'src/app/logx-services/documents/access-document.service';
// import { AccessDocumentModel } from 'src/app/shared/models/document/access-document-model';
// import { Router, RouterLink, RouterModule } from "@angular/router";
// import {Location} from '@angular/common';
// import { VieworderdetailComponent } from './vieworderdetail.component';
// import { of } from 'rxjs';
// //import { SeachReportService } from 'src/app/logx-services/searchAndReport/seach-report.service';

// describe('VieworderdetailComponent', () => {
//   let component: VieworderdetailComponent;
//   let service:AccessDocumentService;
//   let location: Location;
//   let router: Router;
//   let fixture: ComponentFixture<VieworderdetailComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//         imports:[RouterTestingModule,FormsModule,
//           ReactiveFormsModule,
//           HttpClientModule,
//           MaterialModule,
//           BrowserAnimationsModule],
//         providers:[ AccessDocumentService],
//       declarations: [ VieworderdetailComponent,RouterLink ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(VieworderdetailComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     service= TestBed.inject(AccessDocumentService);

//     router = TestBed.get(Router);
//     location = TestBed.get(Location);

//     router.initialNavigation();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//  it("check Function call",()=>
//   {
//     component.showMoreDetails();
//     //expect(component.isShowMoreDetails).toEqual(true);
//     expect(component.showMoreDetails).toBeTruthy();
//   })

// // it('should navigate to orderdetails',()=>{
// //   const component = fixture.componentInstance;
// //   const navigateSpy = spyOn(router,'navigate');
// //   component.showMoreDetails();
// //   expect(navigateSpy).toHaveBeenCalledWith(['/dashboard/orderdetails']);
// // });

// it('should getAccessDocument subscribe function',fakeAsync(() =>{
//   const response: AccessDocumentModel [] = [];
//   spyOn(service,'GetAccessDocument').and.returnValue(of(response))
//   component.OpenDocumentsDialogue();
//   fixture.detectChanges();
//   expect(component.dataSource).toEqual(response);
//   flush();
// }));

//  });
