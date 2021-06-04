import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/app/shared/material.module';
import { RouterTestingModule } from '@angular/router/testing';
import { OrderdetailsdialogComponent } from './orderdetailsdialog.component';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { TrackOrderService } from 'src/app/logx-services/trackAndTrace/track-order.service';
import { Router, RouterLink, RouterModule } from "@angular/router";
import { routes } from '../auth/auth.routing';
import {Location} from '@angular/common';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';


describe('OrderdetailsdialogComponent', () => {
  let component: OrderdetailsdialogComponent;
  let fixture: ComponentFixture<OrderdetailsdialogComponent>;
  let location: Location;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule,
        MatDialogModule,
        MatDialogRef,
        MatDialog,
        BrowserDynamicTestingModule,
        HttpClientModule
      ],
      declarations: [ OrderdetailsdialogComponent],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      },TrackOrderService]
     
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderdetailsdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

  // it('should call viewTrackDetails Function',()=>{
  //   component.viewTrackDetails("1245");
  //   expect(component.viewTrackDetails).toBeTruthy();
  // });

//   it('should navigate to publicorderdetails', () => {
//     const component = fixture.componentInstance;
//     const navigateSpy = spyOn(router, 'navigate');

//     component.viewTrackDetails("12343");
//     expect(navigateSpy).toHaveBeenCalledWith(['/publicorderdetails']);
// });

// it('should call ngAfterViewInit Function',() =>{
//   expect(component.ngAfterViewInit).toBeTruthy();
// });

});
