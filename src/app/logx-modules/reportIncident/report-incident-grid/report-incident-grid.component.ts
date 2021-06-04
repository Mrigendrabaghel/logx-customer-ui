import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BulkSearchConst, CommonConst, commonNumbers, DocumentsConst, IncidentConst } from 'src/app/configs/constants';
import { RouteLinks } from 'src/app/configs/RoutePath';
import { IncidentReportService } from 'src/app/logx-services/incidentReport/incident-report.service';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { UploadAndLookupDetailService } from 'src/app/logx-services/common/upload-and-lookup-detail.service';
import { SubmitOrderService } from 'src/app/logx-services/submitOrder/submit-order.service';
import { PaginationCriteria } from 'src/app/shared/models/accessorials/accessorials.model';
import { Pagination } from 'src/app/shared/models/incident/report-incident.model';
import { OrderGrid } from 'src/app/shared/models/order/order';
import { DraftOrders } from 'src/app/shared/models/submitOrder/submitOrder.model';
import { Userinfo } from 'src/app/shared/common/common-method';

@Component({
  selector: 'app-report-incident-grid',
  templateUrl: './report-incident-grid.component.html',
  styleUrls: ['./report-incident-grid.component.scss']
})
export class ReportIncidentGridComponent implements OnInit {
  IncidentConst = IncidentConst;
  BulkSearchConst = BulkSearchConst;
  commonNumbers = commonNumbers;
  // searchValue: PaginationCriteria = <PaginationCriteria>{};
  searchValue: Pagination = <Pagination>{};
  errorMessage: any;
  draftOrderCount: any;
  DraftIncidentGridColumns: any;
  DraftIncidentColumns: any[];
  DRAFT_DATA: DraftOrders[] = [];
  dataSource = new MatTableDataSource(this.DRAFT_DATA);
  pageNumber: any = 0;
  Lookuptype: string = 'grid-pagecount';
  pageSize: number;
  pageSizeOptions: any[] = [];


  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(public router: Router,
    public submitOrderService: SubmitOrderService,
    public incidentReportService: IncidentReportService,
    public uploadService: UploadAndLookupDetailService,
    private dataTransfer: DataTransferService) {
  }

  ngOnInit(): void {
    this.GetDraftIncidentGridColumns();
  }

  ngAfterViewInit() {
    try {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.GetLookUpDetail();
    }
    catch (error) {
      throw error;
    }
  }

  GetLookUpDetail() {
    this.uploadService.GetLookupDetails(this.Lookuptype).subscribe(data => {
      if (data && data.length > 0) {
        let lookUp = data.find(x => x.lookupText === DocumentsConst.AccessDocuments.default && x.lookupText != null && x.lookupText != undefined);
        let pagenumber = ((lookUp) ? lookUp.lookupDisplayText : 0);
        this.pageSize = Number(pagenumber);
        this.pageSizeOptions = data;
        let filteredList = data.filter(itemX => itemX.lookupText != DocumentsConst.AccessDocuments.default && itemX.lookupText != null && itemX.lookupText != undefined);
        this.pageSizeOptions = filteredList.map(e => e.lookupDisplayText)
        this.searchValue.pageNumber = commonNumbers.one;
        this.searchValue.recordsPerPage = this.pageSize;
        this.searchValue.pageName = '';
        this.GetIncidentList(this.searchValue);
      }
    })
  }

  GetIncidentList(searchValue) {
    let userInfo = Userinfo();
    this.searchValue.teamInfo = userInfo !== undefined ? userInfo.teamname : "";
    this.searchValue.userId = userInfo !== undefined ? userInfo.userid : "";
    this.incidentReportService.GetTotalIncident(searchValue).subscribe(res => {
      if (res) {
        this.draftOrderCount = res[0].totalrecords;
        this.dataSource.data = res;

        console.log('this.dataSource.data', this.dataSource.data);
      }
    }, error => this.errorMessage = <any>error)
  }

  goToSubmitOrder(element) {
    this.dataTransfer.loadData(element == null ? null : element.incidentreportid);
    this.router.navigate([RouteLinks.reportIncident]);
  }

  GetDraftIncidentGridColumns() {
    this.incidentReportService.GetIncidentGridColumns(IncidentConst.draftIncidentGrid).subscribe(data => {
      if (data) {
        this.DraftIncidentGridColumns = data;
        this.DraftIncidentColumns = (this.DraftIncidentGridColumns as OrderGrid[]).map(item => item.headingDBColumn);
      }
    }, error => this.errorMessage = <any>error);
  }

  onPaginateChange(event: any) {
    let PageIndex;

    if (event.pageIndex > this.pageNumber) {
      PageIndex = event.pageIndex + 1;
      // alert('Clicked on Next Page:'+PageIndex);
    } else {
      // Clicked on previous button
      PageIndex = event.previousPageIndex;
      //alert('Clicked on Previous Page:'+PageIndex);
    }
    this.pageNumber = event.pageIndex;
    if (PageIndex == 0 && event.previousPageIndex == 0) {
      PageIndex = 1
    }
    else if (PageIndex == 0 && event.previousPageIndex > 0) {
      PageIndex = event.previousPageIndex
    }
    this.searchValue.pageNumber = PageIndex;
    this.searchValue.recordsPerPage = event.pageSize;
    this.GetIncidentList(this.searchValue);
  }


  itemTableDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.DraftIncidentColumns, event.previousIndex, event.currentIndex);
  }


}
