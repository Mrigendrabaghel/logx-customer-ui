import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog,MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {SafePipe} from 'src/app/logx-modules/documents/access-document-table/safe';
import { DocumentsConst, CommonConst } from 'src/app/configs/constants';
import { pdfDefaultOptions } from 'ngx-extended-pdf-viewer';

@Component({
  selector: 'app-open-document-dialogue',
  templateUrl: './open-document-dialogue.component.html',
  styleUrls: ['./open-document-dialogue.component.scss']
})
export class OpenDocumentDialogueComponent implements OnInit {

  PreviewData : any;
  documentType:string = '';
  documentName: string = '';
  DocumentsConst = DocumentsConst;
  CommonConst = CommonConst;

  constructor(private dialogRef: MatDialogRef<OpenDocumentDialogueComponent>, @Inject(MAT_DIALOG_DATA) private data: any
  ) { 
   
     this.PreviewData = data.PreviewData;
     this.documentType = data.documentType;
     this.documentName = data.documentName;  
     pdfDefaultOptions.assetsFolder = 'bleeding-edge';   
   }

   ngOnInit(): void {
}

openFullscreen() {
  this.dialogRef.close({event: DocumentsConst.AccessDocuments.fullScreen}); 

}

  closePopup(){
    this.dialogRef.close({event:CommonConst.close})
  } 

}
