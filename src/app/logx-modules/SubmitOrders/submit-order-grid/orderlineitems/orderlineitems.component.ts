import { Component, OnInit, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CommonConst,OrderDetailConst, commonNumbers, SubmitorderdetailsConst } from 'src/app/configs/constants';
import { RouteLinks } from 'src/app/configs/RoutePath';
import { AccessorialsService } from 'src/app/logx-services/accessorials/accessorials.service';
import { DataTransferService } from 'src/app/logx-services/common/data-transfer.service';
import { UploadAndLookupDetailService } from 'src/app/logx-services/common/upload-and-lookup-detail.service';
import { UserPreferenceService } from 'src/app/logx-services/common/user-preference.service';
import { SubmitOrderService } from 'src/app/logx-services/submitOrder/submit-order.service';
import { ConfirmationDialog } from 'src/app/shared/confirmation-dialog/confirmation-dialog.component';
import { accessorialGrid } from 'src/app/shared/models/accessorials/accessorials.model';
import { AddOrderLineItems, orderLineItemGrid, OrderLines, SaveOrderLineItems } from 'src/app/shared/models/submitOrder/submitOrder.model';

@Component({
  selector: 'app-orderlineitems',
  templateUrl: './orderlineitems.component.html',
  styleUrls: ['./orderlineitems.component.scss']
})
export class OrderlineitemsComponent implements OnInit {
  @Input() orderNumber: string;
  @Input() orderId: any;
  @Input() shipWith: string;
  SubmitorderdetailsConst = SubmitorderdetailsConst;
  weight: any;
  LanguageChange: any;
  errorMessage: any;
  Height: any;
  Width: any;
  length: any;
  volume: any;
  hazmatclass: any;
  unclass: any;
  freightclass: any;
  piecetype: any;
  hutype: any;
  tcnNum: string;
  tcnNumError: number;
  orderLineItemsForm: FormGroup;
  hazmatclassification: any;
  hazmatPacking: any;
  hazmatChecked: boolean = false;
  invalidForm: boolean = false;
  hazmatSection: FormGroup;
  descriptionSection: FormGroup;
  orderLineItems: SaveOrderLineItems = <SaveOrderLineItems>{};
  addOrderLineItems: AddOrderLineItems = <AddOrderLineItems>{};
  addMoreItems: any = [];
  addMoreItemsSave: any = [];
  lineItemCount: 1;
  orderLineItemGrid: orderLineItemGrid[] = [];
  lineItemsDataSource = new MatTableDataSource(this.orderLineItemGrid)
  lineitemGrid: any = [];
  lineitemColumns: any;
  CommonConst = CommonConst;
  OrderDetailConst = OrderDetailConst;
  savedData: any;
  isDisplayGrid: boolean = false;
  OrderLineID: number = 0;
  OdrNum: string;
  pageSizeOptions: any[] = [];
  pageSize: number;
  saveAndContinueClick: boolean = false;
  len: any;
  addMoreClicked = false;
  @ViewChild(MatPaginator, { static: false }) set paginator(paginator: MatPaginator) {
    this.lineItemsDataSource.paginator = paginator;
  }
  Lookuptype: string = 'innergrid-pagecount';
  commonNumber = commonNumbers;
  editClick: boolean = false;
  editDataIndex: number;
  constructor(public userPreferenceService: UserPreferenceService, public submitOrderService: SubmitOrderService, private fb: FormBuilder,
    public router: Router, public dialog: MatDialog, public snackBar: MatSnackBar, private dataTransfer: DataTransferService,
    public accessorialService: AccessorialsService, public uploadService: UploadAndLookupDetailService, private cdr: ChangeDetectorRef) {
    this.orderLineItemsForm = this.fb.group({
      tcnNum: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]],
      grossWt: ['', [Validators.required]],
      grossWtValue: ['', [Validators.required]],
      grossVol: ['', [Validators.required]],
      grossVolValue: ['', [Validators.required]],
      huCount: [''],
      huType: [''],
      pieceCount: ['', [Validators.required]],
      piecetype: ['', [Validators.required]],
      freightclass: ['', [Validators.required]],
      length: ['', [Validators.required]],
      lengthmeasure: ['',],
      width:['', [Validators.required]],
      widthmeasure:['',],
      height: ['', [Validators.required]],
      heightmeasure:['',],
      hazmat: [''],
      description: [''],
      HLWUnit: ['', [Validators.required]]
    })
    this.hazmatSection = this.fb.group({
      unClass: ['', [Validators.minLength(0)]],
      hazmatClass: ['', [Validators.minLength(0)]],
      hazmatContactNumber: ['', [Validators.minLength(0)]],
      packingGroup: ['', [Validators.minLength(0)]]
    })
    this.descriptionSection = this.fb.group({
      description: ['']
    })
  }

  ngOnInit(): void {
    try {
      this.GetAccessorialGridColumns();
      this.getWeight("weight");
      this.getvolume("volume");
      this.getlength("dimension");
      this.getWidth("dimension");
      this.getHeight("dimension");
      this.getDropDownValues("HAZMATCLASSIFICATION", 1).then(res => {
        this.hazmatclass = res;
      })
      this.getDropDownValues("HAZMATPACKINGGROUP", 1).then(res => {
        this.hazmatPacking = res;
      })
      this.getDropDownValues("HUTYPE", 1).then(res => {
        this.hutype = res;
      })
      this.getDropDownValues("PIECETYPE", 1).then(res => {
        this.piecetype = res;
      })
      this.getDropDownValues("FREIGHTCLASS", 1).then(res => {
        this.freightclass = res;
      })
      if (this.orderId !== null) {
        this.GetOrderLineItemsData(this.orderId);
      }
    }
    catch (error) {
      throw error;
    }
    this.validations();
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

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  get f() { return this.orderLineItemsForm.controls; }
  get f1() { return this.hazmatSection.controls; }
  get f2() { return this.descriptionSection.controls; }
  GetAccessorialGridColumns() {
    this.accessorialService.GetAccessorialGridColumns(SubmitorderdetailsConst.orderLineItemGrid).subscribe(data => {
      if (data) {
        this.lineitemGrid = data;
        this.lineitemColumns = (this.lineitemGrid as accessorialGrid[]).map(item => item.headingDBColumn);
      }
    })
  }

  GetOrderLineItemsData(orderId) {
    this.submitOrderService.OrderLineItemsData(orderId).subscribe(res => {
      if (res.orderLineInfo[0].orderlines.length > 0) {
        this.isDisplayGrid = true;
        this.OdrNum = res.orderLineInfo[0].ordernum;
        this.lineItemsDataSource.data = res.orderLineInfo[0].orderlines;
        console.log('this.lineItemsDataSource.data', this.lineItemsDataSource.data);
        if (this.lineItemsDataSource.data.length > 0) {
          this.saveAndContinueClick = true;
        }
      }
      else {
        this.isDisplayGrid = false;
        this.lineItemsDataSource.data = [];
      }
    })
  }

  bindingData(element) {
    this.OrderLineID = element.orderlineid;
    this.orderLineItemsForm.get('tcnNum').setValue(element.tcnnumber);
    this.orderLineItemsForm.get('freightclass').setValue(element.freightclassname);
    this.orderLineItemsForm.get('grossWt').setValue(element.grossweight === 0 ? 0 : element.grossweight);
    this.orderLineItemsForm.get('grossWtValue').setValue(element.grossweightunit);
    this.orderLineItemsForm.get('grossVol').setValue(element.grossvolume === 0 ? 0 : element.grossvolume);
    this.orderLineItemsForm.get('grossVolValue').setValue(element.grossvolumeunit);
    this.orderLineItemsForm.get('huCount').setValue(element.handlingunitcount === 0 ? 0 : element.handlingunitcount);
    this.orderLineItemsForm.get('huType').setValue(element.handlingunittypename);
    this.orderLineItemsForm.get('pieceCount').setValue(element.piececount === 0 ? 0 : element.piececount);
    this.orderLineItemsForm.get('piecetype').setValue(element.piecetypename);
    this.orderLineItemsForm.get('length').setValue(element.lenght === 0 ? 0 : element.lenght);
    this.orderLineItemsForm.get('width').setValue(element.width === 0 ? 0 : element.width);
    this.orderLineItemsForm.get('height').setValue(element.height === 0 ? 0 : element.height);
    this.orderLineItemsForm.get('HLWUnit').setValue(element.hlwunit);
    this.orderLineItemsForm.get('hazmat').setValue(element.ishazmat === false ? false : true);
    this.hazmatChecked = element.ishazmat === false ? false : true;
    this.hazmatSection.get('unClass').setValue(element.unclassname);
    this.hazmatSection.get('hazmatClass').setValue(element.hazmatclassname);
    this.hazmatSection.get('hazmatContactNumber').setValue(element.hazmatcontactnumber);
    this.hazmatSection.get('packingGroup').setValue(element.packinggroupname);
    this.descriptionSection.get('description').setValue(element.description);
  }
  LineItemEdit(element) {
    this.editDataIndex = this.lineItemsDataSource.data.indexOf(element);
    this.editClick = true;
    this.bindingData(element);
  }
  LineItemDelete(element) {
    this.editDataIndex = this.lineItemsDataSource.data.indexOf(element);
    let deleteRec = this.editDataIndex + 1;
    const confirmCancel = this.dialog.open(ConfirmationDialog, {
      data: {
        message: `Are you sure you want to delete this Order line item ` + deleteRec + `?`,
        buttonText: {
          ok: CommonConst.YES,
          cancel: CommonConst.NO
        }
      }
    });
    confirmCancel.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.isDisplayGrid = false;
        if (element.orderlineid == 0) {
          if (this.editDataIndex !== -1) {
            this.isDisplayGrid = true;
            this.lineItemsDataSource.data.splice(this.editDataIndex, 1);
            this.lineItemsDataSource._updateChangeSubscription()
          }
        }
        else {
          this.submitOrderService.DeleteLineItemsData(element.orderlineid).subscribe(res => {
            if (res > 0) {
              this.isDisplayGrid = true;
              this.GetOrderLineItemsData(element.orderid);
            }
            if (res === 0) {
              this.isDisplayGrid = false;
              this.lineItemsDataSource.data = [];
            }
          })
        }
      }
    })
  }
  validations() {
    if (this.hazmatChecked) {
      this.hazmatSection = this.fb.group({
        unClass: ['', [Validators.required]],
        hazmatClass: ['', [Validators.required]],
        hazmatContactNumber: ['', [Validators.required]],
        packingGroup: ['', [Validators.required]]
      })
    } else if (!this.hazmatChecked) {
      this.hazmatSection = this.fb.group({
        unClass: ['', [Validators.minLength(0)]],
        hazmatClass: ['', [Validators.minLength(0)]],
        hazmatContactNumber: ['', [Validators.minLength(0)]],
        packingGroup: ['', [Validators.minLength(0)]]
      })
    }
  }

  checkedHazmat(event) {
    if (event.checked) {
      this.hazmatChecked = true;
      this.validations();
    } else {
      this.hazmatChecked = false;
      this.validations();
    }
  }

  omit_special_char(event: { charCode: any; }) {
    var k: number;
    k = event.charCode;
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || k == 36 || (k >= 48 && k <= 57));
  }


  print() {
    console.log(this.orderLineItemsForm)
  }
  getWeight(PreferenceType: string) {
    this.userPreferenceService.GetPreference(PreferenceType).subscribe(response => {
      if (response) {
        this.weight = response;
      }
    }, error => this.errorMessage = <any>error);
  }

  getvolume(PreferenceType: string) {
    this.userPreferenceService.GetPreference(PreferenceType).subscribe(response => {
      if (response) {
        this.volume = response;
      }
    }, error => this.errorMessage = <any>error);
  }

  getlength(PreferenceType: string) {
    this.userPreferenceService.GetPreference(PreferenceType).subscribe(response => {
      if (response) {
        this.length = response;
      }
    }, error => this.errorMessage = <any>error);
  }

  getWidth(PreferenceType: string) {
    this.userPreferenceService.GetPreference(PreferenceType).subscribe(response => {
      if (response) {
        this.Width = response;
      }
    }, error => this.errorMessage = <any>error);
  }
  getHeight(PreferenceType: string) {
    this.userPreferenceService.GetPreference(PreferenceType).subscribe(response => {
      if (response) {
        this.Height = response;
      }
    }, error => this.errorMessage = <any>error);
  }

  getDropDownValues(searchString: any, value: any) {
    return new Promise((resolve, reject) => {
      this.submitOrderService.GetSubmitOrderDropDownValues(searchString, value).subscribe(data => {
        if (data) {
          resolve(data);
        }
      }, error => this.errorMessage = <any>error);
      reject;
    })
  }

  addLineItem(hazmatValues, orderFormValues, descriptionSection) {
    let orderLines: OrderLines = <OrderLines>{};
    orderLines.ORDERLINEID = this.OrderLineID != commonNumbers.zero ? Number(this.OrderLineID) : commonNumbers.zero;
    this.orderLineItems.OrderId = this.orderId;
    this.orderLineItems.OrderNumber = this.orderNumber;
    orderLines.GROSSWEIGHT = Number(orderFormValues.grossWt);
    orderLines.GROSSWEIGHTUNIT = orderFormValues.grossWtValue;
    orderLines.GROSSVOLUME = Number(orderFormValues.grossVol);
    orderLines.GROSSVOLUMEUNIT = orderFormValues.grossVolValue;
    orderLines.HANDLINGUNITCOUNT = Number(orderFormValues.huCount);
    orderLines.HANDLINGUNITTYPEID = String(orderFormValues.huType === "" || orderFormValues.huType === null ? 0 : this.hutype.filter(x => x.displayName === orderFormValues.huType)[0].id);
    orderLines.HANDLINGUNITTYPENAME = orderFormValues.huType;
    orderLines.PIECECOUNT = Number(orderFormValues.pieceCount);
    orderLines.PIECETYPEID = String(orderFormValues.piecetype === "" || orderFormValues.piecetype === null ? 0 : this.piecetype.filter(x => x.displayName === orderFormValues.piecetype)[0].id);
    orderLines.PIECETYPENAME = orderFormValues.piecetype;
    orderLines.FREIGHTCLASSID = String(orderFormValues.freightclass === "" || orderFormValues.freightclass === null ? 0 : this.freightclass.filter(x => x.displayName === orderFormValues.freightclass)[0].code);
    orderLines.FREIGHTCLASSNAME = orderFormValues.freightclass;
    orderLines.TCNNUMBER = orderFormValues.tcnNum;
    orderLines.LENGHT = Number(orderFormValues.length);
    orderLines.WIDTH = Number(orderFormValues.width);
    orderLines.DESCRIPTION = descriptionSection.description;
    if(orderFormValues.hazmat!=null){
      orderLines.ISHAZMAT = orderFormValues.hazmat == false ? false : true;
      }else{
        orderLines.ISHAZMAT = orderFormValues.hazmat == false;
      } 
    orderLines.HEIGHT = Number(orderFormValues.height);
    orderLines.HLWUNIT = orderFormValues.HLWUnit;
    if (this.hazmatChecked) {
      orderLines.UNCLASSNAME = hazmatValues.unClass;
      orderLines.HAZMATCLASSID = String(hazmatValues.hazmatClass === "" || hazmatValues.hazmatClass === null ? 0 : this.hazmatclass.filter(x => x.displayName === hazmatValues.hazmatClass)[0].id);
      orderLines.HAZMATCLASSNAME = hazmatValues.hazmatClass;
      orderLines.HAZMATCONTACTNUMBER = hazmatValues.hazmatContactNumber;
      orderLines.PACKINGGROUPID = String(hazmatValues.packingGroup === "" || hazmatValues.packingGroup === null ? 0 : this.hazmatPacking.filter(x => x.displayName === hazmatValues.packingGroup)[0].id);
      orderLines.PACKINGGROUPNAME = hazmatValues.packingGroup;
    }
    // orderLines.UserId = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.userId;
    this.orderLineItems.OrderLines = JSON.stringify(orderLines);
    const lineItemData = JSON.stringify(orderLines, function (key, value) {
      if (typeof value === 'object' && value && !Array.isArray(value)) {
        return Object.keys(value).reduce(function (obj, k) {
          obj[k.toLowerCase()] = value[k];
          return obj;
        }, {});
      }
      return value;
    }, 2);
    this.addMoreItems = JSON.parse(lineItemData);
    if (this.editClick) {
      if (this.editDataIndex !== -1) {
        this.lineItemsDataSource.data.splice(this.editDataIndex, 1);
      }
    }
    this.lineItemsDataSource._updateChangeSubscription()
    this.lineItemsDataSource.data.push(this.addMoreItems);
    this.orderLineItemsForm.reset();
    this.hazmatSection.reset();
    this.descriptionSection.reset();
    this.hazmatChecked = false;
    this.addMoreClicked = false;
    this.isDisplayGrid = true;
    this.saveAndContinueClick = true;
    this.editClick = false;
    this.snackBar.open('Order Line item added successfully', '', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    }).afterDismissed().subscribe(() => {
      this.orderLineItemsForm.reset();
      this.hazmatSection.reset();
      this.descriptionSection.reset();
      this.hazmatChecked = false;
      this.addMoreClicked = false;
    });
  }

  saveLineItem(hazmatValues, orderFormValues, descriptionSection, saveType, buttonClicked) {
    if (saveType === "Complete" && (this.saveAndContinueClick == false) && (this.orderLineItemsForm.invalid || (this.hazmatChecked && this.hazmatSection.invalid) || this.descriptionSection.invalid)) {
      return;
    }
    if (this.orderLineItemsForm.invalid || (this.hazmatChecked && this.hazmatSection.invalid) || this.descriptionSection.invalid) {
      this.orderLineItems.OrderId = this.orderId;
      this.orderLineItems.OrderNumber = this.orderNumber;
      this.orderLineItems.UserId = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.userId;
      this.orderLineItems.OrderLineFlag = saveType;
      const lineItemData = (JSON.stringify(this.lineItemsDataSource.data, function (key, value) {
        if (typeof value === 'object' && value && !Array.isArray(value)) {
          return Object.keys(value).reduce(function (obj, k) {
            obj[k.toUpperCase()] = value[k];
            return obj;
          }, {});
        }
        return value;
      }, 2));
      this.orderLineItems.OrderLines = lineItemData;
    }
    else {
      this.orderLineItems.OrderId = this.orderId;
      this.orderLineItems.OrderNumber = this.orderNumber;
      this.orderLineItems.UserId = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.userId;
      this.orderLineItems.OrderLineFlag = saveType;
      let orderLinesItems: OrderLines = <OrderLines>{};
      orderLinesItems.ORDERLINEID = this.OrderLineID != commonNumbers.zero ? Number(this.OrderLineID) : commonNumbers.zero;
      orderLinesItems.GROSSWEIGHT = Number(orderFormValues.grossWt);
      orderLinesItems.GROSSWEIGHTUNIT = orderFormValues.grossWtValue;
      orderLinesItems.GROSSVOLUME = Number(orderFormValues.grossVol);
      orderLinesItems.GROSSVOLUMEUNIT = orderFormValues.grossVolValue;
      orderLinesItems.HANDLINGUNITCOUNT = Number(orderFormValues.huCount);
      orderLinesItems.HANDLINGUNITTYPEID = String(orderFormValues.huType === "" || orderFormValues.huType === null ? 0 : this.hutype.filter(x => x.displayName === orderFormValues.huType)[0].id);
      orderLinesItems.HANDLINGUNITTYPENAME = orderFormValues.huType;
      orderLinesItems.PIECECOUNT = Number(orderFormValues.pieceCount);
      orderLinesItems.PIECETYPEID = String(orderFormValues.piecetype === "" || orderFormValues.piecetype === null ? 0 : this.piecetype.filter(x => x.displayName === orderFormValues.piecetype)[0].id);
      orderLinesItems.PIECETYPENAME = orderFormValues.piecetype;
      orderLinesItems.FREIGHTCLASSID = String(orderFormValues.freightclass === "" || orderFormValues.freightclass === null ? 0 : this.freightclass.filter(x => x.displayName === orderFormValues.freightclass)[0].code);
      orderLinesItems.FREIGHTCLASSNAME = orderFormValues.freightclass;
      orderLinesItems.TCNNUMBER = orderFormValues.tcnNum;
      orderLinesItems.LENGHT = Number(orderFormValues.length);
      orderLinesItems.WIDTH = Number(orderFormValues.width);
      orderLinesItems.DESCRIPTION = descriptionSection.description;
      if(orderFormValues.hazmat!=null){
        orderLinesItems.ISHAZMAT = orderFormValues.hazmat == false ? false : true;
        }else{
          orderLinesItems.ISHAZMAT = orderFormValues.hazmat == false;
        }
      orderLinesItems.HEIGHT = Number(orderFormValues.height);
      orderLinesItems.HLWUNIT = orderFormValues.HLWUnit;
      if (this.hazmatChecked) {
        orderLinesItems.UNCLASSNAME = hazmatValues.unClass;
        orderLinesItems.HAZMATCLASSID = String(hazmatValues.hazmatClass === "" || hazmatValues.hazmatClass === null ? 0 : this.hazmatclass.filter(x => x.displayName === hazmatValues.hazmatClass)[0].id);
        orderLinesItems.HAZMATCLASSNAME = hazmatValues.hazmatClass;
        orderLinesItems.HAZMATCONTACTNUMBER = hazmatValues.hazmatContactNumber;
        orderLinesItems.PACKINGGROUPID = String(hazmatValues.packingGroup === "" || hazmatValues.packingGroup === null ? 0 : this.hazmatPacking.filter(x => x.displayName === hazmatValues.packingGroup)[0].id);
        orderLinesItems.PACKINGGROUPNAME = hazmatValues.packingGroup;
      }
      this.orderLineItems.UserId = JSON.parse(localStorage.getItem('okta-token-storage')).idToken.claims.userId;
      //this.orderLineItems.OrderLines = JSON.stringify(orderLinesItems).toLocaleUpperCase();
      const itemData = (JSON.stringify(orderLinesItems, function (key, value) {
        if (typeof value === 'object' && value && !Array.isArray(value)) {
          return Object.keys(value).reduce(function (obj, k) {
            obj[k.toLowerCase()] = value[k];
            return obj;
          }, {});
        }
        return value;
      }, 2));
      this.addMoreItemsSave = JSON.parse(itemData);
      if (this.editClick) {
        if (this.editDataIndex !== -1) {
          this.lineItemsDataSource.data.splice(this.editDataIndex, 1);
        }
      }
      this.lineItemsDataSource.data.push(this.addMoreItemsSave);
      const lineItemData = (JSON.stringify(this.lineItemsDataSource.data, function (key, value) {
        if (typeof value === 'object' && value && !Array.isArray(value)) {
          return Object.keys(value).reduce(function (obj, k) {
            obj[k.toUpperCase()] = value[k];
            return obj;
          }, {});
        }
        return value;
      }, 2));

      this.orderLineItems.OrderLines = lineItemData;
    }
    this.editClick = false;
    this.submitOrderService.SaveOrderLineItems(this.orderLineItems).subscribe(res => {
      if (res > 0) {
        this.snackBar.open(`Your Order number (${this.orderNumber}) has been saved but not submitted.`, '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        }).afterDismissed().subscribe(() => {
          if (saveType === 'saveForLater') {
            this.orderLineItemsForm.reset();
            this.hazmatSection.reset();
            this.descriptionSection.reset();
            this.hazmatChecked = false;
            this.router.navigate([RouteLinks.submitordergrid]);
          }
          else {
            this.GetOrderLineItemsData(this.orderId);
            this.dataTransfer.loadData('fromOrderLineItems');
            this.orderLineItemsForm.reset();
            this.hazmatSection.reset();
            this.descriptionSection.reset();
            this.hazmatChecked = false;
            this.editClick = false;
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
}
