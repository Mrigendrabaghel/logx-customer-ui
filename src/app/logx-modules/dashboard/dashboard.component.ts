import { Component, OnInit } from '@angular/core';
import { BreakpointState, Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AddSearchDialog } from 'src/app/logx-modules/reports/modal-popup/addsearch-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CopyPasteData } from 'src/app/shared/common/common-method';
import { SeachReportService } from 'src/app/logx-services/searchAndReport/seach-report.service';
import { Annouuncement } from 'src/app/shared/models/announcement/announcement-model';
import { OverlayContainer } from '@angular/cdk/overlay';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { AdvanceSearchAccessDoc, CommonConst, commonNumbers, DashboardConst, DocumentsConst, homeComponentConst, LayoutConst, SubmitorderdetailsConst, TrackOderConst } from 'src/app/configs/constants';
import { AccessorialsService } from 'src/app/logx-services/accessorials/accessorials.service';
import { PaginationCriteria } from 'src/app/shared/models/accessorials/accessorials.model';
import { RouteLinks } from 'src/app/configs/RoutePath';
import { SubmitOrderService } from 'src/app/logx-services/submitOrder/submit-order.service';
import { IncidentReportService } from 'src/app/logx-services/incidentReport/incident-report.service';
import { Pagination } from 'src/app/shared/models/incident/report-incident.model';
import { RegistrationService } from 'src/app/logx-services/registration/registration.service';
import { ValidateUserModel } from 'src/app/shared/models/auth/loginModel';
import { UserPreferenceService } from 'src/app/logx-services/common/user-preference.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss', './dashboard-secondary.component.scss']
})
export class DashboardComponent implements OnInit {
  DashboardConst = DashboardConst;
  homeComponentConst = homeComponentConst;
  CommonConst = CommonConst;
  commonNumbers = commonNumbers;
  TrackOderConst = TrackOderConst;
  DocumentsConst = DocumentsConst;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset)
  trackTraceForm: FormGroup
  orderLookupForm: FormGroup
  accessDocForm: FormGroup
  trackSubmitted = false
  accessDocSubmitted = false
  orderSubmitted = false;
  trackTouched: string = DashboardConst.formValidation.trackSubmitted;
  accessTouced: string = DashboardConst.formValidation.accessDocSubmitted;
  orderTouched: string = DashboardConst.formValidation.orderSubmitted;
  pastedText: string = '';
  userGroupId: number = DashboardConst.userGroupId;
  annouuncementData: Annouuncement[] = [];
  annouuncementDataDisplay: Annouuncement[] = [];
  isdismissAnnouncement = true;
  isInvalidTrackSearchValue = false;
  isInvalidAccessSearchValue = false;
  isInvalidOrderLookupValue = false;
  accessorialsCount: number = 0;
  paginationCriteria: PaginationCriteria = <PaginationCriteria>{};
  searchValue: PaginationCriteria = <PaginationCriteria>{};
  countOfPendingApprovals: number = 0;
  formName: string;
  errorMessage: any;
  draftOrderCount: any;
  IncidentCount: number;
  pagination: Pagination = <Pagination>{};
  pageName: string;
  isDashboard: boolean = false;
  favoritemenulist: any;
  userfavmenuvalue: any;
  userData: string = '';
  constants = LayoutConst;
  result: any;
  public navValues = LayoutConst.layoutNavValues;
  public reportRouteLink = LayoutConst.reportRouteLink;
  public reportNavValues = LayoutConst.reportNavValues;
  constructor(private breakpointObserver: BreakpointObserver,
    public dialog: MatDialog,
    public router: Router,
    private formBuilder: FormBuilder,
    private seachReportService: SeachReportService,
    private overlayContainer: OverlayContainer,
    private dataTransfer: DataTransferService,
    public accessorialService: AccessorialsService,
    public submitOrderService: SubmitOrderService,
    public incidentReportService: IncidentReportService,
    public userPreferenceService: UserPreferenceService,
    private regServiceService: RegistrationService,) {
  }

  public isExpanded: boolean = false;
  validateUser: ValidateUserModel = new ValidateUserModel();
  validateRes: string = "";
  async ngOnInit(): Promise<void> {
    this.validateUser.EmailId = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.email;
    this.validateUser.UserName = this.validateUser.EmailId;
    this.validateUser.Operation = LayoutConst.operation;
    await this.getUserInformation();
    this.regServiceService.validateUser(this.validateUser).subscribe(resp => {
      if (resp) {
        this.validateRes = resp;
        if (this.validateRes != LayoutConst.userNotFound && this.validateRes != LayoutConst.userPedning) {
          this.isDashboard = true
        }
      }
    });
    this.trackTraceForm = this.formBuilder.group({
      trackNumberField: ['', [Validators.required, Validators.minLength(CommonConst.minLength)]]
    });
    this.orderLookupForm = this.formBuilder.group({
      orderLookupField: ['', [Validators.required, Validators.minLength(commonNumbers.five)]]
    });
    this.accessDocForm = this.formBuilder.group({
      accessDocField: ['', [Validators.required, Validators.minLength(CommonConst.minLength)]]
    });
    /*this.seachReportService.GetAnnouncement(this.userGroupId).subscribe(res=>{
      console.log(res)
      this.annouuncementData=res;
      this.annouuncementDataDisplay[0]=this.annouuncementData[0];
      });*/

    this.getAccessorialsCount();
    this.getDraftOrderCount();
    this.getIncidentCount();
  }



  async getUserInformation() {
    let userName = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.email;
    let data = await this.regServiceService.getUserInfo(userName);
    localStorage.setItem('userInfo', JSON.stringify(data));
  }

  get f() { return this.trackTraceForm.controls }
  get a() { return this.accessDocForm.controls; }
  get o() { return this.orderLookupForm.controls }

  /*moreAnnouncements(val) {
    if(val=='1'){
      this.annouuncementDataDisplay=this.annouuncementData; 
    }
    if(val=='0'){
      this.annouuncementDataDisplay=[];
      this.annouuncementDataDisplay[0]=this.annouuncementData[0];
    }  
    this.isExpanded = !this.isExpanded;
  }

  dismissAnnouncement()
  {
    this.isdismissAnnouncement=false;
  }*/

  openDialog() {
    const dialogRef = this.dialog.open(AddSearchDialog);
  }

  getTrackRecords() {
    try {
      this.trackSubmitted = true;
      if (this.trackTraceForm.invalid) {
        return;
      }
      this.dataTransfer.loadData(this.trackTraceForm.value.trackNumberField)
      this.router.navigate(['/dashboard/securetrackorder']);
    }
    catch (error) {
      throw error
    }
  }

  getDocumentRecords() {
    try {
      this.accessDocSubmitted = true;
      if (this.accessDocForm.invalid) {
        return;
      }
      this.dataTransfer.loadData(this.accessDocForm.value.accessDocField)
      this.router.navigate(['/dashboard/accessdocument']);
    }
    catch (error) {
      throw error
    }
  }

  getAccessorialsCount() {
    this.paginationCriteria.pageNumber = commonNumbers.one;
    this.paginationCriteria.recordPerPage = commonNumbers.one;
    this.paginationCriteria.todaysDate = new Date;
    this.accessorialService.GetAccessorials(this.paginationCriteria).subscribe(data => {
      if (data) {
        this.accessorialsCount = data[0].totalRecords;
        this.countOfPendingApprovals = data[0].totalPendingCount;
      }
    })
  }

  getAccessorials() {
    this.router.navigate(['/dashboard/approve-accessorials']);
  }

  getIncidentCount() {
    this.pagination.pageNumber = commonNumbers.one;
    this.pagination.recordsPerPage = commonNumbers.ten;
    this.pagination.pageName = 'widget';
    this.incidentReportService.GetTotalIncident(this.pagination).subscribe(data => {
      if (data) {
        this.IncidentCount = data[0].totalrecords;
      }
    })
  }

  getOrderRecords() {
    try {
      this.orderSubmitted = true;
      if (this.orderLookupForm.invalid) {
        return;
      }
      this.paginationCriteria.searchCriteria = this.orderLookupForm.value.orderLookupField;
      this.paginationCriteria.gridColumn = DashboardConst.gridColumnValue;
      this.seachReportService.GetCustomizeOrderList(this.paginationCriteria).subscribe(res => {
        if (res[0].jsonResponse != "") {
          this.result = JSON.parse(res[0].jsonResponse);
          if (this.result.length == 1) {
            this.dataTransfer.loadData(this.result[0].OrderNumber);
            this.router.navigate(['/dashboard/orderdetails']);
          } else if (this.result.length > 1) {
            this.dataTransfer.loadData(this.orderLookupForm.value.orderLookupField)
            this.router.navigate(['/dashboard/searchandreport']);
          }
        }
      });
    }
    catch (error) {
      throw error
    }
  }

  PasteSearchCreteria(event: any, formName, controlName) {
    try {
      event.preventDefault();
      let data = event;
      this.pastedText = event.clipboardData.getData('text').trim();
      var searchTextOldValue = formName.get(controlName).value.trim();
      var searchData = CopyPasteData(searchTextOldValue, this.pastedText)
      formName.get(controlName).setValue(searchData);
    }
    catch (error) {
      throw error
    }
  }

  focusOutFunction(controlName, value, formName, isSubmitted) {
    try {
      isSubmitted === DashboardConst.formValidation.trackSubmitted ? this.trackSubmitted = true : false;
      isSubmitted === DashboardConst.formValidation.accessDocSubmitted ? this.accessDocSubmitted = true : false;
      isSubmitted === DashboardConst.formValidation.orderSubmitted ? this.orderSubmitted = true : false;
      var data = value;
      var actVal = new Array();
      actVal = data.split(',');
      for (var i = 0; i < actVal.length; i++) {
        var len = actVal[i].length;
        if (controlName == DashboardConst.controlName) {
          if (len < commonNumbers.five || len > CommonConst.maxLength) {
            isSubmitted === DashboardConst.formValidation.orderSubmitted ? this.isInvalidOrderLookupValue = true : false;
            formName.controls[controlName].setErrors({ 'errors': true });
          }
        }
        else {
          if (len < CommonConst.minLength || len > CommonConst.maxLength) {
            isSubmitted === DashboardConst.formValidation.trackSubmitted ? this.isInvalidTrackSearchValue = true : false;
            isSubmitted === DashboardConst.formValidation.accessDocSubmitted ? this.isInvalidAccessSearchValue = true : false;
            formName.controls[controlName].setErrors({ 'errors': true });
          }
        }
      }
    }
    catch (error) {
      throw error
    }
  }

  launchTrackTraceWidget() {
    this.dataTransfer.loadData(null)
    this.router.navigate(['/dashboard/securetrackorder']);
  }
  launchSearchReportWidget() {
    this.dataTransfer.loadData(null)
    this.router.navigate(['/dashboard/searchandreport']);
  }
  launchAccessDocWidget() {
    this.dataTransfer.loadData(null)
    this.router.navigate(['/dashboard/accessdocument']);
  }

  launchReportIncident() {
    this.dataTransfer.loadData(null)
    this.router.navigate([RouteLinks.incidentgrid]);
  }

  openBulkSearch() {
    this.router.navigate([RouteLinks.bulkSearch]);
  }

  openAccessAdvanceSearch() {
    this.dataTransfer.loadData(true);
    this.router.navigate([RouteLinks.advanceSearchDocument]);
  }

  openOrderAdvanceSearch() {
    this.dataTransfer.loadData(false);
    this.router.navigate([RouteLinks.advanceSearchOrder]);
  }

  launchSubmitOrder() {
    this.router.navigate([RouteLinks.submitordergrid]);
  }

  getDraftOrderCount() {
    this.searchValue.pageName = SubmitorderdetailsConst.widget;
    this.searchValue.teamInfo = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.userProfile !== undefined && JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.userProfile.Team !== undefined ?
      (JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.userProfile.Team).join() : '';
    this.searchValue.userId = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.userId === undefined ? "" :
      JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.userId;
    this.searchValue.recordPerPage = commonNumbers.zero;
    this.searchValue.pageNumber = commonNumbers.zero;
    this.submitOrderService.GetDraftOrderCount(this.searchValue).subscribe(res => {
      if (res) {
        this.draftOrderCount = res[0].totalCount;
      }
    }, error => this.errorMessage = <any>error)
  }

}
