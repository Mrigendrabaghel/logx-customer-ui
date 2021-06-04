import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { LayoutConst, DocumentsConst, TrackOderConst, AdvanceSearchAccessDoc, commonNumbers, CommonConst, UserPreferenceConst } from 'src/app/configs/constants';
import { UserPreferenceService } from 'src/app/logx-services/common/user-preference.service';
import { ValidateUserModel } from '../models/auth/loginModel';
import { RegistrationService } from 'src/app/logx-services/registration/registration.service';
import { RouteLinks } from 'src/app/configs/RoutePath';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  panelOpenState = true;
  navBarOpened: boolean = true;
  selectedOption: any = LayoutConst.layoutHome;
  isDashboard: boolean = false;
  pageName: string = '';
  isAuthenticated: boolean;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  public navValues = LayoutConst.layoutNavValues;
  public reportNavValues = LayoutConst.reportNavValues;
  validateUser: ValidateUserModel = new ValidateUserModel();
  validateRes: string = "";
  routePath = RouteLinks;
  errorMessage: any;
  favflag:boolean =false;
  favoritemenulist:any;
  favoritemenulistVal:any;
  isFavoriteVisible:boolean;
  favoriteiconview:any;
  userfavmenuvalue:any;
  constants=LayoutConst;
  isShowBreadCrumb:boolean=false;
  constructor(private oktaAuth: OktaAuthService, private breakpointObserver: BreakpointObserver,
    private router: Router,
    private route: ActivatedRoute,
    private dataTransfer: DataTransferService,
    public userPreferenceService: UserPreferenceService,
    private regServiceService: RegistrationService) {
    this.oktaAuth.$authenticationState.subscribe(isAuthenticated => this.isAuthenticated = isAuthenticated);
    this.validateUser.EmailId = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.email;
    this.validateUser.UserName = this.validateUser.EmailId;
    this.validateUser.Operation = LayoutConst.operation;
    this.isDashboard = true;
    this.favflag=true;
    this.getUserInformation();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.regServiceService.validateUser(this.validateUser).subscribe(async resp => {
          if (resp) {
            await this.getUserInformation();
            this.validateRes = resp;
            this.userFav();
            if (this.validateRes === LayoutConst.userNotFound) {
              this.router.navigate([this.routePath.registration])
            }
            if (this.validateRes === LayoutConst.userPedning) {
              this.dataTransfer.loadData(LayoutConst.resFlag);
              this.dataTransfer.loadData(LayoutConst.registrationMsg);
              this.router.navigate(['/'])
            }
            else {
              await this.getUserInformation();
              this.pageName = (<any>event).url.split("/").slice(-1)[0];
              if (this.pageName === LayoutConst.layoutDashboard) {
                this.isShowBreadCrumb = false;
                this.isDashboard = false;
              }
              else {
                this.isShowBreadCrumb = true;
                this.isDashboard = false;
                if ((this.pageName.substring(commonNumbers.zero, commonNumbers.fourteen) == LayoutConst.layoutAccessDocument)
                  || (this.pageName.substring(commonNumbers.zero, commonNumbers.twentyFour) == LayoutConst.layoutadvancesearchdocument)) {
                  this.selectedOption = DocumentsConst.AccessDocuments.accessDocuments;
                } else if (this.pageName.substring(commonNumbers.zero, commonNumbers.sixteen) == LayoutConst.layoutSecureTrackorder || this.pageName.substring(commonNumbers.zero, commonNumbers.sixteen) == LayoutConst.layoutBulkSearchText) {
                  this.selectedOption = TrackOderConst.trackTraceText;
                } else if ((this.pageName.substring(commonNumbers.zero, commonNumbers.fifteen) == LayoutConst.layoutSearchandReport)
                  || (this.pageName.substring(commonNumbers.zero, commonNumbers.twentyFour) == LayoutConst.layoutadvancesearchorder)) {
                  this.selectedOption = AdvanceSearchAccessDoc.orderText.formName;
                } else if (this.pageName.substring(commonNumbers.zero, commonNumbers.fourteen) == LayoutConst.layoutReportIncident) {
                  this.selectedOption = LayoutConst.layoutReportIncidentText;
                } else if (this.pageName.substring(commonNumbers.zero, commonNumbers.twenty) == LayoutConst.layoutApproveAccessorial || this.pageName === LayoutConst.layoutApproveAccessorialDetails) {
                  this.selectedOption = LayoutConst.layoutApproveAccessorialText;
                } else if (this.pageName.substring(commonNumbers.zero, commonNumbers.fifteen) == LayoutConst.layoutSubmitOrder || this.pageName.substring(commonNumbers.zero, commonNumbers.fifteen) == LayoutConst.layoutSubmitOrderMainText) {
                  this.selectedOption = LayoutConst.layoutSubmitOrderText;
                } else if (this.pageName.substring(commonNumbers.zero, commonNumbers.fifteen) == LayoutConst.UserPreference) {
                  this.selectedOption = "";
                } else if (this.pageName.substring(commonNumbers.zero, commonNumbers.twentyFour) == LayoutConst.viewallnotifications) {
                  this.selectedOption = "";
                  this.isShowBreadCrumb = false;
                }
              }
            }
          }
        });
      }
    })
  }

  async getUserInformation() {
    let userName = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.email;
    let data = await this.regServiceService.getUserInfo(userName);
    localStorage.setItem('userInfo', JSON.stringify(data));
  }

  async ngOnInit() {
    try {
      this.isAuthenticated = await this.oktaAuth.isAuthenticated();
      if (this.isAuthenticated) {
        const userClaims = await this.oktaAuth.getUser();
      }
    }
    catch (error) {
      throw error;
    }
  }

  expandCollapse() {
    this.navBarOpened = !this.navBarOpened;
  }

  async userFav() {
    let navCount = Number(JSON.parse(localStorage.getItem('callCount')))
    let userName = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.email;
    this.userPreferenceService.GetMenuLists(userName).subscribe(response => {
      if (response) {
        this.favoritemenulist = response;
        this.userfavmenuvalue = (this.favoritemenulist.favoritemenu)
        this.constants.layoutNavValues.forEach(data => {
          if (data.name === this.userfavmenuvalue) {
            data.isfavVisible = "true";
            if (navCount === commonNumbers.one) {
              localStorage.removeItem('callCount')
              this.router.navigate([data.routerLink]);
            }
          }
        })
        this.constants.reportNavValues.forEach(data => {
          if (data.fullname === this.userfavmenuvalue) {
            data.isfavVisible = "true";
            if (navCount === commonNumbers.one) {
              localStorage.removeItem('callCount')
              this.router.navigate([data.routerLink]);
            }
          }
        })
      }
    }, error => this.errorMessage = <any>error);
  }

  selected(item, r) {
    this.selectedOption = item;
    this.dataTransfer.loadData(null);
    this.router.navigate([r]);
    if (this.router.url === r) {
      window.location.reload();
    }
  }

  selectReport(item, r) {
    this.selectedOption = item;
    this.navBarOpened = !this.navBarOpened
  }

  selectedReport(item, r) {
    // this.viewOption = this.route.snapshot.data.viewOption;
    this.selectedOption = item.replace(/\s/g, "");;
    this.dataTransfer.loadData(this.selectedOption);
    this.router.navigate([r], { relativeTo: this.route });
  }
  DisplayToolTip(name: string): string {
    return name;
  }
}
