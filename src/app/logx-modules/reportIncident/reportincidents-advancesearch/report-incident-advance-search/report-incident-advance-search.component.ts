import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { IncidentReportService } from 'src/app/logx-services/incidentReport/incident-report.service';
import { AdvanceSearchService } from 'src/app/logx-services/searchAndReport/advance-search.service';
import { IncidentAdvanceSearch } from 'src/app/shared/models/incident/report-incident-advance-search';
import { IncidentReportRequest } from 'src/app/shared/models/incident/report-incident.model';
import { DateField, NumberField } from 'src/app/shared/models/order/advance-search';
import { IncidentAdvSearchConst, CommonConst, commonNumbers, AdvanceSearchAccessDoc, IncidentConst, DocumentsConst } from 'src/app/configs/constants';
import { RouteLinks } from 'src/app/configs/RoutePath';
import { FormControl } from '@angular/forms';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { MatPaginator } from '@angular/material/paginator';
import { UploadAndLookupDetailService } from 'src/app/logx-services/common/upload-and-lookup-detail.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-report-incident-advance-search',
  templateUrl: './report-incident-advance-search.component.html',
  styleUrls: ['./report-incident-advance-search.component.scss']
})
export class ReportIncidentAdvanceSearchComponent implements OnInit {
  IncidentAdvSearchConst = IncidentAdvSearchConst;
  CommonConst = CommonConst;
  AdvanceSearchAccessDoc = AdvanceSearchAccessDoc;
  IncidentConst = IncidentConst;
  RouteLinks = RouteLinks;
  DocumentsConst = DocumentsConst;
  Prioritys: any;
  incidentStatus: any;
  incidentStatusValue: any;
  incidentType: any;
  errorMessage: any;
  textQuilifer: any;
  dateQuilifer: any;
  dateQuilifierValue: any;
  incidentDateField: DateField = <DateField>{};
  resolutionDateField: DateField = <DateField>{};
  incidentCreatedDate: DateField = <DateField>{};
  incidentNumber: any;
  incidentNumVal: NumberField = <NumberField>{};
  isShowDateQuilifer: boolean = true;
  currentlyDisabledDel: string;
  daysHours: any;
  daysOrHours: any = AdvanceSearchAccessDoc.daysFromToday;
  disabled: boolean = false;
  FromDateValue: any;
  ToDateValue: any;
  dayOrHourValueDelivery: any;
  incidentAdvanceSearch: IncidentAdvanceSearch = <IncidentAdvanceSearch>{};
  daysHoursCreatedDate: any;
  resolution: any;
  incidentTypeValue: string;
  currentlyResDisabledDel: string;
  resdaysOrHours: any = AdvanceSearchAccessDoc.daysFromToday;
  daysOrHoursCreate: any = AdvanceSearchAccessDoc.daysFromToday;;
  isShowResDateQuilifer: boolean = true;
  orderNum: any;
  orderNumVal: NumberField = <NumberField>{};
  resolutionVal: any;
  priorityVal: any;
  reportedByVal: string;
  disabledIncidentDate: boolean = false;
  disabledIncidentCreateDate: boolean = false;
  isShowCreateDateQuilifer: boolean = true;
  currentlyCreateDisabledDel: string;
  resdayOrHourValueDelivery: any;
  createdayOrHourValueDelivery: any;
  incidentLocation = false;
  isShowReportIncidentGrid: boolean = false;
  DATA: IncidentAdvanceSearch[] = [];
  dataSource = new MatTableDataSource(this.DATA);
  displayedColumns: string[] = ['INCIDENT_NUM', 'ORDNUM', 'INCIDENT_CREATED_DATE', 'INCIDENT_REPORTTYPE', 'REPORTING_LOCATION', 'REPORTED_BY', 'Priority', 'INCIDENT_DATE', 'INCIDENT_RESOLUTION'];
  todaysDate = new Date();
  message: string = IncidentAdvSearchConst.noIncRecordFound;
  headerString = IncidentAdvSearchConst.incidentReports;
  showError: boolean = false;
  date = new FormControl(new Date());
  totalLength: number = 0;
  pageNumber: number = 0;
  isDisplayTable: boolean = true;
  pageSize: number = 0;
  Lookuptype: string = 'grid-pagecount';
  pageSizeOptions: any[] = [];
  panelOpenState = false;
  commonNumbers = commonNumbers;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  constructor(private advanceSearchService: AdvanceSearchService, private reportIncidentService: IncidentReportService,
    public router: Router, public dialog: MatDialog, private dataTransfer: DataTransferService,
    public uploadService: UploadAndLookupDetailService, public datePipe: DatePipe) { }

  ngOnInit(): void {
    try {
      this.getIncidentType('incidentType');
      this.getDateQuilifier('DateSearch');
      this.getTextQuilifier('TextSearch');
      this.getDateFilter('DateFilter');
      this.getDateHour('datehour');
      this.getIncidentStatus('IncidentStatus');
      this.getResolution('Resolution');
      this.getPriority('Priority');
      this.GetLookUpDetail();
    }
    catch (error) {
      throw error;
    }
  }

  ngAfterViewInit() {

    try {
      this.dataSource.paginator = this.paginator;
    }
    catch (error) {
      throw error;
    }
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

  GetLookUpDetail() {
    this.uploadService.GetLookupDetails(this.Lookuptype).subscribe(data => {
      if (data && data.length > 0) {
        let lookUp = data.find(x => x.lookupText === DocumentsConst.AccessDocuments.default && x.lookupText != null && x.lookupText != undefined);
        let pagenumber = ((lookUp) ? lookUp.lookupDisplayText : 0);
        this.pageSize = Number(pagenumber);
        this.pageSizeOptions = data;
        let filteredList = data.filter(itemX => itemX.lookupText != DocumentsConst.AccessDocuments.default && itemX.lookupText != null && itemX.lookupText != undefined);
        this.pageSizeOptions = filteredList.map(e => e.lookupDisplayText)
      }
    })
  }

  goToReportIncident() {
    this.router.navigate(['/dashboard/reportincident']);
  }

  getIncidentType(lookupType: string) {
    this.advanceSearchService.GetDateQuilifier(lookupType).subscribe(response => {
      if (response) {
        this.incidentType = response;
        // for (var i = 0; i <= this.incidentType.length; i++) {
        //   if (this.incidentType[i].isDefault == true) {
        //     this.incidentTypeValue = this.incidentType[i].lookupText;
        //     break;
        //   }
        // }
      }
    }, error => this.errorMessage = <any>error);
  }

  getTextQuilifier(lookupType: string) {
    this.advanceSearchService.GetDateQuilifier(lookupType).subscribe(response => {
      if (response) {
        this.textQuilifer = response;
        for (var i = 0; i <= this.textQuilifer.length; i++) {
          if (this.textQuilifer[i].isDefault == true) {
            this.orderNumVal.SearchConditionValue = this.incidentNumVal.SearchConditionValue = this.textQuilifer[i].lookupText;
            this.orderNumVal.SearchConditionId = this.incidentNumVal.SearchConditionId = this.textQuilifer[i].lookupDataId;
            this.orderNumVal.Value = this.incidentNumVal.Value = '';
            break;
          }
        }
      }
    }, error => this.errorMessage = <any>error);
  }

  getDateFilter(lookupType: string) {
    this.advanceSearchService.GetDateQuilifier(lookupType).subscribe(response => {
      if (response) {
        this.dateQuilifer = response;
        for (var i = 0; i <= this.dateQuilifer.length; i++) {
          if (this.dateQuilifer[i].isDefault == true) {
            this.incidentCreatedDate.DateQualifier = this.resolutionDateField.DateQualifier = this.incidentDateField.DateQualifier = this.dateQuilifer[i].lookupText;
            break;
          }
        }
      }
    }, error => this.errorMessage = <any>error);
  }

  getDateQuilifier(lookupType: string) {
    this.advanceSearchService.GetDateQuilifier(lookupType).subscribe(response => {
      if (response) {
        this.dateQuilifierValue = response;

        for (var i = 0; i <= this.dateQuilifierValue.length; i++) {
          if (this.dateQuilifierValue[i].isDefault == true) {
            this.resolutionDateField.SearchConditionValue = this.incidentCreatedDate.SearchConditionValue = this.incidentDateField.SearchConditionValue = this.dateQuilifierValue[i].lookupText;
            break;
          }
        }

      }
    }, error => this.errorMessage = <any>error);
  }

  getDateHour(lookupType: string) {
    this.advanceSearchService.GetDateQuilifier(lookupType).subscribe(response => {
      this.daysHours = response;
    }, error => this.errorMessage = <any>error);
  }

  getIncidentStatus(lookupType: string) {
    this.advanceSearchService.GetDateQuilifier(lookupType).subscribe(response => {
      if (response) {
        this.incidentStatus = response;
        // for (var i = 0; i <= this.incidentStatus.length; i++) {
        //   if (this.incidentStatus[i].isDefault == true) {
        //     this.incidentStatusValue = this.incidentStatus[i].lookupText;
        //     break;
        //   }
        // }
      }
    }, error => this.errorMessage = <any>error);
  }

  getResolution(lookupType: string) {
    this.advanceSearchService.GetDateQuilifier(lookupType).subscribe(response => {
      if (response) {
        this.resolution = response;
      }
    }, error => this.errorMessage = <any>error);
  }

  getPriority(lookupType: string) {
    this.advanceSearchService.GetDateQuilifier(lookupType).subscribe(response => {
      if (response) {
        this.Prioritys = response;
        for (var i = 0; i <= this.Prioritys.length; i++) {
          if (this.Prioritys[i].isDefault == true) {
            this.priorityVal = this.Prioritys[i].lookupText;
            break;
          }
        }
      }
    }, error => this.errorMessage = <any>error);
  }

  onIncidentDateQuiliferSelect(val) {
    try {
      if (this.incidentDateField.DateQualifier == AdvanceSearchAccessDoc.dateQualifier.blank) {
        this.disabledIncidentDate = true;
      } else if (this.incidentDateField.DateQualifier == AdvanceSearchAccessDoc.dateQualifier.between) {
        this.disabledIncidentDate = false;
      }
      this.isShowDateQuilifer = this.incidentDateField.DateQualifier == AdvanceSearchAccessDoc.dateQualifier.fixed || this.incidentDateField.DateQualifier == AdvanceSearchAccessDoc.dateQualifier.relative ? true : false;
    }
    catch (error) {
      throw error;
    }
  }

  onIncidentCreatedDateQuiliferSelect(val) {
    try {
      if (this.incidentCreatedDate.DateQualifier == AdvanceSearchAccessDoc.dateQualifier.blank) {
        this.disabledIncidentCreateDate = true;
      } else if (this.incidentCreatedDate.DateQualifier == AdvanceSearchAccessDoc.dateQualifier.between) {
        this.disabledIncidentCreateDate = false;
      }
      this.isShowCreateDateQuilifer = this.incidentCreatedDate.DateQualifier == AdvanceSearchAccessDoc.dateQualifier.fixed || this.incidentCreatedDate.DateQualifier == AdvanceSearchAccessDoc.dateQualifier.relative ? true : false;
    }
    catch (error) {
      throw error;
    }
  }

  onResolutionDateQuiliferSelect(val) {
    try {
      if (this.resolutionDateField.DateQualifier == AdvanceSearchAccessDoc.dateQualifier.blank) {
        this.disabled = true;
      } else if (this.resolutionDateField.DateQualifier == AdvanceSearchAccessDoc.dateQualifier.between) {
        this.disabled = false;
      }
      this.isShowResDateQuilifer = this.resolutionDateField.DateQualifier == AdvanceSearchAccessDoc.dateQualifier.fixed || this.resolutionDateField.DateQualifier == AdvanceSearchAccessDoc.dateQualifier.relative ? true : false;
    }
    catch (error) {
      throw error;
    }
  }

  onChangeDisable() {
    try {
      if (this.incidentDateField.TotalDays) {
        this.currentlyDisabledDel = AdvanceSearchAccessDoc.accessDocText.totalHours;
      } else if (this.incidentDateField.TotalHours) {
        this.currentlyDisabledDel = AdvanceSearchAccessDoc.accessDocText.todalDays;;
      } else {
        this.currentlyDisabledDel = '';
      }
    }
    catch (error) {
      throw error;
    }
  }

  onChangeResDisable() {
    try {
      if (this.resolutionDateField.TotalDays) {
        this.currentlyResDisabledDel = AdvanceSearchAccessDoc.accessDocText.totalHours;
      } else if (this.resolutionDateField.TotalHours) {
        this.currentlyResDisabledDel = AdvanceSearchAccessDoc.accessDocText.todalDays;
      } else {
        this.currentlyResDisabledDel = '';
      }
    }
    catch (error) {
      throw error;
    }
  }

  onChangeCreateDisable() {
    try {
      if (this.incidentCreatedDate.TotalDays) {
        this.currentlyCreateDisabledDel = AdvanceSearchAccessDoc.accessDocText.totalHours;
      } else if (this.incidentCreatedDate.TotalHours) {
        this.currentlyCreateDisabledDel = AdvanceSearchAccessDoc.accessDocText.todalDays;
      } else {
        this.currentlyCreateDisabledDel = '';
      }
    }
    catch (error) {
      throw error;
    }
  }

  onChangeValue(val) {
    this.daysOrHours = val;
  }

  onChangeResValue(val) {
    this.resdaysOrHours = val;
  }

  onChangeCreateValue(val) {
    this.daysOrHoursCreate = val;
  }

  goToAdvanceSearch() {
    this.priorityVal = this.incidentAdvanceSearch.Priority;
    this.isShowReportIncidentGrid = false;
    this.getPriority('Priority');
  }

  getSearchIncidentDetails() {
    this.incidentNumber ? this.incidentNumVal.SearchConditionId = this.incidentNumber[1] : '';
    this.incidentNumber ? this.incidentNumVal.SearchConditionValue = this.incidentNumber[0] : '';
    this.orderNum ? this.orderNumVal.SearchConditionId = this.orderNum[1] : '';
    this.orderNum ? this.orderNumVal.SearchConditionValue = this.orderNum[0] : '';
    this.incidentAdvanceSearch.IncidentStatus = this.incidentStatusValue;
    this.incidentAdvanceSearch.IncidentType = this.incidentTypeValue;
    this.incidentAdvanceSearch.IncidentNumber = this.incidentNumVal;
    let fromDate = this.datePipe.transform(this.incidentDateField.FromDateValue, 'yyyy-MM-dd')
    let toDate = this.datePipe.transform(this.incidentDateField.ToDateValue, 'yyyy-MM-dd')
    this.incidentAdvanceSearch.IncidentDate = this.incidentDateField;
    this.incidentAdvanceSearch.IncidentDate.FromDateValue = fromDate;
    this.incidentAdvanceSearch.IncidentDate.ToDateValue = toDate;
    this.incidentAdvanceSearch.OrderNum = this.orderNumVal;
    let fromResDate = this.datePipe.transform(this.resolutionDateField.FromDateValue, 'yyyy-MM-dd')
    let toResoDate = this.datePipe.transform(this.resolutionDateField.ToDateValue, 'yyyy-MM-dd')
    this.incidentAdvanceSearch.ResolutionDate = this.resolutionDateField;
    this.incidentAdvanceSearch.ResolutionDate.FromDateValue = fromResDate;
    this.incidentAdvanceSearch.ResolutionDate.ToDateValue = toResoDate;
    this.incidentAdvanceSearch.Resolution = this.resolutionVal;
    this.incidentAdvanceSearch.Priority = this.priorityVal;
    this.incidentAdvanceSearch.ReportedBy = this.reportedByVal;
    this.incidentAdvanceSearch.todaysDate = this.datePipe.transform(this.todaysDate, 'yyyy-MM-dd');
    this.incidentAdvanceSearch.gridColumn = IncidentAdvSearchConst.gridIncidentAdvSearchColumn;
    this.incidentAdvanceSearch.pageNumber = commonNumbers.one;
    this.incidentAdvanceSearch.recordPerPage = commonNumbers.ten;
    let fromIncDate = this.datePipe.transform(this.incidentCreatedDate.FromDateValue, 'yyyy-MM-dd')
    let toIncDate = this.datePipe.transform(this.incidentCreatedDate.ToDateValue, 'yyyy-MM-dd')
    this.incidentAdvanceSearch.IncidentCreatedDate = this.incidentCreatedDate;
    this.incidentAdvanceSearch.IncidentCreatedDate.FromDateValue = fromIncDate;
    this.incidentAdvanceSearch.IncidentCreatedDate.ToDateValue = toIncDate;
    this.getIncidentAdvanceSearchResult(this.incidentAdvanceSearch);
  }

  getIncidentAdvanceSearchResult(incidentAdvanceSearchRequest: IncidentAdvanceSearch) {
    try {
      this.reportIncidentService.reportIncidentAdvanceSearch(incidentAdvanceSearchRequest).subscribe(response => {
        this.isShowReportIncidentGrid = true;
        this.isDisplayTable = true;
        if (response.length > 0) {
          this.showError = false;
          this.dataSource.data = response;
          this.totalLength = response[0].totalCount;
        } else {
          this.showError = true;
        }
      }, error => {
        this.isShowReportIncidentGrid = true;
        this.showError = true;
        this.errorMessage = <any>error
      });
    }
    catch (error) {
      throw error;
    }
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

    this.incidentAdvanceSearch.pageNumber = PageIndex;
    this.incidentAdvanceSearch.recordPerPage = event.pageSize;
    this.getIncidentAdvanceSearchResult(this.incidentAdvanceSearch);
  }


  goToDisplayResults(incidentNumber) {
    this.dataTransfer.loadData(incidentNumber);
    this.router.navigate([RouteLinks.reportincidentdisplayrecord]);
    // , { queryParams: { IncidentNum: incidentNumber }});
  }

  getRepLocationDetails(repLoc: any) {
    try {
      this.incidentAdvanceSearch.ReportingLocation = repLoc.ReportingLocation;
      this.incidentAdvanceSearch.ReportingPostalDetails = repLoc.ReportingPostalDetails;
    }
    catch (error) {
      throw error;
    }
  }

  getIncLocationDetails(incLoc: any) {
    try {
      this.incidentAdvanceSearch.IncidentLocation = incLoc.IncidentLocation;
      this.incidentAdvanceSearch.IncidentPostalDetails = incLoc.IncidentPostalDetails;
    }
    catch (error) {
      throw error;
    }
  }
}
