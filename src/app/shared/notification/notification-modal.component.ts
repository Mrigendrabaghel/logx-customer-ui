import { Inject, OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { CommonConst } from 'src/app/configs/constants';
import { NotificationService } from 'src/app/logx-services/common/notification.service';
import { INotificationAlert } from '../models/notification';

@Component({
  selector: 'app-notification-modal',
  templateUrl: './notification-modal.component.html',
  styleUrls: ['./notification-modal.component.scss']
})
export class NotificationModalComponent implements OnDestroy {

  notification: INotificationAlert;
  commonConst = CommonConst;
  _subscribe: Subscription;

  constructor(@Inject(MAT_DIALOG_DATA) private dialogData: INotificationAlert,
  private dialogRef: MatDialogRef<NotificationModalComponent>,
  private _notificationSvc: NotificationService) {
    this.notification = this.dialogData;
    this._subscribe = this._notificationSvc.updateNotification(this.notification.notificationid, 'read')
    .pipe(first()).subscribe();
  }

  ngOnDestroy(): void {
    if (this._subscribe != undefined) this._subscribe.unsubscribe();
  }

  onClose() {
    this.dialogRef.close();
  }

}
