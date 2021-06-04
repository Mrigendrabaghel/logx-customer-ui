import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { CommonConst, commonNumbers, DocumentsConst } from 'src/app/configs/constants';
import { NotificationService } from 'src/app/logx-services/common/notification.service';
import { UploadAndLookupDetailService } from 'src/app/logx-services/common/upload-and-lookup-detail.service';
import { Userinfo } from '../common/common-method';
import { PaginationCriteria } from '../models/accessorials/accessorials.model';
import { INotificationAlert, INotificationRequest } from '../models/notification';
import { NotificationModalComponent } from './notification-modal.component';
@Component({
  selector: 'app-view-notifications',
  templateUrl: './view-notifications.component.html',
  styleUrls: ['./view-notifications.component.scss']
})
export class ViewNotificationsComponent implements OnInit {
  topNotifications: INotificationAlert[];
  commonConst = CommonConst;
  commonNumbers=commonNumbers;
  _subscription: Subscription;
  _deleteActionSub: Subscription;
  pageSize: number=10;
  pageSizeOptions: any[] = [];
  pageNumber: any;
  PageIndex:any;
  totalCount: number;
  unReadCount: number;
  searchValue:  PaginationCriteria = <PaginationCriteria>{};notifications: any;
  private _notificationReadSub: Subscription;
  user_userName: string;
  user_userId: string;
  daysLookup: any;
  dateFilter: any;
  Lookuptype: string = 'grid-pagecount';
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  dateFilterValue: any;
  unFilteredNotificationData: boolean =true;

  constructor(
    public dialog: MatDialog,
    private _notificationSvc: NotificationService,
    public uploadService: UploadAndLookupDetailService,
    public datePipe: DatePipe) {
     
    }
  ngOnInit(): void {
    let userInfo = Userinfo();
    this.user_userName = userInfo !== undefined ? userInfo.username : "";
    this.user_userId = userInfo !== undefined ? userInfo.userid : "";
    this.showTopNotifications();
    this.GetDaysLookUp();
  
  }
  ngAfterViewInit() {

    try {

      this.GetLookUpDetail();
    }
    catch (error) {
      throw error;
    }
  }
  GetDaysLookUp(){
    this._notificationSvc.GetDaysLookUp().subscribe(response => {
      if (response) {
       this.daysLookup=response;
  }
});
}
onSelect(val){
  this.dateFilter=val;
  this.showFilteredData(this.dateFilter)
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
        this.searchValue.todaysDate = new Date;
        this.searchValue.pageNumber = 1;
        this.searchValue.recordPerPage = this.pageSize;
        debugger;
       // this.getDraftOrders(this.searchValue);
      }
    })
  }
  onPaginateChange(event: any) {
    if (event.pageIndex > this.pageNumber) {
      this.PageIndex = event.pageIndex + 1;
      debugger;

     // this.showTopNotifications()

      
      // alert('Clicked on Next Page:'+PageIndex);
    } else {
      // Clicked on previous button
      this.PageIndex = event.previousPageIndex;
      //this.showTopNotifications()
      debugger;
      //alert('Clicked on Previous Page:'+PageIndex);
    }
    this.pageNumber = event.pageIndex;
    if (this.PageIndex == 0 && event.previousPageIndex == 0) {
      this.PageIndex = 1
    }
    else if (this.PageIndex == 0 && event.previousPageIndex > 0) {
      this.PageIndex = event.previousPageIndex
    }
    
    this.searchValue.pageNumber = this.PageIndex;
    this.searchValue.recordPerPage = event.pageSize;
    debugger;
    if(this.dateFilter!=null){
      this.showFilteredData(this.dateFilter)
    }else{
    this.showTopNotifications()
    }
  }

  showFilteredData(DateFilter){
    var currentDate = new Date();
    const request: INotificationRequest = {
      USER:this.user_userName,
      PAGENUMBER:  this.searchValue.pageNumber? this.searchValue.pageNumber: 1,
      RECORDSPERPAGE:  this.searchValue.recordPerPage ? this.searchValue.recordPerPage: 10,
      TODAYSDATE: this.datePipe.transform(currentDate, 'yyyy-MM-dd'),
      PAGENAME:"",
      DateFilter:DateFilter,
    }
    this._subscription = this._notificationSvc.getNotifications(request)
    .subscribe(data => {
      this.topNotifications = Object.keys(data).map(key => data[key]);
      //this._notificationSvc.notificationCount = this.topNotifications.length > 0 ? this.topNotifications[0].unreadcount : 0;
      if(this.topNotifications !=undefined ){
      if(this.topNotifications.length > 0){
     
      this.totalCount=this.topNotifications[0].totalcount;
      this.unReadCount=this.topNotifications[0].unreadcount;
      }else{
        this.dateFilterValue= DateFilter;
        this.totalCount= commonNumbers.zero;
        this.unReadCount= commonNumbers.zero;
      }
    }
      this.topNotifications.forEach((n: INotificationAlert) => n.displaydate = this.datePipe.transform(n.notificationdate, "MM/d/yyyy h:mm a"))
    });
  }
  showTopNotifications() {
    this.unFilteredNotificationData=true;
    var currentDate = new Date();
    const request: INotificationRequest = {
      USER:this.user_userName,
      PAGENUMBER:  this.searchValue.pageNumber? this.searchValue.pageNumber: 1,
      RECORDSPERPAGE:  this.searchValue.recordPerPage ? this.searchValue.recordPerPage: 10,
      TODAYSDATE: this.datePipe.transform(currentDate, 'yyyy-MM-dd'),
      PAGENAME:"",
      DateFilter:null,
    }
    this._subscription = this._notificationSvc.getNotifications(request)
    .subscribe(data => {
      this.topNotifications = Object.keys(data).map(key => data[key]);
      this._notificationSvc.notificationCount = this.topNotifications.length > 0 ? this.topNotifications[0].unreadcount : 0;
      this.totalCount=this.topNotifications[0].totalcount;
      this.unReadCount=this.topNotifications[0].unreadcount;
      this.topNotifications.forEach((n: INotificationAlert) => n.displaydate = this.datePipe.transform(n.notificationdate, "M/d/yy h:mm a"))
    });
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
      if(this.dateFilter){
        this.showFilteredData(this.dateFilter)
        this.getUserNotifications();
      }else{
         this.showTopNotifications();
         this.getUserNotifications();
       }
    });
  }
  deleteNotification(data: INotificationAlert) {
    this._deleteActionSub = this._notificationSvc.updateNotification(data.notificationid, "delete").subscribe(data => {
      if (data) {
      if(this.dateFilter){
       this.showFilteredData(this.dateFilter)
       this.getUserNotifications();
      }else{
        this.showTopNotifications();
        this.getUserNotifications();
      }
      }
    });
  }
  close(notification: INotificationAlert) {
    this.deleteNotification(notification);
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
      this._notificationSvc.notificationCount = this.notifications.length > 0 ? this.notifications[0].totalcount : 0;
    });
  }
 
}