import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApproveAccessorial, CommonConst, DocumentsConst, IncidentConst, OrderDetailConst, ReportIncidentDisplayRecord } from 'src/app/configs/constants';
import { RouteLinks } from 'src/app/configs/RoutePath';
import { AccessorialsService } from 'src/app/logx-services/accessorials/accessorials.service';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { IncidentReportService } from 'src/app/logx-services/incidentReport/incident-report.service';
import { GetContentType } from 'src/app/shared/common/common-method';
import { attachmentCol, attachmentGridCol } from 'src/app/shared/models/accessorials/accessorials.model';
import { OpenDocumentDialogueComponent } from '../../documents/open-document-dialogue/open-document-dialogue.component';

@Component({
  selector: 'app-report-incident-display-record',
  templateUrl: './report-incident-display-record.component.html',
  styleUrls: ['./report-incident-display-record.component.scss']
})
export class ReportIncidentDisplayRecordComponent implements OnInit {
  enterComments = [];
  IncidentConst = IncidentConst;
  OrderDetailConst = OrderDetailConst;
  CommonConst = CommonConst;
  ReportIncidentDisplayRecord = ReportIncidentDisplayRecord;
  RouteLinks = RouteLinks;
  IncidentNumber: string;
  errorMessage: string;
  incidentRecord: any;
  attachments = [];
  attachmentGrid: any = {};
  attachmentColumns;
  attachmentModel: attachmentCol[] = [];
  attachmentDataSource = new MatTableDataSource(this.attachmentModel);
  attachmentCount: number;
  subscription: Subscription;
  PreviewData: any;
  panelOpenState = false;

  constructor(public router: Router, private activatedRoute: ActivatedRoute, private incidentReportService: IncidentReportService,
    public accessorialService:AccessorialsService, private dataTransfer: DataTransferService,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.dataTransfer.obj.subscribe(data => { this.IncidentNumber = data; });
    this.IncidentNumber = this.IncidentNumber === undefined || this.IncidentNumber === null || this.IncidentNumber === " " ? localStorage.getItem(DocumentsConst.AccessDocuments.searchCriteria) : this.IncidentNumber;
      localStorage.removeItem(DocumentsConst.AccessDocuments.searchCriteria)
    this.getAttachmentGrid();
    this.getIncidentRecordDetails(this.IncidentNumber);
  }
  @HostListener('window:beforeunload', ['$event'])
  beforeunload($event: Event): void {
    localStorage.setItem(DocumentsConst.AccessDocuments.searchCriteria,this.IncidentNumber);
  }
  goToAdvanceSearch() {
    this.router.navigate([RouteLinks.reportincidentadvancesearch]);
  }

  getIncidentRecordDetails(IncidentNumber) {
    this.incidentReportService.GetIncidentDisplayRecord(IncidentNumber).subscribe(response => {
      if (response) {
        this.incidentRecord = response;
        this.enterComments = this.incidentRecord.comments.split(',');
        if(this.incidentRecord.attachments != "") {
          this.attachments = JSON.parse(this.incidentRecord.attachments);
          console.log('this.attachments', this.attachments);
          this.attachmentCount = this.attachments.length;
          this.attachmentDataSource.data = this.attachments;
        } else {
          this.attachmentCount = 0;
        }
        
      }
    }, error => this.errorMessage = <any>error);
  }

  getAttachmentGrid() {
    this.accessorialService.GetAccessorialGridColumns(ApproveAccessorial.attachmentGrid).subscribe(data => {
      if (data) {
        this.attachmentGrid = data; 
        this.attachmentColumns = (this.attachmentGrid as attachmentGridCol[]).map(item=>item.headingDBColumn); 
        
      }
    })
  }

  OpenDocument(row) {
    let contentType;
    let fileType = row.DocFormat.trim().toLocaleLowerCase();
    contentType = GetContentType(fileType);

    this.incidentReportService.OpenFile(row.DOCUMENTID).subscribe(async res => {
      if (res) {
        let file = new Blob([res], { type: contentType });
        this.PreviewData = URL.createObjectURL(file);
        const dialogRef = this.dialog.open(OpenDocumentDialogueComponent, { data: { PreviewData: this.PreviewData, documentType: fileType } });

        await dialogRef.afterClosed().subscribe(result => {

          if (result && result.event) {

            if (result.event == DocumentsConst.AccessDocuments.fullScreen) {

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
                default: window.open(this.PreviewData, DocumentsConst.AccessDocuments.preview);
                  break;
              }
            }
          }
        });

      }
    });
  }

}
