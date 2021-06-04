import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderModel } from 'src/app/shared/models/order/order';
import { MatTableDataSource } from '@angular/material/table';
import { TrackOrderService } from 'src/app/logx-services/trackAndTrace/track-order.service';
import { CopyPasteData, previewMatchSortingFn } from 'src/app/shared/common/common-method';
import { MessagepopupComponent } from 'src/app/shared/common/messagepopup/messagepopup.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { AdvanceSearchAccessDoc, CommonConst, commonNumbers, DashboardConst, DocumentsConst, homeComponentConst, TrackOderConst } from 'src/app/configs/constants';
import { RouteLinks } from 'src/app/configs/RoutePath';
import { UploadAndLookupDetailService } from 'src/app/logx-services/common/upload-and-lookup-detail.service';


@Component({
  selector: 'app-securetrackorder',
  templateUrl: './securetrackorder.component.html',
  styleUrls: ['./securetrackorder.component.scss']
})
export class SecuretrackorderComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) set conten(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
    this.dataSource.sortingDataAccessor = previewMatchSortingFn;
  }
  isShowBulkSearch: boolean;
  homeComponentConst = homeComponentConst;
  TrackOderConst = TrackOderConst;
  DashboardConst = DashboardConst;
  DocumentsConst = DocumentsConst;
  AdvanceSearchAccessDoc = AdvanceSearchAccessDoc;
  CommonConst = CommonConst;
  commonNumbers = commonNumbers;
  submitted = false;
  trackForm: FormGroup;
  isTrackNumberValid = false;
  isTrackNumberLengthValid = false;
  errorMessage: string;
  isShowOrderDetails: boolean = false;
  ORDER_DATA: OrderModel[] = [];
  public orderModel: OrderModel[];
  pastedText: string = '';
  dataSource = new MatTableDataSource(this.ORDER_DATA);
  message: string;
  searchCriteria: string;
  subscription: Subscription;
  displayedColumns: string[] = ['orderNumber', 'status', 'firstTCN', 'originLocation', 'deliveryLocation', 'pickUpDate', 'aDeliveryDate'];
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset)
  navBarOpened: boolean = true;
  headerString: string = homeComponentConst.confirmationMessage.headerString;
  Lookuptype: string = 'grid-pagecount';
  pageSizeOptions: any[] = [];
  pageSize: number;
  activePageData = [];
  resData:any;
  len: number;

  constructor(private formBuilder: FormBuilder,
    private trackOrderService: TrackOrderService,
    public dialog: MatDialog,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private dataTransfer: DataTransferService,
    public uploadService: UploadAndLookupDetailService) { }

  ngOnInit() {
    this.trackForm = this.formBuilder.group({
      trackNumberFieldSecure: ['', [Validators.required, Validators.minLength(CommonConst.minLength)]]
    });
    try {
      this.subscription = this.dataTransfer.obj.subscribe(data => { this.searchCriteria = data; });
      this.searchCriteria = this.searchCriteria === undefined || this.searchCriteria === null || this.searchCriteria === " " ? localStorage.getItem(DocumentsConst.AccessDocuments.searchCriteria) : this.searchCriteria;
      localStorage.removeItem(DocumentsConst.AccessDocuments.searchCriteria)
      if (this.searchCriteria !== CommonConst.undefined && 
        this.searchCriteria !== " " && this.searchCriteria !== CommonConst.null
        && this.searchCriteria !== "null") {
        this.getRecordsFromDashboard(this.searchCriteria);
      }
    }
    catch (error) {
      throw error
    }
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

  get f() { return this.trackForm.controls; }

  getRecordsFromDashboard(searchCriteria: string) {
    this.trackOrderService.GetshipmentDetails(searchCriteria).subscribe(res => {
      if (res !== CommonConst.null) {
        if (res.length > commonNumbers.one) {
          this.isShowOrderDetails = true;
          this.dataSource.data = res;
          this.len = res.length;
          this.activePageData = res.slice(0, this.pageSize);  


        }

        if (res.length == commonNumbers.one) {
          this.dataTransfer.loadData(res[0].orderNum)
          this.router.navigate(['/dashboard/vieworderdetails']);
        
          //this.dataTransfer.loadData(res[0].orderNum)
          //this.router.navigate(['/dashboard/securetrackorder']);///////changed route from vieworderdetails
        }
        // else{
        //   this.router.navigate(['/dashboard/vieworderdetails']);
        // }
        // if (res.length > commonNumbers.ten) {
        //   this.message = homeComponentConst.errorMessage.numberOfRecordLimit;
        //   const modalRef = this.dialog.open(MessagepopupComponent, { data: { message: this.message, searchstring: searchCriteria, headerString: this.headerString } });
        // }
      }
      if (res === CommonConst.null || res.length == commonNumbers.zero) {
        this.message = homeComponentConst.errorMessage.recordNotFound;
        const modalRef = this.dialog.open(MessagepopupComponent, { data: { message: this.message, searchstring: searchCriteria, headerString: this.headerString } });
      }

    }, error => {
      this.errorMessage = <any>error
      this.message = homeComponentConst.errorMessage.recordNotFound;
      const modalRef = this.dialog.open(MessagepopupComponent, { data: { message: this.message, searchstring: searchCriteria, headerString: this.headerString } });
    });
  }

  getRecords(searchCriteria: string) {
    try {
      this.submitted = true;
      if (this.trackForm.invalid) {
        return;
      }
      this.trackOrderService.GetshipmentDetails(searchCriteria).subscribe(res => {
        if (res !== CommonConst.null) {
          // if (res.length > commonNumbers.one && res.length < commonNumbers.eleven) {
          if (res.length > commonNumbers.one) {
            this.isShowOrderDetails = true;
            this.dataSource.data = res;
            this.len = res.length;
            this.activePageData = res.slice(0, this.pageSize);  

          }
          if (res.length == commonNumbers.one) {
            this.dataTransfer.loadData(res[0].orderNum)

            this.router.navigate(['/dashboard/vieworderdetails']);
            
          }
          // if (res.length > commonNumbers.ten) {
          //   this.message = homeComponentConst.errorMessage.numberOfRecordLimit;
          //   const modalRef = this.dialog.open(MessagepopupComponent, { data: { message: this.message, searchstring: searchCriteria, headerString: this.headerString } });
          // }
        }
        if (res === CommonConst.null || res.length == commonNumbers.zero) {
          this.message = homeComponentConst.errorMessage.recordNotFound;
          const modalRef = this.dialog.open(MessagepopupComponent, { data: { message: this.message, searchstring: searchCriteria, headerString: this.headerString } });
        }

      }, error => {
        this.errorMessage = <any>error
        this.message = homeComponentConst.errorMessage.recordNotFound;
        const modalRef = this.dialog.open(MessagepopupComponent, { data: { message: this.message, searchstring: searchCriteria, headerString: this.headerString } });
      });
    }
    catch (error) {
      throw error
    }
  }

  PasteSearchCreteria(event: any, formName, controlName) {​​​​​
    try {​​​​​
      event.preventDefault();
      let data = event;
      this.pastedText = event.clipboardData.getData('text').trim();
      var searchTextOldValue = formName.get(controlName).value.trim();
      var searchData = CopyPasteData(searchTextOldValue, this.pastedText)
      formName.get(controlName).setValue(this.pastedText);
      formName.get(controlName).setValue(searchData);
    }​​​​​
    catch(error) {​​​​​
      throw error
    }​​​​​
  }​​​​​

  focusOutFunction() {
    try {
      this.submitted = true;
      var data = this.trackForm.value;
      var actVal = new Array();
      actVal = data.trackNumberFieldSecure.split(',');
      if (actVal.length > commonNumbers.hundred) {
        this.isTrackNumberLengthValid = true;
      }
      for (var i = 0; i < actVal.length; i++) {
        var len = actVal[i].length;
        if (len < CommonConst.minLength || len > CommonConst.maxLength) {
          this.submitted = true;
          this.isTrackNumberLengthValid = true;
          this.trackForm.controls[TrackOderConst.trackNumberFieldSecure].setErrors({ 'errors': true });
        }
      }
    }
    catch (error) {
      throw error
    }
  }

  viewDetails(element: any) {
    this.dataTransfer.loadData(element.orderNum)
    this.router.navigate(['/dashboard/vieworderdetails']);
  }

  expandCollapse() {
    this.navBarOpened = !this.navBarOpened;
  }

  openBulkSearch() {
    this.router.navigate([RouteLinks.bulkSearch]);
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.resData=this.dataSource.data;   
    this.activePageData = this.resData.slice(firstCut, secondCut);
  
  }

}
