import { Component, Inject } from '@angular/core';
import {  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditOrderNumberConst } from 'src/app/configs/constants';
@Component({
  selector: 'app-edit-orderNumber-confirmation-modal',
  templateUrl: './edit-orderNumber-confirmation-modal.component.html',
  styleUrls: ['./edit-orderNumber-confirmation-modal.component.scss']
})
export class EditOrderNumberConfirmationModal {
  message: string = EditOrderNumberConst.saveMessage;
  confirmButtonText: any
  cancelButtonText: any;
  previousOrderNumber: number;
  updatedOrderNumber: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EditOrderNumberConfirmationModal>) {
      if(data){
        this.previousOrderNumber = data.previousOrderNumber;
        this.updatedOrderNumber = data.updatedOrderNumber;
    if (data.buttonText) {
      this.confirmButtonText = data.buttonText.ok || '';
      this.cancelButtonText = data.buttonText.cancel || '';
    }
      }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

  onCancelClick()
  {
    this.dialogRef.close(false);
  }

}