// import { HttpClientModule } from '@angular/common/http';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { MaterialModule } from 'src/app/shared/material.module';
// import { NotificationService } from "src/app/logx-services/common/notification.service";
// import { AccessDocumentService } from 'src/app/logx-services/documents/access-document.service';

// import { OrderdetailsComponent } from './orderdetails.component';
// import { DatePipe } from '@angular/common';
// import { TrackOrderService } from 'src/app/logx-services/trackAndTrace/track-order.service';

// describe('OrderdetailsComponent', () => {
//   let component: OrderdetailsComponent;
//   let notificationService: NotificationService;
//   let accessDocumentServices:AccessDocumentService;
//   let service:TrackOrderService;
//   let fixture: ComponentFixture<OrderdetailsComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports:[RouterTestingModule,
//       HttpClientModule,
//     MaterialModule],
//     providers:[NotificationService,AccessDocumentService,DatePipe],
//       declarations: [ OrderdetailsComponent ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(OrderdetailsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call getOrderComments Function', ()=>{
//     expect(component.getOrderComments).toBeTruthy();
//   });
 
//   it('should call getOrderAttachment Function', ()=>{
//     expect(component.getOrderAttachment).toBeTruthy();
//   });
 
//   it('should call getOrderLinesItems Function', ()=>{
//     expect(component.getOrderLinesItems).toBeTruthy();
//   });
 
  
//   it('should call getOrderHeaderDetails Function', ()=>{
//     expect(component.getOrderHeaderDetails).toBeTruthy();
//   });

// //   it('should call showmoredetails',()=>{
// //       const fixture = TestBed.createComponent(OrderdetailsComponent);
// //       const component = fixture.debugElement.componentInstance;
// //       let spy_getOrderHeaderDetails = spyOn(component,"getOrderHeaderDetails").and.returnValue([]);
// //       component.showmoredetails();
// //       expect(component.)
// //   })
 
//   it('should call openUploadFile Function', ()=>{
//     component.isOpenUploadFiles= true;
//     component.openUploadFile();
//     expect(component.isOpenUploadFiles).toBe(true);
//   });
 
// //   it('should call closeUploadSection Function', ()=>{
// //     component.isOpenUploadFiles=false;
// //     component.closeUploadSection();
// //     expect(component.isOpenUploadFiles).toBe(false);
// //   });
 
//   it('should showProductsTable', ()=>{
//     // invoke the function
//     component.showProductsTable(true);
//     expect(component.isExpandedProducts).toBe(true);
 
//   });
 
//   it('should showAttachmentsTable', ()=>{
//     component.showAttachmentsTable(true);
//     expect(component.isExpandedAttachments).toBe(true);
 
//   });
 
//   it('should showTableRouting', ()=>{
//     component.showTableRouting(true);
//     expect(component.isExpandedRouting).toBe(true);
 
//   });
 
//   it('should showCommentsTable', ()=>{
//     component.showCommentsTable(true);
//     expect(component.isExpandedComments).toBe(true);
 
//   });
 
//   it('should showMapTable', ()=>{
//     component.showMapTable(true);
//     expect(component.isExpandedMap).toBe(true);
 
//   });
 
//   it('should showUploadsTable', ()=>{
//     component.showUploadsTable(true);
//     expect(component.isExpandedUploads).toBe(true);
 
//   });

//   it('should call getHazmat Function', ()=>{​​
//     expect(component.getHazmat).toBeTruthy();
//   }​​);

//   it('should call UpdateLineroutingCount Function', ()=>{​​
//     expect(component.UpdateLineroutingCount).toBeTruthy();
//   }​​);

// //   it('#getOrderHeaderDetails should return value from observable',
// //   (done: DoneFn) => {​​
// //   service.getOrderHeaderDetails('orderNumber').subscribe(value => {​​
// //     expect(value).toBe(component.orderHeaderModel);
// //     done();
// //   }​​);
// // }​​);
 
// });

