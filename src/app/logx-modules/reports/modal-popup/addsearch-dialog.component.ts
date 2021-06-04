import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {  CommonConst } from 'src/app/configs/constants';

@Component({
    selector: 'dialog-overview-example-dialog',
    templateUrl: 'addsearch-dialog.component.html',
  })
  export class AddSearchDialog {
    CommonConst=CommonConst;
    constructor(
      public dialogRef: MatDialogRef<AddSearchDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }