export class DraftOrders {
    public OrderId: number;
    public OrderNumber: string;
    public OriginLocation: string;
    public DestLocation: string;
    public ServiceOption: string;
    public RequestedEquipment: string;
    public CreatedBy: string;
    public UserEmail: string;
    public Created: string;
    public Modified: string;
    public totalCount: number;
}

export class ContactInfo {
    contactName: string;
    phone: string;
    email: string;
    isDefaultContact: boolean;
    contactId: number;
    contactNum: string;
}

export class SaveOrderLineItems{
    public OrderId: number;
    public OrderNumber: string;
    public UserId: string;
    public OrderLineFlag: string;
    public OrderLines: string;
}

export class OrderLines {
    public ORDERLINEID: number;
    public GROSSWEIGHT: number;
    public GROSSWEIGHTUNIT: string;
    public GROSSVOLUME: number;
    public GROSSVOLUMEUNIT: string;
    public HANDLINGUNITCOUNT: number;
    public HANDLINGUNITTYPEID: string;
    public HANDLINGUNITTYPENAME: string;
    public PIECECOUNT: number;
    public PIECETYPEID: string;
    public PIECETYPENAME: string;
    public FREIGHTCLASSID: string;
    public FREIGHTCLASSNAME: string;
    public TCNNUMBER: string;
    public LENGHT: number;
    public LENGHTUNIT: string;
    public WIDTH: number;
    public WIDTHUNIT: string;
    public HEIGHT: number;
    public HLWUNIT: string;
    public ISHAZMAT: boolean;
    public UNCLASSNAME: string;
    public HAZMATCLASSID: string;
    public HAZMATCLASSNAME: string;
    public HAZMATCONTACTNUMBER: string;
    public PACKINGGROUPID: string;
    public PACKINGGROUPNAME: string;
    public DESCRIPTION: string;
}

export class OrderDetailsModel {
    public RequestedEquipment: string;
    public service: string;
    public referencenumberfield: string;
    public sourcesystem: string;
    public Carrier: string;
}

export class SaveOrderDetails {
    public OrderId: number;
    public OrderNumber: string;
    public ServiceOptionId: number;
    public ServiceOptionName: string;
    public SourceSystem: string;
    public EquipmentId: number;
    public EquipmentName: string;
    public CarrierId: number;
    public CarrierName: string;
    public UserId: string;
    public OrderDetailsFlag: string;
    public ReferenceNumber: string;
    public userName: string;
    public CarrierNum: string;
    public AvailableEquipmentNum: string;
    public ServiceOptionNum: string;
}

export interface ReferenceNumberModel {
    id: number;
    ordid: string;
    referencetype: string;
    referencenumber: string;
    createddate: string;
    createdby: string;
}

export class SaveOriginInformation {
    public orderId: number;
    public orderNumber: string;
    public originLocationId: number;
    public originLocation: string;
    public originLocCity: string;
    public originStateCode: string;
    public originStateName: string;
    public originZipCode: string;
    public contactIdOrig: number;
    public originLocContactName: string;
    public originLocContactPhone: string;
    public originLocContactEmail: string;
    public earlyPickup: string;
    public latePickup: string;
    public EarlyPickupTime: string;
    public LatePickupTime: string;
    public PickupTimeZone: string;
    public userId: string;
    public emailId: string;
    public shipWithOrder: string;
    public appointment: boolean;
    public originLocFlag: string;
    public userName: string;
    public originAddress: any;
    public ContactNumOrig: string;
    public LocationNumOrig: string;
}

export class SaveOrderDestination {
    public OrderId: number;
    public OrderNumber: string;
    public DestLocationId: number;
    public DestLocation: string;
    public DestLocCity: string;
    public DestStateCode: string;
    public DestStateName: string;
    public DestZipCode: string;
    public DestContactIdOrig: number;
    public DestLocContactName: string;
    public DestLocContactPhone: string;
    public DestLocContactEmail: string;
    public EarlyDelivery: string;
    public LateDelivery: string;
    public EarlyDeliveryTime: string;
    public LateDeliveryTime: string;
    public DeliveryTimeZone: string;
    public Appointment: boolean;
    public DestLocFlag: string;
    public UserId: string;
    public userName: string;
    public destinationAddress: string;
    public ContactNumDest: string;
    public LocationNumDest: string;
}
export class SaveOrderAdditionalInfo {
    orderId: number;
    orderNumber: string;
    addLInfoFlag: string;
    userId: string;
    orderDocuments: string;
    orderComments: string;
    shipwithorder: string="";
}
export class OrderDocumentsAdditionalInfo {
    public id: number;
    public doctype: string;
    public docdescription: string;
    public filename: string;
    public filetype: string;
    public Content: string;
    public createdby: string;
    public createddate: Date;
    public ordid: number;
    public DocNum: string;

}
export class orderstepperdetails {
    public orderId: number;
    public originLocFlag: string;
    public destLocFlag: string;
    public orderDetailsFlag: string;
    public orderLineFlag: string;
    public addlInfoFlag: string;
}
export class orderLineItemGrid {
    public LineItem: number;
    public GROSSWEIGHT: number;
    public PIECECOUNT: number;
    public PIECETYPENAME: string;
    public FREIGHTCLASSNAME: string;
    public TCNNUMBER: string;
}
export class ShipwithCreatedByModal {
    shipWith: string;
    createdBy: string;
    redirectedFrom: string;
}
export class AddOrderLineItems {
 
    public orderlineid: string;
    public orderid: number;
    public grossweight: number;
    public grossweightunit: string;
    public grossvolume: number;
    public grossvolumeunit: string;
    public handlingunitcount: number;
    public handlingunittypeid: string;
    public handlingunittypename: string;
    public piececount: number;
    public piecetypeid: string;
    public piecetypename: string;
    public freightclassid: string;
    public freightclassname: string;
    public tcnnumber: string;
    public lenght: number;
    public lenghtunit: string;
    public width : number;
    public widthunit: string;
    public heightunit: string;
    public height: number;
    public HLWUnit: string;
    public ishazmat: boolean;
    public unclassname: string;
    public hazmatclassid: string;
    public hazmatclassname: string;
    public hazmatcontactnumber: string;
    public packinggroupid: string;
    public packinggroupname: string;
    public description: string;
    public useridcreatedby: string;
    public useridlastmodifiedby: string;

}
