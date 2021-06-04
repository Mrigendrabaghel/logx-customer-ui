import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AdvanceSearchService } from 'src/app/logx-services/searchAndReport/advance-search.service';
import { IncidentLocationDetails, IncidentPostalDetails, IncidentReportRequest, locationDetails, LocationInfo } from '../../models/incident/report-incident.model';
import { IncidentReportService } from 'src/app/logx-services/incidentReport/incident-report.service';
import { IncidentConst, CommonConst, commonNumbers, OrderDetailConst, UserPreferenceConst } from 'src/app/configs/constants';
import {  FormControl, FormGroup, NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserPreferenceService } from 'src/app/logx-services/common/user-preference.service';

@Component({
  selector: 'app-location-search',
  templateUrl: './location-search.component.html',
  styleUrls: ['./location-search.component.scss'],

})
export class LocationSearchComponent implements OnInit {
  Name = new FormControl('');
  IncidentConst = IncidentConst;
  CommonConst = CommonConst;
  orderDetailConst = OrderDetailConst;
  @Output() incidentLocationField = new EventEmitter<any>();

  errorMessage: string;
  incidentRepLocationDetails: any;
  incidentStateReploc: any;
  incidentCityIncLoc: any;
  incidentStateIncLoc: any;
  locationModel: locationDetails =new locationDetails();
  favLocations: locationDetails = new locationDetails();
  incidentCityRepLoc: any;
  locPostalDetails: IncidentPostalDetails = <IncidentPostalDetails>{};
  incLocValue: IncidentLocationDetails = <IncidentLocationDetails>{};
  incState: any;
  minPostalCodeLength: any = CommonConst.guiValidation.minPostalCodeLength;
  boolIncLocZipCode: boolean = true;
  incidentIncLocInvalidZipCode: any;
  incidentZipCodeErrMessage: any;
  incidentStateNameErrMessage: any;
  incidentCityNameErrMessage: any;
  incidentIncLocErrMessage: any;
  @Output() 
  getLocationUserPref = new EventEmitter<any>();
  @Output() 
  check = new EventEmitter<any>();
  taskForm: FormGroup;
  @Input() checked:  boolean = false;
  @Input() isReset: boolean = false;
  @Input() updatedOriginLocationDetails: locationDetails = new locationDetails();
  @Input() updatedDestinationLocationDetails: locationDetails = new locationDetails();
  @Input() location: locationDetails = new locationDetails();
  @Input() DefaultLocationDetails: locationDetails = new locationDetails();
  @Input() formName: string;
  @Input('clickSubject') clickSubject:Subject<any>;
  @Input('clickSubjectOrigin') clickSubjectOrigin:Subject<any>;
  @Input('clickSubjectDest') clickSubjectDest:Subject<any>;
  @Input() passDestLoc:  locationDetails = new locationDetails();
  locationVal:locationDetails[]=[];
  @ViewChild('locationForm') myForm: NgForm;
  Locationinfomodel: LocationInfo = <LocationInfo>{};
  parentLoc: any;
  showAddress: boolean;
  constructor(private incidentReportService: IncidentReportService,
    public userPreferenceService: UserPreferenceService,
    
    private advanceSearchService: AdvanceSearchService) {
  }

  ngOnChanges() {
    if (this.isReset) {
      this.myForm.reset();
      return
    }
  
    if (this.updatedOriginLocationDetails && this.formName == "Origin") {
      this.locPostalDetails = this.updatedOriginLocationDetails.IncidentPostalDetails;
      this.incLocValue.LocationName = this.updatedOriginLocationDetails.IncidentLocation;
      this.locPostalDetails.PostalCode = this.updatedOriginLocationDetails.IncidentPostalDetails.PostalCode;
      this.focusOutZipCodeLoc(this.locPostalDetails.PostalCode);
      this.locPostalDetails.CityName = this.updatedOriginLocationDetails.IncidentPostalDetails.CityName;
      this.locPostalDetails.StateCode = this.updatedOriginLocationDetails.IncidentPostalDetails.StateCode;
      this.locPostalDetails.StateName = this.updatedOriginLocationDetails.IncidentPostalDetails.StateName;
    }
    if (this.updatedDestinationLocationDetails && this.formName == "Destination") {
      this.locPostalDetails = this.updatedDestinationLocationDetails.ReportingPostalDetails;
      this.incLocValue.LocationName = this.updatedDestinationLocationDetails.ReportingLocation;
      this.locPostalDetails.PostalCode = this.updatedDestinationLocationDetails.ReportingPostalDetails.PostalCode;
      this.focusOutZipCodeLoc(this.locPostalDetails.PostalCode);
      this.locPostalDetails.CityName = this.updatedDestinationLocationDetails.ReportingPostalDetails.CityName;
      this.locPostalDetails.StateCode = this.updatedDestinationLocationDetails.ReportingPostalDetails.StateCode;
      this.locPostalDetails.StateName = this.updatedDestinationLocationDetails.ReportingPostalDetails.StateName;
    }
    if (this.updatedDestinationLocationDetails && this.formName == "incRepLocation") {
      this.locPostalDetails = this.updatedDestinationLocationDetails.ReportingPostalDetails;
      this.incLocValue.LocationName = this.updatedDestinationLocationDetails.ReportingLocation;
      this.locPostalDetails.PostalCode = this.updatedDestinationLocationDetails.ReportingPostalDetails.PostalCode;
      this.focusOutZipCodeLoc(this.locPostalDetails.PostalCode);
      this.locPostalDetails.CityName = this.updatedDestinationLocationDetails.ReportingPostalDetails.CityName;
      this.locPostalDetails.StateCode = this.updatedDestinationLocationDetails.ReportingPostalDetails.StateCode;
      this.locPostalDetails.StateName = this.updatedDestinationLocationDetails.ReportingPostalDetails.StateName;
    }
    if (this.location!=null && this.formName ==UserPreferenceConst.UserPreferenceForm) {

      this.locPostalDetails = this.location.IncidentPostalDetails;
       this.incLocValue.LocationName = this.location.ReportingLocation;
       this.locPostalDetails.PostalCode = this.location.IncidentPostalDetails.PostalCode;
       this.focusOutZipCodeLoc(this.locPostalDetails.PostalCode);
       this.locPostalDetails.CityName = this.location.IncidentPostalDetails.CityName;
       this.locPostalDetails.StateCode = this.location.IncidentPostalDetails.StateCode;
       this.locPostalDetails.StateName = this.location.IncidentPostalDetails.StateName;
    }
  }

  ngOnInit(): void {
    this.fnErrorMessageText();
    if(this.clickSubject!= null){
    this.clickSubject.subscribe(e => {
    this.funcUserPrefLoc()
    
   });
  }


  if(this.clickSubjectOrigin!=null){
     this.clickSubjectOrigin.subscribe(e => {
      this.parentLoc=e;
      this.locPostalDetails = this.parentLoc.IncidentPostalDetails;
      this.incLocValue.LocationName = this.parentLoc.ReportingLocation;
      this.locPostalDetails.PostalCode = this.parentLoc.IncidentPostalDetails.PostalCode;
      this.focusOutZipCodeLoc(this.locPostalDetails.PostalCode);
      this.locPostalDetails.CityName = this.parentLoc.IncidentPostalDetails.CityName;
      this.locPostalDetails.StateCode = this.parentLoc.IncidentPostalDetails.StateCode;
      this.locPostalDetails.StateName = this.parentLoc.IncidentPostalDetails.StateName;
      this.funcLoc(this.parentLoc)

    });
  }
  if(this.clickSubjectDest!=null){
    this.clickSubjectDest.subscribe(e => {
     this.parentLoc=e;
     this.locPostalDetails = this.parentLoc.IncidentPostalDetails;
     this.incLocValue.LocationName = this.parentLoc.ReportingLocation;
     this.locPostalDetails.PostalCode = this.parentLoc.IncidentPostalDetails.PostalCode;
     this.focusOutZipCodeLoc(this.locPostalDetails.PostalCode);
     this.locPostalDetails.CityName = this.parentLoc.IncidentPostalDetails.CityName;
     this.locPostalDetails.StateCode = this.parentLoc.IncidentPostalDetails.StateCode;
     this.locPostalDetails.StateName = this.parentLoc.IncidentPostalDetails.StateName;
     this.funcLoc(this.parentLoc)

   });
 }

  }
  ngOnDestroy() {
    if (this.clickSubject != undefined) {
      this.clickSubject.unsubscribe();
    }
    if (this.clickSubjectOrigin != undefined) {
      this.clickSubjectOrigin.unsubscribe();
    }
    if (this.clickSubjectDest != undefined) {
      this.clickSubjectDest.unsubscribe();
    }
  }

  GetIncidentLocationByZipcode(Locationinfomodel) {
    this.Locationinfomodel.postalCode = Locationinfomodel.postalCode;
    this.Locationinfomodel.stateCode = Locationinfomodel.stateCode;
    this.Locationinfomodel.cityName = Locationinfomodel.cityName;
    this.Locationinfomodel.searchCriteria = "";
 
    this.getLocation(this.Locationinfomodel);
  }

  applyLocationFilter(val: string) {
    if (this.locPostalDetails.PostalCode != "" && this.locPostalDetails.PostalCode != undefined &&
      this.locPostalDetails.StateCode != undefined && this.locPostalDetails.StateCode != "") {
      this.Locationinfomodel.postalCode = this.locPostalDetails.PostalCode
      this.Locationinfomodel.stateCode = this.locPostalDetails.StateCode;
      this.Locationinfomodel.cityName = this.locPostalDetails.CityName == null ? "" : this.locPostalDetails.CityName;
      this.Locationinfomodel.searchCriteria = val;
      this.getLocation(this.Locationinfomodel);
    }
    else if (this.locPostalDetails.PostalCode === undefined &&
      this.locPostalDetails.StateCode === undefined && val.length > 3) {
      this.Locationinfomodel.postalCode = "";
      this.Locationinfomodel.stateCode = "";
      this.Locationinfomodel.cityName = "";
      this.Locationinfomodel.searchCriteria = val;
      this.getLocation(this.Locationinfomodel);
    }
  }

  getLocation(Locationinfomodel) {
    try {
      if (this.formName === 'incRepLocation') {
        this.Locationinfomodel.isReportingLoc = true;
      }

      this.incidentReportService.GetIncidentLocationDetails(Locationinfomodel).subscribe(response => {
        this.incidentRepLocationDetails = response;
    
      }, error => this.errorMessage = <any>error);
    }
    catch (error) {
      throw error;
    }
  }

  omit_special_char(event) {
    var k;
    k = event.charCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  focusOutZipCodeLoc(zipcode) {

    if (this.locPostalDetails.PostalCode && this.locPostalDetails.PostalCode.length >= this.minPostalCodeLength) {
      this.getIncidentStateCityIncLoc(this.locPostalDetails.PostalCode);
    }
    this.locPostalDetails.PostalCode = zipcode;
    if (this.updatedOriginLocationDetails && (this.formName == "Origin" || this.formName == "Destination")) {
   
      this.checked=false;
      this.check.emit(this.checked);
    }


  }

  getIncidentStateCityIncLoc(zipCodeIncLoc: string) {
    try {
      this.incidentReportService.GetIncidentStateCityDetails(zipCodeIncLoc).subscribe(response => {
        if (response) {
          this.incidentIncLocInvalidZipCode = '';
          if (response.length >= commonNumbers.one) {
            this.incidentStateIncLoc = response.filter((v, i, a) => a.findIndex(t => (t.label === v.label && t.value === v.value)) === i);
            if (this.incidentStateIncLoc.length == commonNumbers.one) {
              this.locPostalDetails.StateCode = this.incidentStateIncLoc[commonNumbers.zero].stateCode;
              this.locPostalDetails.StateName = this.incidentStateIncLoc[commonNumbers.zero].stateName;
              this.locPostalDetails.CountryCode = this.incidentStateIncLoc[commonNumbers.zero].countryCode;
              this.locPostalDetails.CountryName = this.incidentStateIncLoc[commonNumbers.zero].countryName;
              this.incidentCityIncLoc = response.filter(x => x.stateCode == this.incidentStateIncLoc[commonNumbers.zero].stateCode);
              if (this.incidentCityIncLoc && this.incidentCityIncLoc.length === commonNumbers.one) {
                this.locPostalDetails.CityName = this.incidentStateIncLoc[commonNumbers.zero].cityName;
              }
            } else if (response.length === commonNumbers.zero) {
              this.boolIncLocZipCode = false;
              this.incidentIncLocInvalidZipCode = IncidentConst.validationMessage.invalidZipCode;
              this.incidentStateIncLoc = response;
            }
          } else {
            this.incidentStateIncLoc = response;
            this.boolIncLocZipCode = false;
            this.incidentIncLocInvalidZipCode = IncidentConst.validationMessage.invalidZipCode;
          }
          if (response.length > commonNumbers.zero) {
            this.Locationinfomodel.postalCode = zipCodeIncLoc;
            this.Locationinfomodel.stateCode = this.locPostalDetails.StateCode;
            this.Locationinfomodel.cityName = this.locPostalDetails.CityName == null ? "" : this.locPostalDetails.CityName;
            this.GetIncidentLocationByZipcode(this.Locationinfomodel);
          }
        }
      }, error => this.errorMessage = <any>error);
    }
    catch (error) {
      throw error;
    }
  }

  //For Incident Location State Selection
  onStateSelection(res: any) {
    try {
      this.incidentCityIncLoc = this.incidentStateIncLoc.filter((x) => {
        return x.stateCode == this.locPostalDetails.StateCode
      })
      this.Locationinfomodel.postalCode = this.locPostalDetails.PostalCode;
      this.Locationinfomodel.stateCode = res;
      this.Locationinfomodel.cityName = this.locPostalDetails.CityName;;
      this.Locationinfomodel.searchCriteria = "";
      this.GetIncidentLocationByZipcode(this.Locationinfomodel);
      this.incLocValue.LocationName = "";
    }
    catch (error) {
      throw error;
    }
  }

  onCitySelection(res: any) {
    this.Locationinfomodel.postalCode = this.locPostalDetails.PostalCode;
    this.Locationinfomodel.stateCode = this.locPostalDetails.StateCode;
    this.Locationinfomodel.cityName = res;
    this.Locationinfomodel.searchCriteria = "";
    this.incLocValue.LocationName = "";
    this.GetIncidentLocationByZipcode(this.Locationinfomodel);
  }

  funcLoc(location) {
    try {
      if (this.formName === 'incLocation') {
        this.locationModel.IncidentPostalDetails = this.locPostalDetails;
        this.locationModel.IncidentLocation = location.locationName
          + ', ' + location.cityName + ', ' + location.stateCode + ' ' + location.postalCode;
      }
      if (this.formName === 'repLocation' || this.formName === 'incRepLocation') {
        this.locationModel.ReportingPostalDetails = this.locPostalDetails;
        this.locationModel.ReportingLocation = location.locationName
          + ', ' + location.cityName + ', ' + location.stateCode + ' ' + location.postalCode;
      }
    
      if (this.formName == "Origin" || this.formName == "Destination"){
        this.checked=false;
        this.check.emit(this.checked);
      }



      if (this.formName === 'Origin') {
        this.locationModel.IncidentPostalDetails = this.locPostalDetails;
        this.locationModel.IncidentLocation = location.locationNumber + ' ' + location.locationName + ' ' + location.locationAddr1 + ' ' + location.stateName
          + ', ' + location.cityName + ' ' + location.stateCode + ' ' + location.postalCode;
          if(location.ReportingPostalDetails){
            this.locationModel.LocationId= location.LocationId;
            this.locationModel.LocationNumber = location.IncidentPostalDetails.LocationNumer;
            this.locationModel.IncidentPostalDetails = location.IncidentPostalDetails;
            this.locationModel.IncidentLocation=location.ReportingLocation;
            this.incidentLocationField.emit(this.locationModel);
          }
         
        } 
  
      if ((this.formName != "incLocation" && this.formName != "repLocation") || (this.formName !=UserPreferenceConst.UserPreferenceForm)) {
        if(location.ReportingPostalDetails){
          this.locationModel.LocationId= location.LocationId;
          this.locationModel.LocationNumber = location.IncidentPostalDetails.LocationNumer;
          this.locationModel.LocationName=location.locationName;
          this.locationModel.Address1=location.locationAddr1 ;
          this.locationModel.ReportingPostalDetails = location.IncidentPostalDetails;
          this.locationModel.ReportingLocation=location.ReportingLocation;
          this.locationModel.Address1= location.locationAddr1 ;
          this.incidentLocationField.emit(this.locationModel);
        
          return;
  
        }
      
      
        this.locationModel.ReportingPostalDetails = this.locPostalDetails;
        this.locationModel.ReportingLocation = location.locationNumber + ' ' + location.locationName + ' ' + location.locationAddr1 + ' ' + location.stateName
          + ', ' + location.cityName + ' ' + location.stateCode + ' ' + location.postalCode;
        }
     
      this.locationModel.LocationNumber = location.locationNumber;
      this.locationModel.LocationId = location.locationId;
      this.locationModel.LocationName=location.locationName;
      this.locationModel.Address1=location.locationAddr1 ;
      this.incidentLocationField.emit(this.locationModel);

      if (this.formName == UserPreferenceConst.UserPreferenceForm) {
        this.locationModel.ReportingPostalDetails = this.locPostalDetails;
        this.locationModel.LocationName =location.locationName;
        this.locationModel.LocationNumber=location.locationNumber
        this.locationModel.Address1= location.locationAddr1;
        this.funcUserPrefLoc();
       return;
          
        }



    }
    catch (error) {
      throw error;
    }
  }


  fnErrorMessageText() {
    this.incidentZipCodeErrMessage = IncidentConst.validationMessage.zipCode;
    this.incidentStateNameErrMessage = IncidentConst.validationMessage.stateName;
    this.incidentCityNameErrMessage = IncidentConst.validationMessage.cityName;
    this.incidentIncLocErrMessage = IncidentConst.validationMessage.incLoc;

  }

  funcUserPrefLoc() {
    this.getLocationUserPref.emit(this.locationModel);
  }
}
