import { Component, OnInit, Input, ViewChild, HostListener, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { CopyPasteData } from 'src/app/shared/common/common-method'
import { AccessDocumentModel } from '../../../shared/models/document/access-document-model';
import { AccessDocumentService } from 'src/app/logx-services/documents/access-document.service';
import { SeachReportService } from 'src/app/logx-services/searchAndReport/seach-report.service';
import { AdvanceSearchService } from 'src/app/logx-services/searchAndReport/advance-search.service';
import { MatDialog } from '@angular/material/dialog';
import { MessagepopupComponent } from 'src/app/shared/common/messagepopup/messagepopup.component';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { DocumentsConst, CommonConst, commonNumbers, DashboardConst } from 'src/app/configs/constants';
import { DocumentLookupDetailModel } from 'src/app/shared/models/order/advance-search';
import { Subject } from 'rxjs';
import { RouteLinks } from 'src/app/configs/RoutePath';
@Component({
  selector: 'app-accessdocuments',
  templateUrl: './accessdocuments.component.html',
  styleUrls: ['./accessdocuments.component.scss']
})
export class AccessdocumentsComponent implements OnInit {

  commonNumbers = commonNumbers;
  DocumentsConst = DocumentsConst;
  CommonConst = CommonConst;
  DashboardConst = DashboardConst;
  formName: string = "Access Documents";
  isTrackNumberValid = false;
  isTrackNumberLengthValid = false;
  accessDocumentForm: FormGroup;
  message: string = '';
  pastedText: string = '';
  submitted: boolean = false;
  isDisplayTable: boolean = false;
  searchRecord: number = 0;
  searchCriteria: string = '';
  @Output() isShowDocumentSearch = new EventEmitter<({ isAccessDoc: boolean, formName: string })>();
  isShowDocumentAdvanceSearch: boolean = false;
  @Input('clickSubjectDoc') clickSubjectDoc: Subject<any>;
  errorMessage: any;
  AccessdataSource: AccessDocumentModel[] = [];
  dataSource = new MatTableDataSource(this.AccessdataSource);
  constructor(private formBuilder: FormBuilder,
    private accessDocumentServices: AccessDocumentService,
    private activatedRoute: ActivatedRoute,
    private router: Router, private searchReportService: SeachReportService,
    private advanceSearchService: AdvanceSearchService,
    public dialog: MatDialog,
    private dataTransfer: DataTransferService) {
  }

  ngOnChanges(): void {
    if (this.clickSubjectDoc != null) {
      this.clickSubjectDoc.subscribe(e => {
        this.getSearchOrderDetails(e)
      })
    }
  }
  ngOnInit() {
    try {
      this.accessDocumentForm = this.formBuilder.group({
        searchAccessDocument: ['', [Validators.required]]
      })
      this.dataTransfer.obj.subscribe(data => { this.searchCriteria = data; }).closed;
      if (typeof (this.searchCriteria) == 'boolean') {
        if (this.searchCriteria == true) {
          this.isShowDocumentAdvanceSearch = true;
        }
      } else {
        this.searchCriteria = this.searchCriteria == undefined || this.searchCriteria == '' ? localStorage.getItem(DocumentsConst.AccessDocuments.searchCriteria) : this.searchCriteria;
        localStorage.removeItem(DocumentsConst.AccessDocuments.searchCriteria)
        if (this.searchCriteria !== undefined && this.searchCriteria !== " " && this.searchCriteria !== null && this.searchCriteria != "true" && this.searchCriteria != "undefined" && this.searchCriteria != "null") {
          this.getDocumentsFromDashboard(this.searchCriteria);
        }
      }
    }
    catch (error) {
      throw error;
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunload($event: Event): void {
    localStorage.setItem(DocumentsConst.AccessDocuments.searchCriteria, this.searchCriteria);
  }

  get f() { return this.accessDocumentForm.controls; }

  getDocumentsFromDashboard(searchValue: any) {
    try {
      this.searchCriteria = searchValue;
      this.GetDocuments(searchValue);
    }
    catch (error) {
      throw error;
    }
  }

  GetDocuments(searchValue: any) {
    this.searchCriteria = searchValue;
    this.accessDocumentServices.GetAccessDocument(searchValue).subscribe(res => {
      if (res.length > 0) {
        this.dataSource.data = res;
        this.isDisplayTable = true;
        this.searchRecord = commonNumbers.one; //Records found
      }
      else {
        this.searchRecord = commonNumbers.two; //No records found by default
      }
    });
  }

  ChangeSearchCreteria(event: any) {
    let data = event;
  }

  //Copy Paste data from XL column rows will be pasted as comma separated value.
  PasteSearchCreteria(event: any) {
    try {
      event.preventDefault();
      let data = event;
      this.pastedText = event.clipboardData.getData(DocumentsConst.AccessDocuments.text).trim();
      var searchTextOldValue = this.accessDocumentForm.get(DocumentsConst.AccessDocuments.searchAccessDocument).value.trim();

      var searchData = CopyPasteData(searchTextOldValue, this.pastedText)
      this.accessDocumentForm.setValue({
        searchAccessDocument: searchData,
      });
    }
    catch (error) {
      throw error;
    }
  }

  //Get access Documents
  getAccessDocuments(searchValue: any) {
    try {
      this.submitted = true;
      this.isDisplayTable = false;
      this.searchRecord = commonNumbers.one;
      if (this.accessDocumentForm.valid) {
        this.GetDocuments(searchValue);
      }
    }
    catch (error) {
      throw error;
    }
  }

  openAdvanceSearch() {
    this.dataSource.data = [];
    this.router.navigate([RouteLinks.advanceSearchDocument]);
    this.isShowDocumentSearch.emit({ isAccessDoc: this.isShowDocumentAdvanceSearch, formName: this.formName })
  }


  public errorHandling = (control: string, error: string) => {
    return this.accessDocumentForm.controls[control].hasError(error);
  }

  focusOutFunction() {
    try {
      var data = this.accessDocumentForm.value;
      var actVal = new Array();
      actVal = data.searchAccessDocument.split(',');
      if (actVal.length > CommonConst.minLength) {
        this.isTrackNumberLengthValid = true;
      }

      for (var i = 0; i < actVal.length; i++) {
        var len = actVal[i].length;
        if (len < CommonConst.minLength || len > CommonConst.maxLength) {
          this.submitted = true;
          this.isTrackNumberValid = true;
          this.accessDocumentForm.controls[DocumentsConst.AccessDocuments.searchAccessDocument].setErrors({ 'errors': true });
        }
      }
    }
    catch (error) {
      throw error;
    }

  }

  getSearchOrderDetails(docs) {
    this.isShowDocumentAdvanceSearch = false;
    this.submitted = false;
    this.accessDocumentForm.controls[DocumentsConst.AccessDocuments.searchAccessDocument].setValue("");
    this.accessDocumentForm.controls[DocumentsConst.AccessDocuments.searchAccessDocument].setValidators(null);
    this.searchRecord = commonNumbers.one;
    if (docs != DocumentsConst.AccessDocuments.cancel) {
      this.advanceSearchService.getDocumentAdvanceSearchGridValue(docs).subscribe(response => {
        if (response.length > 0) {
          this.isDisplayTable = true;
          this.dataSource.data = response;
          this.searchRecord = commonNumbers.one;
        } else {
          this.searchRecord = commonNumbers.two; //No records found by default
        }
      }, error => {
        this.searchRecord = commonNumbers.two;
        this.errorMessage = <any>error
      });
    }
  }

}
