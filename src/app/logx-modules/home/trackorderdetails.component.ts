import { BreakpointState, Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CommonConst, commonNumbers, DocumentsConst, homeComponentConst, OrderDetailConst, Version } from 'src/app/configs/constants';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { TrackOrderService } from 'src/app/logx-services/trackAndTrace/track-order.service';
import { IsUserLoggedIn } from 'src/app/shared/common/common-method';
import { LoginpopupComponent } from 'src/app/logx-modules/home/mobilelogin/loginpopup.component';
import { OrderMapModel, OrderMilestoneModel, OrderModel } from 'src/app/shared/models/order/order';
import { environment } from 'src/environments/environment';
import { RouteLinks } from 'src/app/configs/RoutePath';


@Component({
  selector: 'app-trackorder',
  templateUrl: './trackorderdetails.component.html',
  styleUrls: ['./orderdetailsdialog.component.scss']
})
export class TrackOrderDetailsComponent implements OnInit {
  [x: string]: any;

  ordermilestoneModel: OrderMilestoneModel[] = [];
  CommonConst = CommonConst;
  homeComponentConst = homeComponentConst;
  DocumentsConst = DocumentsConst;
  orderNum: string;
  public doneStatus = [];
  errorMessage: string;
  public orderDetails: OrderModel;
  public version = Version;
  originStateName: any;
  destinationStateName: any;
  mobileView: boolean = false;
  multipleRecord: boolean = false;
  searchedValue: any;
  firstStep: boolean = false;
  secondStep: boolean = false;
  thirdStep: boolean = false;
  count = 0;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset)
  public countOfCompletedStages: number;

  public counts = [OrderDetailConst.new, OrderDetailConst.orderReceived, OrderDetailConst.pendingPickup,
  OrderDetailConst.arrivePickup, OrderDetailConst.inTransit,
  OrderDetailConst.deliveryScheduled, OrderDetailConst.arrivedatDelivery,
  OrderDetailConst.delivered, OrderDetailConst.podReceived, OrderDetailConst.closed];

  constructor(public router: Router,
    public activatedRoute: ActivatedRoute,
    private trackOrderService: TrackOrderService,
    public overlayContainer: OverlayContainer,
    private dataTransfer: DataTransferService, public dialog: MatDialog, private breakpointObserver: BreakpointObserver) {
  }

  ngOnInit(): void {
    try {
      if (window.screen.width >= commonNumbers.threeHundredSixty && window.screen.width <= commonNumbers.oneThousandAndTwentyFour) { // 768px portrait
        this.mobileView = true;
      }
      // this.dataTransfer.obj.subscribe(data => { this.orderNum = data; });
      this.dataTransfer.obj.subscribe(data => {
        if (typeof(data[0]) == 'string') {
          this.orderNum = data;
        } else if (typeof(data[0]) != 'string' && data.length > 1) {
          this.multipleResult = data[0];
          this.searchedValue = data[1];
          this.multipleRecord = true;
        }
      })
      this.orderNum = this.orderNum === undefined || this.orderNum === null || this.orderNum === " " ? localStorage.getItem(DocumentsConst.AccessDocuments.searchCriteria) : this.orderNum;
      localStorage.removeItem(DocumentsConst.AccessDocuments.searchCriteria)
      if (this.orderNum) {
        this.getOrder(this.orderNum);
      }
      document.body.classList.add("dark-theme");
      this.overlayContainer.getContainerElement().classList.add("dark-theme");

      this.orderMapModel = new OrderMapModel();
      this.orderMapModel.startLocation = [];
      this.orderMapModel.endLocation = [];
    }
    catch (error) {
      throw error;
    }
  }

  getOrder(orderNum) {
    this.trackOrderService.GetUnsecuredOrder(orderNum).subscribe(res => {
      this.orderDetails = res;
      this.originStateName = this.orderDetails.originLocation.split(',');
      this.destinationStateName = this.orderDetails.deliveryLocation.split(',')
      this.shipstatus = res.status;
      this.getshipmenttruck(this.shipstatus);
    }, error => this.errorMessage = <any>error);
    this.trackOrderService.GetUnsecuredMileStoneStatus(orderNum).subscribe(res => {
      this.ordermilestoneModel = res;
      this.countOfCompletedStages = res.filter(x => x.shipmentStatusCode !== "").length;
      if (this.mobileView) {
        for (var i=0; i<this.ordermilestoneModel.length; i++) {
          if (this.ordermilestoneModel[i].shipmentStatusCode != "") {
            this.count++;
          }
          if (i == (this.ordermilestoneModel.length-1)) {
            this.mileStoneCount(this.count);
          }
        }
      }  
    })
  }

  @HostListener('window:beforeunload', ['$event'])
  beforeunload($event: Event): void {
    localStorage.setItem('searchCriteria',this.orderNum);
  }

  viewOrderDetails(orderNum: string) {
    this.router.navigate([RouteLinks.login], { queryParams: { urlPath: encodeURIComponent(RouteLinks.orderDetails), orderNum: orderNum } });
  }

  viewDocument(orderNum: string) {
    this.router.navigate([RouteLinks.login], { queryParams: { urlPath: encodeURIComponent(RouteLinks.accessdocument), orderNum: orderNum } });
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  openLoginForm() {
    if(!this.mobileView) {
      this.router.navigate([RouteLinks.login]);
    } else {
      this.openDialog();
    }
  }

  isShowDiv = false;

  toggleDisplayDiv() {
    this.isShowDiv = !this.isShowDiv;
  }
  openDialog() {
    this.dialog.open(LoginpopupComponent);
  }
  getMultipleOrderDetails(orderNum) {
    this.getOrder(orderNum);
    this.multipleRecord = false;
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
}