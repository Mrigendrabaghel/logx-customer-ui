import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AccessorialAdditionalInfo, ApproveAccessorial, CommonConst, commonNumbers, DocumentsConst, IncidentConst, OrderDetailConst, UploadConst } from 'src/app/configs/constants';
import { AddAccessorialInfoDialogComponent } from './add-accessorial-info-dialog/add-accessorial-info-dialog.component';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { Router } from '@angular/router';
import { RouteLinks } from 'src/app/configs/RoutePath';
import { ConfirmationDialog } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { OrderAttachmentModel } from 'src/app/shared/models/order/order';
import { TrackOrderService } from 'src/app/logx-services/trackAndTrace/track-order.service';
import { AccessorialsService } from 'src/app/logx-services/accessorials/accessorials.service';
import { accessorialAttachment, AccessorialStatus, accessorialDetails, accessorialShowComments, accessorialSaveCommentsRequest, AdditionalInfo, AccessorialAdditionalInfoRequest } from 'src/app/shared/models/accessorials/accessorials.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { UploadAndLookupDetailService } from 'src/app/logx-services/common/upload-and-lookup-detail.service';
import { SnackbarService } from 'src/app/logx-services/common/snackbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-approve-accessorials-details',
  templateUrl: './approve-accessorials-details.component.html',
  styleUrls: ['./approve-accessorials-details.component.scss']
})
export class ApproveAccessorialsDetailsComponent implements OnInit {
  ordernumber: any;
  orderAttachmentCount: number = 0;
  orderAttachmentData: accessorialAttachment[] = [];
  orderAttachmentdataSource = new MatTableDataSource(this.orderAttachmentData);
  serviceExceptionId: any;
  ApproveAccessorial = ApproveAccessorial;
  OrderDetailConst = OrderDetailConst;
  CommonConst = CommonConst;
  RouteLinks = RouteLinks;
  isExpanded: boolean = false;
  isExpandedComments: boolean = false;
  isShowComments: boolean = true;
  isExpandedAttachments: boolean = false;
  accesCommentsObj: accessorialShowComments = <accessorialShowComments>{};
  displayedColumns: string[] = ['item'];
  secommentdata: any = [];
  seComments = new MatTableDataSource(this.secommentdata);
  //enterComments = [{ enteredComment: "" }];
  enterComments: AdditionalInfo[] = [];
  accessorialSaveComments: AdditionalInfo = <AdditionalInfo>{};
  accessorialCommentsArray: AdditionalInfo[] = [];
  txtComments: any;
  statusMessage: string = ApproveAccessorial.pendingApproval;
  approveRequest: AccessorialStatus = <AccessorialStatus>{};
  rejectRequest = new AccessorialAdditionalInfoRequest();
  rejectSaveComments = new AdditionalInfo();
  rejectcommentarray = [];
  //accessorialStatus: AccessorialStatus = <AccessorialStatus>{};
  //rejectincidentComments: AdditionalInfo[] = [];
  stringsample: string;
  errorMessage: any;
  serviceExceptionNum: any;
  accessorialDetails: any;
  accessorialDisplaydetails: accessorialDetails = <accessorialDetails>{};
  actVal: any = [];
  partVal1: any = [];
  partVal2: any = [];
  accessorialComments: any;
  commentsCount: number = 0;
  saveCommentsRequest: accessorialSaveCommentsRequest = <accessorialSaveCommentsRequest>{};
  comments: any = [];
  index = 0;
  pageSizeOptions: any[] = [];
  pageSize: number = 0;
  accessorialMessage: any;
  Lookuptype: string = 'innergrid-pagecount';
  accessorialINFO: any;
  panelOpenState = false;
  commentDAta: string[];


  @ViewChild(MatPaginator, { static: false }) set conten(paginator: MatPaginator) {
    this.seComments.paginator = paginator;
  }

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar, private snackBService: SnackbarService, private dataTransfer: DataTransferService,
    private trackOrderService: TrackOrderService, public accessorialService: AccessorialsService, private router: Router,
    public uploadService: UploadAndLookupDetailService) { }

  ngOnInit(): void {
    try {
      ApproveAccessorial.Comments = ApproveAccessorial.Comments;
      this.dataTransfer.obj.subscribe(data => { this.accessorialINFO = data; });
      this.serviceExceptionId = this.accessorialINFO !== undefined ? this.accessorialINFO.serviceExceptionId : null;
      this.accessorialMessage = this.accessorialINFO !== undefined ? this.accessorialINFO.accessorialCode : null;
      this.serviceExceptionId = this.serviceExceptionId === undefined || this.serviceExceptionId === null || this.serviceExceptionId === " " ? sessionStorage.getItem(DocumentsConst.AccessDocuments.searchCriteria) : this.serviceExceptionId;
      sessionStorage.removeItem(DocumentsConst.AccessDocuments.searchCriteria)
      this.getOrderAttachment();
      if (this.serviceExceptionId !== null && this.serviceExceptionId !== undefined) {
        this.showAccessorialDetails(this.serviceExceptionId);
        this.showAccessorialComments(this.serviceExceptionId);
      }
    }
    catch (error) {
      throw error;
    }
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

  @HostListener('window:beforeunload', ['$event'])
  beforeunload($event: Event): void {
    sessionStorage.setItem(DocumentsConst.AccessDocuments.searchCriteria, this.serviceExceptionId);
  }

  showDetails(flag: boolean) {
    this.isExpanded = flag;
  }

  showComments(flag: boolean) {
    this.isExpandedComments = flag;
  }

  // addComment() {
  //   this.isShowComments = !this.isShowComments;
  //   ApproveAccessorial.Comments = ApproveAccessorial.addComments;
  // }

  addNew() {
    this.isShowComments = false;// !this.isShowComments;
    ApproveAccessorial.Comments = ApproveAccessorial.addComments;
    //this.enterComments.push({ enteredComment: "" });
    if (this.enterComments === null || this.enterComments === undefined) {
      this.enterComments = new Array<AdditionalInfo>();
    }
    this.enterComments.push({
      commentType: ApproveAccessorial.seComment,
      entity: AccessorialAdditionalInfo.serviceException,
      comment: '',
      entityNum: this.serviceExceptionNum
    });

  }

  getComments(val, index) {
    try {
      this.accessorialSaveComments = new AdditionalInfo();
      this.accessorialSaveComments.commentType = ApproveAccessorial.seComment;
      this.accessorialSaveComments.entity = AccessorialAdditionalInfo.serviceException;
      this.accessorialSaveComments.entityNum = this.serviceExceptionNum;
      this.accessorialSaveComments.comment = val;
      this.accessorialCommentsArray.push(this.accessorialSaveComments);
    }
    catch (error) {
      throw error;
    }
    this.enterComments = this.enterComments.slice(0, index + 1);
    this.accessorialCommentsArray = this.enterComments;
    this.accessorialCommentsArray.slice(0, index);
  }

  saveComment() {
    this.saveCommentsRequest.incidentComments = this.accessorialCommentsArray;
    this.accessorialService.AddAccessorialAdditionalInfo(this.saveCommentsRequest).subscribe(async data => {
      if (data) {
        if (data.entityResult[0].result.toLowerCase() == OrderDetailConst.success) {
          this.showAccessorialComments(this.serviceExceptionId);
          this.router.navigate([RouteLinks.approveaccessorialDetails]);
          this.isShowComments = true;
          this.enterComments = [];
          this.accessorialCommentsArray = [];
          ApproveAccessorial.Comments = 'Comments';
        }
      }
    }, error => { });
    this.isShowComments = true;
    this.enterComments = [];
    this.accessorialCommentsArray = [];
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
      if (confirmed && this.enterComments != null) {
        this.enterComments.splice(index, 1);
        //this.accessorialCommentsArray.splice(index, 1);
      }
    })
  }

  showAttachments(flag: boolean) {
    this.isExpandedAttachments = flag;
  }

  goToadditionalInfoDialog() {
    const dialogRef = this.dialog.open(AddAccessorialInfoDialogComponent, {
      data: { serviceExceptionNum: this.serviceExceptionNum }
    });
  }

  goToAccessorialGrid() {
    this.router.navigate([RouteLinks.approveAccessrialsGrid], { queryParams: { fromPage: 'accessorialDetail' } });
  }

  approveAccessorial() {
    const approveAccessorial = this.dialog.open(ConfirmationDialog, {
      data: {
        message: ApproveAccessorial.approveMessage,
        buttonText: {
          ok: UploadConst.ok,
          cancel: UploadConst.cancel
        }
      }
    });
    approveAccessorial.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.approveRequest.entity = ApproveAccessorial.entity;
        this.approveRequest.entityNum = this.serviceExceptionNum;
        this.approveRequest.accessorialStatus = ApproveAccessorial.accessorialStatusApprove;
        this.accessorialService.approveRejectAccssorial(this.approveRequest).subscribe(async data => {
          if (data) {
            if (data.result == "Success") {
              this.statusMessage = ApproveAccessorial.approved;
              this.snackBar.open(ApproveAccessorial.Accessorial + ' ' + this.accessorialMessage + ' ' + ApproveAccessorial.Approved, '', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
              }).afterDismissed().subscribe(() => {
                this.router.navigate([RouteLinks.approveAccessrialsGrid]);
              });
            } else {
              this.snackBar.open(ApproveAccessorial.Accessorial + ' ' + this.accessorialMessage + ' ' + ApproveAccessorial.notApproved, '', {
                duration: 5000
              }).afterDismissed().subscribe(() => {

              });
            }
          }
        }, error => {
          this.errorMessage = <any>error;
          this.snackBar.open(ApproveAccessorial.Accessorial + ' ' + this.accessorialMessage + ' ' + ApproveAccessorial.notApproved, '', {
            duration: 5000
          }).afterDismissed().subscribe(() => {

          });
        });
      }
    })
  }

  goToaccessorialInfoDialog() {
    const rejectAccessorial = this.dialog.open(ConfirmationDialog, {
      data: {
        message: CommonConst.globalErrorMessage.reasonForReject,
        message1: CommonConst.globalErrorMessage.reasontitle,
        rejectflag: true,
        rejectcomment: null,
        buttonText: {
          ok: CommonConst.globalErrorMessage.submit,
          cancel: CommonConst.globalErrorMessage.cancel
        }
      }
    });
    rejectAccessorial.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.approveRequest.entity = ApproveAccessorial.entity;
        this.approveRequest.entityNum = this.serviceExceptionNum;
        this.approveRequest.accessorialStatus = ApproveAccessorial.accessorialStatusReject;
        this.rejectRequest.accessorialStatus = this.approveRequest;
        this.rejectSaveComments.commentType = ApproveAccessorial.seComment;
        this.rejectSaveComments.entity = AccessorialAdditionalInfo.serviceException;
        this.rejectSaveComments.entityNum = this.serviceExceptionNum;
        this.rejectSaveComments.comment = confirmed.rejectcomment;
        this.rejectcommentarray.push(this.rejectSaveComments);
        this.rejectRequest.incidentComments = this.rejectcommentarray;
        this.accessorialService.AddAccessorialAdditionalInfo(this.rejectRequest).subscribe(async data => {
          if (data) {
            if (data.result == "Success") {
              this.statusMessage = ApproveAccessorial.reject;

              this.snackBar.open(ApproveAccessorial.Accessorial + ' ' + this.accessorialMessage + ' ' + ApproveAccessorial.forOrder + ' ' + this.accessorialDetails.vloscn + ' ' + ApproveAccessorial.Rejected, '', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
              }).afterDismissed().subscribe(() => {
                this.router.navigate([RouteLinks.approveAccessrialsGrid]);
              });
            }
            else {
              this.snackBar.open(ApproveAccessorial.Accessorial + ' ' + this.accessorialMessage + ' ' + ApproveAccessorial.notRejected, '', {
                duration: 5000
              }).afterDismissed().subscribe(() => {

              });
            }

          }
        }, error => {
          this.errorMessage = <any>error;
          this.snackBar.open(ApproveAccessorial.Accessorial + ' ' + this.accessorialMessage + ' ' + ApproveAccessorial.notRejected, '', {
            duration: 5000
          }).afterDismissed().subscribe(() => {

          });
        });
      }
    })
  }

  getOrderAttachment() {
    this.accessorialService.getOrderAttachments(this.serviceExceptionId).subscribe(async data => {
      if (data && data.length > 0) {
        this.serviceExceptionNum = data[0].serviceExceptionNum;
        this.orderAttachmentdataSource.data = await data;
        this.orderAttachmentCount = data.length;
        if (this.orderAttachmentCount > 0) {
          this.isExpandedAttachments = true
        }
        else {
          this.isExpandedAttachments = false
        }
      }

    });
  }

  showAccessorialDetails(serviceExceptionId: string) {
    this.accessorialService.GetAccessorialDetails(serviceExceptionId).subscribe(response => {
      if (response) {
        this.accessorialDetails = response;
        this.accessorialDisplaydetails.dateOfFiling = this.accessorialDetails.dateOfFiling;
        this.accessorialDisplaydetails.trackingNumber = this.accessorialDetails.trackingNumber;
        this.accessorialDisplaydetails.bOL = this.accessorialDetails.bol;
        this.accessorialDisplaydetails.carrierName = this.accessorialDetails.carrierName;
        this.accessorialDisplaydetails.driverPOCName = this.accessorialDetails.driverPOCName;
        this.accessorialDisplaydetails.driverPOCPhone = this.accessorialDetails.driverPOCPhone;
        this.accessorialDisplaydetails.vLOSCN = this.accessorialDetails.vloscn;
        this.accessorialDisplaydetails.occurrenceDate = this.accessorialDetails.occurrenceDate;
        this.accessorialDisplaydetails.approvalStatus = this.accessorialDetails.approvalStatus;
        this.statusMessage = this.accessorialDisplaydetails.approvalStatus;
        this.accessorialDisplaydetails.accessorialCode = this.accessorialDetails.accessorialCode;
        this.accessorialDisplaydetails.accessorialName = this.accessorialDetails.accessorialName;
        this.accessorialDisplaydetails.requiredDocumentation = this.accessorialDetails.requiredDocumentation;
        this.actVal = this.accessorialDisplaydetails.requiredDocumentation.split('\r\n');
        var actualLen = this.actVal.length;
        var firstArrayLen = (actualLen / 2);
        for (let i = 0; i < firstArrayLen; i++) {
          this.partVal1.push(this.actVal[i])
        }
        for (let i = firstArrayLen; i < actualLen; i++) {
          this.partVal2.push(this.actVal[i])
        }
      }
    }
    )
  }
  showAccessorialComments(serviceExceptionId: string) {
    this.accessorialService.GetAccessorialComments(serviceExceptionId).subscribe(response => {
      if (response) {
        this.accessorialComments = response;
        this.accesCommentsObj.comment = this.accessorialComments[0].comment;
        this.commentDAta = this.accesCommentsObj.comment.split(CommonConst.seComment);
        this.seComments.data = this.commentDAta.splice(commonNumbers.one, this.commentDAta.length);
        this.commentsCount = this.seComments.data.length;
      }

    })
  }

  //reset form
  cancelComment() {
    ApproveAccessorial.Comments = 'Comments';
    this.isShowComments = true;
    this.enterComments = [];
    this.accessorialCommentsArray = [];
  }

}
