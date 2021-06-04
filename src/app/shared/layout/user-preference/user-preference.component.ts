import { Component, Input, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CommonConst, UserPreferenceConst } from 'src/app/configs/constants';
import { UserPreferenceService } from 'src/app/logx-services/common/user-preference.service';
import { IncidentPostalDetails, locationDetails } from '../../models/incident/report-incident.model';
import { UserPrefLocDialogComponent } from './user-pref-loc-dialog/user-pref-loc-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IncidentConst, commonNumbers, OrderDetailConst } from 'src/app/configs/constants';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DefaultLocations, Locations, UserPreferenceDetails } from '../../models/user-preference.model';
import { createCallChain, NumberLiteralType } from 'typescript';
import { OktaAuthService } from '@okta/okta-angular';
import { UserPreferenceDeletionComponent } from './user-preference-deletion/user-preference-deletion.component';
import { MatOptionSelectionChange } from '@angular/material/core';
import { Time } from '@angular/common';
import {getUserInfo, Userinfo } from '../../common/common-method';
import { RouteLinks } from 'src/app/configs/RoutePath';
import { SubmitOrderService } from 'src/app/logx-services/submitOrder/submit-order.service';
@Component({
  selector: 'app-user-preference',
  templateUrl: './user-preference.component.html',
  styleUrls: ['./user-preference.component.scss']
})

export class UserPreferenceComponent implements OnInit {
  CommonConst=CommonConst;
locationDetails: locationDetails = new locationDetails();
DefaultLocationDetails: locationDetails = new locationDetails();
PreferenceId : number;
LanguageChange: string;
errorMessage: any;
days:any;
PreferenceCategory :string;
day: any;
panelOpenState = false;
languages: any;
languagesVal:any;
pagination: any;
paginationVal:any;
favoritemenu:any;
favoritemenuVal:any;
favoritemenulist:any;
favoritemenulistVal:any;
userfavmenuvalue:any;
isMENUVALUE:boolean;
MENUVALUE:boolean;
MENUNAME:any;
menu:any;
menuVal:any;
notificationVal: string;
startTimeVal:Time;
EndTimeVal:Time;
timeZone: any;
timeZoneVal:any;
timeFormat: string;
timeFormatVal: string;
notification: string;
selectedDays:  any=[];
daysCheck:  any=[];
DateFormat: any;
dateFormatVal: any;
Locations: Locations = new Locations();
//Locations: locationDetails = new locationDetails();
orgLocationDetails: locationDetails = new locationDetails()
LocationArr: Locations []=  [];
LocationsShow: Locations = new Locations();
DefaultLocations: DefaultLocations = new DefaultLocations();
locationsModel :Locations;
dayName: any;
density: any;
densityVal:any;
dimension: any;
dimensionVal:any;
distance: any;
distanceVal:any;
volume: any;
VolumeVal:any
weight: any;
weightVal:any;
area: any;
areaval:any;
temperature: any;
temperatureVal:any;
checked: boolean = true
locationVal:locationDetails[]=[];
locationSave:Locations[]=[];
UserPreferenceConst=UserPreferenceConst;
IncidentConst=IncidentConst;
showAddaddress: boolean=true;
timeFormatArr: string[] = [UserPreferenceConst.twelveHours, UserPreferenceConst.twentyFourHours];
ZipCode:string; 
StateCode: string;
StateName: string;
City: string;
Address1: string;
updatedLocationDetails: locationDetails = new locationDetails();
UserPreferenceDetails : UserPreferenceDetails = new UserPreferenceDetails();
UserId: number;
resetForm: boolean; 
  UserLocId: any;
  LocId: any;
  locVal: string;
  fullAddress: any;
  fullDefaultAddress: any;
  statusMessage: string = UserPreferenceConst.deleteSuccess;
  locPostalDetails: any;
  incLocValue: any;
  locDialog : boolean =false;
  defLocDialog: boolean =true;
  option: any;
  selected: any;
  userName: any;
  email: any;
  isEqual: boolean;
  showAddress: boolean=false;
  Loc: any;
  user_userId: any;
  user_userName: any;
  showAddaddressDefault: boolean;
  showDefaultAddress: boolean;
  timeZoneValues: any;
  index: number;
  timeFormatValue: number;
constructor(public fb: FormBuilder,
  public submitOrderService:SubmitOrderService,
   public userPreferenceService: UserPreferenceService,
    public translate: TranslateService, private router: Router,public dialog: MatDialog,public oktaAuth: OktaAuthService,
    public snackBar: MatSnackBar,
    ) {
      translate.setDefaultLang('en');  
      const browserLang = translate.getBrowserLang();
      translate.use(browserLang.match(/en|es/) ? browserLang : 'en');
      // let selectedLang=localStorage.getItem('lan');
      // translate.setDefaultLang(selectedLang);
}
async ngOnInit():Promise<void> {
try{
  const userClaims = await this.oktaAuth.getUser();
  //this.email = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.email;
  let userInfo = Userinfo();
    this.user_userName = userInfo !== undefined ? userInfo.username : "";
    this.user_userId = userInfo !== undefined ? userInfo.userid : "";
      this.getLanguagePreference(UserPreferenceConst.parameters.languageSearch);
      this.getPagination(UserPreferenceConst.parameters.paginationSearch);
      //this.getFavoriteMenu(UserPreferenceConst.parameters.favoritemenuSearch);
      this.getFavoriteMenu();//
      this.getNotification(UserPreferenceConst.parameters.notification_groupSearch);
      this.getNotificationValue(UserPreferenceConst.parameters.notification_group_valueSearch);
      this.getTimeZone(UserPreferenceConst.parameters.timezoneSearch, '1');
      this.getDateFormat(UserPreferenceConst.parameters.dateformatSearch);
      this.getDensity(UserPreferenceConst.parameters.densitySearch);
      this.getArea(UserPreferenceConst.parameters.areaSearch)
      this.getDimension(UserPreferenceConst.parameters.dimensionSearch)
      this.getDistance(UserPreferenceConst.parameters.distanceSearch)
      this.getTemperature(UserPreferenceConst.parameters.temperatureSearch)
      this.getVolume(UserPreferenceConst.parameters.volumeSearch)
      this.getWeight(UserPreferenceConst.parameters.weightSearch)
      this.getUserPreference(this.user_userName);
    
    }
    catch (error) {
      throw error;
    }
}

getLanguagePreference(PreferenceType:string) {
  this.userPreferenceService.GetPreference(PreferenceType).subscribe(response => {
    if (response) {
      this.languages = response;
      for (var i = 0; i <= this.languages.length-1; i++) {
        if (this.languages[i].isDefault == true) {
          this.languagesVal = this.languages[i].displayLanguage;
          break;
        }
      }
    }
  }, error => this.errorMessage = <any>error);
}
getPagination(PreferenceType:string) {
  this.userPreferenceService.GetPreference(PreferenceType).subscribe(response => {
    if (response) {
      this.pagination = response;
      for (var i = 0; i <= this.pagination.length-1; i++) {
        if (this.pagination[i].isDefault == true) {

          break;
        }
      }
    }
  }, error => this.errorMessage = <any>error);
}
getFavoriteMenu(){
  let userName = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.email;
this.userPreferenceService.GetMenuLists(userName).subscribe(response => {
  if (response) {
    this.favoritemenulist = response;
    this.userfavmenuvalue = JSON.parse(this.favoritemenulist.menu);    
  }
}, error => this.errorMessage = <any>error);
}
getNotification(PreferenceType:string) {
  this.userPreferenceService.GetPreference(PreferenceType).subscribe(response => {
    if (response) {
      this.days = response;
      for (var i = 0; i <= this.days.length-1; i++) {
        if (this.days[i].isDefault == true) {
          this.notificationVal = this.days[i].preferenceDisplayText;
          break;
        }
      }
    }
  }, error => this.errorMessage = <any>error);
}
getNotificationValue(PreferenceType:string) {
  this.userPreferenceService.GetPreference(PreferenceType).subscribe(response => {
    if (response) {
      this.dayName = response;
      for (var i = 0; i <= this.dayName.length-1; i++) {
        if (this.dayName[i].isDefault == true) {
          this.LanguageChange = this.dayName[i].displayLanguage;
          break;
        }
      }
    }
  }, error => this.errorMessage = <any>error);
}
getTimeZone(lookupType: string, userId: string) {
  this.submitOrderService.GetSubmitOrderDropDownValues(lookupType, userId).subscribe(response => {
    if (response) {
      this.timeZoneValues = response;
    }
  }, error => this.errorMessage = <any>error);
  

}
getDateFormat(PreferenceType:string) {
  this.userPreferenceService.GetPreference(PreferenceType).subscribe(response => {
    if (response) {
      this.DateFormat = response;
      for (var i = 0; i <= this.DateFormat.length-1; i++) {
     
        if (this.DateFormat[i].isDefault == true) {
          this.dateFormatVal = this.DateFormat[i].preferenceDisplayText;
          break;
        }
      }
    }
  }, error => this.errorMessage = <any>error);
}
getDensity(PreferenceType:string) {
  this.userPreferenceService.GetPreference(PreferenceType).subscribe(response => {
    if (response) {
      this.density = response;
      for (var i = 0; i <= this.density.length-1; i++) {
        if (this.density[i].isDefault == true) {
          this.densityVal = this.density[i].preferenceDisplayText;
          break;
        }
      }
    }
  }, error => this.errorMessage = <any>error);
}
getArea(PreferenceType:string) {
  this.userPreferenceService.GetPreference(PreferenceType).subscribe(response => {
    if (response) {
      this.area = response;
      for (var i = 0; i <= this.area.length-1; i++) {
        if (this.area[i].isDefault == true) {
          this.areaval = this.area[i].preferenceDisplayText;
          break;
        }
      }
    }
  }, error => this.errorMessage = <any>error);
}
getDimension(PreferenceType:string) {
  this.userPreferenceService.GetPreference(PreferenceType ).subscribe(response => {
    if (response) {
      this.dimension = response;
      for (var i = 0; i <= this.dimension.length-1; i++) {
        if (this.dimension[i].isDefault == true) {
          this.dimensionVal = this.dimension[i].preferenceDisplayText;
          break;
        }
      }
    }
  }, error => this.errorMessage = <any>error);
}
getDistance(PreferenceType:string) {
  this.userPreferenceService.GetPreference(PreferenceType ).subscribe(response => {
    if (response) {
      this.distance = response;
      for (var i = 0; i <= this.distance.length-1; i++) {
        if (this.distance[i].isDefault == true) {
          this.distanceVal = this.distance[i].preferenceDisplayText;
          break;
        }
      }
    }
  }, error => this.errorMessage = <any>error);
}
getTemperature(PreferenceType:string) {
  this.userPreferenceService.GetPreference(PreferenceType ).subscribe(response => {
    if (response) {
      this.temperature = response;
      for (var i = 0; i <= this.temperature.length-1; i++) {
        if (this.temperature[i].isDefault == true) {
          this.temperatureVal = this.temperature[i].preferenceDisplayText;
          break;
        }
      }
    }
  }, error => this.errorMessage = <any>error);
}
getVolume(PreferenceType:string) {
  this.userPreferenceService.GetPreference(PreferenceType ).subscribe(response => {
    if (response) {
      this.volume = response;
      for (var i = 0; i <= this.volume.length-1; i++) {
        if (this.volume[i].isDefault == true) {
          this.VolumeVal = this.volume[i].preferenceDisplayText;
          break;
        }
      }
    }
  }, error => this.errorMessage = <any>error);
}
getWeight(PreferenceType:string) {
  this.userPreferenceService.GetPreference(PreferenceType ).subscribe(response => {
    if (response) {
      this.weight = response;
      for (var i = 0; i <= this.weight.length-1; i++) {
        if (this.weight[i].isDefault == true) {
          this.weightVal = this.weight[i].preferenceDisplayText;
          break;
        }
      }
    }
  }, error => this.errorMessage = <any>error);
}
getUserPreference(userName: string) {
  this.userPreferenceService.GetUserPreference(userName).subscribe(response => {
   if (response.userPreferences) {
  
     this.PreferenceId=response.userPreferences[0].preferenceid;
     this.UserId=response.userPreferences[0].userId;
     this.languagesVal=response.userPreferences[0].language;
     this.paginationVal=response.userPreferences[0].pagination;
     this.favoritemenulistVal=response.userPreferences[0].favoritemenu;//
     this.notificationVal=response.userPreferences[0].notification;
     this.startTimeVal =response.userPreferences[0].notificatioN_STARTTIME;
     this.EndTimeVal =response.userPreferences[0].notificatioN_ENDTIME;
     this.timeZoneVal=response.userPreferences[0].timezone;
     this.dateFormatVal=response.userPreferences[0].dateformat;
   
     this.timeFormatVal=response.userPreferences[0].timeformat;
     if(this.timeFormatVal!=""){
     this.getClockValue(this.timeFormatVal)
     }
     this.densityVal=response.userPreferences[0].density;
     this.dimensionVal=response.userPreferences[0].dimension;
     this.distanceVal=response.userPreferences[0].distance;
     this.VolumeVal=response.userPreferences[0].volume;
     this.weightVal=response.userPreferences[0].weight;
     this.areaval=response.userPreferences[0].area;
     this.temperatureVal=response.userPreferences[0].temperature;
     if(!this.dayName){
       this.getNotificationValue(UserPreferenceConst.parameters.notification_group_valueSearch);
    }
       this.daysCheck=[];
       this.selectedDays=[];
       this.notificationVal=response.userPreferences[0].notification;
         this.daysCheck = this.notificationVal.split(',');	
         if(this.daysCheck){	
        
           if(this.dayName){
           for(let i=0;i<this.daysCheck.length; i++){
             for(let j=0;j<this.dayName.length;j++){	
               if(this.dayName[j].preferenceDisplayText === this.daysCheck[i]) {	
                 this.dayName[j].checked = true;	
                 this.selectedDays.push(this.dayName[j])
               }
             }
           }
         }
           this.getNotificationFieldValue(this.selectedDays, this.days)
           }
     
   }
     if(response.userPreferenceLocation){
       if(response.userPreferenceLocation.length)
       this.locationSave=[];
   
       for (let i = 0; i < response.userPreferenceLocation.length; i++) {
  
       this.Locations = new Locations ();
      if(response.userPreferenceLocation[i].userlocid!=null){
  
     this.Locations.UserId=response.userPreferenceLocation[i].userid;
      this.Locations.LocId = response.userPreferenceLocation[i].locid;
      this.Locations.UserLocId = response.userPreferenceLocation[i].userlocid;
      this.Locations.LocationName = response.userPreferenceLocation[i].locationname;
      
      this.Locations.Address1 =   response.userPreferenceLocation[i].addresS1;
      this.Locations.Address2 = response.userPreferenceLocation[i].addresS2;
     
      this.Locations.City = response.userPreferenceLocation[i].city;
      this.Locations.StateName = response.userPreferenceLocation[i].statename;
      this.Locations.StateCode = response.userPreferenceLocation[i].statecode;
      this.Locations.CountryName= response.userPreferenceLocation[i].countryname;
      this.Locations.CountryCode=response.userPreferenceLocation[i].countrycode;
      this.Locations.ZipCode =response.userPreferenceLocation[i].zipcode;
      this.Locations.IsDefault= response.userPreferenceLocation[i].isdefault;
      this.locationSave.push(this.Locations);
     
      }
     }
    
     }

      
      if(this.locationSave){
      this.showAddress=true;
    
      }
     
   

 
   
 }, error => this.errorMessage = <any>error);
}
getClockValue(timeFormatVal){
  if(timeFormatVal=== UserPreferenceConst.twelveHours){
    this.timeFormatValue= commonNumbers.twelve;
   
  }else{
    this.timeFormatValue= commonNumbers.twentyFour;
  }
}

onSubmit() {
  try {     

  this.UserPreferenceDetails.PreferenceId =  this.PreferenceId != null ? this.PreferenceId : commonNumbers.zero;
  this.UserPreferenceDetails.UserId = this.user_userId !== undefined? this.user_userId : commonNumbers.zero;
  this.UserPreferenceDetails.Language = this.languagesVal !== undefined ? this.languagesVal : '';
  this.UserPreferenceDetails.Pagination = this.paginationVal !== undefined ? this.paginationVal : '';
  this.UserPreferenceDetails.FavoriteMenu = this.favoritemenulistVal !== undefined ? this.favoritemenulistVal : '';
  this.UserPreferenceDetails.Notification = this.daysCheck !== undefined ? this.daysCheck.toString() : '';
  this.UserPreferenceDetails.Notification_StartTime= this.startTimeVal !== undefined ? this.startTimeVal : '0:00';
  this.UserPreferenceDetails.Notification_EndTime = this.EndTimeVal !== undefined ? this.EndTimeVal : '0:00';
  this.UserPreferenceDetails.TimeZone = this.timeZoneVal !== undefined ? this.timeZoneVal : '';
  this.UserPreferenceDetails.DateFormat =this.dateFormatVal !== undefined ? this.dateFormatVal : '';
  this.UserPreferenceDetails.TimeFormat = this.timeFormatVal ;
  this.UserPreferenceDetails.Density = this.densityVal !== undefined ? this.densityVal : '';
  this.UserPreferenceDetails.Dimension = this.dimensionVal !== undefined ? this.dimensionVal : '';
  this.UserPreferenceDetails.Distance= this.distanceVal !== undefined ? this.distanceVal : '';
  this.UserPreferenceDetails.Volume = this.VolumeVal !== undefined ? this.VolumeVal : '';
  this.UserPreferenceDetails.Weight = this.weightVal !== undefined ? this.weightVal : '';
  this.UserPreferenceDetails.Area = this.areaval !== undefined ? this.areaval : '';
  this.UserPreferenceDetails.Temperature = this.temperatureVal !== undefined ? this.temperatureVal : '';	
  this.UserPreferenceDetails.Locations =  JSON.parse(JSON.stringify(this.locationSave));
  this.userPreferenceService.SavePreference(this.UserPreferenceDetails).subscribe(data => {
    if (data) {
      this.statusMessage = UserPreferenceConst.preferenceSuccess;
      this.snackBar.open(UserPreferenceConst.preferenceSuccess, '', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      })
      setTimeout(()=>{
          window.location.reload();
        }, 5000);
       window.scrollTo(0, 0);
      this.router.navigate([RouteLinks.dashboard]);
   
    }
    else {
      this.snackBar.open( UserPreferenceConst.preferenceFailure, '', {
        duration: 5000
      })
  }
}, error => {
  this.errorMessage = <any>error;
  this.snackBar.open(UserPreferenceConst.preferenceFailure, '', {
    duration: 5000
  })
});
}
    catch(err){
      throw err;
    }
}

public async onSelect(event: MatOptionSelectionChange, id: number, text:string): Promise<void> {
    this.daysCheck= [];
    this.selectedDays=[];
    if(text.toLowerCase()==UserPreferenceConst.AllDays){
      this.daysCheck= [];
      this.selectedDays=[];
      if(this.dayName!=null){
      this.dayName.forEach(Option => {
        Option.checked= true;
        this.changeSelectedDays(Option, Option.checked)
      });
    }
    }else {
      if(this.dayName!=null){
     this.dayName.forEach(Option => {
      if(Option.parentId == id){
      Option.checked= true;
      this.changeSelectedDays(Option, Option.checked)
    }else{
      Option.checked= false;
    }
  });
}
  }
  }
changeSelectedDays(item, checked) {
  if (checked==true) {
   this.daysCheck.push(item.preferenceDisplayText);   
   this.selectedDays.push(item);
   this.getNotificationFieldValue(this.selectedDays, this.days)
  }else if(checked.checked){
    this.daysCheck.push(item.preferenceDisplayText);
    this.selectedDays.push(item);
    this.getNotificationFieldValue(this.selectedDays, this.days)  
  }else{
    for (var i=0; i<this.daysCheck.length; i++) {
      if (this.daysCheck[i] == item.preferenceDisplayText) {
        this.daysCheck.splice(i, 1);
        this.selectedDays.splice(i, 1);
      }
  }
  this.getNotificationFieldValue(this.selectedDays, this.days)  
}
}


onDeleteAddress(data):void{
  data;
  //let index = this.locationSave.findIndex(x => x.LocId ===  data.LocId);
  if( data.UserLocId!=0){
    this.index = this.locationSave.findIndex(x => x.UserLocId ===  data.UserLocId);
  }else{

    this.index = this.locationSave.findIndex(x => x.LocId ===  data.LocId);

  }


  const DeleteDialog = this.dialog.open(UserPreferenceDeletionComponent, {
    data: {
      message: this.locationSave[this.index].Address2 + ' ' +
      this.locationSave[this.index].LocationName+ ' ' + this.locationSave[this.index].Address1+ ' ' +
      this.locationSave[this.index].StateName+ ', ' +this.locationSave[this.index].City+ ' '+
      this.locationSave[this.index].ZipCode,
      buttonText: {
        ok: CommonConst.YES,
        cancel: CommonConst.NO
      } 
    },
  })
  DeleteDialog.afterClosed().subscribe(confirmed => {
    if(confirmed){
      if(data.UserLocId==0){

           if (this.index !== -1) {
        this.locationSave.splice(this.index, 1);
      
    }  
      }else if(data.UserLocId!=0){
    
        this.userPreferenceService.DeleteLocationPreference(data.UserLocId).subscribe(async data => {
        if (data) {
         // this.getUserPreference(this.user_userName)
         this.locationSave.splice(this.index, 1);
          this.statusMessage = UserPreferenceConst.deleteSuccess;
          this.snackBar.open(UserPreferenceConst.deleteSuccess, '', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          })
        }
        else {
          this.snackBar.open( UserPreferenceConst.deleteFailure, '', {
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


openDialog(): void {
  const dialogRef = this.dialog.open(UserPrefLocDialogComponent, {
    data: { Locations: new Locations,  locDialog: this.locDialog },
  
  });
  dialogRef.afterClosed().subscribe(result => {
    if(result!=null){
   
      this.Locations=new Locations();
      this.Locations.UserId= this.user_userId !== undefined? this.user_userId : commonNumbers.zero;
      this.Locations.LocId= result.DefaultLocations.LocId !== undefined ? result.DefaultLocations.LocId : commonNumbers.zero;
      this.Locations.UserLocId= result.DefaultLocations.UserLocId !== undefined ? result.DefaultLocations.UserLocId : commonNumbers.zero;
      this.Locations.LocationName=result.DefaultLocations.LocationName!== undefined ? result.DefaultLocations.LocationName : '';	
      this.Locations.Address2=result.DefaultLocations.Address2!== undefined ? result.DefaultLocations.Address2 : '';	
      this.Locations.ZipCode=result.DefaultLocations.ZipCode!== undefined ? result.DefaultLocations.ZipCode : '';	
      this.Locations.City=result.DefaultLocations.City!== undefined ? result.DefaultLocations.City : '';	
      this.Locations.StateCode=result.DefaultLocations.StateCode!== undefined ? result.DefaultLocations.StateCode : '';	
      this.Locations.StateName=result.DefaultLocations.StateName!== undefined ? result.DefaultLocations.StateName : '';	
      this.Locations.Address1=result.DefaultLocations.Address1!== undefined ? JSON.parse(JSON.stringify(result.DefaultLocations.Address1)) : '';	
      this.Locations.CountryCode=result.DefaultLocations.CountryCode!== undefined ? result.DefaultLocations.CountryCode : '';	
      this.Locations.CountryName=result.DefaultLocations.CountryName!== undefined ? result.DefaultLocations.CountryName : '';	
      this.Locations.IsDefault=false;	
    
      this.fullAddress  = this.Locations.Address2 + ' ' +
      this.Locations.LocationName+ ' ' + this.Locations.Address1+ ' ' +
      this.Locations.StateName+ ', ' +this.Locations.City+ ' '+
      this.Locations.ZipCode

      this.Loc=JSON.parse(JSON.stringify([this.Locations]));
    
      this.locationSave.push(this.Locations)
      this.showAddress=true;
    
    }

    // this.fullAddress = string.Join(",", this.location1Val.Where(s => !string.IsNullOrEmpty(s)));
  });
}


editAddress(LocationData): void {
  if( LocationData.UserLocId!=0){
    this.index = this.locationSave.findIndex(x => x.UserLocId ===  LocationData.UserLocId);
  }else{

    this.index = this.locationSave.findIndex(x => x.LocId ===  LocationData.LocId);

  }

 

  this.locationSave[this.index].UserId= this.user_userId !== undefined? this.user_userId : commonNumbers.zero;
  this.locationSave[this.index].UserLocId= LocationData.UserLocId !== undefined ? LocationData.UserLocId: commonNumbers.zero;
  this.locationSave[this.index].LocId= LocationData.LocId !== undefined ? LocationData.LocId: commonNumbers.zero;
  this.locationSave[this.index].LocationName=LocationData.LocationName!== undefined ? LocationData.LocationName : '';	
  this.locationSave[this.index].Address2=LocationData.Address2!== undefined ? LocationData.Address2 : '';	
  this.locationSave[this.index].Address1= LocationData.Address1!== undefined ? LocationData.Address1 : '';	
  this.locationSave[this.index].City=LocationData.City!== undefined ? LocationData.City: '';	
  this.locationSave[this.index].StateName=LocationData.StateName!== undefined ? LocationData.StateName : '';	
  this.locationSave[this.index].StateCode=LocationData.StateCode!== undefined ? LocationData.StateCode : '';	
  this.locationSave[this.index].CountryName=LocationData.CountryName!== undefined ? LocationData.CountryName : '';	
  this.locationSave[this.index].CountryCode=LocationData.CountryCode!== undefined ? LocationData.CountryCode : '';	
  this.locationSave[this.index].ZipCode=LocationData.ZipCode!== undefined ? LocationData.ZipCode : '';	
  this.locationSave[this.index].IsDefault=false;

  //this.locationEdit.push(this.locationSave[this.index]);
  const dialoc = this.dialog.open(UserPrefLocDialogComponent, {
    data: { Locations: this.locationSave[this.index]}  //locDialog: this.locDialog },
  });
  dialoc.afterClosed().subscribe(result => {
    if(result!=null){
      // for (let i = 0; i < this.locationSave.length; i++) {
      //   if(this.Locations.LocId== this.locationSave[i].LocId){
      //     this.locationSave[i]= this.Locations;
      //   }
      // }
     // this.locationSave[index]= this.Locations;
      this.locationSave[this.index].UserId= this.user_userId !== undefined? this.user_userId : commonNumbers.zero;
      this.locationSave[this.index].UserLocId= this.locationSave[this.index].UserLocId !== undefined ? this.locationSave[this.index].UserLocId: commonNumbers.zero;
      this.locationSave[this.index].LocationName=result.DefaultLocations.LocationName!== undefined ? result.DefaultLocations.LocationName : '';	
      
      this.locationSave[this.index].Address2=result.DefaultLocations.Address2!== undefined ?result.DefaultLocations.Address2 : '';	
      this.locationSave[this.index].Address1= result.DefaultLocations.Address1!== undefined ? result.DefaultLocations.Address1 : '';	
      
      this.locationSave[this.index].LocId=result.DefaultLocations.LocId!==undefined ?result.DefaultLocations.LocId:'';
      this.locationSave[this.index].City=result.DefaultLocations.City!== undefined ?result.DefaultLocations.City : '';	
      this.locationSave[this.index].StateName=result.DefaultLocations.StateName!== undefined ? result.DefaultLocations.StateName : '';	
      this.locationSave[this.index].StateCode=result.DefaultLocations.StateCode!== undefined ? result.DefaultLocations.StateCode : '';	
      this.locationSave[this.index].CountryName=result.DefaultLocations.CountryName!== undefined ? result.DefaultLocations.CountryName : '';	
      this.locationSave[this.index].CountryCode=result.DefaultLocations.CountryCode!== undefined ? result.DefaultLocations.CountryCode : '';	
      this.locationSave[this.index].ZipCode=result.DefaultLocations.ZipCode!== undefined ?result.DefaultLocations.ZipCode : '';	
      this.locationSave[this.index].IsDefault=false;
    //  this.Loc=JSON.parse(JSON.stringify([this.Locations]));

}
  


  });

}

getNotificationFieldValue(selectedDays: any, days: any){
  if(selectedDays){
  if(selectedDays.length==commonNumbers.seven){ 
   for (var i = 0; i <= days.length; i++) {
     if (days[i].isDefault ==true) {
       this.notificationVal = days[i].preferenceDisplayText;
       break;
     }
   }
  }
  else if(selectedDays.length==commonNumbers.five){
   for (let index = 0; index < selectedDays.length - 1; index++) {
     if (selectedDays[index].parentId != selectedDays[index+1].parentId){
     return;    
   }
 }
       for (var i = 0; i <=days.length; i++) {
         if (days[i].preferenceId == selectedDays[0].parentId) {
           this.notificationVal = days[i].preferenceDisplayText;
           break;
         }
       }
  
  }
  else if(selectedDays.length==commonNumbers.two){
   for (let index = 0; index < selectedDays.length - 1; index++) {
     if (selectedDays[index].parentId != selectedDays[index+1].parentId){
      return;          
      }
    }
   for (var i = 0; i <=days.length; i++) {
     if (days[i].preferenceId == selectedDays[0].parentId) {
         this.notificationVal = days[i].preferenceDisplayText;
           break;
         }
       }
  
  }else{
    this.notificationVal="Choose Option"
  }
}
}

onCancel(){
  this.router.navigate([RouteLinks.dashboard]);
}
onChangeHour(event) {
  console.log('event', event);
}

}




