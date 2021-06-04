import { DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { CommonConst, commonNumbers, SubmitorderdetailsConst, UserPreferenceConst } from 'src/app/configs/constants';
import { RouteLinks } from 'src/app/configs/RoutePath';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { UserPreferenceService } from 'src/app/logx-services/common/user-preference.service';
import { SubmitOrderService } from 'src/app/logx-services/submitOrder/submit-order.service';
import { Userinfo } from 'src/app/shared/common/common-method';
import { ConfirmationDialog } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { UserPrefLocDialogComponent } from 'src/app/shared/layout/user-preference/user-pref-loc-dialog/user-pref-loc-dialog.component';
import { UserPreferenceDeletionComponent } from 'src/app/shared/layout/user-preference/user-preference-deletion/user-preference-deletion.component';
import { locationDetails, LocationInfo } from 'src/app/shared/models/incident/report-incident.model';
import { ContactInfo, SaveOrderDestination } from 'src/app/shared/models/submitOrder/submitOrder.model';
import { Locations, UserPreferenceDetails } from 'src/app/shared/models/user-preference.model';
import { OrigindestinationlocationComponent } from '../origindestinationlocation.component';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { IncidentReportService } from 'src/app/logx-services/incidentReport/incident-report.service';

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
  selector: 'app-orderdestion',
  templateUrl: './orderdestion.component.html',
  styleUrls: ['./orderdestion.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})


export class OrderdestionComponent implements OnInit {
  @Input() orderNumber: string;
  @Input() orderId: any;
  @Input() formName: string;
  @Input() shipWith: string;
  CommonConst = CommonConst;
  SubmitorderdetailsConst = SubmitorderdetailsConst;
  UserPreferenceConst = UserPreferenceConst;
  disabled = false;
  contactInfo: ContactInfo = new ContactInfo();
  saveDestinationInfo: SaveOrderDestination = <SaveOrderDestination>{};
  locationId: any;
  locationDetails: locationDetails = new locationDetails()
  favLocations: locationDetails = new locationDetails();
  Locations: Locations = new Locations();
  UserPreferenceDetails: UserPreferenceDetails = new UserPreferenceDetails();
  earlyPickUpDate: any;
  latePickUpDate: any;
  dateValidate = new FormControl(new Date());
  errorMessage: any;
  earlyPickUpTime: any;
  latePickUpTime: any;
  updatedDestinationLocationDetails: locationDetails = new locationDetails();
  updatedOrderId: number;
  DeliveryTimeZone: string;
  timeZoneValues: any
  statusMessage: string;
  showAddress: boolean = false;
  clickSubjectDest: Subject<any> = new Subject();
  passDestLoc: locationDetails = new locationDetails();
  locationVal: locationDetails[] = [];
  passLoc: Locations[] = [];
  Loc: any;
  originId: any;
  user_userId: any;
  user_userName: any;
  locationIdOrig: any;
  IsDisable: boolean = false;
  showUseAddress: boolean = false;
  checked: boolean = false;
  timeZoneVal: any;
  dateFormatVal: any;
  placeholder: any;
  timeFormatVal: any;
  Locationinfomodel: LocationInfo = <LocationInfo>{};
  timeFormatValue: number;
  locRes: any;
  minDate = new Date();
  maxEarlypickupDate: any;
  maxLatepickupDate: Date;
  constructor(public dialog: MatDialog, public submitOrderService: SubmitOrderService,
    public router: Router,
    public userPreferenceService: UserPreferenceService,
    private dataTransfer: DataTransferService,
    private incidentReportService: IncidentReportService,
    private cdr: ChangeDetectorRef,
    public datePipe: DatePipe,
    public snackBar: MatSnackBar) { }

  unCheckMeCheckbox = [{ checked: true }];
  ngOnChanges() {
    this.getUserPreference(this.user_userName)
    if (this.orderId != null) {
      this.GetOriginLocationDetails();
    }



  }
  GetOriginLocationDetails() {
    this.submitOrderService.GetOriginLocationDetails(this.orderId).subscribe(response => {
      if (response) {
        this.locationIdOrig = response[0].locationIdOrig;
      }
    })
  }

  ngOnInit(): void {
    let userInfo = Userinfo();
    this.user_userName = userInfo !== undefined ? userInfo.username : "";
    this.user_userId = userInfo !== undefined ? userInfo.userid : "";
    this.getdropdownvalues(SubmitorderdetailsConst.Timezone, '1');
    if (this.orderId !== null) {
      this.getDestinationLocationDetails()
    }


  }


  ngAfterViewChecked(): void {

    try {

      for (let i = 0; i < this.locationVal.length; i++) {
        if (this.locationIdOrig == this.locationVal[i].LocationId) {
          this.locationVal[i].showUseAddress = true;
          this.cdr.detectChanges();
        }
      }
    } catch (error) {
      throw error;
    }
  }


  getdropdownvalues(lookupType: string, userId: string) {
    this.submitOrderService.GetSubmitOrderDropDownValues(lookupType, userId).subscribe(response => {
      if (response) {
        this.timeZoneValues = response;
      }
    }, error => this.errorMessage = <any>error);
  }
  getDestinationLocationDetails() {
    this.submitOrderService.GetDestinationLocationDetails(this.orderId).subscribe(response => {

      if (response) {
        this.updatedOrderId = response[0].orderId;
        this.locationId = response[0].locationIdDest;
        this.updatedDestinationLocationDetails.ReportingPostalDetails.PostalCode = response[0].destLocZip;
        this.updatedDestinationLocationDetails.ReportingPostalDetails.CityName = response[0].destLocCity;
        this.updatedDestinationLocationDetails.ReportingPostalDetails.StateName = response[0].destLocStateName;
        this.updatedDestinationLocationDetails.ReportingPostalDetails.StateCode = response[0].destLocStateCode;
        this.updatedDestinationLocationDetails.ReportingLocation = response[0].destAddress;
        this.updatedDestinationLocationDetails.ReportingPostalDetails.LocationNumer = response[0].locationNumDest;
        this.contactInfo.contactName = response[0].destContactName;
        this.contactInfo.phone = response[0].destContactPhone;
        this.contactInfo.email = response[0].destContactEmail;
        this.earlyPickUpDate = response[0].earlyDeliveryUtc;
        this.earlyPickUpTime = response[0].earlyDeliveryTime;
        this.latePickUpTime = response[0].lateDeliveryTime;

        this.latePickUpDate = response[0].lateDeliveryUtc;
        this.disabled = response[0].deliveryAppointment === "False" ? false : true
        this.locationDetails.ReportingLocation = response[0].destAddress;
        this.locationDetails.ReportingPostalDetails.CityName = response[0].destLocCity;
        this.locationDetails.ReportingPostalDetails.CityCode = response[0].destLocStateCode;
        this.locationDetails.ReportingPostalDetails.StateName = response[0].destLocStateName;
        this.locationDetails.ReportingPostalDetails.PostalCode = response[0].destLocZip;
        this.locationDetails.LocationNumber = response[0].locationNumDest;
        this.contactInfo.contactId = response[0].contactIdDest;



        this.contactInfo.contactNum = response[0].contactNumDest;
        this.DeliveryTimeZone = response[0].deliveryTimeZone;
        this.updatedDestinationLocationDetails = JSON.parse(JSON.stringify(this.updatedDestinationLocationDetails));
        this.changedate(this.latePickUpDate)
        this.changedateEarlyPickup(this.earlyPickUpDate)
      }
    })
  }

  getLocationContactDetails(value) {
    this.locationDetails = value;
    this.locationId = value.LocationId;
    this.submitOrderService.GetLocationContactDetails(this.locationId).subscribe(response => {
      if (response.length > 0) {
        this.contactInfo = response[0];
      }
    })
  }

  submit(saveType) {
       if (saveType === 'saveForLater') {
      event.preventDefault()
    }
    this.saveDestinationInfo.OrderId = this.orderId != null ? this.orderId : commonNumbers.zero;
    this.saveDestinationInfo.OrderNumber = this.orderNumber;
    this.saveDestinationInfo.DestLocationId = Number(this.locationId === undefined ? 0 : this.locationId);
    this.saveDestinationInfo.DestLocation = this.locationDetails.ReportingLocation !== undefined ? this.locationDetails.ReportingLocation : '';
    this.saveDestinationInfo.DestLocCity = this.locationDetails.ReportingPostalDetails.CityName !== undefined ? this.locationDetails.ReportingPostalDetails.CityName : '';
    this.saveDestinationInfo.DestStateCode = this.locationDetails.ReportingPostalDetails.StateCode !== undefined ? this.locationDetails.ReportingPostalDetails.StateCode : '';
    this.saveDestinationInfo.DestStateName = this.locationDetails.ReportingPostalDetails.StateName !== undefined ? this.locationDetails.ReportingPostalDetails.StateName : '';
    this.saveDestinationInfo.DestZipCode = this.locationDetails.ReportingPostalDetails.PostalCode !== undefined ? this.locationDetails.ReportingPostalDetails.PostalCode : '';
    this.saveDestinationInfo.LocationNumDest = this.locationDetails.LocationNumber !== undefined ? this.locationDetails.LocationNumber : '';
    this.saveDestinationInfo.DestContactIdOrig = Number(this.contactInfo.contactId === undefined ? 0 : this.contactInfo.contactId);
    this.saveDestinationInfo.ContactNumDest = this.contactInfo.contactNum !== undefined ? this.contactInfo.contactNum : '';
    this.saveDestinationInfo.DestLocContactName = this.contactInfo.contactName !== undefined ? this.contactInfo.contactName : '';

    this.saveDestinationInfo.DestLocContactPhone = this.contactInfo.phone !== undefined ? this.contactInfo.phone : '';


    this.saveDestinationInfo.DestLocContactEmail = this.contactInfo.email !== undefined ? this.contactInfo.email : '';
    this.saveDestinationInfo.EarlyDelivery = this.earlyPickUpDate !== undefined ? this.datePipe.transform(this.earlyPickUpDate, 'yyyy-MM-dd') : null;
    this.saveDestinationInfo.LateDelivery = this.latePickUpDate !== undefined ? this.datePipe.transform(this.latePickUpDate, 'yyyy-MM-dd') : null;
    this.saveDestinationInfo.EarlyDeliveryTime = this.earlyPickUpTime !== undefined ? this.earlyPickUpTime : '';
    this.saveDestinationInfo.LateDeliveryTime = this.latePickUpTime !== undefined ? this.latePickUpTime : '';
    this.saveDestinationInfo.DeliveryTimeZone = this.DeliveryTimeZone;
    this.saveDestinationInfo.Appointment = Boolean(this.disabled);
    // if( this.saveDestinationInfo.Appointment==true){
    //   this.saveDestinationInfo.LateDeliveryTime =  null;
    //   this.saveDestinationInfo.LateDelivery = '';  
    // }
    this.saveDestinationInfo.DestLocFlag = saveType;
    this.saveDestinationInfo.UserId = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.name;
    this.saveDestinationInfo.userName = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.name;
    this.submitOrderService.SaveDestinationDetails(this.saveDestinationInfo).subscribe(res => {
      if (res > 0) {
        this.snackBar.open(`Your Order number (${this.orderNumber}) has been saved but not submitted.`, '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }).afterDismissed().subscribe(() => {
          if (saveType === 'saveForLater') {
            this.router.navigate([RouteLinks.submitordergrid]);
          }
          else {
            this.getDestinationLocationDetails()
            this.dataTransfer.loadData('fromDestination');
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
            this.snackBar.open(this.shipWith !== "" ? SubmitorderdetailsConst.cancelOrderShipWith : SubmitorderdetailsConst.cancelOrderSingle, '', {
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

  notifyClick(event, data) {
    event.preventDefault();
    this.passDestLoc = JSON.parse(JSON.stringify(data));;
    this.clickSubjectDest.next(data);
  }

  getUserPreference(userName: string) {
    this.userPreferenceService.GetUserPreference(userName).subscribe(response => {
      this.locationVal = [];

      if (response.userPreferences) {
        if (response.userPreferences.length) {
          this.timeZoneVal = response.userPreferences[0].timezone;
          this.dateFormatVal = response.userPreferences[0].dateformat;
          this.timeFormatVal = response.userPreferences[0].timeformat;
          if (this.DeliveryTimeZone == undefined) {
            this.DeliveryTimeZone = this.timeZoneVal;
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
            this.favLocations.showUseAddress = false;
            this.locationVal.push(this.favLocations);
          }
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


  addTofavotires(event) {
    if (event.checked == true) {

      if (this.locationVal.length >= 2) {
        return;
      }
      if (this.locationDetails.LocationId) {
        this.Locations.UserId = this.user_userId !== undefined ? this.user_userId : commonNumbers.zero;
        this.Locations.LocId = this.locationDetails.LocationId;
        this.Locations.UserLocId = commonNumbers.zero;
        this.Locations.LocationName = this.locationDetails.LocationName !== undefined ? this.locationDetails.LocationName : '';
        this.Locations.Address1 = this.locationDetails.Address1 !== undefined ? this.locationDetails.Address1 : '';
        this.Locations.Address2 = this.locationDetails.LocationNumber !== undefined ? this.locationDetails.LocationNumber : '';
        this.Locations.City = this.locationDetails.ReportingPostalDetails.CityName !== undefined ? this.locationDetails.ReportingPostalDetails.CityName : '';;
        this.Locations.StateCode = this.locationDetails.ReportingPostalDetails.StateCode !== undefined ? this.locationDetails.ReportingPostalDetails.StateCode : '';;
        this.Locations.StateName = this.locationDetails.ReportingPostalDetails.StateName !== undefined ? this.locationDetails.ReportingPostalDetails.StateName : '';
        this.Locations.CountryCode = this.locationDetails.ReportingPostalDetails.CountryCode !== undefined ? this.locationDetails.ReportingPostalDetails.CountryCode : '';
        this.Locations.CountryName = this.locationDetails.ReportingPostalDetails.CountryName !== undefined ? this.locationDetails.ReportingPostalDetails.CountryName : '';
        this.Locations.ZipCode = this.locationDetails.ReportingPostalDetails.PostalCode !== undefined ? this.locationDetails.ReportingPostalDetails.PostalCode : '';
        this.Locations.IsDefault = false;
        this.Loc = JSON.parse(JSON.stringify([this.Locations]));
        this.saveUserPeferences(this.Loc);
      } else if (this.locationId != 0) {
        this.Locationinfomodel.postalCode = this.updatedDestinationLocationDetails.ReportingPostalDetails.PostalCode
        this.Locationinfomodel.stateCode = this.updatedDestinationLocationDetails.ReportingPostalDetails.StateCode;
        this.Locationinfomodel.cityName = this.updatedDestinationLocationDetails.ReportingPostalDetails.CityName
        this.Locationinfomodel.searchCriteria = "";
        try {
          this.incidentReportService.GetIncidentLocationDetails(this.Locationinfomodel).subscribe(response => {
            this.locRes = response;
            if (this.locRes != undefined) {
              for (let index = 0; index < this.locRes.length; index++) {
                if (this.locationId == this.locRes[index].locationId) {
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

  editAddress(event, data): void {
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
      data: { Locations: this.Locations }  //locDialog: this.locDialog },
    });
    dialoc.afterClosed().subscribe(result => {
      if(result!=null){
        this.Locations.UserId= this.user_userId !== undefined? this.user_userId : commonNumbers.zero;
        this.Locations.UserLocId=result.Locations.UserLocId !== undefined ? result.Locations.UserLocId: commonNumbers.zero;
        this.Locations.LocationName=result.DefaultLocations.LocationName!== undefined ? result.DefaultLocations.LocationName : '';	
        
        this.Locations.Address2=result.DefaultLocations.Address2!== undefined ?result.DefaultLocations.Address2 : '';	
        this.Locations.Address1= result.DefaultLocations.Address1!== undefined ? result.DefaultLocations.Address1 : '';	
        
        this.Locations.LocId=result.DefaultLocations.LocId!==undefined ?result.DefaultLocations.LocId:'';
        this.Locations.City=result.DefaultLocations.City!== undefined ?result.DefaultLocations.City : '';	
        this.Locations.StateName=result.DefaultLocations.StateName!== undefined ? result.DefaultLocations.StateName : '';	
        this.Locations.StateCode=result.DefaultLocations.StateCode!== undefined ? result.DefaultLocations.StateCode : '';	
        this.Locations.CountryName=result.DefaultLocations.CountryName!== undefined ? result.DefaultLocations.CountryName : '';	
        this.Locations.CountryCode=result.DefaultLocations.CountryCode!== undefined ? result.DefaultLocations.CountryCode : '';	
        this.Locations.ZipCode=result.DefaultLocations.ZipCode!== undefined ?result.DefaultLocations.ZipCode : '';	
        this.Locations.IsDefault=false;
        this.Loc=JSON.parse(JSON.stringify([this.Locations]));
        this.userPreferenceService.SaveUserPreferenceLocation(this.Loc).subscribe(data => {
          if (data) {
            this.getUserPreference(this.user_userName)

            try {

            }
            catch (error) {
              throw error;
            }
          }
        });

      }
    });
  }
  onDeleteAddress(event, data): void {
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
    
    try {
      if (this.locationVal.length > commonNumbers.two) {
        return;
      }
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


