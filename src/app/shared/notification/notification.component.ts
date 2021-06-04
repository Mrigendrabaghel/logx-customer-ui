import { Component, OnDestroy } from '@angular/core';
import { NotificationService } from "src/app/logx-services/common/notification.service";
import { INotificationAlert, INotificationRequest, Notification, NotificationType } from "src/app/shared/models/notification";
import { Subscription } from "rxjs";
import { DatePipe } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonConst } from 'src/app/configs/constants';
import { Userinfo } from '../common/common-method';

export enum NOTIFICATION_ACTIONS {
  OPEN = 0,
  DELETE,
  VIEW_ALL
}

@Component({
  selector: 'app-notification', 
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationListComponent implements OnDestroy {

  topNotifications: INotificationAlert[];
  commonConst = CommonConst;
  _subscription: Subscription;
  _deleteActionSub: Subscription;
  daysLookup: any;
  user_userName: any;
  user_userId: any;
  
  constructor(
    private _notificationSvc: NotificationService,
    public dialogRef: MatDialogRef<NotificationListComponent>,
    public datePipe: DatePipe) {
      this.showTopNotifications();
    }
    GetDaysLookUp(){
      this._notificationSvc.GetDaysLookUp().subscribe(response => {
        if (response) {
          this.daysLookup=response;
    }
  });
  }
  showTopNotifications() {
    let userInfo = Userinfo();
    this.user_userName = userInfo !== undefined ? userInfo.username : "";
    this.user_userId = userInfo !== undefined ? userInfo.userid : "";
    var currentDate = new Date();
    const request: INotificationRequest = {
      USER: this.user_userName,
      PAGENUMBER: 1,
      RECORDSPERPAGE: 5,
      TODAYSDATE: this.datePipe.transform(currentDate, 'yyyy-MM-dd'),
      PAGENAME:'DASHBOARD',
      DateFilter:null,
    }
    this._subscription = this._notificationSvc.getNotifications(request)
    .subscribe(data => {
      this.topNotifications = Object.keys(data).map(key => data[key]);
      this._notificationSvc.notificationCount = this.topNotifications.length > 0 ? this.topNotifications[0].unreadcount : 0;
      this.topNotifications.forEach((n: INotificationAlert) => n.displaydate = this.datePipe.transform(n.notificationdate, "M/d/yy h:mm a"))
    });
  }

  readNotification(data: INotificationAlert) {
    this.dialogRef.close({data: data, action: this.commonConst.notifications.openAction});
  }

  deleteNotification(data: INotificationAlert) {
    this._deleteActionSub = this._notificationSvc.updateNotification(data.notificationid, "delete").subscribe(data => {
      if (data) {
        this.showTopNotifications();
      }
    });
  }

  viewAllNotifications() {
    this.dialogRef.close({id: null, action: this.commonConst.notifications.viewAllAction});
  }

  close(notification: INotificationAlert) {
    this.deleteNotification(notification);
  }


className(notification: Notification): string {

    let style: string;

    switch (notification.type) {

      case NotificationType.success:
        style = 'success';
        break;

      case NotificationType.warning:
        style = 'warning';
        break;

      case NotificationType.error:
        style = 'error';
        break;

      default:
        style = 'info';
        break;
    }

    return style;
  }

  ngOnDestroy() {
    if (this._subscription != undefined) this._subscription.unsubscribe();
    if (this._deleteActionSub != undefined) this._deleteActionSub.unsubscribe();
  }
}