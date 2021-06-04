import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BulkSearchConst, CommonConst, commonNumbers, DocumentsConst, SubmitorderdetailsConst, SubmitOderConst } from 'src/app/configs/constants';
import { RouteLinks } from 'src/app/configs/RoutePath';
import { AccessorialsService } from 'src/app/logx-services/accessorials/accessorials.service';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { UploadAndLookupDetailService } from 'src/app/logx-services/common/upload-and-lookup-detail.service';
import { RegistrationService } from 'src/app/logx-services/registration/registration.service';
import { SubmitOrderService } from 'src/app/logx-services/submitOrder/submit-order.service';
import { Userinfo } from 'src/app/shared/common/common-method';
import { PaginationCriteria } from 'src/app/shared/models/accessorials/accessorials.model';
import { OrderGrid } from 'src/app/shared/models/order/order';
import { DraftOrders, ShipwithCreatedByModal } from 'src/app/shared/models/submitOrder/submitOrder.model';

@Component({
  selector: 'app-submit-order-grid',
  templateUrl: './submit-order-grid.component.html',
  styleUrls: ['./submit-order-grid.component.scss']
})
export class SubmitOrderGridComponent implements OnInit {
  SubmitorderdetailsConst = SubmitorderdetailsConst;
  SubmitOderConst = SubmitOderConst;
  BulkSearchConst = BulkSearchConst;
  commonNumbers = commonNumbers;
  searchValue: PaginationCriteria = <PaginationCriteria>{};
  errorMessage: any;
  draftOrderCount: any;
  submitDraftOrdersGridColumns: any;
  submitDraftOrderColumns: any[];
  DRAFT_DATA: DraftOrders[] = [];
  dataSource = new MatTableDataSource(this.DRAFT_DATA);
  pageNumber: any = 0;
  Lookuptype: string = 'grid-pagecount';
  pageSize: number;
  pageSizeOptions: any[] = [];
  userInfodata: any;
  display: boolean;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  previousShipWith: string;
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(public router: Router,
    public submitOrderService: SubmitOrderService,
    public accessorialService: AccessorialsService,
    public uploadService: UploadAndLookupDetailService,
    private dataTransfer: DataTransferService,
    private regServiceService: RegistrationService) { }

    async ngOnInit(): Promise<void> {
      await this.getUserInformation();
      this.GetSubmitDraftOrdersGridColumns();
    }
    async getUserInformation() {
      let userName = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.email;
      let data= await this.regServiceService.getUserInfo(userName);
     this.userInfodata=data; 
     if (this.userInfodata.filter(x => x.submitorders === true).length === 0) {
     this.display=false;
    }else{
     this.display=true;
     } //localStorage.setItem('userInfo', JSON.stringify(data));
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
        this.searchValue.todaysDate = new Date;
        this.searchValue.pageNumber = 1;
        this.searchValue.recordPerPage = this.pageSize;
        this.getDraftOrders(this.searchValue);
      }
    })
  }

  getDraftOrders(paginationCreteria: PaginationCriteria) {
    this.searchValue.pageName = "";
    let userInfo = Userinfo();
    this.searchValue.teamInfo = userInfo !== undefined ? userInfo.teamname : "";
    this.searchValue.userId = userInfo !== undefined ? userInfo.userid : "";
    this.searchValue.recordPerPage = paginationCreteria.recordPerPage;
    this.searchValue.pageNumber = paginationCreteria.pageNumber;
    this.submitOrderService.GetDraftOrderCount(this.searchValue).subscribe(res => {
      if (res) {
        this.draftOrderCount = res[0].totalCount;
        this.dataSource.data = res;        
      }
    }, error => this.errorMessage = <any>error)
  }

  goToSubmitOrder(element) {
    const previousShipWith: ShipwithCreatedByModal = JSON.parse(localStorage.getItem('SaveShipWith'));
    if(previousShipWith!=null){
    this.previousShipWith=previousShipWith.shipWith;
    localStorage.setItem('previousShipWith', JSON.parse(JSON.stringify(  this.previousShipWith )));
    }
   
    localStorage.removeItem("SaveShipWith");
  localStorage.removeItem("currentOrderId");
    this.dataTransfer.loadData(element == null ? null : element.orderId);
    this.router.navigate([RouteLinks.submitordermain]);
  }

  GetSubmitDraftOrdersGridColumns() {
    this.accessorialService.GetAccessorialGridColumns(SubmitorderdetailsConst.draftOrderGrid).subscribe(data => {
      if (data) {
        this.submitDraftOrdersGridColumns = data;
        this.submitDraftOrderColumns = (this.submitDraftOrdersGridColumns as OrderGrid[]).map(item => item.headingDBColumn);
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
    this.searchValue.recordPerPage = event.pageSize;
    this.searchValue.teamInfo = JSON.parse(localStorage.getItem('userInfo'))[0].teamname;
    this.searchValue.userId = JSON.parse(localStorage.getItem('userInfo'))[0].userid;
    this.getDraftOrders(this.searchValue);

  }


  itemTableDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.submitDraftOrderColumns, event.previousIndex, event.currentIndex);
  }
}
