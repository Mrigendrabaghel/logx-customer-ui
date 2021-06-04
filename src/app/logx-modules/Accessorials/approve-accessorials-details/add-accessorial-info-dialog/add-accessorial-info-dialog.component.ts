import { Inject, AfterViewInit } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { AccessorialAdditionalInfo, CommonConst, ApproveAccessorial, OrderDetailConst } from 'src/app/configs/constants';
import { RouteLinks } from 'src/app/configs/RoutePath';
import { AccessorialsService } from 'src/app/logx-services/accessorials/accessorials.service';
import { UploadAndLookupDetailService } from 'src/app/logx-services/common/upload-and-lookup-detail.service';
import { AccessorialStatus, AdditionalInfo, AccessorialAdditionalInfoRequest } from 'src/app/shared/models/accessorials/accessorials.model';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  selector: 'app-add-accessorial-info-dialog',
  templateUrl: './add-accessorial-info-dialog.component.html',
  styleUrls: ['./add-accessorial-info-dialog.component.scss']
})
export class AddAccessorialInfoDialogComponent implements OnInit {
  CommonConst = CommonConst;
  serviceExceptionNum: any;
  AccessorialAdditionalInfo = AccessorialAdditionalInfo;
  Lookuptype: string = 'AdditionalAccessorial';
  incidentComments: AdditionalInfo[] = [];
  additionalInfoItem: AdditionalInfo = <AdditionalInfo>{};
  accessorialStatus: AccessorialStatus = <AccessorialStatus>{};
  accStatus: AccessorialStatus = <AccessorialStatus>{};
  ordersData: any = [];
  Data: any = [];
  showtext: boolean = false;
  form: FormGroup;
  error: boolean = false;
  additionalInfoRequest: AccessorialAdditionalInfoRequest = <AccessorialAdditionalInfoRequest>{};
  errorMessage: any;
  ordersFormArrayLength: number;
  orderFromArrayTwo: any;
  constructor(private dialogRef: MatDialogRef<AddAccessorialInfoDialogComponent>, public accessorialService: AccessorialsService,
    private fb: FormBuilder, private uploadService: UploadAndLookupDetailService, private _focusMonitor: FocusMonitor,
    public router: Router, @Inject(MAT_DIALOG_DATA) private data: any, public snackBar: MatSnackBar) {

    this.serviceExceptionNum = data.serviceExceptionNum;
    this.form = this.fb.group({
      otherinfovalue: [],
      orders: new FormArray([], this.minSelectedCheckboxes())
    });
    this.uploadService.GetLookupDetails(this.Lookuptype).subscribe(data => {
      this.ordersData = data;
      this.error = true;
      console.log(this.ordersData)
      this.addCheckboxes();
    });

  }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    this._focusMonitor.stopMonitoring(document.getElementById('navButton_1'));
 }

  get ordersFormArray() {
    return this.form.controls.orders as FormArray;
  }

  private addCheckboxes() {
    this.ordersData.forEach(() => this.ordersFormArray.push(new FormControl(false)));
    this.ordersFormArrayLength = (this.ordersData.length/2);
    this.orderFromArrayTwo = this.ordersData.splice(3);
  }
  minSelectedCheckboxes(min = 1) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls.map(control => control.value)
        .reduce((prev, next) => next ? prev + next : prev, 0);
      return totalSelected >= min ? null : { required: true };
    };

    return validator;
  }

  submit() {
    this.incidentComments = [];
    var otherinfovalue = this.form.value.otherinfovalue;

    const selectedOrderIds = this.form.value.orders.map((checked, i) => checked ? this.ordersData[i].lookupText : null)
      .filter(v => v !== null);
    selectedOrderIds.forEach(x => {
      this.additionalInfoItem = <AdditionalInfo>{};
      this.additionalInfoItem.entity = AccessorialAdditionalInfo.serviceException;
      this.additionalInfoItem.entityNum = this.serviceExceptionNum;
      this.additionalInfoItem.commentType = AccessorialAdditionalInfo.serviceExceptionComment;
      this.additionalInfoItem.comment = (x.toLowerCase() === AccessorialAdditionalInfo.other) ? otherinfovalue : x;
      this.incidentComments.push(this.additionalInfoItem);
    });
    this.accessorialStatus.accessorialStatus = AccessorialAdditionalInfo.accessorialStatus;
    this.accessorialStatus.entity = ApproveAccessorial.entity;
    this.accessorialStatus.entityNum = this.serviceExceptionNum;
    this.additionalInfoRequest.incidentComments = this.incidentComments;
    this.additionalInfoRequest.accessorialStatus = this.accessorialStatus;
    this.dialogRef.close({ event: CommonConst.close })
    //AddAccessorialAdditionalInfo
    this.accessorialService.AddAccessorialAdditionalInfo(this.additionalInfoRequest).subscribe(async data => {
      if (data) {
        if (data.result.toLowerCase() == OrderDetailConst.success) {
          //If success close popup and navigate back to accessorial list 
          this.snackBar.open(AccessorialAdditionalInfo.requestSubmitted, '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          }).afterDismissed().subscribe(() => {
            this.router.navigate([RouteLinks.approveAccessrialsGrid]);
          });
        }
      }
    }, error => console.log(<any>error + "entityNum: " + this.serviceExceptionNum));
  }

  onCheckboxChange(lookupText: string, isChecked: boolean) {
    if (lookupText.toLowerCase() === AccessorialAdditionalInfo.other && isChecked == true) {
      this.showtext = true;
    }
    if (lookupText.toLowerCase() === AccessorialAdditionalInfo.other && isChecked == false) {
      this.showtext = false;
    }
  }

  closePopup() {
    this.dialogRef.close({ event: CommonConst.close })
  }

}
