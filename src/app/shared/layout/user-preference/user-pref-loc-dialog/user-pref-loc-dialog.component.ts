import { Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { IncidentConst, CommonConst, UserPreferenceConst } from 'src/app/configs/constants';
import { IncidentPostalDetails, locationDetails } from 'src/app/shared/models/incident/report-incident.model';
import { DefaultLocations, Locations } from 'src/app/shared/models/user-preference.model';

@Component({
  selector: 'app-user-pref-loc-dialog',
  templateUrl: './user-pref-loc-dialog.component.html',
  styleUrls: ['./user-pref-loc-dialog.component.scss']
})
export class UserPrefLocDialogComponent implements OnInit {
  clickSubject: Subject<any> = new Subject();
  UserPreferenceForm= UserPreferenceConst.UserPreferenceForm;
  CommonConst = CommonConst;
  UserPreferenceConst = UserPreferenceConst;
  locationDetails: locationDetails = new locationDetails();
  IsDefault: boolean;
  IncidentConst = IncidentConst;
  DefaultLocationDetails: any;
  location: any;
  isShowLocation: boolean = false;
  constructor(public dialogRef: MatDialogRef<UserPrefLocDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { Locations: Locations, DefaultLocations:DefaultLocations}
  ) {
  }

  ngOnInit() {
    {
    if (this.data.Locations.UserLocId==undefined) {
      this.data.Locations=new Locations();
    }else{
    this.locationDetails.ReportingLocation =this.data.Locations.Address2 + ' ' +
    this.data.Locations.LocationName+ ' ' +  this.data.Locations.Address1 + ' ' +
    this.data.Locations.StateName+ ', '+ this.data.Locations.City+ ' '+
    this.data.Locations.ZipCode
    this.locationDetails.LocationId = this.data.Locations.LocId;
    this.locationDetails.LocationNumber = this.data.Locations.UserLocId.toString();
    this.locationDetails.IncidentLocation = this.data.Locations.LocationName;
    
    this.locationDetails.IncidentPostalDetails.LocationNumer =   this.data.Locations.Address2;
    this.locationDetails.ReportingPostalDetails.LocationNumer = this.data.Locations.Address1;
   
    this.locationDetails.IncidentPostalDetails.CityName = this.data.Locations.City;
    this.locationDetails.IncidentPostalDetails.StateName = this.data.Locations.StateName;
    this.locationDetails.IncidentPostalDetails.StateCode = this.data.Locations.StateCode;
    this.locationDetails.IncidentPostalDetails.CountryName= this.data.Locations.CountryCode;
    this.locationDetails.IncidentPostalDetails.CountryCode=this.data.Locations.CountryCode;
    this.locationDetails.IncidentPostalDetails.PostalCode =this.data.Locations.ZipCode;
      } 
    }
  }
  acceptUserPrefLoc(childData) {
    if (childData.LocationId != null) {

      if(this.data.DefaultLocations==undefined){
        this.data.DefaultLocations=new DefaultLocations()
      }
      this.data.DefaultLocations.LocId=childData.LocationId;
      this.data.DefaultLocations.Address1 = childData.Address1;
      this.data.DefaultLocations.Address2 = childData.LocationNumber;
      this.data.DefaultLocations.LocationName= childData.LocationName;
      this.data.DefaultLocations.ZipCode = childData.ReportingPostalDetails.PostalCode;
      this.data.DefaultLocations.City = childData.ReportingPostalDetails.CityName;
      this.data.DefaultLocations.CountryCode=childData.ReportingPostalDetails.CountryCode;
      this.data.DefaultLocations.CountryName= childData.ReportingPostalDetails.CountryName;
      this.data.DefaultLocations.StateCode = childData.ReportingPostalDetails.StateCode;
      this.data.DefaultLocations.StateName = childData.ReportingPostalDetails.StateName;
    } 
  }
 notifyClick() {
    this.clickSubject.next(1);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onConfirmClick(): void {
    this.dialogRef.close(true);
  }
}
