import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdvanceSearchService } from 'src/app/logx-services/searchAndReport/advance-search.service';
import { ConfirmationDialog } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { IncidentComments, IncidentComment, IncidentDetails, IncidentDocuments, IncidentDocumentsJson, IncidentReportResponse, IncidentRequest, locationDetails } from 'src/app/shared/models/incident/report-incident.model';
import { FileUpload, Docs } from 'src/app/shared/models/order/file-upload.model';
import { UploadAndLookupDetailService } from 'src/app/logx-services/common/upload-and-lookup-detail.service';
import { NotificationService } from 'src/app/logx-services/common/notification.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTable } from '@angular/material/table';
import { IncidentReportService } from 'src/app/logx-services/incidentReport/incident-report.service';
import { FormControl, NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { IncidentReportRequest, IncidentLocationDetails, IncidentOrderDetails, IncidentPostalDetails, IncidentCarrierDetails, EntityDetails, Contacts } from 'src/app/shared/models/incident/report-incident.model';
import { IncidentConst, CommonConst, commonNumbers, UploadConst, DocumentsConst } from 'src/app/configs/constants';
import { OktaAuthService } from '@okta/okta-angular';
import { IncidentAdvanceSearch } from 'src/app/shared/models/incident/report-incident-advance-search';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SubmitOrderService } from 'src/app/logx-services/submitOrder/submit-order.service';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { RouteLinks } from 'src/app/configs/RoutePath';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { GetContentType } from 'src/app/shared/common/common-method';
import { OpenDocumentDialogueComponent } from 'src/app/logx-modules/documents/open-document-dialogue/open-document-dialogue.component';
import jsPDF from 'jspdf';
import { UploadfilesComponent } from '../../trackTrace/vieworderdetail/uploadfiles/uploadfiles.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-reportincident',
  templateUrl: './reportincident.component.html',
  styleUrls: ['./reportincident.component.scss']
})
export class ReportincidentComponent implements OnInit {
  IncidentConst = IncidentConst;
  commonNumbers = commonNumbers;
  UploadConst = UploadConst;
  CommonConst = CommonConst;
  incidentNumber: any;
  filteredOptions: Observable<string[]>;
  locationName: any;
  errorMessage: string;
  incidentType: any;
  incidentPriority: any;
  incidentOrderDetails: any;
  incidentLocationDetails: any;
  incidentRepLocationDetails: any;
  incidentStateReploc: any;
  incidentStateIncLoc: any;
  contactPersonNo: any;
  carrierName: any = '';
  enterComments: IncidentComment[] = [];

  fileUploadRequ: FileUpload = <FileUpload>{};
  activePageData = [];
  resData: any;
  clientName: string;
  clientId: string;
  panelOpenState = false;

  isAttachments = false;
  incidentAttachmentColumns = [
    { field: 'CREATEDDATE', header: 'Date' },
    { field: 'DOCNAME', header: 'File Name' },
    //{ field: 'DOCTYPE', header: 'Types' },
    { field: 'DOCDESCRIPTION', header: 'Description' },
    { field: 'FILETYPE', header: 'File Type' },
    { field: 'action', header: '' },
  ];
  incidentAttachmentCount: number = 0;
  incidentAttachmentdata: IncidentDocuments[] = [];
  incidentAttachment: IncidentDocumentsJson[] = [];
  incidentAttachmentdataSource = new MatTableDataSource(this.incidentAttachment);
  incidentDisplayedColumns = ['CREATEDDATE', 'DOCNAME', 'DOCDESCRIPTION', 'FILETYPE', 'action'];
  locationMandatory: boolean = false;
  isIncidentLocDetails: boolean = false;
;
  @ViewChild(MatSort, { static: false }) set content(sort: MatSort) {
    this.incidentAttachmentdataSource.sort = sort;
  }
  @ViewChild(MatPaginator, { static: false }) set conten(paginator: MatPaginator) {
    this.incidentAttachmentdataSource.paginator = paginator;
  }
  @ViewChild('locationForm') myForm: NgForm;

  isOpenUploadFiles: Boolean = false;
  isUploadFiles: Boolean = true;
  isUploadFileList: Boolean = false;
  filesSelected: FileList;
  PreviewData: any;

  incidentRequestModel: IncidentReportRequest = <IncidentReportRequest>{};
  carrierDetailsModel: IncidentCarrierDetails = <IncidentCarrierDetails>{};
  incidentCityRepLoc: any;
  incidentCityIncLoc: any;
  disableSubmit: boolean;
  incidentDateValue: any;
  incidentTypeValue: any;
  repLocPostalDetails: IncidentPostalDetails = <IncidentPostalDetails>{};
  repLocValue: IncidentLocationDetails = <IncidentLocationDetails>{};
  incLocPostalDetails: IncidentPostalDetails = <IncidentPostalDetails>{};
  incLocValue: IncidentLocationDetails = <IncidentLocationDetails>{};
  orderNum: string;
  priorityValue: any;
  userName: string;
  userId: string;
  date = new Date();
  incLocationDetails: IncidentLocationDetails = <IncidentLocationDetails>{};
  ordercontactDetails: IncidentOrderDetails = <IncidentOrderDetails>{};
  public showicon: boolean = false;
  public showlist: boolean = false;
  CarrierdataList: any = [];
  public carriername: string;
  myControl: FormControl = new FormControl();
  filesUploadMax: string = '';
  pageTitle: any;
  pageAdvanceSearch: any;
  client: any;
  incidentDateErrMessage: any;
  incidentTypeErrMessage: any;
  orderNoErrMessage: any;
  incidentCityNameErrMessage: any;
  incidentZipCodeErrMessage: any;
  incidentStateNameErrMessage: any;
  incidentRepLocErrMessage: any;
  incidentIncLocErrMessage: any;
  boolRepLocZipCode: boolean = true;
  boolIncLocZipCode: boolean = true;
  boolOrderNum: boolean = true;
  incidentRepLocInvalidZipCode: any;
  incidentIncLocInvalidZipCode: any;
  invalidOrder: any;
  minPostalCodeLength: any = CommonConst.guiValidation.minPostalCodeLength;
  tradingPartner: EntityDetails[] = [];
  locationDetails: EntityDetails[] = [];
  incidentCommentsArray: IncidentComments[] = [];
  incidentRequest: IncidentRequest = <IncidentRequest>{};
  contacts: Contacts = <Contacts>{};
  incidentResponse: any;
  incidentReportResponse: IncidentReportResponse = <IncidentReportResponse>{};
  incidentAdvanceSearch: IncidentAdvanceSearch = <IncidentAdvanceSearch>{};
  resetForm: boolean = false;
  dateValidate = new FormControl(new Date());
  pageSizeOptions: any[] = [];
  pageSize: number;
  Lookuptype: string = 'innergrid-pagecount';
  selectedIncidentId: number;
  incidentId: number;
  IncidentDetails: IncidentDetails = <IncidentDetails>{};

  updatedOriginLocationDetails: locationDetails = new locationDetails();
  updatedDestinationLocationDetails: locationDetails = new locationDetails();
  public EditMode: Boolean = false;
  @ViewChild(UploadfilesComponent) statusUpdateRoutingLinesComponent: UploadfilesComponent;

  constructor(private incidentReportService: IncidentReportService, private advanceSearchService: AdvanceSearchService, public router: Router,
    public dialog: MatDialog, protected notificationService: NotificationService, public oktaAuth: OktaAuthService,
    public uploadService: UploadAndLookupDetailService, public snackBar: MatSnackBar, private submitaOrderService: SubmitOrderService,
    private dataTransfer: DataTransferService, public datePipe: DatePipe) { }

  async ngOnInit(): Promise<void> {
    try {
      const userClaims = await this.oktaAuth.getUser();
      this.userName = userClaims.name !== undefined ? userClaims.name : JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.name;
      this.userId = userClaims.userId !== undefined ? userClaims.userId : JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.userId;
      this.clientName = userClaims.Organization;
      this.clientId = userClaims.clientId;
      this.getIncidentType(IncidentConst.incidenttype);
      this.fnErrorMessageText();
      this.getPriority(IncidentConst.priority);

      this.dataTransfer.obj.subscribe(data => {
        this.selectedIncidentId = data;
      });
      this.enterComments = new Array<IncidentComment>();

      if (this.selectedIncidentId == null) {
        this.EditMode = false;
        this.submitaOrderService.GetAutoGeneratedNumber("INCIDENT").subscribe(response => {
          if (response) {
            this.incidentNumber = response.neW_NUMBER;
          }
        });
      } else {
        this.incidentId = this.selectedIncidentId;
        this.EditMode = true;
        this.incidentReportService.GetIncidentDetails(this.incidentId).subscribe(data => {
          this.BindData(data);
        });
      }
    }
    catch (error) {
      throw error;
    }
  }

  BindData(data) {
    this.incidentNumber = data.incidentnumber;
    this.clientName = data.clientname;
    if(data.incidentdate==null){
      this.incidentDateValue = null;
    }
    if(data.incidentdate!=null){
      this.incidentDateValue = new Date(data.incidentdate);
    }    
    this.incidentTypeValue = data.incidenttypename;
    this.orderNum = data.ordernum;
    this.priorityValue = data.priorityname;
    this.userName = data.usernamereported;
    this.date = new Date(data.reporteddate);
    this.ordercontactDetails.OrderContactPersonName = data.ordercontactname;
    this.ordercontactDetails.OrderContactPersonNumber = data.ordercontactphone;
    this.ordercontactDetails.Carrier = data.carriername;
    this.ordercontactDetails.TradingPartnerNum = data.carriernum;
    this.ordercontactDetails.OrdHeaderId = data.ordercontactid;
    this.ordercontactDetails.OrderContactPersonName = data.ordercontactname;
    this.ordercontactDetails.OrderContactPersonNumber = data.ordercontactphone;
    this.ordercontactDetails.OrderContactNum = data.ordercontactnum;

    this.updatedDestinationLocationDetails.ReportingPostalDetails.PostalCode = data.reportingloczip;
    this.updatedDestinationLocationDetails.ReportingPostalDetails.CityName = data.reportingloccity;
    this.updatedDestinationLocationDetails.ReportingPostalDetails.StateCode = data.reportinglocstatecode;
    this.updatedDestinationLocationDetails.ReportingPostalDetails.StateName = data.reportinglocstatename;
    this.updatedDestinationLocationDetails.ReportingLocation = data.reportingaddress;
    this.updatedDestinationLocationDetails.LocationId = data.reportinglocationid;
    this.updatedDestinationLocationDetails.LocationNumber = data.reportinglocationnum;

    this.updatedDestinationLocationDetails = JSON.parse(JSON.stringify(this.updatedDestinationLocationDetails));

    this.updatedOriginLocationDetails.IncidentPostalDetails.PostalCode = data.incidentloczip;
    this.updatedOriginLocationDetails.IncidentPostalDetails.CityName = data.incidentloccity;
    this.updatedOriginLocationDetails.IncidentPostalDetails.StateCode = data.incidentlocstatecode;
    this.updatedOriginLocationDetails.IncidentPostalDetails.StateName = data.incidentlocstatename;
    this.updatedOriginLocationDetails.IncidentLocation = data.incidentaddress;
    this.updatedOriginLocationDetails.LocationId = data.incidentlocationid;
    this.updatedOriginLocationDetails.LocationNumber = data.incidentlocationnum;

    this.updatedOriginLocationDetails = JSON.parse(JSON.stringify(this.updatedOriginLocationDetails));

    /* intial data bind to location specific fields*/
    this.IncidentDetails.incidentLocCity = data.incidentloccity;
    this.IncidentDetails.incidentLocStateCode = data.incidentlocstatecode;
    this.IncidentDetails.incidentLocStateName = data.incidentlocstatename;
    this.IncidentDetails.incidentLocCountryCode = data.incidentloccountrycode;
    this.IncidentDetails.incidentLocCountryName = data.incidentloccountryname;
    this.IncidentDetails.IncidentLocationNum = data.incidentlocationnum;
    this.IncidentDetails.incidentLocationId = data.incidentlocationid;
    this.IncidentDetails.incidentLocZip = data.incidentloczip;
    this.IncidentDetails.incidentAddress = data.incidentaddress;
    this.IncidentDetails.incidentAddrName = data.incidentaddrname;

    this.IncidentDetails.reportingLocCity = data.reportingloccity;
    this.IncidentDetails.reportingLocStateCode = data.reportinglocstatecode;
    this.IncidentDetails.reportingLocStateName = data.reportinglocstatename;
    this.IncidentDetails.reportingLocCountryCode = data.reportingloccountrycode;
    this.IncidentDetails.reportingLocCountryName = data.reportingloccountryname;
    this.IncidentDetails.reportingAddress = data.reportingaddress;
    this.IncidentDetails.reportingAddrName = data.reportingaddrname;
    this.IncidentDetails.ReportingLocationNum = data.reportinglocationnum;
    this.IncidentDetails.reportingLocationId = data.incidentlocationid;
    this.IncidentDetails.reportingLocZip = data.reportingloczip;

    this.IncidentDetails.clientId = data.clientid;


    /* Mapping Existing Comments */
    const IncidentComments: IncidentComment[] = JSON.parse(data.incidentCommentsjson === "" ? null : data.incidentCommentsjson);
    this.enterComments = IncidentComments;

    /* Mapping Existing Documents*/
    const Attachments = JSON.parse(data.attachmentsjson);
    this.incidentAttachmentCount = Attachments.length;
    this.incidentAttachmentdataSource.data = Attachments as IncidentDocumentsJson[];

    if (Attachments && this.incidentAttachmentCount > 0) {
      this.isAttachments = true;
      var doc = new jsPDF();
      let finalY = (doc as any).previousAutoTable.finalY;
      finalY = (finalY == undefined) ? commonNumbers.ten : finalY;
      doc.text('Attachments (' + this.incidentAttachmentCount + ')', commonNumbers.five, finalY + commonNumbers.ten);
      var rowsAttachment = [];
      this.incidentAttachmentdataSource.data.forEach(element => {
        var tempAttachment = [element.CREATEDDATE, element.DOCNAME, element.DOCDESCRIPTION, element.FILETYPE];
        rowsAttachment.push(tempAttachment);
      });

      (doc as any).autoTable({
        startY: finalY + 15, columns: this.incidentAttachmentColumns, body: rowsAttachment,
        styles: { fontSize: 7, overflow: 'linebreak' },
        margin: { left: 5, right: 5 },
        columnStyles: {
          1: { cellWidth: 'auto' }
        }

      });
    }
    else {
      this.isAttachments = false;
    }
  }

  attachmentTableDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.incidentDisplayedColumns, event.previousIndex, event.currentIndex);
  }

  ngAfterViewInit() {
    try {
      this.uploadService.GetLookupDetails(this.Lookuptype).subscribe(async data => {
        if (data && data.length > 0) {
          let pagenumber = data.find(x => x.isDefault === true && x.lookupText != null && x.lookupText != undefined).lookupDisplayText;
          this.pageSize = await Number(pagenumber);
          this.pageSizeOptions = data;
          let filteredList = data.filter(itemX => itemX.lookupText != null && itemX.lookupText != undefined);
          this.pageSizeOptions = filteredList.map(e => e.lookupDisplayText)
        }
      })
    }
    catch (error) {
      throw error;
    }
  }

  getIncidentType(lookupType: string) {
    this.advanceSearchService.GetDateQuilifier(lookupType).subscribe(response => {
      if (response) {
        this.incidentType = response;
      }
    }, error => this.errorMessage = <any>error);
  }

  onSelect(option){
    if ( option.lookupText == "AppointmentIssue" || option.lookupText == "LateDelivery" || option.lookupText == "LatePickup" || option.lookupText == "OverShortDamage" || option.lookupText == "PodRequest")
  {
    this.locationMandatory = true;
  }
  else{
  this.locationMandatory = false;
  }
  }
  addNew() {
    if (this.enterComments === null || this.enterComments === undefined) {
      this.enterComments = new Array<IncidentComment>();
    }
    this.enterComments.push({
      ID: 0,
      INCIDENTREPORTID: this.incidentId !== undefined ? this.incidentId : 0,
      COMMENTS: '',
      CREATEDBY: this.userName !== undefined ? this.userName : ''
    });
  }

  updateText(val: string, index: number) {
    if (index !== -1) {
      this.enterComments[index].COMMENTS = val;
    }
  }

  removeComment(index) {
    const confirmRemoveComment = this.dialog.open(ConfirmationDialog, {
      data: {
        message: IncidentConst.validationMessage.confirmDelete,
        buttonText: {
          ok: UploadConst.deleteYes,
          cancel: UploadConst.deleteCancel
        }
      }
    });
    confirmRemoveComment.afterClosed().subscribe(confirmed => {
      if (confirmed && this.enterComments[index].COMMENTS != '') {
        this.enterComments.splice(index, 1);
      }
    })
  }

  goToAdvanceSearch() {
    this.router.navigate(['/dashboard/reportincidentadvancesearch']);
  }

  AddFile(event: any) {
    try {
      this.filesUploadMax = '';
      this.isOpenUploadFiles = true;
      this.isUploadFiles = false;
      this.filesSelected = event.target.files;
      this.isUploadFileList = false;
    }
    catch (error) {
      throw error;
    }
  }

  closeUploadSection(isClose: any) {
    if (isClose)
      this.isOpenUploadFiles = !isClose;
  }

  UploadFiles(fileList: any) {
    //Upload files with API
    let fileData = [];
    try {
      if (fileList.length > commonNumbers.zero) {
        fileList.forEach((doc: any) => {
          let fileDetail=new IncidentDocuments(); 
          fileDetail= {
            IncidentReportId: this.incidentId,
            DocType: doc.docType,
            DocDescription: doc.DocDescription,
            FileType: doc.docFormat,
            Content: doc.docContent,
            createdby: this.userName,
            DocName: doc.DocName,
            CreatedDate: doc.DocDate,
            DocNum: doc.DocName,
          }
          this.incidentAttachmentdata.push(fileDetail);
        });

      } else {
        this.snackBar.open(UploadConst.uploadUnsuccessful, '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
      }
      //after uploading files show message of upload success or failure then close upload file
      this.isOpenUploadFiles = false;
      this.isUploadFileList = true;
      this.isUploadFiles = true;
    }
    catch (error) {
      this.snackBar.open(UploadConst.uploadUnsuccessful, '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
      throw error;
    }
  }


  applyFilter(event: any) {
    try {
      this.showicon = false
      this.showlist = false;
      let idParam = '';
      let carrierData = event.target.value;
      carrierData = carrierData.substr(0, 1)
      if (carrierData == '$') {
        idParam = IncidentConst.scac;
      }
      else if (carrierData == '#') {
        idParam = IncidentConst.mccNum;
      }
      let searchVal = event.target.value.replace(/[^\w\s]/gi, "");
      this.carrierDetailsModel.SearchCriteria = idParam;
      this.carrierDetailsModel.SearchValue = searchVal;
      if (searchVal.length >= commonNumbers.two) {
        this.showlist = true;
        this.incidentReportService.getCarrierDetails(this.carrierDetailsModel).subscribe(response => {
          if (response) {
            this.CarrierdataList = response;
          }
          this.showicon = true;
        }, error => this.errorMessage = <any>error);
      }
    }
    catch (error) {
      throw error;
    }
  }

  ClearInput() {
    this.ordercontactDetails.Carrier = '';
    this.showicon = false;
    this.showlist = false;
  }

  getPriority(lookupType: string) {
    this.incidentReportService.GetIncidentPriority(lookupType).subscribe(response => {
      if (response) {
        this.incidentPriority = response;
        for (var i = 0; i <= this.incidentPriority.length; i++) {
          if (this.incidentPriority[i].isDefault == true) {
            this.priorityValue = this.incidentPriority[i].lookupText;
            break;
          }
        }
      }
    }, error => this.errorMessage = <any>error);
  }

  applyReportingLocationFilter(val: string) {
    try {
      if (val.length > commonNumbers.three) {
        this.incidentReportService.GetIncidentLocationDetails(val).subscribe(response => {
          if (response) {
            this.incidentRepLocationDetails = response;
          }
        }, error => this.errorMessage = <any>error);
      }
    }
    catch (error) {
      throw error;
    }
  }

  applyIncidentLocationFilter(val: string) {
    try {
      if (val.length > commonNumbers.three) {
        this.incidentReportService.GetIncidentLocationDetails(val).subscribe(response => {
          if (response) {
            this.incidentLocationDetails = response;
          }
        }, error => this.errorMessage = <any>error);
      }
    }
    catch (error) {
      throw error;
    }
  }

  focusOutOrderDetails() {
    try {
      this.ordercontactDetails.OrderContactNum = '';
      this.ordercontactDetails.OrderContactPersonName = '';
      this.ordercontactDetails.OrderContactPersonNumber = '';
      this.ordercontactDetails.Carrier = '';
      this.ordercontactDetails.TradingPartnerNum = '';
      if (this.orderNum && this.orderNum.length > commonNumbers.zero) {
        this.getIncidentOrderDetails(this.orderNum);
      }
    }
    catch (error) {
      throw error;
    }
  }

  getIncidentOrderDetails(orderNum: string) {
    this.incidentReportService.GetIncidentOrderDetails(orderNum).subscribe(response => {
      if (response && response.length > commonNumbers.zero) {
        this.incidentOrderDetails = response;
        this.invalidOrder = '';
      }
      else {
        this.incidentOrderDetails = null;
        this.boolOrderNum = false;
        this.invalidOrder = IncidentConst.validationMessage.invalidOrderNum
      }
      if (this.incidentOrderDetails && this.incidentOrderDetails.length > commonNumbers.zero) {
        this.ordercontactDetails.OrderContactPersonName = this.incidentOrderDetails[commonNumbers.zero].orderContactPersonName;
        this.ordercontactDetails.OrderContactPersonNumber = this.incidentOrderDetails[commonNumbers.zero].orderContactPersonNumber;
        this.ordercontactDetails.Carrier = this.incidentOrderDetails[commonNumbers.zero].carrier;
        this.ordercontactDetails.TradingPartnerNum = this.incidentOrderDetails[commonNumbers.zero].tradingPartnerNum;
        this.ordercontactDetails.OrderContactNum = this.incidentOrderDetails[commonNumbers.zero].orderContactNum;
      }
      else {
        this.ordercontactDetails.OrderContactPersonName = '';
        this.ordercontactDetails.OrderContactPersonNumber = '';
        this.ordercontactDetails.Carrier = '';
        this.ordercontactDetails.TradingPartnerNum = '';
      }
    }, error => this.errorMessage = <any>error);
  }

  //For validating special characters
  omit_special_char(event) {
    var k;
    k = event.charCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }
  //For Reporting Location
  focusOutZipCodeRepLoc() {
    try {
      if (this.repLocPostalDetails.PostalCode && this.repLocPostalDetails.PostalCode.length >= this.minPostalCodeLength) {
        this.getIncidentStateCityRepLoc(this.repLocPostalDetails.PostalCode);
      }
      else {
        this.fnResetRepLocPostalDetails();
      }
    }
    catch (error) {
      throw error;
    }
  }

  getIncidentStateCityRepLoc(zipCodeRepLoc: string) {
    this.repLocPostalDetails.CityCode = '';
    this.repLocPostalDetails.CityName = '';
    this.incidentReportService.GetIncidentStateCityDetails(zipCodeRepLoc).subscribe(response => {
      if (response) {
        this.incidentStateReploc = response.filter((v, i, a) => a.findIndex(t => (t.label === v.label && t.value === v.value)) === i);
        this.incidentRepLocInvalidZipCode = '';
        if (this.incidentStateReploc && this.incidentStateReploc.length === commonNumbers.one) {
          this.repLocPostalDetails.StateCode = this.incidentStateReploc[commonNumbers.zero].stateCode;
          this.onRepLocStateSelection();
          this.incidentCityRepLoc = response.filter(x => x.stateCode == this.incidentStateReploc[0].stateCode);
          if (this.incidentCityRepLoc && this.incidentCityRepLoc.length === 1) {
            this.repLocPostalDetails.CityCode = this.incidentStateReploc[commonNumbers.zero].cityCode;
            this.repLocPostalDetails.CityName = this.incidentStateReploc[commonNumbers.zero].cityName;
          }
        }
        else if (response.length === commonNumbers.zero) {
          this.boolRepLocZipCode = false;
          this.incidentRepLocInvalidZipCode = IncidentConst.validationMessage.invalidZipCode
        }
      }
    }, error => this.errorMessage = <any>error);
  }

  //For Incident Location
  focusOutZipCodeIncLoc() {
    try {
      if (this.incLocPostalDetails.PostalCode && this.incLocPostalDetails.PostalCode.length >= this.minPostalCodeLength) {
        this.getIncidentStateCityIncLoc(this.incLocPostalDetails.PostalCode);
      }
      else {
        this.fnResetIncLocPostalDetails();
      }
    }
    catch (error) {
      throw error;
    }
  }

  getIncidentStateCityIncLoc(zipCodeIncLoc: string) {
    this.incLocPostalDetails.CityCode = '';
    this.incLocPostalDetails.CityName = '';
    this.incidentReportService.GetIncidentStateCityDetails(zipCodeIncLoc).subscribe(response => {
      if (response) {
        this.incidentIncLocInvalidZipCode = '';
        this.incidentStateIncLoc = response.filter((v, i, a) => a.findIndex(t => (t.label === v.label && t.value === v.value)) === i);
        if (this.incidentStateIncLoc && this.incidentStateIncLoc.length === commonNumbers.one) {
          this.incLocPostalDetails.StateCode = this.incidentStateIncLoc[commonNumbers.zero].stateCode;
          this.onStateSelection();
          this.incidentCityIncLoc = response.filter(x => x.stateCode == this.incidentStateIncLoc[0].stateCode);
          if (this.incidentCityIncLoc && this.incidentCityIncLoc.length === 1) {
            this.incLocPostalDetails.CityCode = this.incidentStateIncLoc[commonNumbers.zero].cityCode;
            this.incLocPostalDetails.CityName = this.incidentStateIncLoc[commonNumbers.zero].cityName;
          }
        }
        else if (response.length === commonNumbers.zero) {
          this.boolIncLocZipCode = false;
          this.incidentIncLocInvalidZipCode = IncidentConst.validationMessage.invalidZipCode
        }

      }
    }, error => this.errorMessage = <any>error);
  }

  //For Reporting Location State Selection
  onRepLocStateSelection() {
    try {
      this.incidentCityRepLoc = this.incidentStateReploc.filter((x) => {
        return x.stateCode == this.repLocPostalDetails.StateCode
      }
      )
    }
    catch (error) {
      throw error;
    }
  }

  //For Incident Location State Selection
  onStateSelection() {
    try {
      this.incidentCityIncLoc = this.incidentStateIncLoc.filter((x) => {
        return x.stateCode == this.incLocPostalDetails.StateCode
      }
      )
    }
    catch (error) {
      throw error;
    }
  }

  saveIncident(userForm) {
    this.CheckForLocationFields();
    this.SubmitIncidentDetails(userForm, false);
  }

  submitIncident(userForm) {
    this.SubmitIncidentDetails(userForm, true);
  }

  SubmitIncidentDetails(userForm, isSubmit: boolean) {
    try {
      if (this.statusUpdateRoutingLinesComponent !== undefined) {
        this.statusUpdateRoutingLinesComponent.UploadFiles()
      }
      if(this.isIncidentLocDetails == false)
      {
        this.IncidentDetails.incidentAddress = "";
        this.IncidentDetails.incidentAddrName = "";
        this.IncidentDetails.incidentLocCity = "";
        this.IncidentDetails.incidentLocStateCode =  "";
        this.IncidentDetails.incidentLocStateName = "";
        this.IncidentDetails.incidentLocCountryCode =  "";
        this.IncidentDetails.incidentLocCountryName = "";
        this.IncidentDetails.IncidentLocationNum = "";
        this.IncidentDetails.incidentLocZip = ""
      }
      this.IncidentDetails.incidentReportId = this.incidentId !== undefined ? this.incidentId : 0;
      this.IncidentDetails.orderNum = this.orderNum !== undefined && this.orderNum !== null ? this.orderNum : '';
      this.IncidentDetails.orderContactId = +this.ordercontactDetails.OrdHeaderId;
      this.IncidentDetails.orderContactName = this.ordercontactDetails.OrderContactPersonName !== undefined ? this.ordercontactDetails.OrderContactPersonName : '';
      this.IncidentDetails.orderContactPhone = this.ordercontactDetails.OrderContactPersonNumber !== undefined ? this.ordercontactDetails.OrderContactPersonNumber : '';
      this.IncidentDetails.OrderContactNum = this.ordercontactDetails.OrderContactNum !== undefined ? this.ordercontactDetails.OrderContactNum : '';
      this.IncidentDetails.incidentCreatedDate = this.incidentDateValue !== undefined && this.incidentDateValue !== null ? this.datePipe.transform(this.incidentDateValue, 'yyyy-MM-dd') : null;

      const incidentTypeId = this.incidentType.find(x => x.lookupText == this.incidentTypeValue);
      this.IncidentDetails.incidentTypeId = incidentTypeId !== undefined ? incidentTypeId.lookupDataId : 0;
      this.IncidentDetails.incidentTypeName = this.incidentTypeValue !== undefined && this.incidentTypeValue !== null ? this.incidentTypeValue : '';
      this.IncidentDetails.userIdReported = this.userId !== undefined ? this.userId : '';
      this.IncidentDetails.userNameReported = this.userName !== undefined ? this.userName : '';
      this.IncidentDetails.carrierName = this.ordercontactDetails.Carrier !== undefined ? this.ordercontactDetails.Carrier : '';
      this.IncidentDetails.CarrierNum = this.ordercontactDetails.TradingPartnerNum !== undefined ? this.ordercontactDetails.TradingPartnerNum : '';

      const priorityId = this.incidentPriority.find(x => x.lookupText == this.priorityValue);
      this.IncidentDetails.priorityId = priorityId !== undefined ? priorityId.lookupDataId : 0;
      this.IncidentDetails.priorityName = this.priorityValue;
      this.IncidentDetails.userId = this.userId !== undefined ? this.userId : '';
      this.IncidentDetails.incidentNumber = this.incidentNumber;
      this.IncidentDetails.IsComplete = isSubmit;
      this.IncidentDetails.reportedDate = this.datePipe.transform(this.date, 'yyyy-MM-dd');

      const carrier = this.CarrierdataList.find(x => x.carrierName === this.ordercontactDetails.Carrier);
      this.IncidentDetails.carrierID = carrier !== undefined ? +(carrier.carrierId) : 0;

      const incidentComments: any[] = [];
      if (this.enterComments === null || this.enterComments === undefined) {
        this.enterComments = new Array<IncidentComment>();
      }
      this.enterComments.forEach(e => {
        incidentComments.push({ "IncidentReportId": e.INCIDENTREPORTID, "Comment": e.COMMENTS, "createdby": e.CREATEDBY });
      });
      this.IncidentDetails.incidentComments = incidentComments;
      this.IncidentDetails.incidentDocuments = this.incidentAttachmentdata;

      this.IncidentDetails.ClientNumber = this.clientId !== undefined ? this.clientId : '';
      this.IncidentDetails.clientId = 0;
      this.IncidentDetails.clientName = this.clientName != undefined ? this.clientName : '';
      this.IncidentDetails.organizationId = 0;
      this.IncidentDetails.orderContactId = 0;

      this.resetForm = false;
      this.incidentReportService.submitIncidentDetails(this.IncidentDetails).subscribe(response => {
        if (response) {
          try {
            if(isSubmit == true){   
            const incidentSuccess = this.dialog.open(ConfirmationDialog, {
              data: {
                message:IncidentConst.yourIncident +  `${this.incidentNumber}`  + IncidentConst.submitMsg,
                buttonText: {
                  ok: UploadConst.ok
                }
              }
            });
            incidentSuccess.afterClosed().subscribe(confirmed => {
              if (confirmed) {
                userForm.resetForm();
                this.fnClear();
                this.router.navigate([RouteLinks.incidentgrid]);
              }
            })
          }
          else if(isSubmit == false) {   
            const incidentSuccess = this.dialog.open(ConfirmationDialog, {
              data: {
                message:IncidentConst.yourIncident + `${this.incidentNumber}`  + IncidentConst.saveMsg,
                buttonText: {
                  ok: UploadConst.ok
                }
              }
            });
            incidentSuccess.afterClosed().subscribe(confirmed => {
              if (confirmed) {
                userForm.resetForm();
                this.fnClear();
                this.router.navigate([RouteLinks.incidentgrid]);
              }
            })
          }
          }

          catch (error) {
            throw error;
          }
        }

      }, error => {
        const confirmRemoveComment = this.dialog.open(ConfirmationDialog, {
          data: {
            message: IncidentConst.failureMessage,
            buttonText: {
              ok: UploadConst.ok
            }
          }
        });
        confirmRemoveComment.afterClosed().subscribe(confirmed => {
          if (confirmed) {
            userForm.resetForm();
            this.fnClear();
            this.router.navigate([RouteLinks.incidentgrid]);
          }
        })
      });
    }
    catch (error) {
      throw error;
    }
  }

  //reset form
  resetUserForm(userForm: NgForm) {
    try {
      this.resetForm = false;
      const confirmRemoveComment = this.dialog.open(ConfirmationDialog, {
        data: {
          message: IncidentConst.validationMessage.confirmClear,
          buttonText: {
            ok: UploadConst.clearYes,
            cancel: UploadConst.deleteCancel
          }
        }
      });
      confirmRemoveComment.afterClosed().subscribe(confirmed => {
        if (confirmed) {
          userForm.resetForm();
          this.fnClear();
        }
      })
    }
    catch (error) {
      throw error;
    }
  }

  fnRepLoc(reportingLocation) {
    this.locationDetails.push({ entity: IncidentConst.reportingLocation, entityNum: reportingLocation.locationNumber, entityType: IncidentConst.reportingLocation });

  }
  fnIncLoc(incidentLocation) {
    this.locationDetails.push({ entity: IncidentConst.incidentLocation, entityNum: incidentLocation.locationNumber, entityType: IncidentConst.incidentLocation });
  }

  fnResetRepLocPostalDetails() {
    this.repLocPostalDetails.StateCode = '';
    this.repLocPostalDetails.StateName = '';
    this.repLocPostalDetails.CityName = '';
    this.repLocPostalDetails.CityCode = '';
    this.incidentStateReploc = null;
    this.incidentCityRepLoc = null;
  }

  fnResetIncLocPostalDetails() {
    this.incLocPostalDetails.StateCode = '';
    this.incLocPostalDetails.StateName = '';
    this.incLocPostalDetails.CityName = '';
    this.incLocPostalDetails.CityCode = '';
    this.incidentStateIncLoc = null;
    this.incidentCityIncLoc = null;
  }

  fnErrorMessageText() {

    this.incidentDateErrMessage = IncidentConst.validationMessage.incidentDate;
    this.incidentTypeErrMessage = IncidentConst.validationMessage.incidentType;
    this.orderNoErrMessage = IncidentConst.validationMessage.orderNumber;
    this.incidentCityNameErrMessage = IncidentConst.validationMessage.cityName;
    this.incidentZipCodeErrMessage = IncidentConst.validationMessage.zipCode;
    this.incidentStateNameErrMessage = IncidentConst.validationMessage.stateName;
    this.incidentIncLocErrMessage = IncidentConst.validationMessage.incLoc;
  }

  keyPressNumbers(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[0-9-/ ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  getIncLocationDetails(incLoc: locationDetails) {
    try {
      this.incidentAdvanceSearch.IncidentLocation = incLoc.IncidentLocation;
      this.incidentAdvanceSearch.IncidentPostalDetails = incLoc.IncidentPostalDetails;

      this.IncidentDetails.incidentAddress = incLoc.IncidentLocation;
      this.IncidentDetails.incidentAddrName = incLoc.IncidentLocation;
      this.IncidentDetails.incidentLocCity = incLoc.IncidentPostalDetails !== undefined ? incLoc.IncidentPostalDetails.CityName : null;
      this.IncidentDetails.incidentLocStateCode = incLoc.IncidentPostalDetails !== undefined ? incLoc.IncidentPostalDetails.StateCode : null;
      this.IncidentDetails.incidentLocStateName = incLoc.IncidentPostalDetails !== undefined ? incLoc.IncidentPostalDetails.StateName : null;
      this.IncidentDetails.incidentLocCountryCode = incLoc.IncidentPostalDetails !== undefined ? incLoc.IncidentPostalDetails.CountryCode : null;
      this.IncidentDetails.incidentLocCountryName = incLoc.IncidentPostalDetails !== undefined ? incLoc.IncidentPostalDetails.CountryName : null;
      this.IncidentDetails.IncidentLocationNum = incLoc.LocationNumber;
      this.IncidentDetails.incidentLocationId = incLoc.LocationId;
      this.IncidentDetails.incidentLocZip = incLoc.IncidentPostalDetails !== undefined ? incLoc.IncidentPostalDetails.PostalCode : null;
      this.isIncidentLocDetails = true;
    }
    catch (error) {
      throw error;
    }
  }

  getRepLocationDetails(repLoc: locationDetails) {
    try {
      this.incidentAdvanceSearch.ReportingLocation = repLoc.ReportingLocation;
      this.incidentAdvanceSearch.ReportingPostalDetails = repLoc.ReportingPostalDetails;

      this.IncidentDetails.reportingLocCity = repLoc.ReportingPostalDetails !== undefined ? repLoc.ReportingPostalDetails.CityName : null;
      this.IncidentDetails.reportingLocStateCode = repLoc.ReportingPostalDetails !== undefined ? repLoc.ReportingPostalDetails.StateCode : null;
      this.IncidentDetails.reportingLocStateName = repLoc.ReportingPostalDetails !== undefined ? repLoc.ReportingPostalDetails.StateName : null;
      this.IncidentDetails.reportingLocCountryCode = repLoc.ReportingPostalDetails !== undefined ? repLoc.ReportingPostalDetails.CountryCode : null;
      this.IncidentDetails.reportingLocCountryName = repLoc.ReportingPostalDetails !== undefined ? repLoc.ReportingPostalDetails.CountryName : null;
      this.IncidentDetails.reportingAddress = repLoc.ReportingLocation;
      this.IncidentDetails.reportingAddrName = repLoc.ReportingLocation;
      this.IncidentDetails.ReportingLocationNum = repLoc.LocationNumber;
      this.IncidentDetails.reportingLocationId = repLoc.LocationId;
      this.IncidentDetails.reportingLocZip = repLoc.ReportingPostalDetails !== undefined ? repLoc.ReportingPostalDetails.PostalCode : null;
    }
    catch (error) {
      throw error;
    }
  }

  fnClear() {
    this.date = new Date();
    this.getPriority(IncidentConst.priority)
    this.ordercontactDetails.OrderContactPersonName = '';
    this.ordercontactDetails.OrderContactPersonNumber = '';
    this.ordercontactDetails.Carrier = '';
    this.ordercontactDetails.TradingPartnerNum = '';
      this.IncidentDetails.reportingAddress='';
      this.IncidentDetails.reportingAddrName ='';
      this.IncidentDetails.ReportingLocationNum ='';
      this.IncidentDetails.reportingLocationId =0;
      this.IncidentDetails.reportingLocZip='';
      this.IncidentDetails.reportingLocCountryCode = '';
      this.IncidentDetails.reportingLocCountryName='';
      this.IncidentDetails.reportingLocCity = '';
      this.IncidentDetails.reportingLocStateCode = '';
      this.IncidentDetails.reportingLocStateName='';
      this.IncidentDetails.incidentCreatedDate='';


    if (this.enterComments !== null) {
      for (var i = this.enterComments.length - 1; i >= 0; i--) {
        if (this.enterComments[i].ID === 0) {
          this.enterComments.splice(i, 1);
        }
      }
    }
    if (this.statusUpdateRoutingLinesComponent !== undefined) {
      this.statusUpdateRoutingLinesComponent.closeUploadSection();
    }
    this.incidentAttachmentdata = [];
    this.resetForm = true;
  }

  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.resData = this.incidentAttachmentdataSource.data;
    this.activePageData = this.resData.slice(firstCut, secondCut);

  }

  OpenDocument(row: IncidentDocumentsJson) {
    let contentType;
    let fileType = row.FILETYPE.trim().toLocaleLowerCase();
    contentType = GetContentType(fileType);

    this.submitaOrderService.OpenFile(row.ID).subscribe(async res => {
      if (res) {
        let file = new Blob([res], { type: contentType });
        this.PreviewData = URL.createObjectURL(file);
        const dialogRef = this.dialog.open(OpenDocumentDialogueComponent,
          { data: { PreviewData: this.PreviewData, documentType: fileType, documentName: row.DOCNAME } });

        await dialogRef.afterClosed().subscribe(result => {

          if (result && result.event) {

            if (result.event == DocumentsConst.AccessDocuments.fullScreen) {

              switch (fileType) {
                case DocumentsConst.AccessDocuments.docx:
                case DocumentsConst.AccessDocuments.doc:
                case DocumentsConst.AccessDocuments.xls:
                  var fileLink = document.createElement('a');
                  fileLink.href = this.PreviewData;
                  fileLink.download = row.DOCDESCRIPTION;
                  fileLink.click();
                  break;
                case DocumentsConst.AccessDocuments.msg: var fileLink = document.createElement('a');
                  fileLink.href = this.PreviewData;
                  fileLink.download = row.DOCDESCRIPTION + '.msg';
                  fileLink.click();
                  break;
                default: window.open(this.PreviewData, DocumentsConst.AccessDocuments.preview);
                  break;
              }
            }
          }
        });

      }
    });
  }

  deleteSavedAttachment(value, event) {
    event.stopPropagation();
    const confirmCancel = this.dialog.open(ConfirmationDialog, {
      data: {
        message: `Are you sure you want to delete this attachment?`,
        buttonText: {
          ok: CommonConst.YES,
          cancel: CommonConst.NO
        }
      }
    });
    confirmCancel.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        if (value.ID !== 0) {
          this.incidentReportService.DeleteAttachments(value.ID).subscribe(res => {
            if (res) {
              this.incidentAttachmentdataSource.data = this.incidentAttachmentdataSource.data.filter(x => x.ID != value.ID);
              if (this.incidentAttachmentdataSource.data.length === 0) {
                this.isAttachments = false;
              }
            }
          })
        }
      }
    })
  }

  CheckForLocationFields() {
    this.IncidentDetails.reportingLocCity = this.IncidentDetails.reportingLocCity !== undefined ? this.IncidentDetails.reportingLocCity : '';
    this.IncidentDetails.reportingLocStateCode = this.IncidentDetails.reportingLocStateCode !== undefined ? this.IncidentDetails.reportingLocStateCode : '';
    this.IncidentDetails.reportingLocStateName = this.IncidentDetails.reportingLocStateName !== undefined ? this.IncidentDetails.reportingLocStateName : '';
    this.IncidentDetails.reportingLocCountryCode = this.IncidentDetails.reportingLocCountryCode !== undefined ? this.IncidentDetails.reportingLocCountryCode : '';
    this.IncidentDetails.reportingLocCountryName = this.IncidentDetails.reportingLocCountryName !== undefined ? this.IncidentDetails.reportingLocCountryName : '';
    this.IncidentDetails.reportingAddress = this.IncidentDetails.reportingAddress !== undefined ? this.IncidentDetails.reportingAddress : '';
    this.IncidentDetails.reportingAddrName = this.IncidentDetails.reportingAddrName !== undefined ? this.IncidentDetails.reportingAddrName : '';
    this.IncidentDetails.ReportingLocationNum = this.IncidentDetails.ReportingLocationNum !== undefined ? this.IncidentDetails.ReportingLocationNum : '';
    this.IncidentDetails.reportingLocationId = this.IncidentDetails.reportingLocationId !== undefined ? this.IncidentDetails.reportingLocationId : 0;
    this.IncidentDetails.reportingLocZip = this.IncidentDetails.reportingLocZip !== undefined ? this.IncidentDetails.reportingLocZip : '';
    this.IncidentDetails.incidentAddress = this.IncidentDetails.incidentAddress !== undefined ? this.IncidentDetails.incidentAddress : '';
    this.IncidentDetails.incidentAddrName = this.IncidentDetails.incidentAddrName !== undefined ? this.IncidentDetails.incidentAddrName : '';

    this.IncidentDetails.incidentLocCity = this.IncidentDetails.incidentLocCity !== undefined ? this.IncidentDetails.incidentLocCity : '';
    this.IncidentDetails.incidentLocStateCode = this.IncidentDetails.incidentLocStateCode !== undefined ? this.IncidentDetails.incidentLocStateCode : '';
    this.IncidentDetails.incidentLocStateName = this.IncidentDetails.incidentLocStateName !== undefined ? this.IncidentDetails.incidentLocStateName : '';
    this.IncidentDetails.incidentLocCountryCode = this.IncidentDetails.incidentLocCountryCode !== undefined ? this.IncidentDetails.incidentLocCountryCode : '';
    this.IncidentDetails.incidentLocCountryName = this.IncidentDetails.incidentLocCountryName !== undefined ? this.IncidentDetails.incidentLocCountryName : '';
    this.IncidentDetails.IncidentLocationNum = this.IncidentDetails.IncidentLocationNum !== undefined ? this.IncidentDetails.IncidentLocationNum : '';
    this.IncidentDetails.incidentLocationId = this.IncidentDetails.incidentLocationId !== undefined ? this.IncidentDetails.incidentLocationId : 0;
    this.IncidentDetails.incidentLocZip = this.IncidentDetails.incidentLocZip !== undefined ? this.IncidentDetails.incidentLocZip : '';
  }

}
