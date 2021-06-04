export class Notification {

  constructor(
    public id: number,
    public type: NotificationType,
    public title: string,
    public message: string,
    public timeout: number,
  ) { }

}

export enum NotificationType {
  success = 0,
  warning = 1,
  error = 2,
  info = 3
}

export interface INotification {
  totalcount: number;
  notificationid: number;
  notificationname: string;
  notificationtype: string,
  notificationdescription: string;
  notificationdate: Date;
  externalsystem: string;
  username: string;
  createddate: Date;
  read: boolean;
  readdate: Date;
  delete: boolean;
  deleteddate: Date;
  unreadcount:number;
}

export interface Notifications extends INotification {
  [key: number]: INotification
}

export interface INotificationAlert extends INotification {
  displaydate: string;
}

export interface INotificationRequest {
  USER: string;
  PAGENUMBER: number;
  RECORDSPERPAGE: number;
  TODAYSDATE: string;
  PAGENAME: string;
  DateFilter:number;
}