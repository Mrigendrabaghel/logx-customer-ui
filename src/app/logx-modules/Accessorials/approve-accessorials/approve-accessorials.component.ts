import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Accessorials, accessorialGrid, PaginationCriteria } from '../../../shared/models/accessorials/accessorials.model';
import { UploadAndLookupDetailService } from 'src/app/logx-services/common/upload-and-lookup-detail.service';
import { AccessorialsService } from 'src/app/logx-services/accessorials/accessorials.service'
import { AccessorialApprovalGrid, DocumentsConst, commonNumbers, CommonConst, ApproveAccessorial } from 'src/app/configs/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteLinks } from 'src/app/configs/RoutePath';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';

@Component({
  selector: 'app-approve-accessorials',
  templateUrl: './approve-accessorials.component.html',
  styleUrls: ['./approve-accessorials.component.scss']
})
export class ApproveAccessorialsComponent implements OnInit {

  paginationCriteria: PaginationCriteria = <PaginationCriteria>{};
  totalLength: number = 0;
  pageNumber: number = 0;
  noRecordsFound: boolean = false;
  accessorialGrid: any = [];
  DocumentsConst = DocumentsConst;
  commonNumbers = commonNumbers;
  ApproveAccessorial = ApproveAccessorial;  
  CommonConst = CommonConst;
  RouteLinks = RouteLinks;
  AccessorialApprovalGrid = AccessorialApprovalGrid;
  Lookuptype: string = 'grid-pagecount';
  pageSizeOptions: any[] = [];
  pageSize: number = 0;
  isDisplayTable: boolean = true;
  accessorialColumns: any;
  accessorialmodel: Accessorials[] = [];
  accessorialDataSource = new MatTableDataSource(this.accessorialmodel)
  fromPage: string;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.accessorialDataSource.sort = sort;
  }
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  // @ViewChild(MatPaginator, { static: false }) set conten(paginator: MatPaginator) {
  //   // this.accessorialDataSource.paginator = paginator;    
  // }
  //@ViewChild(MatPaginator, { static: false })paginator: MatPaginator;
  @ViewChild('paginatorElement', { read: ElementRef }) paginatorHtmlElement: ElementRef;
  countOfPendingApprovals: number = 0;

  constructor(public uploadService: UploadAndLookupDetailService, public accessorialService: AccessorialsService,
    private router: Router, private dataTransfer: DataTransferService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    try {


      this.GetAccessorialGridColumns();

      this.fromPage = decodeURIComponent(this.activatedRoute.snapshot.queryParams['fromPage']);
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
        this.paginationCriteria.todaysDate =new Date;
        this.paginationCriteria.pageNumber = 1;
        this.paginationCriteria.recordPerPage = this.pageSize;        
        this.getAccessorials(this.paginationCriteria);
      }
    })
  }

  GetAccessorialGridColumns() {
    this.accessorialService.GetAccessorialGridColumns(ApproveAccessorial.accessorialGrid).subscribe(data => {
      if (data) {
        this.accessorialGrid = data;
        this.accessorialColumns = (this.accessorialGrid as accessorialGrid[]).map(item => item.headingDBColumn);
        console.log('this.accessorialColumns', this.accessorialColumns);
      }
    })
  }

  ngAfterViewInit() {

    try {  
      this.accessorialDataSource.sort = this.sort;   
      this.accessorialDataSource.sortingDataAccessor = (item, property) => {       
        switch (property) {
          case 'dateOfFiling': return new Date(item.dateOfFiling);
          default: return item[property];
        }
      }; 
      this.accessorialDataSource.paginator = this.paginator;      
      this.GetLookUpDetail();

    }
    catch (error) {
      throw error;
    }
  }

  goToAccessorialDetails(row: any) {
    //To Do: update loadData to serviceExceptionId
    this.dataTransfer.loadData(row)
    this.router.navigate([RouteLinks.approveaccessorialDetails]);
  }

  getAccessorials(paginationCreteria: PaginationCriteria) {
    
    this.accessorialService.GetAccessorials(paginationCreteria).subscribe(data => {
      if (data) {

        this.accessorialDataSource.data = data;        
        this.isDisplayTable = true;
        if (this.totalLength === 0) {
          this.totalLength = Number(data[0].totalRecords);
          this.countOfPendingApprovals = data[0].totalPendingCount;
          
        }
       // this.accessorialDataSource.data.length = this.totalLength;
      } else {
        this.isDisplayTable = false; this.noRecordsFound = true;
        if (this.fromPage == ApproveAccessorial.fromPage) {
          this.router.navigate([RouteLinks.dashboard]);
        }
      }
    })
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

    this.paginationCriteria.pageNumber = PageIndex;
    this.paginationCriteria.recordPerPage = event.pageSize;
    this.paginationCriteria.todaysDate =new Date;
    this.getAccessorials(this.paginationCriteria);
  }

}
