import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener, QueryList } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderModel, OrderHeaderModel, OrderLinesModel, OrderCommentsModel, OrderAttachmentModel, OrderMapModel, StatusUpdateLines, OrderMilestoneModel, OrderTransitMap } from 'src/app/shared/models/order/order';
import { TrackOrderService } from 'src/app/logx-services/trackAndTrace/track-order.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatTableDataSource } from '@angular/material/table';
import { AccessDocumentService } from 'src/app/logx-services/documents/access-document.service';
import { MatDialog } from '@angular/material/dialog';
import { OpenDocumentDialogueComponent } from 'src/app/logx-modules/documents/open-document-dialogue/open-document-dialogue.component';
import { StatusUpdateRoutingLinesComponent } from '../status-update-routing-lines/status-update-routing-lines.component';
import { FileUpload, FileUploadResponse, Entities, EntityDescription, UploadFileResposeType } from 'src/app/shared/models/order/file-upload.model';
import { UploadAndLookupDetailService } from 'src/app/logx-services/common/upload-and-lookup-detail.service';
import { NotificationService } from "src/app/logx-services/common/notification.service";
import { Notification, NotificationType } from "src/app/shared/models/notification";
import { ExportDataComponent } from 'src/app/logx-modules/trackTrace/vieworderdetail/export-data/export-data.component'
import { ExportData } from 'src/app/shared/models/order/export-data.model';
import { ExportDataService } from 'src/app/logx-services/trackAndTrace/export-data.service';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { DatePipe } from '@angular/common'
import { MatPaginator } from '@angular/material/paginator';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UploadConst, OrderDetailConst, CommonConst, DocumentsConst, commonNumbers, ExportDataConst } from 'src/app/configs/constants';
import { GetContentType, Userinfo } from 'src/app/shared/common/common-method'
import { ViewChildren } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SeachReportService } from 'src/app/logx-services/searchAndReport/seach-report.service';
import { map } from 'rxjs/operators';
import { UserPreferenceService } from 'src/app/logx-services/common/user-preference.service';

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.scss']
})
export class OrderdetailsComponent implements OnInit {
  xpandStatus = false;
  UploadConst = UploadConst;
  OrderDetailConst = OrderDetailConst;
  CommonConst = CommonConst;
  DocumentsConst = DocumentsConst;
  commonNumbers = commonNumbers;
  ExportDataConst = ExportDataConst;
  referenceDisplay: string;
  panelOpenState = false;
  public referenceDisplayMore: string;
  isShowDiv: boolean;
  firstStep: boolean = false;
  secondStep: boolean = false;
  thirdStep: boolean = false;
  incidentDisplay: any;
  headerIncidentLength: number;
  headerReferenceLength: number = 0;
  referenceNumFilter: string[];
  exportData: ExportData = <ExportData>{};
  filesUploadList: string[] = [];
  ordermilestoneModel: OrderMilestoneModel[] = [];
  fileUploadRequ: FileUpload = <FileUpload>{};
  filesSelected: FileList;
  errorMessage: any;
  public orderNum: string = "";
  public orderModel: OrderModel = <OrderModel>{};
  public counts = ["New", "Order Received", "Pending Pickup",
    "Arrive Pickup", "In Transit",
    "Delivery Scheduled", "Arrived at Delivery",
    "Delivered", "POD Received", "Closed"];
  name = "Order Tracking";
  public isShowMoreDetails = false;
  public doneStatus = [];
  public orderHeaderModel: OrderHeaderModel;
  public visible: number;
  public values = [];
  isExpandedAdditionalInfo: boolean = false;
  isExpandedProducts: boolean = false;
  isExpandedAttachments: boolean = false;
  isExpandedRouting: boolean = false;
  isExpandedComments: boolean = false;
  isExpandedMap: boolean = false;
  isExpandedUploads: boolean = true;
  isExpandedIncident: boolean = false;

  release: boolean = false;
  pos: any;
  statusUpdateCount: number = 0;
  orderLineItemCount: number = 0;
  orderCommentCount: number = 0;
  orderAttachmentCount: number = 0;
  orderLinedata: OrderLinesModel[] = [];
  orderLinedataSource = new MatTableDataSource(this.orderLinedata)
  orderTransitMap: OrderTransitMap;
  isOpenUploadFiles = false;
  PreviewData: any;
  orderMapModel: OrderMapModel;
  statusUpdateLinesData: StatusUpdateLines[] = [];
  unClass: string;
  hazmatConNum: string;
  packingGroup: string;
  hazClass: string;
  public countOfCompletedStages: number;
  accessorialbuttonClicked: boolean = false
  incidentreportbuttonClicked: boolean = false
  activePageData = [];
  commentData = [];
  resData: any;
  oldSelected: boolean =true;
  count: number =0;
  addboxClose: boolean =false;
  isSelected: boolean=false;
  len: number;
  attachmenteData = [];

  displayedColumns = ['orderLineId', 'grossWeight', 'grossVolume', 'huCount', 'huType',
    'pieceCount', 'pieceType', 'freightClass', 'tcnNumber', 'description',
    'length', 'width', 'height', 'isHazmat'];
  commentDisplayedColumns = ['commentType', 'comment', 'stopNum'];
  attachmentDisplayedColumns = ['documentDate', 'documentType', 'docDescription', 'fileType'];

  orderLineItemsColumns: any[] = [{ field: 'orderLineId', header: '#' },
  { field: 'grossWeight', UOM : "grossWeightUom" , header: OrderDetailConst.grossWeight}, { field: 'grossVolume', UOM : "grossVolumeUom", header: OrderDetailConst.grossVolume }, { field: 'huCount', header: OrderDetailConst.huCount },
  { field: 'huType', header: OrderDetailConst.huType }, { field: 'pieceCount', header: OrderDetailConst.pieceCount }, { field: 'pieceType', header: OrderDetailConst.pieceType },
  { field: 'freightClass', header: OrderDetailConst.freightClass }, { field: 'tcnNumber', header: OrderDetailConst.tcn }, { field: 'description', header: OrderDetailConst.description },
  { field: 'length', UOM : "huLengthUOM", header: OrderDetailConst.length },
  { field: 'width', UOM : "huWidthUOM",  header: OrderDetailConst.width }, { field: 'height', UOM : "huHeightUOM", header: OrderDetailConst.height }, { field: 'isHazmat', header: OrderDetailConst.hazmat }
  ]

  orderCommentsdata: OrderCommentsModel[] = [];
  orderCommentsdataSource = new MatTableDataSource(this.orderCommentsdata)
  orderCommentsColumns = [{ field: 'commentType', header: OrderDetailConst.commentType },
  { field: 'comment', header: OrderDetailConst.comment }, { field: 'stopNum', header: OrderDetailConst.stopNumber }
  ]

  orderAttachmentdata: OrderAttachmentModel[] = [];
  orderAttachmentdataSource = new MatTableDataSource(this.orderAttachmentdata);
  orderAttachmentColumns = [
    { field: 'documentDate', header: OrderDetailConst.date },
    { field: 'documentType', header: OrderDetailConst.document },
    { field: 'docDescription', header: CommonConst.description },
    { field: 'fileType', header: OrderDetailConst.fileType },
  ]

  lineOfRoutinColumns = [{ field: 'loadNumber', header: OrderDetailConst.loadNub }, { field: 'carrier', header: OrderDetailConst.carrier },
  { field: 'status', header: OrderDetailConst.statusEvent }, { field: 'city', header: OrderDetailConst.city }, { field: 'state', header: OrderDetailConst.state }, { field: 'zip', header: OrderDetailConst.zip }, { field: 'notes', header: OrderDetailConst.notes }, { field: 'dateTime', header: OrderDetailConst.dateTime }
  ];
  orderDetailOriginColumns = [{ field: 'originLocation', header: OrderDetailConst.originLocation }, { field: 'originContactName', header: OrderDetailConst.contactName }, { field: 'originContactNum', header: OrderDetailConst.contactNumber },
  { field: 'pickupDateTimeUtc', header: OrderDetailConst.pickUpDate }];
  orderDetailDestinationColumns = [{ field: 'destinationLocation', header: OrderDetailConst.deliverLocation }, { field: 'destinationContactName', header: OrderDetailConst.contactName }, { field: 'destinationContactNum', header: OrderDetailConst.contactNumber },
  { field: 'deliveryDateTimeUtc', header: OrderDetailConst.deliveryDate }];
  orderDetailAdditinalInfoColumns = [{ field: 'serviceOptionCode', header: OrderDetailConst.serviceOptions }, { field: 'equipmentType', header: OrderDetailConst.equipmentType }, { field: 'carrier', header: OrderDetailConst.carrier },
  { field: 'distance', header: OrderDetailConst.distance }, { field: 'priority', header: OrderDetailConst.priority }, { field: 'isHazmat', header: OrderDetailConst.hazmat }, { field: 'referenceNumbers', header: OrderDetailConst.referNumb }];
  orderHeaderExportData: OrderHeaderModel[] = [];
  Lookuptype: string = 'innergrid-pagecount';
  pageSizeOptions: any[] = [];
  pageSize: number = 0;
  public currentPage = 0;
  //@ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  accessorialCode: boolean = false;
  incidentCode: boolean = false;
  showStatus: boolean = false;
  accessorialCodeDetailResults: any;
  accessorialCodeDetailResultsLength: number;
  results: any;
  accessorialCodeDetail: any;
  showAccessorialCodeSection: boolean = true;
  showIncidentSelection: boolean = false;
  incidentordrecord: any;

  incidentord: any;
  originStateName: any;
  destinationStateName: any;
  shipstatus: any;
  isShown: boolean = false ;
 // isSelected: boolean =false;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
 
  showserviceExepSelection: boolean = false;

  servicerecord: any;
  serviceExepLen: number;
  serviceExeptDisplay: any;
  serviceExceptionClicked: boolean;
  serviceCode: any;
  user_userName: any;
  weightVal: any = "";
  dimensionVal: any = "";
  volumeVal: any = "";
  user_userId: any;


  @ViewChildren(MatPaginator) set matPaginator(mp: MatPaginator) {
    if (this.isExpandedProducts != false) {
      this.orderLinedataSource.paginator = this.paginator.toArray()[0];
    }
       this.orderAttachmentdataSource.paginator = this.paginator.toArray()[1];
  }
  
  @ViewChild(StatusUpdateRoutingLinesComponent) statusUpdateRoutingLinesComponent: StatusUpdateRoutingLinesComponent;
  obj: BehaviorSubject<any>;
  subscription: Subscription;
  selected;
  constructor(
    public activatedRoute: ActivatedRoute,
    private trackOrderService: TrackOrderService,
    public userPreferenceService: UserPreferenceService,
    private renderer: Renderer2,
    private accessDocumentServices: AccessDocumentService,
    public dialog: MatDialog,
    public uploadService: UploadAndLookupDetailService,
    protected notificationService: NotificationService,
    protected exportDataService: ExportDataService,
    public datepipe: DatePipe,
    private dataTransfer: DataTransferService, public snackBar: MatSnackBar,
    public searchReportService: SeachReportService
  ) { }

  ngOnInit(): void {
    try {
      this.dataTransfer.obj.subscribe(data => { this.orderNum = data; });

      this.orderNum = this.orderNum === undefined || this.orderNum === null || this.orderNum === " " ? localStorage.getItem(DocumentsConst.AccessDocuments.searchCriteria) : this.orderNum;
      localStorage.removeItem(DocumentsConst.AccessDocuments.searchCriteria)
      this.showMoreDetails();
      this.orderMapModel = new OrderMapModel();
      this.orderMapModel.startLocation = [];
      this.orderMapModel.endLocation = [];
      this.showTableRouting(false);
      this.orderAccessorialDetails(this.orderNum);
      let userInfo = Userinfo();
      this.user_userName = userInfo !== undefined ? userInfo.username : "";
      this.user_userId = userInfo !== undefined ? userInfo.userid : "";
      this.getUserPreference(this.user_userName)
    }
    catch (error) {
      throw error;
    }
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunload($event: Event): void {
    localStorage.setItem(DocumentsConst.AccessDocuments.searchCriteria, this.orderNum);
  }

  ngAfterViewInit() {
    try {
      this.uploadService.GetLookupDetails(this.Lookuptype).subscribe(async data => {
        if (data && data.length > commonNumbers.zero) {
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

  public handlePage(e: any) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
  }

  getOrderMileStoneStatus() {
    this.trackOrderService.GetOrderMileStoneStatus(this.orderNum).subscribe(res => {
      this.ordermilestoneModel = res;
      this.countOfCompletedStages = res.filter(x => x.shipmentStatusCode !== "").length;
      })
  }


  itemTableDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  commentTableDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.commentDisplayedColumns, event.previousIndex, event.currentIndex);
  }
  attachmentTableDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.attachmentDisplayedColumns, event.previousIndex, event.currentIndex);
  }

  showMoreDetails() {
    try {
      this.getOrderHeaderDetails();
      this.getOrderLinesItems();
      this.getOrderComments();
      this.getOrderAttachment();
      this.getStatusUpdateRoutingLineItems();
      this.getOrderMileStoneStatus();
      this.getincidentdata();
      this.getServiceExceptiondata()
    }
    catch (error) {
      throw error;
    }
  }

  public getStatusUpdateRoutingLineItems() {
    this.statusUpdateLinesData = [];
    this.exportData.linesofRouting = false;
    this.trackOrderService.getStatusUpdateRoutingLineItems(this.orderNum).subscribe(data => {
      if (data) {
        this.statusUpdateCount = data.length;
        if (data.length > commonNumbers.zero)
          this.statusUpdateLinesData = data;
        this.exportData.linesofRouting = true;
      }
    })
  }
  toggleShow(){
    this.isShown = ! this.isShown;
  }
  getOrderHeaderDetails() {
    this.exportData.orderDetails = false;
    this.trackOrderService.getOrderHeaderDetails(this.orderNum).subscribe(data => {
      if (data)
      this.orderHeaderModel = data[0];
      this.originStateName = this.orderHeaderModel.originLocation.split(',');
      this.destinationStateName = this.orderHeaderModel.deliveryLocation.split(',')
      if (this.orderHeaderModel) {
        this.exportData.orderDetails = true;
        this.referenceNumFilter = ((this.orderHeaderModel.referenceNumbers && (this.orderHeaderModel.referenceNumbers.indexOf(',') > 0)) ?
          this.orderHeaderModel.referenceNumbers.split(',') : null);
        this.headerReferenceLength = this.referenceNumFilter.length;
        if (this.headerReferenceLength > commonNumbers.three) {
          this.referenceDisplay = (this.referenceNumFilter.slice(commonNumbers.zero, commonNumbers.three)).join(",");
          this.referenceNumFilter.splice(commonNumbers.zero, commonNumbers.three);
          this.referenceDisplayMore = this.referenceNumFilter.join(",");
        }
        this.shipstatus = data[0].status;
        this.getshipmenttruck(this.shipstatus);

      }
    })
  }
  getshipmenttruck(shipstatus){
    if (shipstatus == "New" || shipstatus == "Order Received" || shipstatus== "Pending Pickup" || shipstatus == "Arrive Pickup") {
      this.firstStep = true;
    } else if (shipstatus == "In Transit" || shipstatus == "Delivery Scheduled ") {
      this.secondStep = true;
    } else if (shipstatus == "Arrived at Delivery" || shipstatus== "Delivered" || shipstatus== "POD Received" || shipstatus == "Closed") {
      this.thirdStep = true;
    }
  }
  getincidentdata() {
    this.trackOrderService.GetIncidentReportData(this.orderNum).subscribe(res => {
      if (res) {
        this.incidentordrecord =  res.tMSIncidentsforOrder;   
        this.incidentord  = this.incidentordrecord.filter((item, i, ar) => ar.indexOf(item) === i);
        this.headerIncidentLength = (this.incidentord.length - commonNumbers.one);
        if (this.incidentord.length > commonNumbers.zero) {
          this.showIncidentSelection = true;
        }
        if (this.incidentord.length > commonNumbers.one) {
          this.incidentDisplay =  this.incidentord.splice(commonNumbers.one, this.incidentord.length + commonNumbers.one);
        }
      }
      else {
        this.showIncidentSelection = false;
      }
    }, error => {
      this.errorMessage = <any>error
      this.showIncidentSelection = false;
    })
  }
  getServiceExceptiondata() {
    this.trackOrderService.GetServiceExceptiondata(this.orderNum).subscribe(res => {
      if (res.length > 0) {
        this.showserviceExepSelection = true;

        this.servicerecord = res;
        this.serviceExepLen = (res.length - 1);
        if (res.length > 1) {

          this.serviceExeptDisplay = this.servicerecord.splice(commonNumbers.one, this.servicerecord.length + 1);
        }
      }
      else {
        this.showserviceExepSelection = false;
      }
    }, error => {
      this.errorMessage = <any>error
      this.showserviceExepSelection = false;
    })
  }
  getOrderLinesItems() {
    this.exportData.items = false;
    this.trackOrderService.getOrderLineItems(this.orderNum).subscribe(data => {
      if (data) {
        this.orderLineItemCount = data.length;
        this.orderLinedataSource.data = data
        this.activePageData = data.slice(commonNumbers.zero, this.pageSize);
        if (this.orderLinedataSource.data && this.orderLinedataSource.data.length > commonNumbers.zero) {
          this.exportData.items = true;
        }
        this.getUserPreference(this.user_userName)        
      }
    })
  }
  getHazmat(rowNum) {
    try {
      if (this.orderLinedataSource.data !== null) {
        this.unClass = this.orderLinedataSource.data[rowNum].uNclass;
        this.hazmatConNum = this.orderLinedataSource.data[rowNum].hazmatContactNum;
        this.packingGroup = this.orderLinedataSource.data[rowNum].packingGroup;
        this.hazClass = this.orderLinedataSource.data[rowNum].hazClass;
      }
    }
    catch (error) {
      throw error;
    }
  }
  getUserPreference(userName: string){    
    this.userPreferenceService.GetUserPreference(userName).subscribe(response => {
      if (response.userPreferences) {
        if (response.userPreferences.length) {
          this.weightVal = response.userPreferences[0].weight.split(" ");
          this.volumeVal = response.userPreferences[0].volume.split(" ");
          this.dimensionVal = response.userPreferences[0].dimension.split(" ");
        }
      }    

    });

  }
  UpdateLineroutingCount(count: any) {
    this.statusUpdateCount = count;
  }

  getOrderComments() {
    this.exportData.comments = false;
    this.trackOrderService.getOrderComments(this.orderNum).subscribe(data => {
      if (data) {
        this.orderCommentCount = data.length;
        this.orderCommentsdataSource.data = data;
        this.commentData = data.slice(commonNumbers.zero, this.pageSize);
        if (this.orderCommentsdataSource.data && this.orderCommentsdataSource.data.length > commonNumbers.zero) {
          this.exportData.comments = true;
        }
      }
    })
  }

  getOrderAttachment() {
    this.exportData.attachmentSummary = false;
    this.trackOrderService.getOrderAttachment(this.orderNum)
    .pipe(
      map(data => data.sort((a, b) => new Date(b.documentDate).getTime() - new Date(a.documentDate).getTime()))
  )
  .subscribe(data => {
      if (data) {
        this.orderAttachmentCount = data.length;
        this.orderAttachmentdataSource.data = data;
        this.attachmenteData = data.slice(commonNumbers.zero, commonNumbers.five);
        if (this.orderAttachmentdataSource && this.orderAttachmentdataSource.data.length > commonNumbers.zero) {
          this.exportData.attachmentSummary = true;
        }
      }
    })
  }

  OpenDocument(row: OrderAttachmentModel) {
    let contentType;
    let fileType = row.fileType.trim().toLocaleLowerCase();
    contentType = GetContentType(fileType);

    this.accessDocumentServices.OpenFile(row.ordDocId, row.documentType).subscribe(async res => {
      if (res) {
        let file = new Blob([res], { type: contentType });
        this.PreviewData = URL.createObjectURL(file);
        const dialogRef = this.dialog.open(OpenDocumentDialogueComponent, { data: { PreviewData: this.PreviewData, documentType: fileType, documentName: row.documentNumber } });

        await dialogRef.afterClosed().subscribe(result => {

          if (result && result.event) {

            if (result.event == DocumentsConst.AccessDocuments.fullScreen) {

              switch (fileType) {
                case DocumentsConst.AccessDocuments.docx:
                case DocumentsConst.AccessDocuments.doc:
                case DocumentsConst.AccessDocuments.xls:
                  case DocumentsConst.AccessDocuments.xlsx:
                  var fileLink = document.createElement('a');
                  fileLink.href = this.PreviewData;
                  fileLink.download = row.docDescription;
                  fileLink.click();
                  break;
                case DocumentsConst.AccessDocuments.msg: var fileLink = document.createElement('a');
                  fileLink.href = this.PreviewData;
                  fileLink.download = row.docDescription + '.msg';
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

  openUploadFile() {
    this.isOpenUploadFiles = true;
  }

  closeUploadSection(isClose: any) {
    if (isClose)
      this.isOpenUploadFiles = !isClose;
  }

  DisplayToolTip(status: string): string {
    if (this.orderModel && this.orderModel.trackStatus && this.orderModel.trackStatus.length > commonNumbers.zero && status && status.trim()) {
      let statusItem = this.orderModel.trackStatus.find(e => e.status === status);
      if (statusItem) {
        return (statusItem.actionDate ? statusItem.actionDate : "") + "," + (statusItem.location ? statusItem.location : "");
      }

    }
  }

  showAdditionalInfoTable(val) {
    this.isExpandedAdditionalInfo = val;
    if(val){
    this.addboxCollapse();
    }
    }
    
     addboxCollapse() {
    this.incidentCode = false;
    }
  showProductsTable(val) {
    this.isExpandedProducts = val;
  }

  showAttachmentsTable(val) {
    this.isExpandedAttachments = val;
  }

  showTableRouting(val) {
    this.isExpandedRouting = val;
  }

  showCommentsTable(val) {
    this.isExpandedComments = val;
  }

  showMapTable(val) {
    this.isExpandedMap = val;
  }

  showUploadsTable(val) {
    this.isExpandedUploads = val;
  }

  AddFile(event: any) {
    this.isOpenUploadFiles = true;
    this.filesSelected = event.target.files;
  }

  UploadFiles(fileList: any) {
    //Upload files with API
    if (fileList.length > commonNumbers.zero) {
      this.filesUploadList = [];
      this.fileUploadRequ.OrganizationName = OrderDetailConst.orgnizationName;
      this.fileUploadRequ.entity = OrderDetailConst.load,
        this.fileUploadRequ.entityDescription = <EntityDescription>{};
      this.fileUploadRequ.entityDescription.EntityNum = (this.orderHeaderModel ? this.orderHeaderModel.loadNum : '');
      this.fileUploadRequ.Docs = [];
      this.fileUploadRequ.Docs = fileList;
      fileList.forEach((fileDetail) => {
        this.filesUploadList.push(fileDetail.DocNum);
      });


      this.uploadService.UploadFiles(this.fileUploadRequ).subscribe(result => {
        if (result) {
          this.getOrderAttachment();
          switch (result.result.trim().toLowerCase()) {

            case UploadFileResposeType.Success:
            case UploadFileResposeType.TotalSuccess:
              this.snackBar.open(UploadConst.uploadSuccessful, '', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
              })
              break;

            case UploadFileResposeType.Warning:
            case UploadFileResposeType.PartialSuccess:
              let filenotuploaded = this.GetUploadFailureFilesList(result.entityResult);
              this.snackBar.open(OrderDetailConst.uploadPartial + filenotuploaded + OrderDetailConst.notloaded, '', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
              })
              break;

            case UploadFileResposeType.Failure:
            case UploadFileResposeType.TotalFailure:
              this.snackBar.open(OrderDetailConst.uploadFailed, '', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
              })
              break;
          }
        } else {
          this.snackBar.open(OrderDetailConst.uploadUnSuccess, '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          })
        }
      }, error => {
        this.errorMessage = <any>error
        this.snackBar.open(OrderDetailConst.docNotUploaded, '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
      });
    }
    //after uploading files show message of upload success or failure then close upload file
    this.isOpenUploadFiles = false;
  }

  GetUploadFailureFilesList(filesUploadresponse: any): string {
    let fileNotupload = '';
    filesUploadresponse.forEach((fileResult) => {
      if (fileResult.result && fileResult.result.toLowerCase() === OrderDetailConst.success)

        if (this.filesUploadList.includes(fileResult.externalId)) {
          this.filesUploadList = this.filesUploadList.filter(obj => obj !== fileResult.externalId);
        }
        else {
          let fileDuplicateName = fileResult.externalId.substr(0, fileResult.externalId.lastIndexOf('-'));
          if (this.filesUploadList.includes(fileDuplicateName)) {
            this.filesUploadList = this.filesUploadList.filter(obj => obj !== fileDuplicateName);
          }
        }
    });
    fileNotupload = this.filesUploadList.map(x => x).join(",")
    return fileNotupload;
  }

  async ExportData() {
    const dialogRef = this.dialog.open(ExportDataComponent, { data: this.exportData });
    await dialogRef.afterClosed().subscribe(result => {

      if (result && result.event) {

        if (result.event == ExportDataConst.exportData) {
          //Gives selected data on export pop up and based on selection can export data as Csv or pdf.
          let exportdataSel = result.data;

          if (exportdataSel && exportdataSel.documentType && exportdataSel.documentType.toLowerCase() === ExportDataConst.expCsv) {
            this.ExportCsv(exportdataSel);
          }
          else {
            this.ExportPdf(exportdataSel);
          }


        }
      }
    })

  }

  ExportCsv(exportdataSel: any) {
    let exportCsvData: string = '';
    this.orderHeaderExportData = [];
    if (this.orderHeaderModel && this.orderHeaderModel.orderNum) {
      //Dsiplay Order detail number
      exportCsvData += OrderDetailConst.orderNumb + this.orderHeaderModel.orderNum;
      exportCsvData += ',' + '' + '\r\n';
      exportCsvData += ',' + '' + '\r\n';
    }

    if (exportdataSel.orderDetails && this.orderHeaderModel) {
      this.orderHeaderExportData.push(this.orderHeaderModel);
      //Export Order Detail Origin
      exportCsvData += this.exportDataService.ConvertToCSV(this.orderHeaderExportData, this.orderDetailOriginColumns, OrderDetailConst.origin);
      //Export Order Detail Destination
      exportCsvData += this.exportDataService.ConvertToCSV(this.orderHeaderExportData, this.orderDetailDestinationColumns, OrderDetailConst.destination);
      //Export Order Detail Origin
      exportCsvData += this.exportDataService.ConvertToCSV(this.orderHeaderExportData, this.orderDetailAdditinalInfoColumns, OrderDetailConst.additionalInfo);


    }
    if (exportdataSel.items) {
      exportCsvData += this.exportDataService.ConvertToCSV(this.orderLinedataSource.data, this.orderLineItemsColumns, OrderDetailConst.orderLineItems + this.orderLineItemCount + OrderDetailConst.closeBrace);
    }
    if (exportdataSel.linesofRouting) {
      exportCsvData += this.exportDataService.ConvertToCSV(this.statusUpdateLinesData, this.lineOfRoutinColumns, OrderDetailConst.lineOfRouting + this.statusUpdateCount + OrderDetailConst.closeBrace);
    }
    if (exportdataSel.attachmentSummary) {
      exportCsvData += this.exportDataService.ConvertToCSV(this.orderAttachmentdataSource, this.orderAttachmentColumns, OrderDetailConst.attachment + this.orderAttachmentCount + OrderDetailConst.closeBrace);
    }
    if (exportdataSel.comments) {
      exportCsvData += this.exportDataService.ConvertToCSV(this.orderCommentsdataSource.data, this.orderCommentsColumns, OrderDetailConst.comments + this.orderCommentCount + OrderDetailConst.closeBrace);
    }

    this.exportDataService.downloadFile(exportCsvData, this.orderNum + OrderDetailConst.exportdataCsv);
  }


  ExportPdf(exportdataSel: any) {
    var doc = new jsPDF();

    doc.setFontSize(commonNumbers.fifteen);
    if (this.orderHeaderModel && this.orderHeaderModel != undefined) {
      doc.setTextColor(0, 0, 0);
      doc.text(OrderDetailConst.orderNumb + " " + this.orderHeaderModel.orderNum, 5, 10);
    }

    doc.setFontSize(commonNumbers.eleven);
    // doc.setTextColor(100);
    let finalY;
    if (exportdataSel.orderDetails && this.orderHeaderModel != undefined) {

      var rowsorigin = [];
      var itemOrigin = [
        {
          OriginLocation: ((this.orderHeaderModel.originLocation) ? this.orderHeaderModel.originLocation + ' ' : '') + this.orderHeaderModel.originAddressLine +
            ' ' + this.orderHeaderModel.originCityName + ',' + this.orderHeaderModel.originState + ' ' + this.orderHeaderModel.originZip, ContactName: this.orderHeaderModel.originContactName, ContactNumber: this.orderHeaderModel.originContactNum, PickupDate: this.orderHeaderModel.pickupDateTimeUtc
        }
      ]
      itemOrigin.forEach(element => {
        var tempOrigin = [element.OriginLocation, element.ContactName, element.ContactNumber, element.PickupDate];
        rowsorigin.push(tempOrigin);
      });

      doc.text(OrderDetailConst.origin + " ", 5, 20);

      (doc as any).autoTable({
        startX: 0, startY: 25, columns: this.orderDetailOriginColumns,
        body: rowsorigin,
        styles: { fontSize: 8, overflow: 'linebreak' },
        margin: { left: 5, right: 5 },
        columnStyles: {
          1: { columnWidth: 'auto' }
        }
      });

      var rowsdelivery = [];
      var itemDelivery = [
        {
          DeliveryLocation: ((this.orderHeaderModel.destinationLocation) ? this.orderHeaderModel.destinationLocation + ' ' : '') + this.orderHeaderModel.destinationAddressLine +
            ' ' + this.orderHeaderModel.destinationCityName + ',' + this.orderHeaderModel.destinationState + ' ' + this.orderHeaderModel.destinationZip, ContactName: this.orderHeaderModel.destinationContactName, ContactNumber: this.orderHeaderModel.destinationContactNum, DeliveryDate: this.orderHeaderModel.deliveryDateTimeUtc
        }
      ]
      itemDelivery.forEach(element => {
        var tempDelivery = [element.DeliveryLocation, element.ContactName, element.ContactNumber, element.DeliveryDate];
        rowsdelivery.push(tempDelivery);
      });

      finalY = (doc as any).previousAutoTable.finalY;
      finalY = (finalY == undefined) ? commonNumbers.ten : finalY;
      doc.text(OrderDetailConst.destination + " ", commonNumbers.five, finalY + commonNumbers.ten);

      (doc as any).autoTable({
        startY: finalY + 15, columns: this.orderDetailDestinationColumns, body: rowsdelivery,
        styles: { fontSize: 8, overflow: 'linebreak' },
        margin: { left: 5, right: 5 },
        columnStyles: {
          1: { columnWidth: 'auto' }
        }
      });

      finalY = (doc as any).previousAutoTable.finalY;
      finalY = (finalY == undefined) ? commonNumbers.ten : finalY;
      doc.text(OrderDetailConst.additionalInfo, 5, finalY + commonNumbers.ten);

      var rowsAddlinfo = [];
      var itemAddlinfo = [
        {
          ServiceOptions: this.orderHeaderModel.serviceOptionCode, EquipmentType: this.orderHeaderModel.equipmentType,
          Carrier: this.orderHeaderModel.carrier, Distance: this.orderHeaderModel.distance, Priority: this.orderHeaderModel.priority,
          Hazmat: this.orderHeaderModel.isHazmat, ReferenceNumbers: this.orderHeaderModel.referenceNumbers
        }
      ]
      itemAddlinfo.forEach(element => {
        var tempAddlinfo = [element.ServiceOptions, element.EquipmentType, element.Carrier, element.Distance, element.Priority == false ? OrderDetailConst.low : OrderDetailConst.high, element.Hazmat == false ? OrderDetailConst.no : OrderDetailConst.yes, element.ReferenceNumbers];
        rowsAddlinfo.push(tempAddlinfo);
      });

      (doc as any).autoTable({
        startY: finalY + 15, columns: this.orderDetailAdditinalInfoColumns, body: rowsAddlinfo,
        styles: { fontSize: 8, overflow: 'linebreak' },
        margin: { left: 5, right: 5 },
        columnStyles: {
          1: { columnWidth: 'auto' }
        }
      });
    }
    //Order Line Items1
    if (exportdataSel.items) {
      finalY = (doc as any).previousAutoTable.finalY;
      finalY = (finalY == undefined) ? commonNumbers.ten : finalY;
      doc.text(OrderDetailConst.orderLineItems + this.orderLineItemCount + ')', commonNumbers.five, finalY + commonNumbers.ten);
      var rowsLineItems = [];
      let lineCount = 0;
      this.orderLinedataSource.data.forEach(element => {
        lineCount = lineCount + 1;
        var tempLineItem1 = [lineCount, element.grossWeight, element.grossVolume, element.huCount, element.huType, element.pieceCount, element.pieceType,
          element.freightClass, element.tcnNumber, element.description, element.length, element.width, element.height, (element.isHazmat == false) ? OrderDetailConst.n : OrderDetailConst.y,
          element.pieceCount, element.pieceType];
        rowsLineItems.push(tempLineItem1);
      });
      (doc as any).autoTable({
        startY: finalY + 15, columns: this.orderLineItemsColumns, body: rowsLineItems,
        styles: { fontSize: 7, overflow: 'linebreak' },
        margin: { left: 5, right: 5 },
        columnStyles: {
          1: { columnWidth: 'auto' }
        }
      });
    }
    //Order Lines of Routing
    if (exportdataSel.linesofRouting) {

      finalY = (doc as any).previousAutoTable.finalY;
      finalY = (finalY == undefined) ? commonNumbers.ten : finalY;
      doc.text(OrderDetailConst.lineOfRouting + this.statusUpdateCount + ')', commonNumbers.five, finalY + commonNumbers.ten);
      var rowsLinesRouting = [];
      let lineOfRoutinColumnsExportPdf = [{ field: 'loadNumber', header: OrderDetailConst.loadNub }, { field: 'carrier', header: OrderDetailConst.carrier },
      { field: 'status', header: OrderDetailConst.statusEvent }, { field: 'city', header: OrderDetailConst.cityStateZip }, { field: 'notes', header: OrderDetailConst.notes }, { field: 'dateTime', header: OrderDetailConst.dateTime }
      ];
      this.statusUpdateLinesData.forEach(element => {
        var tempLinesRouting = [element.loadNumber, element.carrier, element.status,
        element.city + ',' + element.state + ' ' + element.zip, element.notes,
        this.datepipe.transform(element.dateTime, OrderDetailConst.dateFormat)];

        rowsLinesRouting.push(tempLinesRouting);
      });

      (doc as any).autoTable({
        startY: finalY + 15, columns: lineOfRoutinColumnsExportPdf, body: rowsLinesRouting,
        styles: { fontSize: 7, overflow: 'linebreak' },
        margin: { left: 5, right: 5 },
        columnStyles: {
          1: { columnWidth: 'auto' }
        }
      });
    }

    //Dsiplay Order Attachments  
    if (exportdataSel.attachmentSummary) {
      finalY = (doc as any).previousAutoTable.finalY;
      finalY = (finalY == undefined) ? commonNumbers.ten : finalY;
      doc.text('Attachments (' + this.orderAttachmentCount + ')', commonNumbers.five, finalY + commonNumbers.ten);
      var rowsAttachment = [];
      this.orderAttachmentdataSource.data.forEach(element => {
        var tempAttachment = [this.datepipe.transform(element.documentDate, OrderDetailConst.dateFormat), element.documentType, element.docDescription, element.fileType];

        rowsAttachment.push(tempAttachment);
      });

      (doc as any).autoTable({
        startY: finalY + 15, columns: this.orderAttachmentColumns, body: rowsAttachment,
        styles: { fontSize: 7, overflow: 'linebreak' },
        margin: { left: 5, right: 5 },
        columnStyles: {
          1: { columnWidth: 'auto' }
        }

      });
    }
    //Dsiplay Order Comments          
    if (exportdataSel.comments) {
      finalY = (doc as any).previousAutoTable.finalY;
      finalY = (finalY == undefined) ? commonNumbers.ten : finalY;
      doc.text(OrderDetailConst.comments + this.orderCommentCount + ')', commonNumbers.five, finalY + commonNumbers.ten);
      var colsComment = ["CommentType", "Comment", "Stop"];
      var rowsComment = [];
      this.orderCommentsdataSource.data.forEach(element => {
        var tempComment = [element.commentType, element.comment, element.stopNum];
        rowsComment.push(tempComment);
      });
      (doc as any).autoTable({
        startY: finalY + 15, columns: this.orderCommentsColumns, body: rowsComment,
        styles: { fontSize: 7, overflow: 'linebreak' },
        margin: { left: 5, right: 5 },
        columnStyles: {
          1: { columnWidth: 'auto' }
        }
      });
    }
    //Finally exporting
    doc.output('dataurlnewwindow')
    let filename = (this.orderHeaderModel != undefined) ? this.orderHeaderModel.orderNum : '';
    doc.save(filename + OrderDetailConst.exportPdfFileName);

  }
  openReference() {
    this.incidentreportbuttonClicked = false;
    this.accessorialbuttonClicked = false;
    this.incidentCode = false;
    this.accessorialCode = false;
    this.serviceExceptionClicked = false;
  }
  openAccessorialCode() {
    this.incidentreportbuttonClicked = false;
    this.accessorialbuttonClicked = true;
    this.incidentCode = false;
    this.serviceExceptionClicked = false;
    this.accessorialCode = !this.accessorialCode;
    if (!this.accessorialCode) {
      this.selected = -1;
    }
  }
  openIncidentCode() {
    this.accessorialbuttonClicked = false;
    this.incidentreportbuttonClicked = true;
    this.accessorialCode = false;
    this.serviceExceptionClicked = false;
    this.incidentCode = !this.incidentCode;
    if (!this.incidentCode) {
      this.selected = -1;
    }
  }
  openServiceException() {
    this.accessorialbuttonClicked = false;
    this.incidentreportbuttonClicked = false;
    this.accessorialCode = false;
    this.serviceExceptionClicked = true;
    this.serviceCode = !this.serviceCode;
    if (!this.serviceCode) {
      this.selected = -1;
    }
  }
    
showStatusInfo(item) {​​​​​
this.selected = item;
this.count++;
if(this.count==1){​​​​​
this.oldSelected=this.selected;
}​​​​​
if(this.oldSelected === this.selected){​​​​​
this.isSelected=!this.isSelected;
}​​​​​
else{​​​​​
this.oldSelected=this.selected;
this.isSelected=true;
}​​​​​
}​​​​​

  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;

  }

  orderAccessorialDetails(orderNumber) {
    this.searchReportService.GetOrderAccessorialDetails(orderNumber).subscribe(res => {
      if (res.length > 0) {

        this.results = res[0];
        this.accessorialCodeDetailResultsLength = (res.length - 1);
        if (res.length > 1) {
          this.accessorialCodeDetailResults = res;
          this.accessorialCodeDetailResults.splice(0, 1);
          this.accessorialCodeDetail = this.accessorialCodeDetailResults;
        }
      } else {
        this.showAccessorialCodeSection = false;
      }
    }, error => {
      this.errorMessage = <any>error
      this.showAccessorialCodeSection = false;
    })
  }
  onPageChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.resData = this.orderLinedataSource.data;
    this.activePageData = this.resData.slice(firstCut, secondCut);
  }
  onorderAttachmentChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.resData = this.orderAttachmentdataSource.data
    this.attachmenteData = this.resData.slice(firstCut, secondCut);

  }
  oncommentChanged(e) {
    let firstCut = e.pageIndex * e.pageSize;
    let secondCut = firstCut + e.pageSize;
    this.resData = this.orderCommentsdataSource.data;
    this.commentData = this.resData.slice(firstCut, secondCut);

  }

}
