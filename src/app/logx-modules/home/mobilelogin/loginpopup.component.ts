import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonConst, MobileLogin } from 'src/app/configs/constants';

@Component({
  selector: 'app-loginpopup',
  templateUrl: './loginpopup.component.html',
  styleUrls: ['./loginpopup.component.scss']
})
export class LoginpopupComponent implements OnInit {
  MobileLogin = MobileLogin;
  CommonConst = CommonConst;
  constructor(private dialogRef: MatDialogRef<LoginpopupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ){
    
  }
  ngOnInit(): void {
  }

}
