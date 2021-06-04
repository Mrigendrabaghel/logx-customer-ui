import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdvanceSearchAccessDoc, BulkSearchConst, CommonConst, commonNumbers, DashboardConst, DocumentsConst, homeComponentConst, TrackOderConst } from 'src/app/configs/constants';
import { RouteLinks } from 'src/app/configs/RoutePath';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { UploadAndLookupDetailService } from 'src/app/logx-services/common/upload-and-lookup-detail.service';
import { TrackOrderService } from 'src/app/logx-services/trackAndTrace/track-order.service';
import { CopyPasteData, previewMatchSortingFn, ReplacePastedDataWithSpace } from 'src/app/shared/common/common-method';
import { bulkSearchDetails, OrderModel } from 'src/app/shared/models/order/order';

@Component({
  selector: 'app-track-criteria-bulk-search',
  templateUrl: './track-criteria-bulk-search.component.html',
  styleUrls: ['./track-criteria-bulk-search.component.scss']
})
export class TrackCriteriaBulkSearchComponent implements OnInit {
  public searchValue = BulkSearchConst.searchValue;
  BulkSearchConst = BulkSearchConst;
  CommonConst = CommonConst;
  commonNumbers = commonNumbers;
  DashboardConst = DashboardConst;
  DocumentsConst = DocumentsConst;
  TrackOderConst = TrackOderConst;
  AdvanceSearchAccessDoc = AdvanceSearchAccessDoc;
  trackForm: FormGroup;
  pastedText: string = '';
  submitted = false;
  isTrackNumberLengthValid = false;
  isShowOrderDetails: boolean = false;
  errorMessage: any;
  message: string;
  TRACK_DATA: OrderModel[] = [];
  dataSource = new MatTableDataSource(this.TRACK_DATA);
  displayedColumns: string[] = BulkSearchConst.displayedColumns;
  searchCriteria: any;
  selectedCriteria: any;
  bulkSearchDetails: bulkSearchDetails = <bulkSearchDetails>{};
  modifyArray: any;
  showError: boolean = false;
  totalCount: any;
  Lookuptype: string = 'grid-pagecount';
  pageSizeOptions: any[] = [];
  pageSize: number;
  activePageData = [];
  resData: any;
  SCriteria: string;
  @ViewChild(MatPaginator, { static: false }) set conten(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.dataSource.sort = sort;
    this.dataSource.sortingDataAccessor = previewMatchSortingFn;
  }
  constructor(private formBuilder: FormBuilder, private trackOrderService: TrackOrderService,
    private dataTransfer: DataTransferService, public router: Router,
    public uploadService: UploadAndLookupDetailService) { }

  ngOnInit(): void {
    this.trackForm = this.formBuilder.group({
      trackNumberFieldSecure: ['', [Validators.required]],
      selectedCriteriaField: ['']
    });
    this.bulkSearchDetails.SearchCriteria = BulkSearchConst.selected.replace('#', '');
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
      // this.dataSource.sort = this.sort;

    }
    catch (error) {
      throw error;
    }
  }

  get f() { return this.trackForm.controls; }

  PasteSearchCreteria(event: any) {
    try {
      event.preventDefault();
      let data = event;
      this.pastedText = event.clipboardData.getData('text').trim();
      var searchTextOldValue = this.trackForm.get('trackNumberFieldSecure').value.trim();
      var searchData = ReplacePastedDataWithSpace(searchTextOldValue, this.pastedText)
      this.trackForm.setValue({
        trackNumberFieldSecure: searchData,
        selectedCriteriaField: this.f.selectedCriteriaField.value
      });
    }
    catch (error) {
      throw error
    }
  }

  focusOutFunction() {
    try {
      this.submitted = true;
      var data = this.trackForm.value;
      var actVal = new Array();
      actVal = data.trackNumberFieldSecure.split('\n');
      if (actVal.length > commonNumbers.hundred) {
        this.isTrackNumberLengthValid = true;
      }
      for (var i = 0; i < actVal.length; i++) {
        var len = actVal[i].length;
        if (len == 0) {
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

  getRecords(searchCriteria: string) {
    try {
      this.submitted = true;
      if (this.trackForm.invalid) {
        return;
      }
      this.modifyArray = searchCriteria.split('\n').join(',');
      if (this.selectedCriteria) {
        this.bulkSearchDetails.SearchCriteria = this.selectedCriteria;
      }
      this.bulkSearchDetails.SearchValue = this.modifyArray;
      this.SCriteria = this.bulkSearchDetails.SearchCriteria;
      // if (this.SCriteria === 'PO') {
      //   this.bulkSearchDetails.SearchCriteria = 'order';
      // }
      this.trackOrderService.bulkTrackCriteria(this.bulkSearchDetails).subscribe(res => {
        if (res !== CommonConst.null) {
          this.totalCount = res.length;
          if (res.length > commonNumbers.one) {
            this.isShowOrderDetails = true;
            this.dataSource.data = res;
            this.activePageData = res.slice(0, this.pageSize);
          }
          if (res.length == commonNumbers.one) {
            this.dataTransfer.loadData(res[0].orderNum);
            this.router.navigate([RouteLinks.viewOrderDetail]);
          }
        }
        if (res === CommonConst.null || res.length == commonNumbers.zero) {
          this.showError = true;
          this.isShowOrderDetails = false;
          this.message = BulkSearchConst.noRecord;
        }

      }, error => this.errorMessage = <any>error);
    }
    catch (error) {
      throw error
    }
  }

  viewDetails(element: any) {
    this.dataTransfer.loadData(element.orderNum)
    this.router.navigate([RouteLinks.viewOrderDetail]);
  }

  selectedCriteriaField(value) {
    console.log(value);
    this.selectedCriteria = value.replace('#', '');
  }

  reset() {
    this.redirectTo(RouteLinks.bulkSearch);
  }

  redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }

  goBack() {
    this.redirectTo(RouteLinks.bulkSearch);
  }
  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.resData = this.dataSource.data;
    this.activePageData = this.resData.slice(firstCut, secondCut);

  }

}
