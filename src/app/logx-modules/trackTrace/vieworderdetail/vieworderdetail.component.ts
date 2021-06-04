import { Component, OnInit, ViewChild, ElementRef, Renderer2, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderModel, OrderHeaderModel, OrderLinesModel, OrderMilestoneModel, OrderMapModel } from 'src/app/shared/models/order/order';
import { TrackOrderService } from 'src/app/logx-services/trackAndTrace/track-order.service';
import { SeachReportService } from 'src/app/logx-services/searchAndReport/seach-report.service';
import { AccessDocumentDialogueComponent } from 'src/app/logx-modules/trackTrace/access-document-dialogue/access-document-dialogue.component';
import { AccessDocumentService } from 'src/app/logx-services/documents/access-document.service';
import { AccessDocumentModel } from 'src/app/shared/models/document/access-document-model';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { globalTrackTrace, OrderDetailConst, TrackOderConst, ExportDataConst, AdvanceSearchAccessDoc, DashboardConst, DocumentsConst, homeComponentConst, commonNumbers, CommonConst, Version } from 'src/app/configs/constants';
import { MessagepopupComponent } from 'src/app/shared/common/messagepopup/messagepopup.component';


@Component({
  selector: 'app-vieworderdetail',
  templateUrl: './vieworderdetail.component.html',
  styleUrls: ['./vieworderdetail.component.scss']
})
export class VieworderdetailComponent implements OnInit {
  TrackOderConst = TrackOderConst;
  ExportDataConst=ExportDataConst;
  AdvanceSearchAccessDoc = AdvanceSearchAccessDoc;
  DashboardConst = DashboardConst;
  OrderDetailConst = OrderDetailConst;
  ordermilestoneModel: OrderMilestoneModel[] = [];
  dataSource: AccessDocumentModel[] = [];
  CommonConst=CommonConst;
  errorMessage: any;
  public orderNum: string = "";
  public orderModel: OrderModel = <OrderModel>{};
  public counts = [OrderDetailConst.new, OrderDetailConst.orderReceived, OrderDetailConst.pendingPickup,
  OrderDetailConst.arrivePickup, OrderDetailConst.inTransit,
  OrderDetailConst.deliveryScheduled, OrderDetailConst.arrivedatDelivery,
  OrderDetailConst.delivered, OrderDetailConst.podReceived, OrderDetailConst.closed];
  name = OrderDetailConst.orderTracking;
  public doneStatus = [];
  orderMapModel: OrderMapModel;
  headerString: string = homeComponentConst.confirmationMessage.headerString;
  message: string;
  public countOfCompletedStages: number;
  isShowDiv: boolean;
  firstStep: boolean = false;
  secondStep: boolean = false;
  thirdStep: boolean = false;
  globalTrackTrace=globalTrackTrace;
  public orderDetails: OrderModel;
  isExpanded: boolean = false;
  collapsed:boolean;
  panelOpenState = true;
  today: number = Date.now();
 
  public version = Version;

  isShown: boolean = false ;
  originStateName: any;
  destinationStateName: any;
  verticalstep: boolean = false;
  shipstatus: any;

  constructor(
    public activatedRoute: ActivatedRoute,
    private trackOrderService: TrackOrderService,
    public dialog: MatDialog,
    private accessDocumentServices: AccessDocumentService,
    private router: Router,
    private dataTransfer: DataTransferService
  ) { }

  ngOnInit(): void {
    try {
      this.dataTransfer.obj.subscribe(data => { this.orderNum = data; });
      this.orderNum = this.orderNum === undefined || this.orderNum === null || this.orderNum === " " ? localStorage.getItem(DocumentsConst.AccessDocuments.searchCriteria) : this.orderNum;
      localStorage.removeItem(DocumentsConst.AccessDocuments.searchCriteria)
      this.trackOrderService.GetOrder(this.orderNum).subscribe(res => {
    
        if (res) {
          this.orderModel = res;
          this.doneStatus = this.counts;
          this.doneStatus = this.doneStatus.slice(0, this.counts.findIndex(x => x == res.status) + 1)
          console.log('this.orderModel', this.orderModel);
          this.shipstatus = res.status;
          this.getshipmenttruck(this.shipstatus);
  
        } else {
          this.message = homeComponentConst.errorMessage.recordNotFound;
          const modalRef = this.dialog.open(MessagepopupComponent, { data: { message: this.message, searchstring: this.orderNum, headerString: this.headerString } });
        }
      }, error => {
        this.errorMessage = <any>error
        this.message = homeComponentConst.errorMessage.recordNotFound;
        const modalRef = this.dialog.open(MessagepopupComponent, { data: { message: this.message, searchstring: this.orderNum, headerString: this.headerString } });
      });
      this.trackOrderService.GetOrderMileStoneStatus(this.orderNum).subscribe(res => {
        this.ordermilestoneModel = res;
        this.countOfCompletedStages = res.filter(x => x.shipmentStatusCode !== "").length;
        
        for(var i = 0; i <  this.ordermilestoneModel.length; i++)
        {
        if(this.countOfCompletedStages < this.ordermilestoneModel[i].sorder){
          this.verticalstep = true;
        }
      }
  
      })
      this.orderMapModel = new OrderMapModel();
      this.orderMapModel.startLocation = [];
      this.orderMapModel.endLocation = [];
    }
    catch (error) {
      throw error;
    }
  }
  

  @HostListener('window:beforeunload', ['$event'])
  beforeunload($event: Event): void {
    localStorage.setItem(DocumentsConst.AccessDocuments.searchCriteria, this.orderNum);
  }

  showMoreDetails() {
    this.dataTransfer.loadData(this.orderNum)
    this.router.navigate(['/dashboard/orderdetails']);
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

  //Open Documents for given Order Number
  OpenDocumentsDialogue() {
    try {
      this.accessDocumentServices.GetAccessDocument(this.orderModel.orderNum).subscribe(async res => {
        if (res.length > 0) {
          this.dataSource = res;
        }
        await this.dialog.open(AccessDocumentDialogueComponent, { data: { dataSource: this.dataSource } });
      });
    }
    catch (error) {
      throw error;
    }
  }

  DisplayToolTip(status: string): string {
    try {
      if (this.orderModel && this.orderModel.trackStatus && this.orderModel.trackStatus.length > 0 && status && status.trim()) {
        let statusItem = this.orderModel.trackStatus.find(e => e.status === status);
        if (statusItem) {
          return (statusItem.actionDate ? statusItem.actionDate : "") + "," + (statusItem.location ? statusItem.location : "");
        }

      }
    }
    catch (error) {
      throw error;
    }
  }
  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;

  }
  show(val) {
    this.isExpanded = val;
  }
  toggleShow(){
    this.isShown = ! this.isShown;
  }
 
}
