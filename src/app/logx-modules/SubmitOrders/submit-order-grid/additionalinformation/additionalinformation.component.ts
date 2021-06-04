import { Component, EventEmitter, Input, OnInit, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UploadConst, OrderDetailConst, CommonConst, DocumentsConst, commonNumbers, ExportDataConst, SubmitorderdetailsConst, IncidentConst } from 'src/app/configs/constants';
import { UploadfilesComponent } from 'src/app/logx-modules/trackTrace/vieworderdetail/uploadfiles/uploadfiles.component';
import { UploadAndLookupDetailService } from 'src/app/logx-services/common/upload-and-lookup-detail.service';
import { UserPreferenceService } from 'src/app/logx-services/common/user-preference.service';
import { IncidentReportService } from 'src/app/logx-services/incidentReport/incident-report.service';
import { AdditionalInfoService } from 'src/app/logx-services/submitOrder/additional-info.service';
import { SubmitOrderService } from 'src/app/logx-services/submitOrder/submit-order.service';
import { ConfirmationDialog } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { IncidentOrderDetails, IncidentCarrierDetails } from 'src/app/shared/models/incident/report-incident.model';
import { EntityDescription, FileUpload, UploadFileResposeType, Docs } from 'src/app/shared/models/order/file-upload.model';
import { OrderHeaderModel } from 'src/app/shared/models/order/order';
import { OrderDocumentsAdditionalInfo, orderstepperdetails, SaveOrderAdditionalInfo, ShipwithCreatedByModal } from 'src/app/shared/models/submitOrder/submitOrder.model';
import { Comment } from 'src/app/shared/models/submitOrder/comments';
import jsPDF from 'jspdf';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { GetContentType } from 'src/app/shared/common/common-method';
import { AccessDocumentService } from 'src/app/logx-services/documents/access-document.service';
import { OpenDocumentDialogueComponent } from 'src/app/logx-modules/documents/open-document-dialogue/open-document-dialogue.component';
import { MatPaginator } from '@angular/material/paginator';
import { RouteLinks } from 'src/app/configs/RoutePath';
import { Router } from '@angular/router';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
@Component({
  selector: 'app-additionalinformation',
  templateUrl: './additionalinformation.component.html',
  styleUrls: ['./additionalinformation.component.scss']
})
export class AdditionalinformationComponent implements OnInit {

  UploadConst = UploadConst;
  isOpenUploadFiles: boolean = false;
  CommonConst = CommonConst;
  OrderDetailConst = OrderDetailConst;
  enterComments = [{ enteredComment: "" }];
  IncidentConst = IncidentConst;
  errorMessage: any;
  errorMessage1: string;
  LanguageChange: any;
  stop: any;
  type: any;
  filesSelected: FileList;
  filesUploadMax = '';
  isUploadFiles = true;
  isUploadFileList = false;
  orderDocAdditionalInfo: OrderDocumentsAdditionalInfo[] = [];
  additionalInfo: SaveOrderAdditionalInfo = <SaveOrderAdditionalInfo>{};
  public orderHeaderModel: OrderHeaderModel;
  username: string;
  clickButtonName: string;
  @Input() orderNumber: string;
  @Input() orderId: any;
  @Input() shipWith: string = "";
  @Input() createdBy: string;
  orderDetails: any;
  commentsList: Comment[] = [];
  commentsDisplayList: Comment[];
  @ViewChild(UploadfilesComponent) statusUpdateRoutingLinesComponent: UploadfilesComponent;
  isAttachments = false;
  orderAttachmentColumns = [
    { field: 'createddate', header: OrderDetailConst.date },
    { field: 'doctype', header: OrderDetailConst.types },
    { field: 'docdescription', header: CommonConst.description },
    { field: 'filetype', header: OrderDetailConst.fileType },
    { field: 'action', header: '' },
  ];
  orderCommentColumns = [
    { field: 'commenttype', header: OrderDetailConst.commentType },
    { field: 'comments', header: OrderDetailConst.comment },
    { field: 'stops', header: OrderDetailConst.stops },
    { field: 'action', header: '' },
  ];

  orderAttachmentCount: number = 0;
  orderAttachmentdata: OrderDocumentsAdditionalInfo[] = [];
  orderCommentsdata: any[] = [];
  orderAttachmentdataSource = new MatTableDataSource(this.orderAttachmentdata);
  orderCommentdataSource = new MatTableDataSource(this.orderCommentsdata);
  attachmentDisplayedColumns = ['createddate', 'doctype', 'docdescription', 'filetype', 'action'];
  commentDisplayedColumns = ['commenttype', 'comments', 'stops', 'action'];
  PreviewData: any;
  commonNumbers = commonNumbers;
  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.orderAttachmentdataSource.paginator = this.paginator.toArray()[0];
    this.orderCommentdataSource.paginator = this.paginator.toArray()[0];
  }
  pageSize = commonNumbers.five;
  pageSizeOptions: number[] = [commonNumbers.five, commonNumbers.ten, commonNumbers.fifteen];

  isComments = false;
  orderstepperdetails: orderstepperdetails = <orderstepperdetails>{};
  shipwithSessionDetails: ShipwithCreatedByModal;

  constructor(private additionalInfoService: AdditionalInfoService, public userPreferenceService: UserPreferenceService,
    private dialog: MatDialog, public submitOrderService: SubmitOrderService, public snackBar: MatSnackBar,
    private accessDocumentServices: AccessDocumentService, public datepipe: DatePipe, public router: Router,
    private dataTransfer: DataTransferService) { }

  ngOnInit(): void {
    this.username = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.name;
    try {
      if (this.orderId !== null) {
        this.getAdditionalInfo();
      }
      this.gettype("type");
      this.getstop("stop");
    }
    catch (error) {
      throw error;
    }

  }
  addNew() {
    if (this.commentsList === undefined) {
      this.commentsList = new Array<Comment>();
    }
    const commentArrayLength = (this.commentsList.length === 0) ? 0 : this.commentsList.length - 1;
    if (this.commentsList && this.commentsList.length >= 1 && this.commentsList[commentArrayLength].commenttype === ""
      && this.commentsList[commentArrayLength].comments === "" && this.commentsList[commentArrayLength].stops === "") {

    } else {
      this.commentsList.push({ id: 0, ordid: this.orderId, commenttype: '', comments: '', stops: '', createddate: '', createdby: this.username });
    }
  }

  getAdditionalInfo() {
    this.additionalInfoService.GetAdditionalInfo(this.orderId).subscribe(res => {
      this.orderDetails = res.orderAddlInfo[0];
      this.commentsDisplayList = res.orderAddlInfo[0].ordComments;
      this.orderAttachmentdata = this.orderDetails.attachments;
      this.orderCommentdataSource.data = this.commentsDisplayList;
      if (this.commentsDisplayList && this.commentsDisplayList.length > 0) {
        this.isComments = true;
      } else {
        this.isComments = false;
      }

      //Dsiplay Order Attachments  
      this.orderAttachmentCount = this.orderDetails.attachments.length;
      this.orderAttachmentdataSource.data = this.orderDetails.attachments as OrderDocumentsAdditionalInfo[];

      if (res && this.orderDetails && this.orderAttachmentCount > 0) {
        this.isAttachments = true;
        var doc = new jsPDF();
        let finalY = (doc as any).previousAutoTable.finalY;
        finalY = (finalY == undefined) ? commonNumbers.ten : finalY;
        doc.text('Attachments (' + this.orderAttachmentCount + ')', commonNumbers.five, finalY + commonNumbers.ten);
        var rowsAttachment = [];
        this.orderAttachmentdataSource.data.forEach(element => {
          var tempAttachment = [this.datepipe.transform(element.createddate, OrderDetailConst.dateFormat),
          element.doctype, element.docdescription, element.filetype];
          rowsAttachment.push(tempAttachment);
        });

        (doc as any).autoTable({
          startY: finalY + 15, columns: this.orderAttachmentColumns, body: rowsAttachment,
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
    })
  }

  attachmentTableDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.attachmentDisplayedColumns, event.previousIndex, event.currentIndex);
  }

  commentTableDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.commentDisplayedColumns, event.previousIndex, event.currentIndex);
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

  gettype(PreferenceType: string) {
    this.userPreferenceService.GetPreference(PreferenceType).subscribe(response => {
      if (response) {
        this.type = response;
      }
    }, error => this.errorMessage = <any>error);
  }

  getstop(PreferenceType: string) {
    this.userPreferenceService.GetPreference(PreferenceType).subscribe(response => {
      if (response) {
        this.stop = response;
      }
    }, error => this.errorMessage = <any>error);
  }

  save(clickName: string, event) {
    event.stopPropagation();
    this.clickButtonName = clickName;
    if ((clickName === "saveAndCreateLink" || clickName === "Complete") && this.orderId) {
      this.submitOrderService.stepperNavigation(this.orderId).subscribe(res => {
        if (res) {
          this.orderstepperdetails = res[0];
          if (this.orderstepperdetails.originLocFlag === "Complete" &&
            this.orderstepperdetails.destLocFlag === "Complete" &&
            this.orderstepperdetails.orderDetailsFlag === "Complete" &&
            this.orderstepperdetails.orderLineFlag === "Complete") {
            this.isOpenUploadFiles ? this.statusUpdateRoutingLinesComponent.UploadFiles() : this.UploadFiles([]);
          } 
          else {
            let snackMessage = "Please Complete "
            let count = 0;
            if (this.orderstepperdetails.originLocFlag !== "Complete") {
              snackMessage = snackMessage + SubmitorderdetailsConst.ListItems.originInfolistIem.toString();
              count++;
            }
            if (this.orderstepperdetails.destLocFlag !== "Complete") {
              const extraComma = (count != 0) ? ", " : ""
              snackMessage = snackMessage + extraComma + SubmitorderdetailsConst.ListItems.destinationInfolistItem.toString();
              count++;
            }
            if (this.orderstepperdetails.orderDetailsFlag !== "Complete") {
              const extraComma = (count != 0) ? ", " : ""
              snackMessage = snackMessage + extraComma + SubmitorderdetailsConst.ListItems.orderDetailslistItem.toString();
              count++;
            }
            if (this.orderstepperdetails.orderLineFlag !== "Complete") {
              const extraComma = (count != 0) ? ", " : ""
              snackMessage = snackMessage + extraComma + SubmitorderdetailsConst.ListItems.orderLineItems.toString();
            }

            this.snackBar.open(snackMessage, '', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            });
          }
        }
      });
    } else {
      this.isOpenUploadFiles ? this.statusUpdateRoutingLinesComponent.UploadFiles() : this.UploadFiles([]);
    }
  }

  deleteComment(value) {
    const index = this.commentsList.indexOf(value);
    if (index !== -1) {
      this.commentsList.splice(index, 1);
    }
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
        if (value.id !== 0) {
          this.additionalInfoService.DeleteAttachments(value.id).subscribe(res => {
            if (res) {
              this.orderId = Number(value.ordid);
              this.getAdditionalInfo()
            }
          })
        }
      }
    })
  }

  deleteSavedComment(value, event) {
    event.stopPropagation();
    const confirmCancel = this.dialog.open(ConfirmationDialog, {
      data: {
        message: `Are you sure you want to delete this comment?`,
        buttonText: {
          ok: CommonConst.YES,
          cancel: CommonConst.NO
        }
      }
    });
    confirmCancel.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        if (value.id !== 0) {
          this.additionalInfoService.DeleteComments(value.id).subscribe(res => {
            if (res) {
              this.orderId = Number(value.ordid);
              this.getAdditionalInfo()
            }
          })
        }
      }
    })

  }

  deleteOrder() {
    const confirmCancel = this.dialog.open(ConfirmationDialog, {
      data: {
        message: SubmitorderdetailsConst.AdditionalinfoErrorMessage.deleteorder,
        buttonText: {
          ok: CommonConst.YES,
          cancel: CommonConst.NO
        }
      }
    });
    confirmCancel.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.submitOrderService.deleteOrder(this.orderId).subscribe(
          res => {
            this.snackBar.open(this.shipWith !== "" ? SubmitorderdetailsConst.cancelOrderShipWith : SubmitorderdetailsConst.cancelOrderSingle, '', {
              duration: 5000,
              horizontalPosition: 'center',
              verticalPosition: 'top'
            }).afterDismissed().subscribe(() => {
              this.router.navigateByUrl(RouteLinks.submitordergrid);
            });
          },
          err => {
            this.router.navigateByUrl(RouteLinks.submitordergrid);
          }
        )
      }
    })
  }


  closeUploadSection(isClose: any) {
    if (isClose)
      this.isOpenUploadFiles = !isClose;
  }

  UploadFiles(orderDocList: any) {
    this.orderDocAdditionalInfo = [];
    this.additionalInfo.orderId = this.orderId;
    this.additionalInfo.orderNumber = this.orderNumber;
    const commentArrayLength = (this.commentsList && this.commentsList.length === 0) ? 0 : this.commentsList.length - 1;
    if (this.commentsList && this.commentsList.length >= 1 && this.commentsList[commentArrayLength].commenttype === ""
      && this.commentsList[commentArrayLength].comments === "" && this.commentsList[commentArrayLength].stops === "") {
      this.commentsList.pop();
    }
    this.additionalInfo.orderComments = JSON.stringify(this.commentsList);
    this.additionalInfo.addLInfoFlag = this.clickButtonName === 'saveAndCreateLink' ? 'saveForLater' : this.clickButtonName;
    this.additionalInfo.userId = this.username;
    orderDocList.forEach((doc: Docs) => {
      const fileDetail: OrderDocumentsAdditionalInfo = {
        id: 0,
        doctype: doc.DocType,
        docdescription: doc.DocDescription,
        filename: doc.DocName,
        DocNum : doc.DocName,
        filetype: doc.DocFormat,
        Content: doc.DocContent,
        createdby: this.username,
        createddate: new Date(),
        ordid: this.orderId
      }
      this.orderDocAdditionalInfo.push(fileDetail);
    });
    this.additionalInfo.orderDocuments = JSON.stringify(this.orderDocAdditionalInfo);
    //if (this.clickButtonName === 'saveAndCreateLink') {
    this.additionalInfo.shipwithorder = this.shipWith ? this.shipWith : this.orderNumber
    //}
    this.submitOrderService.SaveOrderAdditionalInfo(this.additionalInfo).subscribe(result => {
      if (result && result.dbStatus > 0) {
        let successMsg = "";
        switch (this.clickButtonName) {
          case "saveAndCreateLink":
            successMsg = `Your Order number (${this.orderNumber}) has been saved and link created.`;
            break;
          case "saveForLater":
            successMsg = `Your Order number (${this.orderNumber}) has been saved but not submitted.`;
            break;
          case "Complete":
            successMsg = `Your Order has been placed successfully. Your order number is (${this.orderNumber})`;
            break;
          default:
            successMsg = "Successfully submited"
            break;
        }
        if (this.clickButtonName === "saveAndCreateLink") {
          this.snackBar.open(successMsg, '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          }).afterDismissed().subscribe(() => {
            this.shipwithSessionDetails = new ShipwithCreatedByModal();
            this.shipwithSessionDetails = {
              shipWith: this.shipWith ? this.shipWith : this.orderNumber,
              createdBy: this.username,
              redirectedFrom: SubmitorderdetailsConst.ListItems.originInfolistIem.toString()
            }
            localStorage.setItem('SaveShipWith', JSON.stringify(this.shipwithSessionDetails));
            localStorage.removeItem("currentOrderNumber");
            window.location.reload();
          });
        }
        if (this.clickButtonName === "Complete" && result.tMSStatus.submittedFlag === true) {
          this.snackBar.open(successMsg, '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          }).afterDismissed().subscribe(() => {
            this.router.navigate([RouteLinks.submitordergrid]);
          });
        }
        if (this.clickButtonName === "Complete" && result.tMSStatus.submittedFlag === false) {
          this.snackBar.open('Order Creation Unsuccessful, Please try again!', '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          }).afterDismissed().subscribe(() => {
            this.router.navigate([RouteLinks.submitordergrid]);
          });
        }
        if (this.clickButtonName === "saveForLater") {
          this.snackBar.open(successMsg, '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          }).afterDismissed().subscribe(() => {
            this.router.navigate([RouteLinks.submitordergrid]);
          });
        }
      } else {
        this.snackBar.open('Order Creation Unsuccessful, Please try again!', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
      }
    }, error => {
      this.errorMessage = <any>error
      this.snackBar.open('Order Creation Unsuccessful, Please try again!', '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    });

    //after uploading files show message of upload success or failure then close upload file
    this.isOpenUploadFiles = false;
  }

  OpenDocument(row: OrderDocumentsAdditionalInfo) {
    let contentType;
    let fileType = row.filetype.trim().toLocaleLowerCase();
    contentType = GetContentType(fileType);

    this.submitOrderService.OpenFile(row.id).subscribe(async res => {
      if (res) {
        let file = new Blob([res], { type: contentType });
        this.PreviewData = URL.createObjectURL(file);
        const dialogRef = this.dialog.open(OpenDocumentDialogueComponent,
          { data: { PreviewData: this.PreviewData, documentType: fileType, documentName: row.filename } });

        await dialogRef.afterClosed().subscribe(result => {

          if (result && result.event) {

            if (result.event == DocumentsConst.AccessDocuments.fullScreen) {

              switch (fileType) {
                case DocumentsConst.AccessDocuments.docx:
                case DocumentsConst.AccessDocuments.doc:
                case DocumentsConst.AccessDocuments.xls:
                  var fileLink = document.createElement('a');
                  fileLink.href = this.PreviewData;
                  fileLink.download = row.docdescription;
                  fileLink.click();
                  break;
                case DocumentsConst.AccessDocuments.msg: var fileLink = document.createElement('a');
                  fileLink.href = this.PreviewData;
                  fileLink.download = row.docdescription + '.msg';
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
}
