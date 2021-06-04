import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonConst, commonNumbers, DashboardConst, globalTrackTrace, homeComponentConst } from 'src/app/configs/constants';
import { RouteLinks } from 'src/app/configs/RoutePath';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { TrackOrderService } from 'src/app/logx-services/trackAndTrace/track-order.service';
import { CopyPasteData } from 'src/app/shared/common/common-method';

@Component({
  selector: 'app-global-track-trace',
  templateUrl: './global-track-trace.component.html',
  styleUrls: ['./global-track-trace.component.scss']
})
export class GlobalTrackTraceComponent implements OnInit {

  DashboardConst = DashboardConst;
  homeComponentConst = homeComponentConst;
  CommonConst = CommonConst;
  commonNumbers = commonNumbers;
  globalTrackTrace = globalTrackTrace;
  showError: boolean = false;
  inputText: any;
  trackTraceForm: FormGroup;
  errorMessage: any;
  status: string;
  orderNum: string;
  pickUpDate: Date;
  deliveryDate: Date;
  result: boolean = false;
  pastedText: string = '';
  trackSubmitted = false;
  isInvalidTrackSearchValue = false;
  multipleRecords: boolean = false;

  constructor(public dialModalRef: MatDialogRef<GlobalTrackTraceComponent>, private formBuilder: FormBuilder,
    private trackOrderService: TrackOrderService, private dataTransfer: DataTransferService, public router: Router,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.trackTraceForm = this.formBuilder.group({
      trackNumberField: ['', [Validators.required, Validators.minLength(CommonConst.minLength), Validators.maxLength(CommonConst.maxLength)]]
    });
  }

  get f() { return this.trackTraceForm.controls };
  get trackNumberField(): any { return this.trackTraceForm.get('trackNumberField'); }

  getTrackRecords() {
    this.trackSubmitted = true;
      if (this.trackTraceForm.invalid) {
        return;
      }
    this.trackOrderService.GetshipmentDetails(this.trackTraceForm.value.trackNumberField).subscribe(res => {
      console.log(res);
      if (res !== CommonConst.null) {
        if (res.length == commonNumbers.one) {
          this.result = true;
          this.status = res[0].status;
          this.orderNum = res[0].orderNum;
          this.pickUpDate = res[0].pickupDateTimeUtc;
          this.deliveryDate = res[0].deliveryDateTimeUtc;
        }
        if (res.length > commonNumbers.one) {
          this.multipleRecords = true;
        }
      }
      if (res === CommonConst.null || res.length == commonNumbers.zero) {
        this.showError = true;
      }

    }, error => {
      this.errorMessage = <any>error
      this.showError = true;
    });
  }

  trackAnotherShipment() {
    this.result = false;
    this.opendialog();
  }

  PasteSearchCreteria(event: any, formName, controlName) {
    try {
      this.pastedText = "";
      event.preventDefault();
      let data = event;
      this.pastedText = event.clipboardData.getData('text').trim();
      var searchTextOldValue = formName.get(controlName).value.trim();
      var searchData = CopyPasteData(searchTextOldValue, this.pastedText)
      formName.get(controlName).setValue(searchData);
    }
    catch(error) {
      throw error
    }
  }

  focusOutFunction(controlName, value, formName, isSubmitted) {
    try {
      isSubmitted === DashboardConst.formValidation.trackSubmitted ? this.trackSubmitted = true : false;
      var data = value;
      var actVal = new Array();
      actVal = data.split(',');
      for (var i = 0; i < actVal.length; i++) {
        var len = actVal[i].length;
          if (len < CommonConst.minLength || len > CommonConst.maxLength) {
            isSubmitted === DashboardConst.formValidation.trackSubmitted ? this.isInvalidTrackSearchValue = true : false;
            formName.controls[controlName].setErrors({ 'errors': true });
          }
        }
      }
    catch(error) {
      throw error
    }
  }

  clear() {
    this.showError = false;
    this.opendialog();
  }

  redirectTo(uri:string){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
    this.router.navigate([uri]));
  }

  viewTrackingDetails() {
    this.dataTransfer.loadData(this.orderNum);
    this.dialog.closeAll();
    this.redirectTo(RouteLinks.viewOrderDetail);
  }

  opendialog() {
    this.dialog.closeAll();
    const openDialog = this.dialog.open(GlobalTrackTraceComponent, {
      height: 'fit-content',
      width: '500px',
      position: {top: '4%', left: '65%'}
    });

    openDialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
