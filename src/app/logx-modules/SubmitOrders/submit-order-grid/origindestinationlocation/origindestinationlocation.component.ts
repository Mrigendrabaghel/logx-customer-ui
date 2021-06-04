import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CommonConst, commonNumbers, SubmitorderdetailsConst, UserPreferenceConst } from 'src/app/configs/constants';
import { RouteLinks } from 'src/app/configs/RoutePath';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { UserPreferenceService } from 'src/app/logx-services/common/user-preference.service';
import { IncidentReportService } from 'src/app/logx-services/incidentReport/incident-report.service';
import { SubmitOrderService } from 'src/app/logx-services/submitOrder/submit-order.service';
import { Userinfo } from 'src/app/shared/common/common-method';
import { ConfirmationDialog } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { UserPrefLocDialogComponent } from 'src/app/shared/layout/user-preference/user-pref-loc-dialog/user-pref-loc-dialog.component';
import { UserPreferenceDeletionComponent } from 'src/app/shared/layout/user-preference/user-preference-deletion/user-preference-deletion.component';
import { locationDetails, LocationInfo } from 'src/app/shared/models/incident/report-incident.model';
import { ContactInfo, SaveOrderDestination, SaveOriginInformation } from 'src/app/shared/models/submitOrder/submitOrder.model';
import { Locations, UserPreferenceDetails } from 'src/app/shared/models/user-preference.model';
import { EditlocationmodalComponent } from '../../editlocationmodal/editlocationmodal.component';


export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'MM/DD/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-origindestinationlocation',
  templateUrl: './origindestinationlocation.component.html',
  styleUrls: ['./origindestinationlocation.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})

export class OrigindestinationlocationComponent implements OnInit {
  @Input() orderNumber: string;
  @Input() orderId: any;
  @Output() getOrderId = new EventEmitter<any>();
  @ViewChild('locationForm') myForm: NgForm;
  @Output() locationUpdate = new EventEmitter<any>();
  @Input() formName: string;
  @Input() shipWith: string;
  @Output() checked: boolean = false;
  CommonConst = CommonConst;
  SubmitorderdetailsConst = SubmitorderdetailsConst;
  disabled = false;
  orgContactInfo: ContactInfo = new ContactInfo();
  saveOriginInfo: SaveOriginInformation = <SaveOriginInformation>{};
  locationId: any;
  orgLocationDetails: locationDetails = new locationDetails()
  OrgearlyPickUpDate: any;
  OrglatePickUpDate: any;
  dateValidate = new FormControl(new Date());
  errorMessage: any;
  earlyPickUpTime: any;
  latePickUpTime: any;
  updatedOriginLocationDetails: locationDetails = new locationDetails();
  favLocations: locationDetails = new locationDetails();
  updatedOrderId: number;
  orgLocationId: number;
  PickupTimeZone: string;
  timeZoneValues: any;
  Locations: Locations = new Locations();
  showAddress: boolean;
  locationVal: locationDetails[] = [];
  clickSubjectOrigin: Subject<any> = new Subject();
  UserPreferenceDetails: UserPreferenceDetails = new UserPreferenceDetails();
  passOriginLoc: locationDetails = new locationDetails();
  UserPreferenceConst = UserPreferenceConst;
  locDialog: boolean = false;
  Loc: any;
  statusMessage: string;
  user_userId: any;
  user_userName: any;
  locationIdDest: any;
  IsDisable: boolean = false;
  timeZoneVal: any;
  dateFormatVal: any;
  child: any;
  placeholder: string;
  Locationinfomodel: LocationInfo = <LocationInfo>{};
  locRes: any;
  timeFormatVal: string;
  timeFormatValue: number;
  minDate = new Date();
  maxEarlypickupDate: any;
  maxLatepickupDate: any;

  constructor(public dialog: MatDialog, public submitOrderService: SubmitOrderService,
    public router: Router, private dataTransfer: DataTransferService,
    public userPreferenceService: UserPreferenceService,
    private incidentReportService: IncidentReportService,
    private detectchanges: ChangeDetectorRef,
    public snackBar: MatSnackBar,
    public datePipe: DatePipe) { }

  unCheckMeCheckbox = [{ checked: true }];




  ngOnChanges() {
    this.getUserPreference(this.user_userName)
    if (this.orderId != null) {
      this.GetDestinationLocationDetails();
    }
  }

  GetDestinationLocationDetails() {
    this.submitOrderService.GetDestinationLocationDetails(this.orderId).subscribe(response => {
      if (response) {
        this.locationIdDest = response[0].locationIdDest;
      }
    })
  }

  ngAfterViewChecked(): void {

    try {

      for (let i = 0; i < this.locationVal.length; i++) {
        if (this.locationIdDest == this.locationVal[i].LocationId) {
          this.locationVal[i].showUseAddress = true;
          this.detectchanges.detectChanges();
        }
      }
    } catch (error) {
      throw error;
    }
  }

  ngOnInit(): void {
    //this.getUserPreference(UserPreferenceConst.user_userName) 
    let userInfo = Userinfo();
    this.user_userName = userInfo !== undefined ? userInfo.username : "";
    this.user_userId = userInfo !== undefined ? userInfo.userid : "";
    this.getdropdownvalues(SubmitorderdetailsConst.Timezone, '1');
    this.getUserPreference(this.user_userName)
    if (this.orderId !== null) {
      this.getOriginLocationDetails();
    }
  }
  getdropdownvalues(lookupType: string, userId: string) {
    this.submitOrderService.GetSubmitOrderDropDownValues(lookupType, userId).subscribe(response => {
      if (response) {
        this.timeZoneValues = response;
      }
    }, error => this.errorMessage = <any>error);
  }
  openDialog(originInfo) {
    const confirmsave = this.dialog.open(ConfirmationDialog, {
      data: {
        message: SubmitorderdetailsConst.SaveAndContinueErrorMessage.notificationDelete,
        buttonText: {
          ok: CommonConst.YES,
          cancel: CommonConst.NO
        }
      }
    });
    confirmsave.afterClosed().subscribe(res => {
      if (res) {
        this.submit(SubmitorderdetailsConst.saveAndContinue);
      }
    })
  }

  openDialogEditLocation() {
    this.dialog.open(EditlocationmodalComponent, {
      data: {
        message: SubmitorderdetailsConst.header,
        buttonText: {
          ok: CommonConst.save,
          cancel: CommonConst.btnCancel
        }
      }
    });
  }

  getLocationContactDetails(value) {
    this.orgLocationDetails = value;
    this.locationId = value.LocationId;
    this.orgLocationId = value.LocationId;
    this.submitOrderService.GetLocationContactDetails(this.locationId).subscribe(response => {
      if (response.length > 0) {
        this.orgContactInfo = response[0];
      }
    })
  }

  getOriginLocationDetails() {

    this.submitOrderService.GetOriginLocationDetails(this.orderId).subscribe(response => {

      if (response) {

        this.updatedOrderId = response[0].orderId;
        this.orgLocationId = response[0].locationIdOrig;
        this.locationId = response[0].locationIdOrig;
        this.updatedOriginLocationDetails.IncidentPostalDetails.PostalCode = response[0].originLocZip;
        this.updatedOriginLocationDetails.IncidentPostalDetails.CityName = response[0].originLocCity;
        this.updatedOriginLocationDetails.IncidentPostalDetails.StateName = response[0].originLocStateName;
        this.updatedOriginLocationDetails.IncidentLocation = response[0].originAddress;
        this.updatedOriginLocationDetails.IncidentPostalDetails.StateCode = response[0].originLocStateCode;
        this.updatedOriginLocationDetails.IncidentPostalDetails.LocationNumer = response[0].locationNumOrig;
        this.orgContactInfo.contactName = response[0].originLocContactName;
        this.orgContactInfo.phone = response[0].originLocContactPhone;
        this.orgContactInfo.email = response[0].originLocContactEmail;
        this.OrgearlyPickUpDate = response[0].earlyPickupUtc;
        this.earlyPickUpTime = response[0].earlyPickupTime;
        this.OrglatePickUpDate = response[0].latePickupUtc;
        this.latePickUpTime = response[0].latePickupTime;
        this.disabled = response[0].pickupAppointment;
        this.orgLocationDetails.IncidentLocation = response[0].originAddress;
        this.orgLocationDetails.IncidentPostalDetails.CityName = response[0].originLocCity;
        this.orgLocationDetails.IncidentPostalDetails.StateCode = response[0].originLocStateCode;
        this.orgLocationDetails.IncidentPostalDetails.StateName = response[0].originLocStateName;
        this.orgLocationDetails.IncidentPostalDetails.PostalCode = response[0].originLocZip;
        this.orgLocationDetails.LocationNumber = response[0].locationNumOrig;
        this.orgContactInfo.contactId = response[0].contactIdOrig;
        this.orgContactInfo.contactNum = response[0].contactNumOrig;
        this.updatedOriginLocationDetails = JSON.parse(JSON.stringify(this.updatedOriginLocationDetails));
        this.PickupTimeZone = response[0].pickupTimeZone;
        this.changedate(this.OrglatePickUpDate)
        this.changedateEarlyPickup(this.OrgearlyPickUpDate)
      }
    })
  }

  submit(saveType) {
    if (saveType === 'saveForLater') {
      event.preventDefault()
    }
    this.saveOriginInfo.appointment = this.disabled;
    // if( this.saveOriginInfo.appointment==true){
    //   this.saveOriginInfo.latePickup =  null;
    //   this.saveOriginInfo.LatePickupTime = '';  
    // }
    this.saveOriginInfo.earlyPickup = this.OrgearlyPickUpDate !== undefined ? this.datePipe.transform(this.OrgearlyPickUpDate, 'yyyy-MM-dd') : null;
    this.saveOriginInfo.latePickup = this.OrglatePickUpDate !== undefined ? this.datePipe.transform(this.OrglatePickUpDate, 'yyyy-MM-dd') : null;
    this.saveOriginInfo.EarlyPickupTime = this.earlyPickUpTime !== undefined ? this.earlyPickUpTime : '';
    this.saveOriginInfo.LatePickupTime = this.latePickUpTime !== undefined ? this.latePickUpTime : '';
    this.saveOriginInfo.PickupTimeZone = this.PickupTimeZone;
    this.saveOriginInfo.orderNumber = this.orderNumber;
    this.saveOriginInfo.orderId = this.updatedOrderId != null ? this.updatedOrderId : commonNumbers.zero;
    this.saveOriginInfo.shipWithOrder = this.shipWith;
    this.saveOriginInfo.originLocation = this.orgLocationDetails.IncidentLocation !== undefined ? this.orgLocationDetails.IncidentLocation : '';
    this.saveOriginInfo.originLocationId = Number(this.orgLocationId !== undefined ? this.orgLocationId : 0);
    this.saveOriginInfo.originLocCity = this.orgLocationDetails.IncidentPostalDetails.CityName !== undefined ? this.orgLocationDetails.IncidentPostalDetails.CityName : '';
    this.saveOriginInfo.originStateName = this.orgLocationDetails.IncidentPostalDetails.StateName !== undefined ? this.orgLocationDetails.IncidentPostalDetails.StateName : '';
    this.saveOriginInfo.originStateCode = this.orgLocationDetails.IncidentPostalDetails.StateCode !== undefined ? this.orgLocationDetails.IncidentPostalDetails.StateCode : '';
    this.saveOriginInfo.originZipCode = this.orgLocationDetails.IncidentPostalDetails.PostalCode !== undefined ? this.orgLocationDetails.IncidentPostalDetails.PostalCode : '';
    this.saveOriginInfo.LocationNumOrig = this.orgLocationDetails.LocationNumber !== undefined ? this.orgLocationDetails.LocationNumber : '';
    this.saveOriginInfo.originLocContactName = this.orgContactInfo.contactName !== undefined ? this.orgContactInfo.contactName : '';
    this.saveOriginInfo.originLocContactPhone = this.orgContactInfo.phone !== undefined ? this.orgContactInfo.phone : '';
    this.saveOriginInfo.originLocContactEmail = this.orgContactInfo.email !== undefined ? this.orgContactInfo.email : '';
    this.saveOriginInfo.contactIdOrig = Number(this.orgContactInfo.contactId !== undefined ? this.orgContactInfo.contactId : 0);
    this.saveOriginInfo.ContactNumOrig = this.orgContactInfo.contactNum !== undefined ? this.orgContactInfo.contactNum : '';
    this.saveOriginInfo.userId = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.name;
    this.saveOriginInfo.emailId = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.userProfile.email;
    this.saveOriginInfo.userName = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.name;
    this.saveOriginInfo.originLocFlag = saveType;
    this.submitOrderService.SaveOriginDetails(this.saveOriginInfo).subscribe(res => {
      if (res) {
        this.getOrderId.emit(res);
        this.snackBar.open(`Your Order number (${this.orderNumber}) has been saved but not submitted.`, '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }).afterDismissed().subscribe(() => {
          if (saveType === 'saveForLater') {
            this.router.navigate([RouteLinks.submitordergrid]);
          }
          else {
            this.getOriginLocationDetails();
            this.dataTransfer.loadData('fromOrigin');
            this.router.navigate([RouteLinks.submitordermain]);
          }
        });
      } else {
        this.snackBar.open(SubmitorderdetailsConst.unsuccessful, '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        })
      }
    }, error => {
      this.errorMessage = <any>error
      this.snackBar.open(SubmitorderdetailsConst.unsuccessful, '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
    })
  }

  onCancel(event): void {
    event.preventDefault()
    const confirmCancel = this.dialog.open(ConfirmationDialog, {
      data: {
        message: SubmitorderdetailsConst.cancelOrder,
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
            this.snackBar.open(this.shipWith!==""?SubmitorderdetailsConst.cancelOrderShipWith:SubmitorderdetailsConst.cancelOrderSingle, '', {
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
  notifyClick(event,data) {
    event.preventDefault();
    this.passOriginLoc = JSON.parse(JSON.stringify(data));;
    this.clickSubjectOrigin.next(data);
  }
  getUserPreference(userName: string) {
    this.userPreferenceService.GetUserPreference(userName).subscribe(response => {
      this.locationVal = [];
      if (response.userPreferences) {
        if (response.userPreferences.length) {
          this.timeZoneVal = response.userPreferences[0].timezone;
          this.timeFormatVal = response.userPreferences[0].timeformat;
          this.dateFormatVal = response.userPreferences[0].dateformat;
          if (this.PickupTimeZone == undefined) {
            this.PickupTimeZone = this.timeZoneVal;
          }
          if (this.timeFormatVal != "") {
            if (this.timeFormatVal === UserPreferenceConst.twelveHours) {
              this.timeFormatValue = commonNumbers.twelve;
            } else {
              this.timeFormatValue = commonNumbers.twentyFour;
            }
          }
          MY_DATE_FORMATS.display.dateInput = (this.dateFormatVal).toUpperCase();
          MY_DATE_FORMATS.parse.dateInput = (this.dateFormatVal).toUpperCase();
          this.placeholder = (MY_DATE_FORMATS.parse.dateInput).toLowerCase();
        }
      }
      if (response.userPreferenceLocation) {
        for (let i = 0; i < response.userPreferenceLocation.length; i++) {

          this.favLocations = new locationDetails();
          if (response.userPreferenceLocation[i].userlocid != null) {
            this.favLocations.ReportingLocation = response.userPreferenceLocation[i].addresS2 + ' ' +
              response.userPreferenceLocation[i].locationname + ' ' + response.userPreferenceLocation[i].addresS1 + ' ' +
              response.userPreferenceLocation[i].statename + ', ' + response.userPreferenceLocation[i].city + ' ' +
              response.userPreferenceLocation[i].zipcode
            this.favLocations.LocationId = response.userPreferenceLocation[i].locid;
            this.favLocations.LocationNumber = response.userPreferenceLocation[i].userlocid;
            this.favLocations.IncidentLocation = response.userPreferenceLocation[i].locationname;

            this.favLocations.IncidentPostalDetails.LocationNumer = response.userPreferenceLocation[i].addresS2;
            this.favLocations.ReportingPostalDetails.LocationNumer = response.userPreferenceLocation[i].addresS1;

            this.favLocations.IncidentPostalDetails.CityName = response.userPreferenceLocation[i].city;
            this.favLocations.IncidentPostalDetails.StateName = response.userPreferenceLocation[i].statename;
            this.favLocations.IncidentPostalDetails.StateCode = response.userPreferenceLocation[i].statecode;
            this.favLocations.IncidentPostalDetails.CountryName = response.userPreferenceLocation[i].countryname;
            this.favLocations.IncidentPostalDetails.CountryCode = response.userPreferenceLocation[i].countrycode;
            this.favLocations.IncidentPostalDetails.PostalCode = response.userPreferenceLocation[i].zipcode;
            this.locationVal.push(this.favLocations);
          }

        }
        if (this.locationVal.length >= commonNumbers.two) {
          this.IsDisable = true;
        } else {
          this.IsDisable = false;
        }
        if (this.locationVal.length) {
          this.showAddress = true;
        }
      }
    });

  }
  addTofavotires(event) {
    if (event.checked == true) {

      if (this.locationVal.length >= commonNumbers.two) {
        return;
      }
      if (this.orgLocationDetails.LocationId) {
        this.Locations.UserId = this.user_userId;
        this.Locations.LocId = this.orgLocationDetails.LocationId;
        this.Locations.UserLocId = commonNumbers.zero;
        this.Locations.LocationName = this.orgLocationDetails.LocationName !== undefined ? this.orgLocationDetails.LocationName : '';
        this.Locations.Address1 = this.orgLocationDetails.Address1 !== undefined ? this.orgLocationDetails.Address1 : '';
        this.Locations.Address2 = this.orgLocationDetails.LocationNumber !== undefined ? this.orgLocationDetails.LocationNumber : '';
        this.Locations.City = this.orgLocationDetails.ReportingPostalDetails.CityName !== undefined ? this.orgLocationDetails.ReportingPostalDetails.CityName : '';;
        this.Locations.StateCode = this.orgLocationDetails.ReportingPostalDetails.StateCode !== undefined ? this.orgLocationDetails.ReportingPostalDetails.StateCode : '';;
        this.Locations.StateName = this.orgLocationDetails.ReportingPostalDetails.StateName !== undefined ? this.orgLocationDetails.ReportingPostalDetails.StateName : '';
        this.Locations.CountryCode = this.orgLocationDetails.ReportingPostalDetails.CountryCode !== undefined ? this.orgLocationDetails.ReportingPostalDetails.CountryCode : '';
        this.Locations.CountryName = this.orgLocationDetails.ReportingPostalDetails.CountryName !== undefined ? this.orgLocationDetails.ReportingPostalDetails.CountryName : '';
        this.Locations.ZipCode = this.orgLocationDetails.ReportingPostalDetails.PostalCode !== undefined ? this.orgLocationDetails.ReportingPostalDetails.PostalCode : '';
        this.Locations.IsDefault = false;
        this.Loc = JSON.parse(JSON.stringify([this.Locations]));
        this.saveUserPeferences(this.Loc);
      } else if (this.orgLocationId != 0) {
        this.Locationinfomodel.postalCode = this.orgLocationDetails.IncidentPostalDetails.PostalCode;
        this.Locationinfomodel.stateCode = this.orgLocationDetails.IncidentPostalDetails.StateCode;
        this.Locationinfomodel.cityName = this.orgLocationDetails.IncidentPostalDetails.CityName;
        this.Locationinfomodel.searchCriteria = "";
        try {
          this.incidentReportService.GetIncidentLocationDetails(this.Locationinfomodel).subscribe(response => {
            this.locRes = response;
            if (this.locRes != undefined) {
              for (let index = 0; index < this.locRes.length; index++) {
                if (this.orgLocationId == this.locRes[index].locationId) {

                  this.Locations.UserId = this.user_userId;
                  this.Locations.LocId = this.locRes[index].locationId;
                  this.Locations.UserLocId = commonNumbers.zero;
                  this.Locations.LocationName = this.locRes[index].locationName !== undefined ? this.locRes[index].locationName : '';
                  this.Locations.Address1 = this.locRes[index].locationAddr1 !== undefined ? this.locRes[index].locationAddr1 : '';
                  this.Locations.Address2 = this.locRes[index].locationNumber !== undefined ? this.locRes[index].locationNumber : '';
                  this.Locations.City = this.locRes[index].cityName !== undefined ? this.locRes[index].cityName : '';;
                  this.Locations.StateCode = this.locRes[index].stateCode !== undefined ? this.locRes[index].stateCode : '';;
                  this.Locations.StateName = this.locRes[index].stateName !== undefined ? this.locRes[index].stateName : '';
                  this.Locations.CountryCode = this.locRes[index].countryFipsCode !== undefined ? this.locRes[index].countryFipsCode : '';
                  this.Locations.CountryName = this.locRes[index].countryName !== undefined ? this.locRes[index].countryName : '';
                  this.Locations.ZipCode = this.locRes[index].postalCode !== undefined ? this.locRes[index].postalCode : '';
                  this.Locations.IsDefault = false;
                  break;

                }

              }

              this.Loc = JSON.parse(JSON.stringify([this.Locations]));
              this.saveUserPeferences(this.Loc);
            }

          }, error => this.errorMessage = <any>error);
        }
        catch (error) {
          throw error;
        }
      }
    }

  }

  unCheck($event) {

    this.unCheckMeCheckbox.forEach(child => {
      child.checked = false;
    })
  }

  editAddress(event,data): void {
    event.preventDefault();
    this.Locations.UserId = this.user_userId !== undefined ? this.user_userId : commonNumbers.zero;
    this.Locations.UserLocId = data.LocationNumber !== undefined ? data.LocationNumber : commonNumbers.zero;
    this.Locations.LocationName = data.IncidentLocation !== undefined ? data.IncidentLocation : '';

    this.Locations.Address2 = data.IncidentPostalDetails.LocationNumer !== undefined ? data.IncidentPostalDetails.LocationNumer : '';
    this.Locations.Address1 = data.IncidentPostalDetails.LocationNumer !== undefined ? data.ReportingPostalDetails.LocationNumer : '';

    this.Locations.City = data.IncidentPostalDetails.CityName !== undefined ? data.IncidentPostalDetails.CityName : '';
    this.Locations.StateName = data.IncidentPostalDetails.StateName !== undefined ? data.IncidentPostalDetails.StateName : '';
    this.Locations.StateCode = data.IncidentPostalDetails.StateCode !== undefined ? data.IncidentPostalDetails.StateCode : '';
    this.Locations.CountryName = data.IncidentPostalDetails.CountryName !== undefined ? data.IncidentPostalDetails.CountryName : '';
    this.Locations.CountryCode = data.IncidentPostalDetails.CountryCode !== undefined ? data.IncidentPostalDetails.CountryCode : '';
    this.Locations.ZipCode = data.IncidentPostalDetails.PostalCode !== undefined ? data.IncidentPostalDetails.PostalCode : '';
    this.Locations.IsDefault = false;

    const dialoc = this.dialog.open(UserPrefLocDialogComponent, {
      data: { Locations: this.Locations, locDialog: this.locDialog }  //locDialog: this.locDialog },
    });
    dialoc.afterClosed().subscribe(result => {
      if (result != null) {
        this.Locations.UserId = this.user_userId !== undefined ? this.user_userId : commonNumbers.zero;
        this.Locations.UserLocId = result.Locations.UserLocId !== undefined ? result.Locations.UserLocId : commonNumbers.zero;
        this.Locations.LocationName = result.DefaultLocations.LocationName !== undefined ? result.DefaultLocations.LocationName : '';

        this.Locations.Address2 = result.DefaultLocations.Address2 !== undefined ? result.DefaultLocations.Address2 : '';
        this.Locations.Address1 = result.DefaultLocations.Address1 !== undefined ? result.DefaultLocations.Address1 : '';

        this.Locations.LocId = result.DefaultLocations.LocId !== undefined ? result.DefaultLocations.LocId : '';
        this.Locations.City = result.DefaultLocations.City !== undefined ? result.DefaultLocations.City : '';
        this.Locations.StateName = result.DefaultLocations.StateName !== undefined ? result.DefaultLocations.StateName : '';
        this.Locations.StateCode = result.DefaultLocations.StateCode !== undefined ? result.DefaultLocations.StateCode : '';
        this.Locations.CountryName = result.DefaultLocations.CountryName !== undefined ? result.DefaultLocations.CountryName : '';
        this.Locations.CountryCode = result.DefaultLocations.CountryCode !== undefined ? result.DefaultLocations.CountryCode : '';
        this.Locations.ZipCode = result.DefaultLocations.ZipCode !== undefined ? result.DefaultLocations.ZipCode : '';
        this.Locations.IsDefault = false;
        this.Loc = JSON.parse(JSON.stringify([this.Locations]));
        this.saveUserPeferences(this.Loc)
      }
    });
  }


  changedate(latePickUpDate) {
    if(latePickUpDate != null){
    var previousDate = new Date(latePickUpDate);
    previousDate.setDate(previousDate.getDate() - 1)
    this.maxEarlypickupDate = previousDate
    }
  }

  changedateEarlyPickup(OrgearlyPickUpDate) {
    if(OrgearlyPickUpDate != null){
    var previousDate = new Date(OrgearlyPickUpDate);
    previousDate.setDate(previousDate.getDate() + 1)
    this.maxLatepickupDate = previousDate
    }
  }

  onDeleteAddress(event,data): void {
    event.preventDefault();
    const DeleteDialog = this.dialog.open(UserPreferenceDeletionComponent, {
      data: {
        message: data.ReportingLocation,
        buttonText: {
          ok: CommonConst.YES,
          cancel: CommonConst.NO
        }
      },
    })
    DeleteDialog.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        if (data.LocationNumber != null) {
          this.userPreferenceService.DeleteLocationPreference(data.LocationNumber).subscribe(async data => {
            if (data) {
              this.getUserPreference(this.user_userName)
              this.statusMessage = UserPreferenceConst.deleteSuccess;
              this.snackBar.open(UserPreferenceConst.deleteSuccess, '', {
                duration: 5000,
                horizontalPosition: 'center',
                verticalPosition: 'top'
              })
            }
            else {
              this.snackBar.open(UserPreferenceConst.deleteFailure, '', {
                duration: 5000
              })
            }
          }, error => {
            this.errorMessage = <any>error;
            this.snackBar.open(UserPreferenceConst.deleteFailure, '', {
              duration: 5000
            })
          });
        }
      }
    })
  }

  saveUserPeferences(Loc) {
    if (this.locationVal.length > commonNumbers.two) {
      return;
    }
    try {
      this.userPreferenceService.SaveUserPreferenceLocation(Loc).subscribe(data => {
        if (data) {
          this.getUserPreference(this.user_userName)
        }
      }, error => this.errorMessage = <any>error);
    }
    catch (error) {
      throw error;
    }
  }

}
