import { Component, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { ActivatedRoute, Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { LayoutConst, DocumentsConst, TrackOderConst, OrderSearchReport,SubmitOderConst,homeComponentConst,CommonConst, DashboardConst } from 'src/app/configs/constants';
import { GlobalTrackTraceComponent } from '../global-track-trace/global-track-trace.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RouteLinks } from 'src/app/configs/RoutePath';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { NotificationListComponent } from '../notification/notification.component';
import { INotification, INotificationAlert, INotificationRequest } from '../models/notification';
import { DatePipe } from '@angular/common';
import { NotificationService } from 'src/app/logx-services/common/notification.service';
import { filter, first } from 'rxjs/operators';
import { NotificationModalComponent } from '../notification/notification-modal.component';
import { FocusMonitor } from '@angular/cdk/a11y';
import { Userinfo } from '../common/common-method';

@Component({
  selector: 'app-layout-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.scss']
})
export class HeaderComponent implements OnInit {
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset)
  isAuthenticated:boolean;
  LayoutConst=LayoutConst;
  TrackOderConst=TrackOderConst;
  OrderSearchReport=OrderSearchReport;
  DocumentsConst=DocumentsConst;
  SubmitOderConst=SubmitOderConst;
  homeComponentConst=homeComponentConst;
  CommonConst=CommonConst;
  username: string;
  DashboardConst=DashboardConst;
  notifications: INotification[] = [];
  notificationCountBehSub = new BehaviorSubject<number>(0);
  panelOpenState = true;
  private _subscription: Subscription;
  private _dialogSub: Subscription;
  private _notificationReadSub: Subscription;
  user_userName: string;
  user_userId: string;
  public navValues = LayoutConst.layoutNavValuesMob;
  
  public reportNavValues = LayoutConst.reportNavValues;
  selectedOption: any;
  constructor(private breakpointObserver: BreakpointObserver,
    private router:Router,private oktaAuth:OktaAuthService,
    private route: ActivatedRoute,
    public dialog: MatDialog, private dataTransfer: DataTransferService,
    private _focusMonitor: FocusMonitor,
    private _notificationSvc: NotificationService, public datePipe: DatePipe) {
      this.oktaAuth.$authenticationState.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
    }

  ngOnInit() {
    let userInfo = Userinfo();
    this.user_userName = userInfo !== undefined ? userInfo.username : "";
    this.user_userId = userInfo !== undefined ? userInfo.userid : "";
    this.getUserNotifications();
    this.getUnreadCount();  
   
  }
  ngAfterViewInit() {
    this._focusMonitor.stopMonitoring(document.getElementById('navButton_1'));
 }
  logout() {
    console.log('logout calls');
    localStorage.clear();
    this.oktaAuth.logout();
    console.log('logout calls1');
    //this.oktaAuth.signOut();
  }
  goToHome() {
    this.router.navigate(['/dashboard']);
  }
  trackTrace() {
    const openDialog = this.dialog.open(GlobalTrackTraceComponent, {
      height: 'fit-content',
      width: '500px',
      position: {top: '4%', left: '65%'}
    });

    openDialog.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  getAccessorials()
  {     
      this.router.navigate(['/dashboard/approve-accessorials']);
  }
  clearData(){
    this.dataTransfer.loadData(null)
  }
  launchReportIncident() {
    this.dataTransfer.loadData(null);
    this.router.navigate(['/dashboard/incidentgrid']);
  }
  userPreference() {
    this.router.navigate([RouteLinks.userPreference]);
  }
  viewAllNotification() {
    this.router.navigate([RouteLinks.viewallnotifications]);
  }
  getUserNotifications() {
    var currentDate = new Date();
    const request: INotificationRequest = {
      USER:this.user_userName,
      PAGENUMBER: 1,
      RECORDSPERPAGE: 1,
      TODAYSDATE: this.datePipe.transform(currentDate, 'yyyy-MM-dd'),
      DateFilter:null,
      PAGENAME:'DASHBOARD'
    }
    this._subscription = this._notificationSvc.getNotifications(request)
    .pipe(first())
    .subscribe(data => {
      this.notifications = Object.keys(data).map(key => data[key]);
      this.username = this.notifications[0].username;
      this._notificationSvc.notificationCount = this.notifications.length > 0 ? this.notifications[0].totalcount : 0;
    });
  }
  showUnreadNotifications() { 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = false;
    const data: INotification[] = this.notifications;
    dialogConfig.maxWidth = '290px';
    dialogConfig.position = {top: "2.5%", right: "5%"};
    dialogConfig.data = data;
    const dialogRef = this.dialog.open(
      NotificationListComponent,
      dialogConfig
    );
    this._dialogSub = dialogRef.beforeClosed().subscribe(options => {
      switch (options.action) {
        case this.CommonConst.notifications.openAction:
          this.readNotification(options.data);
          break;

        case this.CommonConst.notifications.viewAllAction:
          this.viewAllNotification();
          break;
      
        default:
          break;
      }
    });
  }
  getUnreadCount() {
    this.notificationCountBehSub = this._notificationSvc.getNotificationCount();
  }
  readNotification(notification: INotificationAlert) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const data: INotificationAlert = notification;
    dialogConfig.maxWidth = '623px';
    dialogConfig.maxHeight = '250px';
    dialogConfig.data = data;
    const dialogRef = this.dialog.open(
      NotificationModalComponent,
      dialogConfig
    );
    this._notificationReadSub = dialogRef.beforeClosed().subscribe(options => {
      this.getUserNotifications();
    });
  }

  
  selectedReport(item, r){
    // this.viewOption = this.route.snapshot.data.viewOption;
    this.selectedOption = item.replace(/\s/g, "");;
    this.dataTransfer.loadData( this.selectedOption);
    this.router.navigate([r],{ relativeTo: this.route });
  }
}
