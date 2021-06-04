import { DatePipe } from '@angular/common';
import { createViewChild } from '@angular/compiler/src/core';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AdvanceSearchAccessDoc } from 'src/app/configs/constants';
import { RouteLinks } from 'src/app/configs/RoutePath';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { AdvanceSearchService } from 'src/app/logx-services/searchAndReport/advance-search.service';
import { AdvanceSearchResult, DateField, DocumentLookupDetailModel, NumberField, OrderLookupDetailModel } from 'src/app/shared/models/order/advance-search';
import { SearchreportComponent } from '../../reports/searchreport.component';
import { AccessdocumentsComponent } from '../accessdocuments/accessdocuments.component';

@Component({
  selector: 'app-advance-search-access-document',
  templateUrl: './advance-search-access-document.component.html',
  styleUrls: ['./advance-search-access-document.component.scss']
})
export class AdvanceSearchAccessDocumentComponent implements OnInit {

  @Output() OrderAdvanceSearchObject = new EventEmitter<OrderLookupDetailModel>();
  @Output() DocumentAdvanceSearchObject = new EventEmitter<DocumentLookupDetailModel>();
  clickSubjectDoc: Subject<any> = new Subject();
  clickSubjectOrder: Subject<any> = new Subject();
  errorMessage: string;
  dateQuilifierValue: any;
  AdvanceSearchAccessDoc = AdvanceSearchAccessDoc;
  textQuilifer: any;
  orderStatus: any;
  orderStatusValue: string;
  selectedDateQuilifer: string = '';
  isShowDateQuilifer: boolean = true;
  orderCreatedQuilifer: string = '';
  isShowOrderDateQuilifer: boolean = true;
  selectedDateQuiliferValue: string = '';
  searchForm: FormGroup;
  model: OrderLookupDetailModel = <OrderLookupDetailModel>{};
  document: DocumentLookupDetailModel = <DocumentLookupDetailModel>{};
  deliveryDateField: DateField = <DateField>{};
  orderDateField: DateField = <DateField>{};
  orderNumberField: NumberField = <NumberField>{};
  gbolNumberField: NumberField = <NumberField>{};
  tcnNumberField: NumberField = <NumberField>{};
  originNumberField: NumberField = <NumberField>{};
  destinationNumberField: NumberField = <NumberField>{};
  Priority: boolean = false;
  currentlyDisabledDel: string;
  currentlyDisabledOrd: string;
  docQuilifer: any;
  docTypeValue: string;
  selectedOption: any;
  daysOrHours: any = AdvanceSearchAccessDoc.daysFromToday;
  selectedOptionCreatedDate: any;
  daysHoursCreatedDate: any = AdvanceSearchAccessDoc.daysFromToday;
  dayOrHourValue: any;
  dayOrHourValueDelivery: any;
  dateQuilifer: any;
  destinationNumField: any;
  originNumField: any;
  tcnNumField: any;
  gbolNumField: any;
  orderNumField: any;
  daysHours: any;
  FromDateValue: any;
  FromODateValue: any;
  ToODateValue: any;
  ToDateValue: any;
  date = new Date();
  currentDate: any;
  orderNumberFieldDoc: NumberField;
  dateValidate = new FormControl(new Date());
  poNumberField: NumberField = <NumberField>{};
  poNumField: any;
  isShowDocumentAdvanceSearch: boolean = false;
  isShowOrderAdvanceSearch: boolean = false;
  formName: any;
  formType: any;


  @ViewChild(AccessdocumentsComponent, { static: false }) accessDocument: AccessdocumentsComponent;
  @ViewChild(SearchreportComponent, { static: false }) searchandreport: SearchreportComponent;
  constructor(
    private advanceSearchService: AdvanceSearchService,
    private router: Router,
    private cdref: ChangeDetectorRef,
    private dataTransfer: DataTransferService, public datePipe: DatePipe) {
  }
  ngAfterViewInit() {
    try {
      if (this.router.url === RouteLinks.advanceSearchOrder) {
        this.formName = this.searchandreport.formName;
      } else {
        this.formName = this.accessDocument.formName;
      }
      this.cdref.detectChanges();
    } catch (error) {
      throw error;
    }
  }

  ngOnInit() {
    //this.dataTransfer.obj.subscribe(data => { this.formType = data; }).closed;

    this.currentDate = this.convertDate(this.date);
    this.getDateQuilifier(AdvanceSearchAccessDoc.lookUpParam.DateSearch);
    this.getTextQuilifier(AdvanceSearchAccessDoc.lookUpParam.TextSearch);
    this.getDocQuilifier(AdvanceSearchAccessDoc.lookUpParam.DocType);
    this.getOrderStatus(AdvanceSearchAccessDoc.lookUpParam.status);
    this.getDateFilter(AdvanceSearchAccessDoc.lookUpParam.DateFilter);
    this.getDateHour(AdvanceSearchAccessDoc.lookUpParam.datehour);
    // this.isShowDocumentAdvanceSearchs(false, this.formName)
  }

  getDateQuilifier(lookupType: string) {
    try {
      this.advanceSearchService.GetDateQuilifier(lookupType).subscribe(response => {
        if (response) {
          this.dateQuilifierValue = response;

          for (var i = 0; i <= this.dateQuilifierValue.length; i++) {
            if (this.dateQuilifierValue[i].isDefault == true) {
              this.deliveryDateField.SearchConditionValue = this.dateQuilifierValue[i].lookupText;
              this.orderDateField.SearchConditionValue = this.dateQuilifierValue[i].lookupText;
              break;
            }
          }

        }
      }, error => this.errorMessage = <any>error);
    }
    catch (error) {
      throw error
    }
  }

  getTextQuilifier(lookupType: string) {
    try {
      this.advanceSearchService.GetDateQuilifier(lookupType).subscribe(response => {
        if (response) {
          this.textQuilifer = response;
          for (var i = 0; i <= this.textQuilifer.length; i++) {
            if (this.textQuilifer[i].isDefault == true) {
              this.destinationNumberField.SearchConditionId = this.originNumberField.SearchConditionId = this.tcnNumberField.SearchConditionId = this.gbolNumberField.SearchConditionId = this.orderNumberField.SearchConditionId = this.poNumberField.SearchConditionId = this.textQuilifer[i].lookupDataId;
              this.destinationNumberField.SearchConditionValue = this.originNumberField.SearchConditionValue = this.tcnNumberField.SearchConditionValue = this.gbolNumberField.SearchConditionValue = this.orderNumberField.SearchConditionValue = this.poNumberField.SearchConditionValue = this.textQuilifer[i].lookupText;
              this.destinationNumberField.Value = this.originNumberField.Value = this.tcnNumberField.Value = this.gbolNumberField.Value = this.orderNumberField.Value = this.poNumberField.Value = '';
              break;
            }
          }
        }
      }, error => this.errorMessage = <any>error);
    }
    catch (error) {
      throw error
    }
  }

  getOrderStatus(lookupType: string) {
    try {
      this.advanceSearchService.GetDateQuilifier(lookupType).subscribe(response => {
        this.orderStatus = response;
      }, error => this.errorMessage = <any>error);
    }
    catch (error) {
      throw error
    }
  }

  getDocQuilifier(lookupType: string) {
    try {
      this.advanceSearchService.GetDateQuilifier(lookupType).subscribe(response => {
        this.docQuilifer = response;
      }, error => this.errorMessage = <any>error);
    }
    catch (error) {
      throw error
    }
  }

  getDateFilter(lookupType: string) {
    try {
      this.advanceSearchService.GetDateQuilifier(lookupType).subscribe(response => {
        if (response) {
          this.dateQuilifer = response;
          for (var i = 0; i <= this.dateQuilifer.length; i++) {
            if (this.dateQuilifer[i].isDefault == true) {
              this.deliveryDateField.DateQualifier = this.dateQuilifer[i].lookupText;
              this.orderDateField.DateQualifier = this.dateQuilifer[i].lookupText;
              break;
            }
          }
        }
      }, error => this.errorMessage = <any>error);
    }
    catch (error) {
      throw error
    }
  }

  getDateHour(lookupType: string) {
    try {
      this.advanceSearchService.GetDateQuilifier(lookupType).subscribe(response => {
        this.daysHours = response;
      }, error => this.errorMessage = <any>error);
    }
    catch (error) {
      throw error
    }
  }

  onDateQuiliferSelect(val) {
    this.selectedOption = val;
    this.isShowDateQuilifer = this.deliveryDateField.DateQualifier == AdvanceSearchAccessDoc.dateQualifier.fixed || this.deliveryDateField.DateQualifier == AdvanceSearchAccessDoc.dateQualifier.relative ? true : false;
  }
  onOrderCreatedQuiliferSelect(val) {
    this.selectedOptionCreatedDate = val;
    this.isShowOrderDateQuilifer = this.orderDateField.DateQualifier == AdvanceSearchAccessDoc.dateQualifier.fixed || this.orderDateField.DateQualifier == AdvanceSearchAccessDoc.dateQualifier.relative ? true : false;
  }

  onChangeDisable() {
    if (this.deliveryDateField.TotalDays) {
      this.currentlyDisabledDel = AdvanceSearchAccessDoc.accessDocText.totalHours;
    } else if (this.deliveryDateField.TotalHours) {
      this.currentlyDisabledDel = AdvanceSearchAccessDoc.accessDocText.todalDays;
    } else {
      this.currentlyDisabledDel = '';
    }
  }

  onOChangeDisable() {
    if (this.orderDateField.TotalDays) {
      this.currentlyDisabledOrd = AdvanceSearchAccessDoc.orderText.totalOrderHours;
    } else if (this.orderDateField.TotalHours) {
      this.currentlyDisabledOrd = AdvanceSearchAccessDoc.orderText.totalOrderDays;
    } else {
      this.currentlyDisabledOrd = '';
    }
  }

  convertDate(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [day, mnth, date.getFullYear()].join("/");
  }

  getSearchOrderDetails(clickedVal) {
    if (clickedVal == AdvanceSearchAccessDoc.cancel) {
      if (this.formName == AdvanceSearchAccessDoc.orderText.formName) {
        this.isShowOrderAdvanceSearch = true;
      } else if (this.formName == AdvanceSearchAccessDoc.accessDocText.formName) {
        this.isShowDocumentAdvanceSearch = true;
      }
    } else if (clickedVal == AdvanceSearchAccessDoc.search) {
      this.destinationNumField ? this.destinationNumberField.SearchConditionId = this.destinationNumField[0] : '';
      this.destinationNumField ? this.destinationNumberField.SearchConditionValue = this.destinationNumField[1] : '';
      this.originNumField ? this.originNumberField.SearchConditionId = this.originNumField[0] : '';
      this.originNumField ? this.originNumberField.SearchConditionValue = this.originNumField[1] : '';
      this.tcnNumField ? this.tcnNumberField.SearchConditionId = this.tcnNumField[0] : '';
      this.tcnNumField ? this.tcnNumberField.SearchConditionValue = this.tcnNumField[1] : '';
      this.gbolNumField ? this.gbolNumberField.SearchConditionId = this.gbolNumField[0] : '';
      this.gbolNumField ? this.gbolNumberField.SearchConditionValue = this.gbolNumField[1] : '';
      if (this.currentlyDisabledOrd == AdvanceSearchAccessDoc.orderText.totalOrderHours || this.currentlyDisabledDel == AdvanceSearchAccessDoc.accessDocText.totalHours) {
        if (this.deliveryDateField.DateQualifier == AdvanceSearchAccessDoc.dateQualifier.relative) {
          this.deliveryDateField.TotalDays ? this.deliveryDateField.TotalDays = Number(this.deliveryDateField.TotalDays) : '';
        }
        if (this.orderDateField.DateQualifier == AdvanceSearchAccessDoc.dateQualifier.relative) {
          this.orderDateField.TotalDays ? this.orderDateField.TotalDays = Number(this.orderDateField.TotalDays) : '';
        }
      }
      if (this.currentlyDisabledOrd == AdvanceSearchAccessDoc.orderText.totalOrderDays || this.currentlyDisabledDel == AdvanceSearchAccessDoc.accessDocText.todalDays) {
        if (this.deliveryDateField.DateQualifier == AdvanceSearchAccessDoc.dateQualifier.relative) {
          this.deliveryDateField.TotalHours ? this.deliveryDateField.TotalHours = Number(this.deliveryDateField.TotalHours) : '';
        }
        if (this.orderDateField.DateQualifier == AdvanceSearchAccessDoc.dateQualifier.relative) {
          this.orderDateField.TotalHours ? this.orderDateField.TotalHours = Number(this.orderDateField.TotalHours) : '';
        }
      }
      if (this.formName == AdvanceSearchAccessDoc.orderText.formName) {
        this.orderNumField ? this.orderNumberField.SearchConditionId = this.orderNumField[0] : '';
        this.orderNumField ? this.orderNumberField.SearchConditionValue = this.orderNumField[1] : '';
        this.poNumField ? this.poNumberField.SearchConditionId = this.poNumField[0] : '';
        this.poNumField ? this.poNumberField.SearchConditionValue = this.poNumField[1] : '';
        let fromDelDate = this.datePipe.transform(this.deliveryDateField.FromDateValue, 'yyyy-MM-dd')
        let toDelDate = this.datePipe.transform(this.deliveryDateField.ToDateValue, 'yyyy-MM-dd')
        this.model.DeliverDate = this.deliveryDateField;
        this.model.DeliverDate.FromDateValue = fromDelDate;
        this.model.DeliverDate.ToDateValue = toDelDate;
        let fromOrdDate = this.datePipe.transform(this.orderDateField.FromDateValue, 'yyyy-MM-dd')
        let toOrdDate = this.datePipe.transform(this.orderDateField.ToDateValue, 'yyyy-MM-dd')
        this.model.OrderCreatedDate = this.orderDateField;
        this.model.OrderCreatedDate.FromDateValue = fromOrdDate;
        this.model.OrderCreatedDate.ToDateValue = toOrdDate;
        this.model.OrderStatus = this.orderStatusValue;
        this.model.OrderNumber = this.orderNumberField;
        this.model.PONumber = this.poNumberField;
        // if (this.poNumberField) {
        //   this.orderNumberField = this.poNumberField;
        //   this.model.OrderNumber = this.orderNumberField;
        // }
        this.model.GBOLNumber = this.gbolNumberField;
        this.model.TCNNumber = this.tcnNumberField;
        this.model.OriginNumber = this.originNumberField;
        this.model.DestinationNumber = this.destinationNumberField;
        this.model.todaysDate = new Date();
        this.model.gridColumn = AdvanceSearchAccessDoc.orderText.gridColumn;
        this.model.priority = this.Priority;
        this.isShowOrderAdvanceSearch = true;
        this.clickSubjectOrder.next(this.model);
      } else if (this.formName == AdvanceSearchAccessDoc.accessDocText.formName) {
        let fDate = this.datePipe.transform(this.deliveryDateField.FromDateValue, 'yyyy-MM-dd')
        let tDate = this.datePipe.transform(this.deliveryDateField.ToDateValue, 'yyyy-MM-dd')
        this.document.DocumentCreatedDate = this.deliveryDateField;
        this.document.DocumentCreatedDate.FromDateValue = fDate;
        this.document.DocumentCreatedDate.ToDateValue = tDate;
        let fODate = this.datePipe.transform(this.orderDateField.FromDateValue, 'yyyy-MM-dd')
        let tODate = this.datePipe.transform(this.orderDateField.ToDateValue, 'yyyy-MM-dd')
        this.document.OrderCreatedDate = this.orderDateField;
        this.document.OrderCreatedDate.FromDateValue = fODate;
        this.document.OrderCreatedDate.ToDateValue = tODate;
        this.document.OrderStatus = this.orderStatusValue;
        this.document.DocumentType = this.docTypeValue;
        this.document.OrderNumber = this.orderNumberField.Value === undefined || this.orderNumberField.Value === "" ? undefined : this.orderNumberField.Value;
        this.document.GBOLNumber = this.gbolNumberField;
        this.document.TCNNumber = this.tcnNumberField;
        this.document.OriginNumber = this.originNumberField;
        this.document.DestinationNumber = this.destinationNumberField;
        this.document.todaysDate = new Date();
        this.document.gridColumn = AdvanceSearchAccessDoc.accessDocText.gridColumn;
        this.clickSubjectDoc.next(this.document);
        this.isShowDocumentAdvanceSearch = true;
      }
    }
  }

  onChangeValue(val) {
    this.daysOrHours = val;
  }

  onChangeValueCreatedDate(val) {
    this.daysHoursCreatedDate = val;
  }

  keyPressNumbers(event) {
    var inp = String.fromCharCode(event.keyCode);
    // Allow numbers, alpahbets, space, underscore
    if (/[0-9-/]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  isShowDocumentAdvSearch(event) {
    this.isShowDocumentAdvanceSearch = event.isAccessDoc;
    this.formName = event.formName;
  }
  isShowOrderAdvSearch(event) {
    this.isShowOrderAdvanceSearch = event.isOrderLookup;
    this.formName = event.formName;
  }
}
