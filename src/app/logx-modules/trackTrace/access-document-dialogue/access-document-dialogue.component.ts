import { Component, OnInit,Inject,Input } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table';
import { AccessDocumentModel } from 'src/app/shared/models/document/access-document-model';
import { CommonConst } from 'src/app/configs/constants';
@Component({
  selector: 'app-access-document-dialogue',
  templateUrl: './access-document-dialogue.component.html',
  styleUrls: ['./access-document-dialogue.component.scss']
})
export class AccessDocumentDialogueComponent implements OnInit {
  DATA:AccessDocumentModel[]=[];
  @Input() dataSource = new MatTableDataSource(this.DATA);
  CommonConst = CommonConst;
  constructor(private dialogRef: MatDialogRef<AccessDocumentDialogueComponent>, @Inject(MAT_DIALOG_DATA) private data: any
   ) { 
     this.dataSource.data = data.dataSource;
   }

  ngOnInit(): void {
  }

  closePopup(){
    this.dialogRef.close()
  }

}
