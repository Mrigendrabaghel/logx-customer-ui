import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditOrderNumberConst } from 'src/app/configs/constants';
@Component({
    selector: 'app-warning-dialog',
    templateUrl: './warning-dialog.component.html',
    styleUrls: ['./warning-dialog.component.scss']
})
export class WarningDialogComponent {
   // message: string = EditOrderNumberConst.saveMessage;
   okButtonText: any
    updatedOrderNumber: number;
    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any,
        private dialogRef: MatDialogRef<WarningDialogComponent>) {
        if (data) {
            this.updatedOrderNumber = data.updatedOrderNumber;
            if (data.buttonText) {
                this.okButtonText = data.buttonText.ok || '';
            }
        }
    }

    onOkClick(): void {
        this.dialogRef.close(true);
    }
}