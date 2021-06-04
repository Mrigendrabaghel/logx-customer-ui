import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { AccessDocumentModel } from 'src/app/shared/models/document/access-document-model';
import { AccessDocumentService } from 'src/app/logx-services/documents/access-document.service';
import { MatDialog } from '@angular/material/dialog';
import { OpenDocumentDialogueComponent } from 'src/app/logx-modules/documents/open-document-dialogue/open-document-dialogue.component';
import { UploadAndLookupDetailService } from 'src/app/logx-services/common/upload-and-lookup-detail.service';
import { DocumentsConst } from 'src/app/configs/constants';
import { GetContentType } from 'src/app/shared/common/common-method'

@Component({
  selector: 'app-access-document-table',
  templateUrl: './access-document-table.component.html',
  styleUrls: ['./access-document-table.component.scss']
})
export class AccessDocumentTableComponent implements OnInit {
  DocumentsConst = DocumentsConst;
  Lookuptype: string = 'grid-pagecount';
  pageSizeOptions: any[] = [];
  pageSize: number;
  @Input() isDisplayTable: boolean = true;
  DATA: AccessDocumentModel[] = [];
  activePageData = [];
  resData:any;
  clickCount: number=0;
  selection = new SelectionModel<AccessDocumentModel>(true, []);
  displayedColumns: string[] = ['checked', 'orderNum', 'loadNumber', 'gbolNumber', 'tcnNumber', 'documentType', 'documentDescription',
    'documentDate', 'documentId', 'documentName', 'documentFormat'];
  @Input() dataSource = new MatTableDataSource(this.DATA);
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  PreviewData: any;
  @ViewChild(MatPaginator, { static: false }) set conten(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }

  constructor(private accessDocumentServices: AccessDocumentService, public dialog: MatDialog,
    public uploadService: UploadAndLookupDetailService) {

  }
  
  ngOnInit() {
  }

  ngAfterViewInit() {
    try {
      this.uploadService.GetLookupDetails(this.Lookuptype).subscribe(async data => {
        if (data && data.length > 0) {
          let pagenumber = data.find(x => x.lookupText === DocumentsConst.AccessDocuments.default && x.lookupText != null && x.lookupText != undefined).lookupDisplayText;
          this.pageSize = await Number(pagenumber);
          this.pageSizeOptions = data;
          let filteredList = data.filter(itemX => itemX.lookupText != DocumentsConst.AccessDocuments.default && itemX.lookupText != null && itemX.lookupText != undefined);
          this.pageSizeOptions = filteredList.map(e => e.lookupDisplayText)
          this.resData=  this.dataSource.data; 
          this.activePageData =  this.resData.slice(0,  this.pageSize);  
        }
      })
    }
    catch (error) {
      throw error;
    }
  }

  OpenDocument(row: AccessDocumentModel) {

    this.clickCount++;
    setTimeout(() => {
    if (this.clickCount === 1) {
    
    try {
    let contentType;
    let fileType = row.documentFormat.trim().toLocaleLowerCase();
    contentType = GetContentType(fileType);
    
    this.accessDocumentServices.OpenFile(row.loadDocId, row.documentType).subscribe(async res => {
    
    if (res) {
    let file = new Blob([res], { type: contentType });
    this.PreviewData = URL.createObjectURL(file);
    const dialogRef = this.dialog.open(OpenDocumentDialogueComponent, { data: { PreviewData: this.PreviewData, documentType: fileType, documentName: row.documentName } });
    
    await dialogRef.afterClosed().subscribe(result => {
    
    if (result && result.event) {
    
    if (result.event == DocumentsConst.AccessDocuments.fullScreen) {
    
    switch (fileType) {
    case DocumentsConst.AccessDocuments.docx:
    case DocumentsConst.AccessDocuments.doc:
    case DocumentsConst.AccessDocuments.xls:
    var fileLink = document.createElement('a');
    fileLink.href = this.PreviewData;
    fileLink.download = row.documentName;
    fileLink.click();
    break;
    case DocumentsConst.AccessDocuments.msg: var fileLink = document.createElement('a');
    fileLink.href = this.PreviewData;
    fileLink.download = row.documentName + '.msg';
    fileLink.click();
    break;
    default: window.open(this.PreviewData, DocumentsConst.AccessDocuments.preview);
    break;
    }
    }
    }
    });
    }
    });
    }
    catch (error) {
    throw error;
    }
    }
    
    
    
    else if (this.clickCount === 2 ||this.clickCount > 2) {
    
    try {
    let contentType;
    let fileType = row.documentFormat.trim().toLocaleLowerCase();
    contentType = GetContentType(fileType);
    
    this.accessDocumentServices.OpenFile(row.loadDocId, row.documentType).subscribe(async res => {
    
    if (res) {
    let file = new Blob([res], { type: contentType });
    this.PreviewData = URL.createObjectURL(file);
    const dialogRef = this.dialog.open(OpenDocumentDialogueComponent, { data: { PreviewData: this.PreviewData, documentType: fileType, documentName: row.documentName } });
    
    await dialogRef.afterClosed().subscribe(result => {
    
    if (result && result.event) {
    
    if (result.event == DocumentsConst.AccessDocuments.fullScreen) {
    
    switch (fileType) {
    case DocumentsConst.AccessDocuments.docx:
    case DocumentsConst.AccessDocuments.doc:
    case DocumentsConst.AccessDocuments.xls:
    var fileLink = document.createElement('a');
    fileLink.href = this.PreviewData;
    fileLink.download = row.documentName;
    fileLink.click();
    break;
    case DocumentsConst.AccessDocuments.msg: var fileLink = document.createElement('a');
    fileLink.href = this.PreviewData;
    fileLink.download = row.documentName + '.msg';
    fileLink.click();
    break;
    default: window.open(this.PreviewData, DocumentsConst.AccessDocuments.preview);
    break;
    }
    }
    }
    });
    }
    });
    }
    catch (error) {
    throw error;
    }
    }
    this.clickCount = 0;
    }, 400)
    
    
    
    }    
 
  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.activePageData = this.dataSource.data.slice(firstCut, secondCut);
  }

}
