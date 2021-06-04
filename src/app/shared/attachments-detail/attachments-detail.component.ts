import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { OpenDocumentDialogueComponent } from 'src/app/logx-modules/documents/open-document-dialogue/open-document-dialogue.component';
import { DocumentsConst,OrderDetailConst,CommonConst,commonNumbers } from 'src/app/configs/constants';
import { OrderAttachmentModel } from '../models/order/order';
import { GetContentType } from 'src/app/shared/common/common-method'
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { AccessDocumentService } from 'src/app/logx-services/documents/access-document.service';
import { MatSort } from '@angular/material/sort';
import { AccessorialsService } from 'src/app/logx-services/accessorials/accessorials.service';
import { accessorialAttachment } from '../models/accessorials/accessorials.model';
import { UploadAndLookupDetailService } from 'src/app/logx-services/common/upload-and-lookup-detail.service';
@Component({
  selector: 'app-attachments-detail',
  templateUrl: './attachments-detail.component.html',
  styleUrls: ['./attachments-detail.component.scss']
})
export class AttachmentsDetailComponent implements OnInit {

  @Input() isDisplay:boolean= false;
  orderAttachmentData: OrderAttachmentModel[] = [];
 @Input() orderAttachmentdataSource = new MatTableDataSource(this.orderAttachmentData);
  len: number;
 @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
  this.orderAttachmentdataSource.sort = sort;  
}
PreviewData: any;
@ViewChild(MatPaginator, { static: false }) set conten(paginator: MatPaginator) {
  this.orderAttachmentdataSource.paginator = paginator;
}
  pageSizeOptions: any[] = [];
  pageSize: number;
  activePageData = [];
  resData:any;
  Lookuptype: string = 'grid-pagecount';
  orderAttachmentColumns = [
    { field: 'documentDate', header: OrderDetailConst.date },
    { field: 'documentType', header: CommonConst.docType },
    { field: 'docDescription', header: CommonConst.description },
    { field: 'fileType', header: OrderDetailConst.fileType },
  ]
  attachmentDisplayedColumns = ['documentDate', 'documentType', 'docDescription', 'fileType'];
  DocumentsConst = DocumentsConst;
  OrderDetailConst= OrderDetailConst;
  CommonConst = CommonConst;
  commonNumbers=commonNumbers;
  constructor(public dialog: MatDialog,public accessorialService:AccessorialsService,
    public uploadService: UploadAndLookupDetailService) { }

  ngOnInit(): void {    
  }

  ngAfterViewInit() {
  
    try { 
        this.uploadService.GetLookupDetails(this.Lookuptype).subscribe(async data => {
        if (data && data.length > 0) {
          let pagenumber = data.find(x => x.lookupText === DocumentsConst.AccessDocuments.default && x.lookupText != null && x.lookupText != undefined).lookupDisplayText;
          this.pageSize =  Number(pagenumber);
          this.pageSizeOptions = await data;
          let filteredList = data.filter(itemX => itemX.lookupText != DocumentsConst.AccessDocuments.default && itemX.lookupText != null && itemX.lookupText != undefined);
          this.pageSizeOptions = filteredList.map(e => e.lookupDisplayText)
          this.resData =  this.orderAttachmentdataSource.data; 
          this.len =  this.resData.length;
          this.activePageData =  this.resData.slice(commonNumbers.zero,  this.pageSize);  
        }
      })
    }
    catch (error) {
      throw error;
    }
  }


  OpenDocument(row: accessorialAttachment) {
    let contentType;
    let fileType = row.fileType.trim().toLocaleLowerCase();
    contentType = GetContentType(fileType);    
    
    this.accessorialService.OpenFile(row.serviceExceptionDocId).subscribe(async res => {
      if (res) {
        let file = new Blob([res], { type: contentType });
        this.PreviewData = URL.createObjectURL(file);
        const dialogRef = this.dialog.open(OpenDocumentDialogueComponent, { data: { PreviewData: this.PreviewData, documentType: fileType,documentName: row.serviceExceptionNum } });

        await dialogRef.afterClosed().subscribe(result => {

          if (result && result.event) {

            if (result.event ==  DocumentsConst.AccessDocuments.fullScreen) {

              switch (fileType) {
                case DocumentsConst.AccessDocuments.docx:
                case DocumentsConst.AccessDocuments.doc:
                case DocumentsConst.AccessDocuments.xls:
                  var fileLink = document.createElement('a');
                  fileLink.href = this.PreviewData;
                  fileLink.download = row.docDescription;
                  fileLink.click();
                  break;
                case DocumentsConst.AccessDocuments.msg: var fileLink = document.createElement('a');
                  fileLink.href = this.PreviewData;
                  fileLink.download = row.docDescription + '.msg';
                  fileLink.click();
                  break;
                default: window.open(this.PreviewData,  DocumentsConst.AccessDocuments.preview);
                  break;
              }
            }
          }
        });

      }
    });
  }

  //ToDo:Future drag and drop functionaity of grid columns
  attachmentTableDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.attachmentDisplayedColumns, event.previousIndex, event.currentIndex);
  }
  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePageData = this.resData.slice(firstCut, secondCut);
  }
}
