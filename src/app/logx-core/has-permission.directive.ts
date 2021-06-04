import { Directive, ElementRef, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import data from '../../assets/auth'
import { HasPermissionConst, homeComponentConst, UploadConst } from '../configs/constants';
import { RouteLinks } from '../configs/RoutePath';
import { ConfirmationDialog } from '../shared/confirmation-dialog/confirmation-dialog.component';

@Directive({
  selector: '[hasPermission]'
})
export class HasPermissionDirective {

  private currentUser;
  // private permittedWidgets = ["Track & Trace","Access Documents","Order Lookup","Approve Accessorials",  "Report Incidents"];
  private permissions: any[];
  private permittedWidgets = [];
  private permittedActions = [];
  private isHidden = true;
  private permissionsData: any[];
  private userProfileData: any;
  widgetName: string;

  constructor(
    private element: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    public router: Router,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {
    // this.currentUser = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.userProfile;
    this.currentUser = JSON.parse(localStorage.getItem('userInfo'));
    this.permissionsData = data;
    //this.userProfileData = this.permissionsData[0].profile.filter(x => JSON.stringify(x.role) == JSON.stringify(this.currentUser.role) && JSON.stringify(x.team) == JSON.stringify(this.currentUser.Team))
    // if(this.currentUser.Team===undefined){
    //   this.userProfileData = this.permissionsData[0].profile.filter(x =>JSON.stringify(x.role) == JSON.stringify(this.currentUser.role))
    // }
    // else{
    //   this.userProfileData = this.permissionsData[0].profile.filter(x =>JSON.stringify(x.role) == JSON.stringify(this.currentUser.role) && JSON.stringify(x.team) == JSON.stringify(this.currentUser.Team))
    // }
    this.widgetName = localStorage.getItem(homeComponentConst.widgetName);
  }

  ngOnInit() {
    //this.updateView();
  }

  @Input()
  set hasPermission(val) {
    this.permissions = val;
    this.checkPermissionRole();
  }

  @Input()
  set hasPermissionWidgets(widgets) {
    this.permittedWidgets = widgets;
    this.checkPermissionWidget();
  }

  @Input()
  set hasPermissionActions(actions) {
    this.permittedActions = actions;
    this.checkPermissionAction();
  }

  private updateView(val) {
    if (val) {
      if (this.isHidden) {
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.isHidden = false;
      }
    } else {
      this.isHidden = true;
      this.viewContainer.clear();
    }
  }

  private checkPermissionRole() {
    let hasPermission = false;
    if (this.currentUser && this.userProfileData) {
      if (this.permissions === this.currentUser) {
        hasPermission = true;
        // if (this.userProfileData[0].role === this.currentUser) {
        //   hasPermission = true;
        // }
      }
      else {
        hasPermission = false;
      }
      this.updateView(hasPermission)
    }
    return hasPermission;
  }

  private checkPermissionWidget() {
    let hasPermission = false;
    if (this.currentUser) {
      if (this.permittedWidgets) {
        for (const checkPermission of this.permittedWidgets) {
          //if (this.userProfileData[0].widgets.filter(x => x.menu.toUpperCase() === checkPermission.toUpperCase()).length > 0 && this.userProfileData[0].role === this.currentUser.role)
          if (checkPermission === 'Home') {
            hasPermission = true;
          }
          if (checkPermission === 'Track & Trace') {
            if (this.currentUser.filter(x => x.tracktrace === true).length > 0)
              hasPermission = true;
          }
          if (checkPermission === 'Access Documents') {
            if (this.currentUser.filter(x => x.accessdocuments === true).length > 0)
              hasPermission = true;
          }
          if (checkPermission === 'Order Lookup') {
              hasPermission = true;
          }
          if (localStorage.getItem(homeComponentConst.widgetName) === null) {
            if (checkPermission === 'Approve Accessorials') {
              if (this.currentUser.filter(x => x.approveaccessorials === true).length > 0)
                hasPermission = true;
            }
            if (checkPermission === 'Report Incidents') {
              if (this.currentUser.filter(x => x.reportincidents === true).length > 0)
                hasPermission = true;
            }
            if (checkPermission === 'Submit Orders') {
              if (this.currentUser.filter(x => x.submitorders === true).length > 0)
                hasPermission = true;
            }
          }
          else {
            const widgetName = localStorage.getItem(homeComponentConst.widgetName)
            if (widgetName === 'Access Documents') {
              if (this.currentUser.filter(x => x.accessdocuments === true).length === 0) {
                hasPermission = false;
                this.router.navigate([RouteLinks.dashboard]);
                const permissionDialog = this.dialog.open(ConfirmationDialog, {
                  data: {
                    message: HasPermissionConst.noPermission + " " + this.widgetName,
                    buttonText: {
                      ok: UploadConst.ok
                    }
                  }
                });
              }
              else {
                hasPermission = true;
              }
              localStorage.removeItem(homeComponentConst.widgetName);
            }
            if (widgetName === 'Submit Orders') {
              if (this.currentUser.filter(x => x.submitorders === true).length === 0) {
                hasPermission = false;
                this.router.navigate([RouteLinks.dashboard]);
                const permissionDialog = this.dialog.open(ConfirmationDialog, {
                  data: {
                    message: HasPermissionConst.noPermission + " " + this.widgetName,
                    buttonText: {
                      ok: UploadConst.ok
                    }
                  }
                });
              }
              else {
                hasPermission = true
              }
              localStorage.removeItem(homeComponentConst.widgetName);
            }
          }
          if (checkPermission === 'reports') {
            if (this.currentUser.filter(x => x.submitorders === true).length>0)
              hasPermission = true;
          }
          if (checkPermission === 'reports') {
            if (this.currentUser.filter(x => x.submitorders === true).length>0)
              hasPermission = true;
          }
          if (checkPermission === 'Reports') {
            if (this.currentUser.filter(x => x.REPORTS_ACCESSORIALS === true).length>0 ||
            this.currentUser.filter(x => x.reportS_CLAIMS === true).length>0 ||
            this.currentUser.filter(x => x.reportS_INBOUND === true).length>0 ||
            this.currentUser.filter(x => x.reportS_INCIDENTS === true).length>0 ||
            this.currentUser.filter(x => x.reportS_MONTHEND === true).length>0 ||
            this.currentUser.filter(x => x.reportS_OUTBOUND === true).length>0){
          hasPermission = true;
            }
      
 


          }


            if (checkPermission === 'Accessorials') {
              if (this.currentUser.filter(x => x.REPORTS_ACCESSORIALS === true).length>0)
                hasPermission = true;
            }
  
            if (checkPermission === 'Claims') {
              if (this.currentUser.filter(x => x.reportS_CLAIMS === true).length>0)
                hasPermission = true;
            }
            if (checkPermission === 'Incidents') {
              if (this.currentUser.filter(x => x.reportS_INCIDENTS === true).length>0)
                hasPermission = true;
            }
            
            if (checkPermission === 'Month End') {
              if (this.currentUser.filter(x => x.reportS_MONTHEND === true).length>0)
                hasPermission = true;
            }
  
            if (checkPermission === 'Inbound') {
              if (this.currentUser.filter(x => x.reportS_INBOUND === true).length>0)
                hasPermission = true;
            }
  
            if (checkPermission === 'Outbound') {
              if (this.currentUser.filter(x => x.reportS_OUTBOUND === true).length>0)
                hasPermission = true;
            }


       
          // else {
          //   //hasPermission = false;
          //   if (this.widgetName == this.permittedWidgets[0]) {
          //     this.router.navigate([RouteLinks.dashboard]);
          //     if (this.dialog.openDialogs.length != 0) return;
          //     const permissionDialog = this.dialog.open(ConfirmationDialog, {
          //       data: {
          //         message: HasPermissionConst.noPermission + " " + this.permittedWidgets,
          //         buttonText: {
          //           ok: UploadConst.ok
          //         }
          //       }
          //     });
          //     localStorage.removeItem(homeComponentConst.widgetName);
          //   }
          // }
        }
      }
      this.updateView(hasPermission);
    }
    return hasPermission;
  }

  private checkPermissionAction() {
    let hasPermission = false;
    if (this.currentUser) {
      if (this.permittedActions) {
        for (const checkPermission of this.permittedActions) {
          if(this.currentUser.filter(x => x.accessorials.toLowerCase() === checkPermission.toLowerCase()).length > 0) {
            hasPermission = true;
          }
          if(this.currentUser.filter(x => x.documents.toLowerCase() === checkPermission.toLowerCase()).length > 0) {
            hasPermission = true;
          }
          if(this.currentUser.filter(x => x.incidents.toLowerCase() === checkPermission.toLowerCase()).length > 0) {
            hasPermission = true;
          }
        }
      }
      this.updateView(hasPermission);
    }
    return hasPermission;
  }

}


