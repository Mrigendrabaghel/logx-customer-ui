import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-registrationpopup',
  templateUrl: './registrationpopup.component.html',
  styleUrls: ['./registrationpopup.component.scss']
})
export class RegistrationpopupComponent {
  header: string = null
  message: string = ""
  cancelButtonText = "Ok"
  isHeader = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<RegistrationpopupComponent>) {
    if (data) {
      this.message = data.message || this.message;
      this.header = data.header || this.header;
      this.isHeader = this.header === null ? false : true;
      if (data.buttonText) {
        this.cancelButtonText = data.buttonText.cancel || this.cancelButtonText;
      }
    }
  }

  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
