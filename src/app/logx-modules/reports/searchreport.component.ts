import { Component, ElementRef, EventEmitter, HostListener, Inject, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SearchModel } from 'src/app/shared/models/searchandreport/search';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderGrid, OrderModel, ViewReportingDashboard } from 'src/app/shared/models/order/order';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { SeachReportService } from 'src/app/logx-services/searchAndReport/seach-report.service';
import { TrackOrderService } from 'src/app/logx-services/trackAndTrace/track-order.service';
import { SnackbarService } from 'src/app/logx-services/common/snackbar.service';
import { AddSearchDialog } from './modal-popup/addsearch-dialog.component';
import { CopyPasteData, previewMatchSortingFn } from 'src/app/shared/common/common-method';
import { MessagepopupComponent } from 'src/app/shared/common/messagepopup/messagepopup.component';
import { AdvanceSearchService } from 'src/app/logx-services/searchAndReport/advance-search.service';
import { OrderexcelService } from 'src/app/logx-services/common/orderexcel.service';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { OrderSearchReport, homeComponentConst, AdvanceSearchAccessDoc, DashboardConst, DocumentsConst, CommonConst, customizeGridConstant, commonNumbers } from 'src/app/configs/constants';
import { OrderCustomizeGridDialogComponent } from '../documents/advance-search-access-document/order-customize-grid-dialog/order-customize-grid-dialog.component';
import { AccessorialsService } from 'src/app/logx-services/accessorials/accessorials.service';
import { PaginationCriteria } from 'src/app/shared/models/accessorials/accessorials.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatPaginator } from '@angular/material/paginator';
import { UploadAndLookupDetailService } from 'src/app/logx-services/common/upload-and-lookup-detail.service';
import { ExportGridDataComponent } from './export-grid-data/export-grid-data.component';
import { OrderLookupDetailModel } from 'src/app/shared/models/order/advance-search';
import { AdvanceSearchAccessDocumentComponent } from '../documents/advance-search-access-document/advance-search-access-document.component';
import { Subject } from 'rxjs';
import { RouteLinks } from 'src/app/configs/RoutePath';

@Component({
  selector: 'app-searchreport',
  templateUrl: './searchreport.component.html',
  styleUrls: ['./searchreport.component.scss']
})

export class SearchreportComponent implements OnInit {
  AdvanceSearchAccessDoc = AdvanceSearchAccessDoc;
  OrderSearchReport = OrderSearchReport;
  DashboardConst = DashboardConst;
  DocumentsConst = DocumentsConst;
  CommonConst = CommonConst;
  formName: string = AdvanceSearchAccessDoc.orderText.formName;
  searchName: string;
  userId: string;
  errorMessage: string;
  public searchModel: SearchModel[];
  output: any;
  addSearchModel: SearchModel = new SearchModel();
  searchReportForm: FormGroup;
  isShowOrderDetails: boolean = false;
  isSearchOrderLengthValid: boolean = false;
  submitted = false;
  selectedRecentValue: string;
  // ORDER_DATA: OrderModel[] = [];
  // public orderModel: OrderModel[];
  ORDER_DATA: ViewReportingDashboard[] = [];
  public orderModel: ViewReportingDashboard[];
  pastedText: string = '';
  isShowAdvanceSearch: boolean = false;
  exportData: any;
  headerString: string = OrderSearchReport.orderResult;
  displayedColumns: string[] = ['orderNumber', 'gBolNumber', 'orderStatus', 'pickUpDate', 'deliveryDate', 'orderProgress'];
  dataSource = new MatTableDataSource(this.ORDER_DATA);
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('userTable') userTable: ElementRef;
  message: string;
  searchCriteria: string;
  Queries: SearchModel["query"];
  isShowExport: boolean;
  searchReportGrid = [];
  searchReportColumns: any[];
  columns: any;
  searchReportDefaultGrid = [];
  customizeGridModel: PaginationCriteria = <PaginationCriteria>{};
  gridColumns: string;
  result: any;
  Lookuptype: string = 'grid-pagecount';
  pageSizeOptions: any[] = [];
  pageSize: number;
  isShowCustomized: boolean = false;
  commonNumbers = commonNumbers;
  allColumnsData: any;
  activePageData = [];
  resData: any;
  len: number;
  resResult: any;
  @Output() isShowOrderSearch = new EventEmitter<({ isOrderLookup: boolean, formName: string })>();
  @Input() model: string = <string>{};
  isOrderSearch: boolean = true;
  OrderSearch: boolean;
  @ViewChild(MatPaginator, { static: false }) set conten(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @Input('clickSubjectOrder') clickSubjectOrder: Subject<any>;
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
  }
  constructor(public router: Router,
    public dialog: MatDialog,
    private searchReportService: SeachReportService,
    private trackOrderService: TrackOrderService,
    private formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    public searchReportingService: SeachReportService,
    private advanceSearchService: AdvanceSearchService,
    private orderExcelService: OrderexcelService,
    private dataTransfer: DataTransferService, public accessorialService: AccessorialsService,
    public uploadService: UploadAndLookupDetailService) {
    {
      this.Queries = [
        { name: OrderSearchReport.querySnappyCopy },
        { name: OrderSearchReport.queryWords },
        { name: OrderSearchReport.queryReportTCN },
        { name: OrderSearchReport.queryFourthChip }
      ];
    }
  }
  ngOnChanges() {
    if (this.clickSubjectOrder != null) {
      this.clickSubjectOrder.subscribe(e => {
        this.getSearchOrderDetails(e)
      })
    }
  }
  ngOnInit(): void {
    try {
      this.searchReportForm = this.formBuilder.group({
        orderNumberField: ['', [Validators.required, Validators.minLength(5)]]
      });
      this.dataTransfer.obj.subscribe(data => { this.searchCriteria = data; });
      this.GetSearchReportGridColumns().then(res => {
        if (res) {
          if (typeof (this.searchCriteria) == 'boolean') {
            if (this.searchCriteria == true) {
              this.isShowAdvanceSearch = true;
            }
          } else {
            this.searchCriteria = this.searchCriteria === undefined || this.searchCriteria === null || this.searchCriteria === " " ? localStorage.getItem(DocumentsConst.AccessDocuments.searchCriteria) : this.searchCriteria;
            localStorage.removeItem(DocumentsConst.AccessDocuments.searchCriteria)
            if (this.searchCriteria !== undefined && this.searchCriteria !== " " && this.searchCriteria !== null
              && this.searchCriteria != "true" && this.searchCriteria != "null" && this.searchCriteria != "undefined") {
              this.getRecordsFromDashboard(this.searchCriteria);
            }
          }
        }
      })
    }
    catch (error) {
      throw error;
    }
  }

  ngAfterViewInit() {
    // this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.dataSource.sortingDataAccessor = previewMatchSortingFn;
    }
    try {
      this.uploadService.GetLookupDetails(this.Lookuptype).subscribe(async data => {
        if (data && data.length > 0) {
          let pagenumber = data.find(x => x.lookupText === DocumentsConst.AccessDocuments.default && x.lookupText != null && x.lookupText != undefined).lookupDisplayText;
          this.pageSize = await Number(pagenumber);
          this.pageSizeOptions = data;
          let filteredList = data.filter(itemX => itemX.lookupText != DocumentsConst.AccessDocuments.default && itemX.lookupText != null && itemX.lookupText != undefined);
          this.pageSizeOptions = filteredList.map(e => e.lookupDisplayText)
        }
      })
    }
    catch (error) {
      throw error;
    }

  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunload($event: Event): void {
    localStorage.setItem(DocumentsConst.AccessDocuments.searchCriteria, this.searchCriteria);
  }

  get f() { return this.searchReportForm.controls; }

  exportAsXLSX() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = "35%";
    const dialogRef = this.dialog.open(ExportGridDataComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      if (result == false) {
        try {
          let colHeader = this.searchReportDefaultGrid.map(function (item) {
            return item['headingDBColumn'];
          })

          this.customizeGridModel.gridColumn = colHeader.toString();
          this.searchReportService.GetCustomizeOrderList(this.customizeGridModel).subscribe(res => {
            if (res[0].jsonResponse != "" || res != null) {
              let resultData = JSON.parse(res[0].jsonResponse);
              resultData.forEach((element) => {
                Object.keys(element).map(
                  (key) => {
                    let newKey = this.searchReportGrid.filter((x) => x.headingDBColumn === key)[0].headingDisplayText;
                    this.renameKey(element, key, newKey);
                  })
              })
              this.orderExcelService.exportAsExcelFile(resultData, 'OrderGrid_' + `${this.searchCriteria}`);
            }
          });
        }
        catch (error) {
          throw error;
        }
      } else if (result == true) {
        try {
          this.customizeGridModel.gridColumn = CommonConst.allColumns;
          this.searchReportService.GetCustomizeOrderList(this.customizeGridModel).subscribe(res => {
            if (res[0].jsonResponse != "" || res != null) {
              let resultData = JSON.parse(res[0].jsonResponse);
              resultData.forEach((element) => {
                Object.keys(element).map(
                  (key) => {
                    let newKey = this.searchReportGrid.filter((x) => x.headingDBColumn === key)[0].headingDisplayText;
                    this.renameKey(element, key, newKey);
                  })
              })
              this.orderExcelService.exportAsExcelFile(resultData, 'OrderGrid_' + `${this.searchCriteria}`);
            }
          });
        }
        catch (error) {
          throw error;
        }
      }
    });
  }
  renameKey(obj, oldKey, newKey) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }


  getOrderData(searchValue: any) {
    try {
      this.submitted = true;
      if (this.searchReportForm.invalid) {
        return;
      }
      this.customizeGridModel.searchCriteria = searchValue;
      this.searchCriteria = searchValue;
      this.searchReportService.GetCustomizeOrderList(this.customizeGridModel).subscribe(res => {
        if (res[0].jsonResponse != "") {
          this.result = JSON.parse(res[0].jsonResponse);
          if (this.result.length > 1) {
            this.isShowOrderDetails = true;
            this.dataSource.data = this.result;
            this.len = this.result.length;
            this.activePageData = this.result.slice(0, this.pageSize);
            this.isShowExport = true;
          }
          else if (this.result.length == 1) {
            this.dataTransfer.loadData(this.result[0].OrderNumber)
            this.router.navigate(['/dashboard/orderdetails']);
          }
        } else if (res[0].jsonResponse == "" || res === null) {
          this.message = homeComponentConst.errorMessage.recordNotFound;
          const modalRef = this.dialog.open(MessagepopupComponent, { data: { message: this.message, searchstring: searchValue, headerString: this.headerString } });
        }
      }, error => {
        this.errorMessage = <any>error
        this.message = homeComponentConst.errorMessage.recordNotFound;
        const modalRef = this.dialog.open(MessagepopupComponent, { data: { message: this.message, searchstring: searchValue, headerString: this.headerString } });
      });
    }
    catch (error) {
      throw error;
    }
  }

  PasteSearchCreteria(event: any) {
    try {
      event.preventDefault();
      let data = event;
      this.pastedText = event.clipboardData.getData('text').trim();
      var searchTextOldValue = this.searchReportForm.get('orderNumberField').value.trim();

      var searchData = CopyPasteData(searchTextOldValue, this.pastedText)
      this.searchReportForm.setValue({
        orderNumberField: searchData,
      });
    }
    catch (error) {
      throw error;
    }
  }

  focusOutFunction() {
    try {
      this.submitted = true;
      var data = this.searchReportForm.value;
      var actVal = new Array();
      actVal = data.orderNumberField.split(',');

      for (var i = commonNumbers.zero; i < actVal.length; i++) {
        var len = actVal[i].length;
        if (len > commonNumbers.zero && len < commonNumbers.five || len > CommonConst.maxLength) {
          this.submitted = true;
          this.isSearchOrderLengthValid = true;
          this.searchReportForm.controls['orderNumberField'].setErrors({ 'errors': true });
        } else {
          this.isSearchOrderLengthValid = false;
        }
      }
    }
    catch (error) {
      throw error;
    }
  }

  viewDetails(orderNum: string) {
    this.dataTransfer.loadData(orderNum)
    // if(orderNum!=null){
    // this.router.navigate(['/dashboard/orderdetails']);
    // }
    this.router.navigate(['/dashboard/orderdetails']);
  }

  getRecordsFromDashboard(searchValue: any) {
    try {
      this.customizeGridModel.searchCriteria = searchValue;
      this.searchCriteria = searchValue;
      this.searchReportService.GetCustomizeOrderList(this.customizeGridModel).subscribe(res => {
        if (res[0].jsonResponse != "") {
          this.result = JSON.parse(res[0].jsonResponse);
          if (this.result.length == 1) {
            this.dataTransfer.loadData(this.result[0].OrderNumber);
            this.router.navigate(['/dashboard/orderdetails']);
          } else if (this.result.length > 1) {
            this.ORDER_DATA = this.result;
            this.dataSource = new MatTableDataSource(this.ORDER_DATA);
            this.len = this.result.length;
            this.activePageData = this.result.slice(0, this.pageSize);

            this.isShowExport = true;
            this.isShowOrderDetails = true;
          }

        } else if (res === null || res[0].jsonResponse == "") {
          this.message = homeComponentConst.errorMessage.recordNotFound;
          const modalRef = this.dialog.open(MessagepopupComponent, { data: { message: this.message, searchstring: searchValue, headerString: this.headerString } });
        }
      }, error => {
        this.errorMessage = <any>error
        this.message = homeComponentConst.errorMessage.recordNotFound;
        const modalRef = this.dialog.open(MessagepopupComponent, { data: { message: this.message, searchstring: searchValue, headerString: this.headerString } });
      });
    }
    catch (error) {
      throw error;
    }
  }

  DisplayToolTip(item: string): string {
    if (item) {
      return item;
    }
  }


  openAdvanceSearch() {
    this.dataSource.data = [];
    this.isOrderSearch = false;
    //this.dataTransfer.loadData(this.isOrderSearch);
    this.router.navigate([RouteLinks.advanceSearchOrder]);
    this.isShowOrderSearch.next({ isOrderLookup: this.isOrderSearch, formName: this.formName })
  }



  getSearchOrderDetails(model: string) {
    try {
      this.isShowAdvanceSearch = false;
      this.submitted = false;
      this.searchReportForm.get('orderNumberField').setValue("");
      if (model != DocumentsConst.AccessDocuments.cancel) {
        this.advanceSearchService.getOrderAdvanceSearchGridValue(model).subscribe(response => {
          if (response[0].jsonOutput !== "") {
            let resData = JSON.parse(response[0].jsonOutput);
            if (resData.length > 0) {
              this.isShowOrderDetails = true;
              this.dataSource.data = JSON.parse(response[0].jsonOutput);
              this.resResult = JSON.parse(response[0].jsonOutput);
              this.len = this.resResult.length;
              this.activePageData = this.resResult.slice(0, this.pageSize);
            }
          }
          else if (response[0].jsonOutput === null || response[0].jsonOutput === "") {
            this.message = homeComponentConst.errorMessage.recordNotFound;
            const modalRef = this.dialog.open(MessagepopupComponent, { data: { message: this.message, searchstring: response.orderNum, headerString: this.headerString } });
          }
          // else if (response.length > 5) {
          //   this.message = homeComponentConst.errorMessage.numberOfRecordLimit;
          //   const modalRef = this.dialog.open(MessagepopupComponent, { data: { message: this.message, searchstring: response.orderNum, headerString: this.headerString } });
          // } 

        }, error => {
          this.message = homeComponentConst.errorMessage.recordNotFound;
          const modalRef = this.dialog.open(MessagepopupComponent, { data: { message: this.message, headerString: this.headerString } });
          this.errorMessage = <any>error
        });
      }
    }
    catch (error) {
      throw error;
    }
  }

  openCustomizeGrid() {
    const openDialog = this.dialog.open(OrderCustomizeGridDialogComponent, {
      data: {
        searchReportColumns: this.searchReportColumns
      }
    });
    openDialog.afterClosed().subscribe(data => {
      if (data) {
        this.searchReportDefaultGrid = [];
        this.customizeGridModel.gridColumn = data;
        this.searchReportColumns = data.split(', ');
        for (var j = 0; j < this.searchReportGrid.length; j++) {
          for (var k = 0; k < this.searchReportColumns.length; k++) {
            if (this.searchReportGrid[j].headingDBColumn == this.searchReportColumns[k]) {
              this.searchReportDefaultGrid.push(this.searchReportGrid[j]);
            }
          }
        }
        this.isShowCustomized = true;
        this.getRecordsFromDashboard(this.searchCriteria);
      }
    })
  }

  GetSearchReportGridColumns() {
    return new Promise((resolve, reject) => {
      this.accessorialService.GetAccessorialGridColumns(customizeGridConstant.reportFilter).subscribe((data: any[]) => {
        if (data) {
          this.searchReportGrid = data;
          for (var i = 0; i < this.searchReportGrid.length; i++) {
            if (this.searchReportGrid[i].isDefault == true) {
              this.searchReportDefaultGrid.push(this.searchReportGrid[i]);
            }
          }
          this.searchReportColumns = (this.searchReportDefaultGrid as OrderGrid[]).map(item => item.headingDBColumn);
          this.customizeGridModel.gridColumn = this.searchReportColumns.join(', ');
          resolve(this.customizeGridModel.gridColumn);
        }
      }, (error: any) => this.errorMessage = <any>error);
      reject;
    })
  }

  itemTableDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.searchReportColumns, event.previousIndex, event.currentIndex);
  }
  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.resData = this.dataSource.data;
    this.activePageData = this.resData.slice(firstCut, secondCut);

  }

}

