import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IncidentConst, CommonConst,  UserPreferenceConst } from 'src/app/configs/constants'; 
@Component({
  selector: 'app-user-preference-deletion',
  templateUrl: './user-preference-deletion.component.html',
  styleUrls: ['./user-preference-deletion.component.scss']
})
export class UserPreferenceDeletionComponent implements OnInit {
  CommonConst = CommonConst;
  message: string;
  UserPreferenceConst=UserPreferenceConst;
  confirmButtonText: any;
  cancelButtonText: any;
  constructor(public dialogRef: MatDialogRef<UserPreferenceDeletionComponent>,   
    @Inject(MAT_DIALOG_DATA) private data: any) {
   if(data){
    this.message = data.message || this.message;
    if (data.buttonText) {
      this.confirmButtonText = data.buttonText.ok || '';
      this.cancelButtonText = data.buttonText.cancel || '';
    }
      }
     }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  onConfirmClick(): void {
    this.dialogRef.close(true);
  }

}
