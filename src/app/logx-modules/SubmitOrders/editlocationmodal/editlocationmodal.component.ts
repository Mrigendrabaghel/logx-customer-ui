import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editlocationmodal',
  templateUrl: './editlocationmodal.component.html',
  styleUrls: ['./editlocationmodal.component.scss']
})
export class EditlocationmodalComponent implements OnInit {
  message: string;
  confirmButtonText: any
  cancelButtonText: any;
  constructor(    @Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<EditlocationmodalComponent>) {
    if (data) {
      this.message = data.message || this.message;
      if (data.buttonText) {
        this.confirmButtonText = data.buttonText.ok || '';
        this.cancelButtonText = data.buttonText.cancel || '';
      }
    }
   }

  ngOnInit(): void {
  }

}
