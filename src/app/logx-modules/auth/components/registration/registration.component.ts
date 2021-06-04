import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioButton } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { OktaAuthService } from '@okta/okta-angular';
import { forkJoin } from 'rxjs';
import { homeComponentConst, LayoutConst, registrationConst, RegistrationConst } from 'src/app/configs/constants';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { RegistrationService } from 'src/app/logx-services/registration/registration.service';
import { RegistrationSaveModal } from 'src/app/shared/models/auth/loginModel';
import { locationDetails } from 'src/app/shared/models/incident/report-incident.model';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationConst = RegistrationConst;
  gradeTypeList = [];
  gradeList = [];
  militeryList = [];
  civilList = [];
  mainServiceCommandList = [];
  subServiceCommandList = [];
  basicAccessList = [];
  addnAccessList = [];
  USTRANSCOMList = [];
  DLAList = [];
  USARMYList = [];
  regForm: FormGroup;
  selectedValue = true;
  isSubServiceCommandDropdown = true;
  isAdditionalDODAAC = false;
  addnAccessArray = [];

  gradeTypeValue: string;
  gradeTypeOptionValue: string;
  mainServiceCommandValue: string;
  subServiceCommand1Value: string;
  subServiceCommand2Value: string;
  unitNameValue: string;
  installationValue: string;
  dodaacValue: string;
  cageValue: string;
  splcValue: string;
  gblocValue: string;
  firstNameValue: string;
  middleNameValue: string;
  lastNameValue: string;
  stateOptionsValue: string;
  cityOptionsValue: string;
  zipCodeValue: string;
  fullAddrValue: string;
  officeNoValue: string;
  mobileNoValue: string;
  emailAddrValue: string;
  basicAccessValue: string;
  addnAccessValue: string;
  addnDODAACExtraValue: string;
  splRequestValue: string;
  getCountCalls = 0;
  formName: string = 'registration';
  locationDetails: locationDetails = new locationDetails()
  registrationValidationConst = registrationConst;
  formSubmitted = false
  constructor(private fb: FormBuilder,
    private regServiceService: RegistrationService,
    public oktaAuth: OktaAuthService,
    public snackBar: MatSnackBar,
    private router: Router,
    private dataTransfer: DataTransferService) {

  }

  ngOnInit(): void {

    const res1 = this.regServiceService.getRegistrationData('reg-access');
    const res2 = this.regServiceService.getRegistrationData('reg-rank');
    const res3 = this.regServiceService.getRegistrationData('reg-civilrank');
    const res4 = this.regServiceService.getRegistrationData('reg-militryrank');
    const res5 = this.regServiceService.getRegistrationData('reg-servicecmd');
    const res6 = this.regServiceService.getRegistrationData('reg-ustranscom');
    const res7 = this.regServiceService.getRegistrationData('reg-dla');
    const res8 = this.regServiceService.getRegistrationData('reg-usarmy');
    const res9 = this.regServiceService.getRegistrationData('reg-additionalaccess');

    forkJoin([res1, res2, res3, res4, res5, res6, res7, res8, res9]).subscribe(next => {
      this.basicAccessList = next[0];
      this.gradeTypeList = next[1];
      this.civilList = next[2];
      this.militeryList = next[3];
      this.mainServiceCommandList = next[4];
      this.USTRANSCOMList = next[5];
      this.DLAList = next[6];
      this.USARMYList = next[7];
      this.addnAccessList = next[8];

      this.gradeList = this.militeryList; // bydefault
      this.gradeTypeValue = this.registrationConst.militaryRank; // bydefault
      this.addBasicAccess();
      this.addAdditionalAccess();
    },
      error => console.log(error));

    this.subServiceCommandList = [];

    this.buildFormCntrl();
  }

  buildFormCntrl() {
    this.regForm = this.fb.group({
      gradeType: [''],
      gradeTypeOptions: [''],
      main_ServiceCommand: [''],
      sub_ServiceCommand1: [''],
      sub_ServiceCommand2: [''],
      unitName: [''],
      installation: [''],
      dodaac: ['', Validators.required],
      cage: [''],
      splc: [''],
      gbloc: [''],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      officeNo: ['', Validators.required],
      mobileNo: [''],
      emailAddr: ['', [Validators.required, Validators.email]],
      basicAccess: this.fb.array([]),
      addnDODAACExtra: [''],
      splRequest: [''],
    });
  }
  get f() { return this.regForm.controls }
  basicAccess() {
    return this.regForm.controls.basicAccess as FormArray;
  }

  omit_special_char(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  addBasicAccess() {
    this.basicAccessList.forEach((ba, index) => {
      const cntrName = 'basicAccess' + index;
      const addControl: FormGroup = this.fb.group({
        cntrName: [''],
      })
      this.basicAccess().push(addControl);
    });
  }

  addAdditionalAccess() {
    this.addnAccessList.forEach((lst, index) => {
      const cntrName = 'addnAccess' + index;
      this.regForm.addControl(cntrName, this.fb.control(''));
    })
  }

  changeRadiogradeType(e) {
    // console.log('updateGradeType' + e.lookupDisplayText);
    this.gradeTypeValue = this.regForm.get('gradeType').value;
    const typegrade = this.gradeTypeList.find(x => x.lookupDisplayText === this.gradeTypeValue);
    switch (typegrade.lookupDisplayText) {
      case this.registrationConst.militaryRank:
        this.gradeList = this.militeryList;
        break;
      case this.registrationConst.civilServiceGrade:
        this.gradeList = this.civilList;
        break;
      default:
        this.gradeList = this.militeryList;
        break;
    }
  }
  updateGradeType(e) {
    this.gradeTypeOptionValue = e.lookupDisplayText;
    // console.log('updateGradeType' + e.lookupDisplayText);
  }

  updateMainServiceCommand(e) {
    this.mainServiceCommandValue = e.lookupDisplayText;
    // console.log('updateMainServiceCommand' + e.lookupDisplayText);
    this.subServiceCommand1Value = '';
    this.subServiceCommand2Value = '';
    switch (e.lookupDisplayText) {
      case 'USTRANSCOM':
        this.subServiceCommandList = this.USTRANSCOMList;
        this.isSubServiceCommandDropdown = true;
        break;
      case 'DLA':
        this.subServiceCommandList = this.DLAList;
        this.isSubServiceCommandDropdown = true;
        break;
      case 'USARMY':
        this.subServiceCommandList = this.USARMYList;
        this.isSubServiceCommandDropdown = true;
        break;
      default:
        this.isSubServiceCommandDropdown = false;
        break;
    }
  }
  updateSubServiceCommand(e) {
    this.subServiceCommand1Value = e.lookupDisplayText;
    // console.log('updateSubServiceCommand' + e.lookupDisplayText);
  }

  getLocationContactDetails(value) {
    this.locationDetails = value;
  }

  updateBasicAccess(e) {
    const bAButton: MatRadioButton = e.source;
    this.basicAccessValue = bAButton.value;
    // console.log('updateBasicAccess' + bAButton.value);
  }
  updateAddnAccess(e) {
    // console.log('updateAddnAccess' + e);
    this.addnDODAACExtraValue = '';
    this.addnAccessArray = [];
    this.addnAccessList.forEach((lst, index) => {
      this.isAdditionalDODAAC = false;
      const contName = 'addnAccess' + index;
      const checkedData = this.regForm.get(contName).value;
      if (checkedData && lst.lookupDisplayText.includes('Additional DODAAC')) {
        this.isAdditionalDODAAC = true;
      }
      if (checkedData) {
        this.addnAccessArray.push(lst.lookupText)
      }
      // console.log(contName + '--' + checkedData);
    });
    this.addnAccessValue = JSON.stringify(this.addnAccessArray);
  }
  submit() {
    this.formSubmitted = true;
    if (this.regForm.valid) {
      // Get Input Values
      this.subServiceCommand2Value = this.regForm.get('sub_ServiceCommand2').value;
      this.unitNameValue = this.regForm.get('unitName').value;
      this.installationValue = this.regForm.get('installation').value;
      this.dodaacValue = this.regForm.get('dodaac').value;
      this.cageValue = this.regForm.get('cage').value;
      this.splcValue = this.regForm.get('splc').value;
      this.gblocValue = this.regForm.get('gbloc').value;
      this.firstNameValue = this.regForm.get('firstName').value;
      this.middleNameValue = this.regForm.get('middleName').value;
      this.lastNameValue = this.regForm.get('lastName').value;
      this.officeNoValue = this.regForm.get('officeNo').value;
      this.mobileNoValue = this.regForm.get('mobileNo').value;
      this.emailAddrValue = this.regForm.get('emailAddr').value;
      this.splRequestValue = this.regForm.get('splRequest').value;
      this.addnDODAACExtraValue = this.regForm.get('addnDODAACExtra').value;

      if (this.isAdditionalDODAAC) {
        this.addnAccessArray.push(this.addnDODAACExtraValue);
        this.addnAccessValue = JSON.stringify(this.addnAccessArray);
      }

      const saveData: RegistrationSaveModal = {
        UserName: this.emailAddrValue,
        FirstName: this.firstNameValue,
        MiddleName: this.middleNameValue,
        LastName: this.lastNameValue,
        UserAccount: this.emailAddrValue,
        MilitaryRank: (this.gradeTypeValue === this.registrationConst.militaryRank) ? this.gradeTypeOptionValue : '',
        CivilServiceGrade: (this.gradeTypeValue === this.registrationConst.civilServiceGrade) ? this.gradeTypeOptionValue : '',
        UnitName: this.unitNameValue,
        MailingAddress1: this.locationDetails.ReportingLocation,
        MailingAddress2: '', // Need to update
        MailingCity: this.locationDetails.ReportingPostalDetails.CityName,
        MailingState: this.locationDetails.ReportingPostalDetails.StateName,
        MailingCountry: '', // Need to update
        MailingZipCode: this.locationDetails.ReportingPostalDetails.PostalCode,
        Phone_Office: this.officeNoValue,
        Phone_Cell: this.mobileNoValue,
        EmailAddress: this.emailAddrValue,
        Installation: this.installationValue,
        DODAAC: this.dodaacValue,
        CAGECode: this.cageValue,
        SPLC: this.splcValue,
        GBLOC: this.gblocValue,
        Role: null, // Need to update
        Team: null, // Need to update
        BasicAccess: this.basicAccessValue === undefined ? this.basicAccessList[0].lookupText : this.basicAccessValue,
        AdditionalAccess: this.addnAccessValue,
        SpecialInstruction: this.splRequestValue,
        ServiceCommand: this.mainServiceCommandValue,
        ServiceCommandValue: (this.isSubServiceCommandDropdown) ? this.subServiceCommand1Value : this.subServiceCommand2Value,
      };
      this.regServiceService.saveReg(saveData).subscribe(resp => {
        if (resp) {
          this.dataTransfer.loadData(LayoutConst.resFlag);
          this.dataTransfer.loadData(LayoutConst.resMsg);
          this.router.navigate(['/'])
        }
      });
    }
  }
  cancel() {
    this.oktaAuth.logout();
  }
}

