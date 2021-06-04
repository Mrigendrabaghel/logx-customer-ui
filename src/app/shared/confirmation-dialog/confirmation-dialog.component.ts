import { Component, Inject, AfterViewInit } from '@angular/core';
import {  MatDialogRef, MatDialog,  MAT_DIALOG_DATA } from '@angular/material/dialog';
//import { CommonConst } from 'src/app/configs/constants';
import { FocusMonitor } from '@angular/cdk/a11y';
import { accessorialAttachment, AccessorialStatus, accessorialDetails, accessorialShowComments, accessorialSaveCommentsRequest, AdditionalInfo } from 'src/app/shared/models/accessorials/accessorials.model';
import { AccessorialAdditionalInfo, ApproveAccessorial, CommonConst, commonNumbers, DocumentsConst, IncidentConst, OrderDetailConst, UploadConst } from 'src/app/configs/constants';
import { AccessorialsService } from 'src/app/logx-services/accessorials/accessorials.service';
@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialog {
  message: string = CommonConst.globalErrorMessage.notificationDelete
  message1: string =CommonConst.globalErrorMessage.reasontitle
  rejectflag:boolean = false
  rejectcomment:string
  confirmButtonText: any
  cancelButtonText: any;
  saveCommentsRequest: accessorialSaveCommentsRequest = <accessorialSaveCommentsRequest>{};
  accessorialSaveComments: AdditionalInfo = <AdditionalInfo>{};
  isShowComments: boolean = true;
  serviceExceptionNumb: any;
  enterComments = [{ enteredComment: "" }];
  accessorialCommentsArray = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private _focusMonitor: FocusMonitor,
    public accessorialService: AccessorialsService,
    private dialogRef: MatDialogRef<ConfirmationDialog>) {
      if(data){
    this.message = data.message || this.message;
    this.message1 = data.message1 || this.message1;
    this.rejectflag = data.rejectflag;
    this.rejectcomment=data.rejectcomment || this.rejectcomment;
    if (data.buttonText) {
      this.confirmButtonText = data.buttonText.ok || '';
      this.cancelButtonText = data.buttonText.cancel || '';
    }
      }
  }

  onConfirmClick(): void {
    if(this.rejectflag==true)
    {
      this.dialogRef.close({ rejectcomment: this.rejectcomment });
    }
    else{
      this.dialogRef.close(true);
    }
  }
  ngAfterViewInit() {
    this._focusMonitor.stopMonitoring(document.getElementById('navButton_1'));
 }
 
}
