import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IncidentConst, commonNumbers, SubmitorderdetailsConst } from 'src/app/configs/constants';
import { IncidentReportService } from 'src/app/logx-services/incidentReport/incident-report.service';
import { ConfirmationDialog } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { IncidentOrderDetails, IncidentCarrierDetails } from 'src/app/shared/models/incident/report-incident.model';
import { CommonConst } from 'src/app/configs/constants';
import { UserPreferenceService } from 'src/app/logx-services/common/user-preference.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReferenceNumberModel, SaveOrderDetails } from 'src/app/shared/models/submitOrder/submitOrder.model';
import { SubmitOrderService } from 'src/app/logx-services/submitOrder/submit-order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { RouteLinks } from 'src/app/configs/RoutePath';
import { MatTableDataSource } from '@angular/material/table';
import { UploadAndLookupDetailService } from 'src/app/logx-services/common/upload-and-lookup-detail.service';
import { MatPaginator } from '@angular/material/paginator';



@Component({
  selector: 'app-submitorderdetails',
  templateUrl: './submitorderdetails.component.html',
  styleUrls: ['./submitorderdetails.component.scss']
})
export class SubmitorderdetailsComponent implements OnInit {
  @Input() orderNumber: string;
  @Input() orderId: any;
  @Input() shipWith: string;
  enterComments = [{ enteredComment: "" }];
  SubmitorderdetailsConst = SubmitorderdetailsConst;
  errorMessage: any;
  IncidentConst = IncidentConst;
  CommonConst = CommonConst;
  ordercontactDetails: IncidentOrderDetails = <IncidentOrderDetails>{};
  carrierDetailsModel: IncidentCarrierDetails = <IncidentCarrierDetails>{};
  errorMessage1: string;
  showicon = true;
  showlist = true;
  CarrierdataList: any = [];
  equipment: any;
  LanguageChange: any;
  referencenumbertype: any;
  service: any;
  selectedService: any;
  serviceError: number;
  sourcesystem: any;
  sourcesystemError: number;
  orderDetailsForm: FormGroup;
  orderDetails: SaveOrderDetails = <SaveOrderDetails>{};
  isSubmit: Boolean = false;
  requestedEquipmentvalue: string;
  isTypeSelected: boolean = false;
  noValue: boolean = true;
  referenceType: any;
  isDuplicate: boolean = false;
  refenceNumberList: ReferenceNumberModel[] = [];
  username: string;
  refNumItemGrid: ReferenceNumberModel[] = [];
  refNumDataSource = new MatTableDataSource(this.refNumItemGrid)
  displayedColumns = ['referencetype', 'referencenumber', 'action'];
  refNumColumns = [{ field: 'referencetype', header: 'Reference Type' },
  { field: 'referencenumber', header: 'Reference Number' }, { field: 'action', header: '' }

  ];
  pageSizeOptions: any[] = [];
  pageSize: number;
  IsCarrier: any;
  @ViewChild(MatPaginator, { static: false }) set paginator(paginator: MatPaginator) {
    this.refNumDataSource.paginator = paginator;
  }
  Lookuptype: string = 'innergrid-pagecount';
  commonNumbers = commonNumbers;
  isDisplayAddnew: boolean = false;
  IsDisplayGrid: boolean = false;
  constructor(private incidentReportService: IncidentReportService, private fb: FormBuilder, public snackBar: MatSnackBar,
    public dialog: MatDialog, public userPreferenceService: UserPreferenceService, public submitorderservice: SubmitOrderService,
    public router: Router, private dataTransfer: DataTransferService, public uploadService: UploadAndLookupDetailService
  ) {
    this.orderDetailsForm = this.fb.group({
      selectedService: ['', [Validators.required]],
      sourcesystem: ['', [Validators.required]],
      requestedEquipment: [''],
      carrier: [''],
      referenceType: [''],
      referenceNumber: ['']
    });
  }

  ngOnInit(): void {
    try {
      this.username = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.name;
      this.getdropdownvalues("SERVICE", '1');
      this.getdropdownvalues("EQUIPMENT", '1');
      this.getreferencenumbertype("referencenumbertype");
      if (this.orderId != null) {
        this.getOrderDetails(this.orderId)
      }
    }
    catch (error) {
      throw error;
    }

  }

  ngAfterViewInit() {
    try {
      this.uploadService.GetLookupDetails(this.Lookuptype).subscribe(async data => {
        if (data && data.length > 0) {
          let pagenumber = data.find(x => x.isDefault === true && x.lookupText != null && x.lookupText != undefined).lookupDisplayText;
          this.pageSize = await Number(pagenumber);
          this.pageSizeOptions = data;
          let filteredList = data.filter(itemX => itemX.lookupText != null && itemX.lookupText != undefined);
          this.pageSizeOptions = filteredList.map(e => e.lookupDisplayText)
        }
      })
    }
    catch (error) {
      throw error;
    }
  }
  getOrderDetails(orderId) {
    this.submitorderservice.OrderDetailsData(orderId).subscribe(res => {
      if (res) {
        this.orderDetailsForm.get('selectedService').setValue(res.orderDetails[0].serviceoptionname);
        this.orderDetailsForm.get('requestedEquipment').setValue(res.orderDetails[0].availableequipmentname);
        this.orderDetailsForm.get('sourcesystem').setValue(res.orderDetails[0].sourcesystem);
        this.orderDetailsForm.get('carrier').setValue(res.orderDetails[0].carriername);
        if (res.orderDetails[0].refNumbers.length > 0) {
          this.IsDisplayGrid = true;
          this.refNumDataSource.data = res.orderDetails[0].refNumbers;
        }
        else {
          this.IsDisplayGrid = false;
        }
      }
    })
  }
  deleteRefNum(element) {
    const confirmCancel = this.dialog.open(ConfirmationDialog, {
      data: {
        message: `Are you sure you want to delete this reference number?`,
        buttonText: {
          ok: CommonConst.YES,
          cancel: CommonConst.NO
        }
      }
    });
    confirmCancel.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.submitorderservice.DeleteRefNumData(element.id).subscribe(res => {
          if (res > 0) {
            this.getOrderDetails(element.ordid);
          }
        })
      }
    })
  }

  addNew() {
    this.isDisplayAddnew = true;
    if (this.refenceNumberList === undefined) {
      this.refenceNumberList = new Array<ReferenceNumberModel>();
    }
    if (!this.isDuplicate) {
      this.isTypeSelected = false;
      const refNumArrayLength = (this.refenceNumberList.length === 0) ? 0 : this.refenceNumberList.length - 1;
      if (this.refenceNumberList && this.refenceNumberList.length >= 1 && this.refenceNumberList[refNumArrayLength].referencetype === "" && this.refenceNumberList[refNumArrayLength].referencenumber === "") { }
      else {
        this.refenceNumberList.push({ id: 0, ordid: this.orderId, referencetype: '', referencenumber: '', createddate: '', createdby: this.username });
      }
    }
  }

  saveOrderDetails() {
    this.isSubmit = true;
    this.save(SubmitorderdetailsConst.saveAndContinue);
  }


  removeReferenceNumber(index) {
    const deleteReferenceNumber = this.dialog.open(ConfirmationDialog, {
      data: {
        message: SubmitorderdetailsConst.ReferenceNumberErrorMessage.notificationDelete,
        buttonText: {
          ok: CommonConst.deleteConfirm,
          cancel: CommonConst.globalErrorMessage.nocancel
        }
      }
    });
    deleteReferenceNumber.afterClosed().subscribe(closed => {
      if (closed) {
        if (this.refenceNumberList.length > 0) {
          this.enterComments.splice(index, 1);
          this.refenceNumberList.splice(index, 1);
          this.isDuplicate = false;
          this.isTypeSelected = true;
        }
      }
    })
  }

  omit_special_char(event) {
    var k;
    k = event.charCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }


  ClearInput() {
    this.ordercontactDetails.Carrier = '';
    this.showicon = false;
    this.showlist = false;
  }

  applyFilter(event: any) {

    try {
      this.showicon = false
      this.showlist = false;
      let idParam = '';
      let carrierData = event.target.value;
      carrierData = carrierData.substr(0, 1)
      if (carrierData == '$') {
        idParam = IncidentConst.scac;
      }
      else if (carrierData == '#') {
        idParam = IncidentConst.mccNum;
      }
      let searchVal = event.target.value.replace(/[^\w\s]/gi, "");
      this.carrierDetailsModel.SearchCriteria = idParam;
      this.carrierDetailsModel.SearchValue = searchVal;
      if (searchVal.length >= commonNumbers.two) {
        this.showlist = true;
        this.incidentReportService.getCarrierDetails(this.carrierDetailsModel).subscribe(response => {
          if (response) {
            this.CarrierdataList = response;
          }
          this.showicon = true;
        }, error => this.errorMessage = <any>error);
      }
    }
    catch (error) {
      throw error;
    }
  }


  getdropdownvalues(lookupType: string, userId: string) {
    this.submitorderservice.GetSubmitOrderDropDownValues(lookupType, userId).subscribe(response => {
      if (response) {
        if (lookupType == 'SERVICE') {
          this.service = response;
        }
        else if (lookupType == 'EQUIPMENT') {
          this.equipment = response;
        }
      }
    }, error => this.errorMessage = <any>error);
  }

  getreferencenumbertype(PreferenceType: string) {
    this.userPreferenceService.GetPreference(PreferenceType).subscribe(response => {
      if (response) {
        this.referencenumbertype = response;
      }
    }, error => this.errorMessage = <any>error);
  }

  save(saveType) {
    if (this.isDuplicate) {
      return
    }
    if (saveType === "Complete" && (this.orderDetailsForm.invalid)) {
      return
    }
    this.orderDetails.OrderId = this.orderId;
    this.orderDetails.OrderNumber = this.orderNumber;
    this.orderDetails.EquipmentName = this.orderDetailsForm.value.requestedEquipment;
    if (this.orderDetailsForm.value.requestedEquipment === null || this.orderDetailsForm.value.requestedEquipment === "") {
      this.orderDetails.EquipmentId = commonNumbers.zero;
    }
    else {
      this.orderDetails.EquipmentId = Number(this.equipment.filter(x => x.displayName === this.orderDetailsForm.value.requestedEquipment)[0].id);
    }
    this.orderDetails.ServiceOptionName = this.orderDetailsForm.value.selectedService;
    if (this.orderDetailsForm.value.selectedService === null || this.orderDetailsForm.value.selectedService === "") {
      this.orderDetails.ServiceOptionId = 0
      this.orderDetails.ServiceOptionNum = ""

    }
    else {
      this.orderDetails.ServiceOptionId = Number(this.service.filter(x => x.displayName === this.orderDetailsForm.value.selectedService)[0].id);
      this.orderDetails.ServiceOptionNum = this.service.filter(x => x.displayName === this.orderDetailsForm.value.selectedService)[0].code;
    }
    this.orderDetails.SourceSystem = this.orderDetailsForm.value.sourcesystem;
    this.orderDetails.CarrierName = this.orderDetailsForm.value.carrier;
    //this.orderDetails.CarrierNum = this.CarrierdataList && this.CarrierdataList.length > 0 ? this.CarrierdataList.filter(x => x.carrierName === this.orderDetailsForm.value.carrier)[0].tradingPartnerNum : '';
    if(this.CarrierdataList && this.CarrierdataList.length > 0){
      this.IsCarrier= this.CarrierdataList.filter(x => x.carrierName === this.orderDetailsForm.value.carrier)
        if(this.IsCarrier.length){
          this.orderDetails.CarrierNum= this.CarrierdataList.filter(x => x.carrierName === this.orderDetailsForm.value.carrier)[0].tradingPartnerNum;
        }else{
          this.orderDetails.CarrierNum= ''
        }
      }else{
        this.incidentReportService.getCarrierDetails(this.carrierDetailsModel).subscribe(response => {
          if (response) {
            this.CarrierdataList = response;
          }});
          this.IsCarrier= this.CarrierdataList.filter(x => x.carrierName === this.orderDetailsForm.value.carrier)
          if(this.IsCarrier.length){
            this.orderDetails.CarrierNum= this.CarrierdataList.filter(x => x.carrierName === this.orderDetailsForm.value.carrier)[0].tradingPartnerNum;
          }else{
            this.orderDetails.CarrierNum= ''
          }
      }
    const refNumArrayLength = (this.refenceNumberList && this.refenceNumberList.length === 0) ? 0 : this.refenceNumberList.length - 1;
    if (this.refenceNumberList && this.refenceNumberList.length >= 1 && this.refenceNumberList[refNumArrayLength].referencetype === ""
      && this.refenceNumberList[refNumArrayLength].referencenumber === "") {
      this.refenceNumberList.pop();
    }
    this.orderDetails.ReferenceNumber = JSON.stringify(this.refenceNumberList);
    this.orderDetails.userName = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.name;
    this.orderDetails.UserId = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.name;
    this.orderDetails.OrderDetailsFlag = saveType;
    this.submitorderservice.SaveOrderDetails(this.orderDetails).subscribe(res => {
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
            this.getOrderDetails(this.orderId);
            this.refenceNumberList=[];
            this.dataTransfer.loadData('fromOrderDetails');
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

  referenceSelected() {
    this.isTypeSelected = true;
  }

  referenceEntered() {
    const resp = this.refenceNumberList.reduce((acc, ele) => {
      const existingrecord3 = acc.find(x => x.referencetype === ele.referencetype && x.referencenumber === ele.referencenumber);
      if (existingrecord3) {
        this.isDuplicate = true
      }
      else {
        this.isDuplicate = false;
        this.refList();
      }
      return acc.concat(ele);
    }, [])

  }
  refList() {


    for (var i = 0, len = this.refNumDataSource.data.length; i < len; i++) {
      for (var j = 0, len2 = this.refenceNumberList.length; j < len2; j++) {
        if (this.refNumDataSource.data[i].referencetype === this.refenceNumberList[j].referencetype && this.refNumDataSource.data[i].referencenumber === this.refenceNumberList[j].referencenumber) {
          this.isDuplicate = true;
          i = this.refNumDataSource.data.length - 1;
          j = this.refenceNumberList.length - 1;
        }

        else {
          this.isDuplicate = false;
        }
      }
    }

  }

  onCancel(): void {
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
        this.submitorderservice.deleteOrder(this.orderId).subscribe(
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
}



