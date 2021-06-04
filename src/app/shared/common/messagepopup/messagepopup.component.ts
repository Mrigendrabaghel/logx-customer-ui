import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonConst, homeComponentConst } from 'src/app/configs/constants';

@Component({
  selector: 'app-messagepopup',
  templateUrl: './messagepopup.component.html',
  styleUrls: ['./messagepopup.component.scss']
})
export class MessagepopupComponent implements OnInit {
  CommonConst=CommonConst;
  homeComponentConst = homeComponentConst;
  message:string;
  searchstring:string;
  header: any;
  mobileView: boolean = false;
  constructor(private dialogRef: MatDialogRef<MessagepopupComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.message=data.message
    this.searchstring= data.searchstring;
    this.header = data.headerString;
  }

  ngOnInit(): void {
    if (window.screen.width >= 360 && window.screen.width <= 1024) { // 768px portrait
      this.mobileView = true;
    }
  }

  close() {
    this.dialogRef.close();
  }

}
