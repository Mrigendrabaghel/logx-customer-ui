import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BreakpointState, Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { TrackOrderService } from 'src/app/logx-services/trackAndTrace/track-order.service';
import { MatDialog } from '@angular/material/dialog';
import { OrderModel } from 'src/app/shared/models/order/order';
import { MatTableDataSource } from '@angular/material/table';
import { OrderdetailsdialogComponent } from './orderdetailsdialog.component';
import { CopyPasteData, IsUserLoggedIn } from 'src/app/shared/common/common-method';
import { MessagepopupComponent } from 'src/app/shared/common/messagepopup/messagepopup.component';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { environment } from 'src/environments/environment';
import { AdvanceSearchAccessDoc, CommonConst, commonNumbers, DashboardConst, DocumentsConst, homeComponentConst, LayoutConst, SubmitOderConst, Version } from 'src/app/configs/constants';

import { LoginpopupComponent } from 'src/app/logx-modules/home/mobilelogin/loginpopup.component';
import { RouteLinks } from 'src/app/configs/RoutePath';
import { RegistrationpopupComponent } from 'src/app/shared/common/registrationpopup/registrationpopup.component';

var ORDER_DATA: OrderModel[] = [];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeComponentConst = homeComponentConst;
  DashboardConst = DashboardConst;
  CommonConst = CommonConst;
  commonNumbers = commonNumbers;
  message: string;
  public trackNumbers: string;
  trackForm: FormGroup;
  submitted = false;
  isTrackNumberValid = false;
  isTrackNumberLengthValid = false;
  isAuthenticated: boolean;
  errorMessage: any;
  public orderModel: OrderModel[];
  orderNumber: string;
  dataSource = new MatTableDataSource(ORDER_DATA);
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset)
  pastedText: string = '';
  headerString: string = homeComponentConst.confirmationMessage.headerString;
  public version = Version;
  public sideNavItems = homeComponentConst.sideNavItems;
  public footerItems = homeComponentConst.footerItems;
  public show: boolean = true;
  mobileView: boolean = false;
  resultSet: any = [];
  userTokenExists = false;
  registrationMsg: string = null;
  registrationFlag = false;
  constructor(public router: Router,
    private formBuilder: FormBuilder,
    private breakpointObserver: BreakpointObserver,
    private trackOrderService: TrackOrderService,
    public dialog: MatDialog,
    public overlayContainer: OverlayContainer,
    private dataTransfer: DataTransferService) {
  }

  ngOnInit() {
    this.dataTransfer.obj.subscribe(data => { this.registrationFlag = data; }).closed;
    this.dataTransfer.obj.subscribe(data => { this.registrationMsg = data; }).closed;
    if (this.registrationFlag === true) {
      if (this.registrationMsg === LayoutConst.resMsg) {
        const modalRef = this.dialog.open(RegistrationpopupComponent, { data: { message: LayoutConst.resHeaderMsg, header: LayoutConst.regHeaderText } });
      } else {
        const modalRef = this.dialog.open(RegistrationpopupComponent, { data: { message: this.registrationMsg } });
      }
    }
    if (window.screen.width >= 360 && window.screen.width <= 1024) { // 768px portrait
      this.mobileView = true;
    }
    this.trackForm = this.formBuilder.group({
      trackNumberField: ['', [Validators.required, Validators.minLength(CommonConst.minLength), Validators.maxLength(CommonConst.maxLength)]]
    });
    document.body.classList.add("dark-theme");
    this.overlayContainer.getContainerElement().classList.add("dark-theme");

    // added for testing Okta workaround
    if (JSON.parse(localStorage.getItem('okta-token-storage')) != null) {
      this.userTokenExists = true;
    }

  }

  get f() { return this.trackForm.controls; }

  focusOutFunction() {
    try {
      var data = this.trackForm.value;
      var actVal = new Array();
      actVal = data.trackNumberField.split(',');
      if (actVal.length > CommonConst.minLength) {
        this.isTrackNumberLengthValid = true;
      }

      for (var i = 0; i < actVal.length; i++) {
        var len = actVal[i].length;
        if (len < CommonConst.minLength || len > CommonConst.maxLength) {
          this.submitted = true;
          this.isTrackNumberValid = true;
          this.trackForm.controls['trackNumberField'].setErrors({ 'errors': true });
        }
      }
    }
    catch (error) {
      throw error
    }
  }

  getOrderDetails() {

    try {
      this.submitted = true;
      if (this.trackForm.invalid) {
        return;
      }

      this.trackOrderService.GetUnsecuredshipmentDetails(this.trackForm.value.trackNumberField).subscribe(res => {
        this.orderModel = res;

        if (res.length == commonNumbers.one) {
          this.dataTransfer.loadData(res[0].orderNum);
          this.router.navigate(['/publicorderdetails']);
        }
        if (res.length > commonNumbers.one && res.length <= commonNumbers.three) {
          if (!this.mobileView) {
            ORDER_DATA = this.orderModel;
            this.dataSource.data = this.orderModel;
            const modalRef = this.dialog.open(OrderdetailsdialogComponent, { data: { dataSource: this.dataSource, searchstring: this.trackForm.value.trackNumberField } });
          } else {
            this.resultSet[0] = res;
            this.resultSet[1] = this.trackForm.value.trackNumberField;
            this.dataTransfer.loadData(this.resultSet);
            this.router.navigate(['/publicorderdetails']);
          }
        }
        if (res.length > commonNumbers.three) {
          if (this.mobileView) {
            this.message = homeComponentConst.errorMessage.numberExceededMobile
          } else {
            this.message = homeComponentConst.errorMessage.numberOfRecordLimit;
          }
          const modalRef = this.dialog.open(MessagepopupComponent, { data: { message: this.message, searchstring: this.trackForm.value.trackNumberField, headerString: this.headerString } });
        }
        if (res.length == commonNumbers.zero) {
          if (this.mobileView) {
            this.message = homeComponentConst.errorMessage.noResultMobile;
          } else {
            this.message = homeComponentConst.errorMessage.recordNotFound;
          }
          const modalRef = this.dialog.open(MessagepopupComponent, { data: { message: this.message, searchstring: this.trackForm.value.trackNumberField, headerString: this.headerString } });
        }

      }, error => this.errorMessage = <any>error);
    }
    catch (error) {
      throw error;
    }
  }

  PasteSearchCreteria(event: any) {
    try {
      event.preventDefault();
      let data = event;
      this.pastedText = event.clipboardData.getData(homeComponentConst.text).trim();
      var searchTextOldValue = this.trackForm.get(homeComponentConst.trackNumberField).value.trim();
      var searchData = CopyPasteData(searchTextOldValue, this.pastedText)
      this.trackForm.setValue({
        trackNumberField: searchData,
      });
    }
    catch (error) {
      throw error;
    }
  }


  openSubmitOrderPage() {
    let navigationExtras: any = {
      queryParams: {
        "urlPath": encodeURIComponent(RouteLinks.submitordergrid)
      }
    }
    localStorage.setItem(homeComponentConst.widgetName, SubmitOderConst.submitOrder);
    this.router.navigate(['/login'], navigationExtras);
  }

  openSearch() {
    let navigationExtras: any = {
      queryParams: {
        "urlPath": encodeURIComponent(RouteLinks.searchandreport)
      }
    }
    localStorage.setItem(homeComponentConst.widgetName, AdvanceSearchAccessDoc.orderText.formName);
    this.router.navigate(['/login'], navigationExtras);
  }

  openAccessDoc() {
    let navigationExtras: any = {
      queryParams: {
        "urlPath": encodeURIComponent(RouteLinks.accessdocument),
      }
    }
    localStorage.setItem(homeComponentConst.widgetName, DocumentsConst.AccessDocuments.accessDocuments);
    this.router.navigate(['/login'], navigationExtras);
  }

  openLoginForm() {
    this.router.navigate(['/login']);
  }

  openDialog() {
    this.dialog.open(LoginpopupComponent);
  }
}
